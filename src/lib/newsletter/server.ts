import { randomUUID, createHash } from 'node:crypto'
import { getPayload, type Payload } from 'payload'
import config from '@payload-config'
import { token, verifyToken } from './tokens'
import { NewsletterError, clean, emailAddress, defaultSettings, campaignInput, readyToSend, emailHTML, escapeHTML, CONSENT_TEXT, CONSENT_VERSION, type CampaignInput } from './model'

export const siteOrigin = () => new URL(process.env.PAYLOAD_URL || 'https://somiklinikken.no').origin
const signingSecret = () => process.env.NEWSLETTER_TOKEN_SECRET || process.env.PAYLOAD_SECRET || ''
export const deliveryReady = () => Boolean(process.env.NEWSLETTER_RESEND_API_KEY && process.env.NEWSLETTER_FROM && signingSecret().length >= 32)
export const database = () => getPayload({ config })
export function sameOrigin(req: Request): void {
  if (req.headers.get('origin') !== siteOrigin()) throw new NewsletterError('Forespørselen må komme fra Somis nettside.', 403)
}
export async function jsonBody(req: Request): Promise<Record<string, unknown>> {
  if (!req.headers.get('content-type')?.startsWith('application/json')) throw new NewsletterError('Ugyldig innholdstype.', 415)
  // Stream limit is enforced even when Content-Length is absent or forged.
  if (Number(req.headers.get('content-length') || 0) > 64000) throw new NewsletterError('For mye innhold.', 413)
  const reader = req.body?.getReader(); if (!reader) throw new NewsletterError('Mangler innhold.')
  const chunks: Uint8Array[] = []; let size = 0
  while (true) { const { done, value } = await reader.read(); if (done) break; size += value.byteLength; if (size > 64000) { await reader.cancel(); throw new NewsletterError('For mye innhold.', 413) } chunks.push(value) }
  try { const data = JSON.parse(Buffer.concat(chunks).toString()); if (!data || typeof data !== 'object' || Array.isArray(data)) throw Error(); return data } catch { throw new NewsletterError('Ugyldig innhold.') }
}
export async function administrator(req: Request) {
  const payload = await database()
  const { user } = await payload.auth({ headers: req.headers })
  if (user?.collection !== 'users') throw new NewsletterError('Logg inn som administrator for å bruke nyhetsbrevmodulen.', 401)
  return { payload, user }
}
export function errorResponse(err: unknown): Response {
  if (err instanceof NewsletterError) return Response.json({ error: err.message }, { status: err.status, headers: { 'Cache-Control': 'no-store' } })
  console.error('[newsletter] Operation failed:', err instanceof Error ? err.name : 'unknown')
  return Response.json({ error: 'Kunne ikke fullføre. Prøv igjen.' }, { status: 500, headers: { 'Cache-Control': 'no-store' } })
}
export async function settings(payload: Payload) {
  const saved = await payload.findGlobal({ slug: 'newsletter-settings', overrideAccess: true })
  return { ...defaultSettings, ...Object.fromEntries(Object.keys(defaultSettings).map(k => [k, saved[k as keyof typeof saved] ?? defaultSettings[k as keyof typeof defaultSettings]])) } as typeof defaultSettings
}
export async function schedulerReady(payload: Payload) {
  if (!process.env.NEWSLETTER_WORKER_SECRET) return false
  const data = await payload.findGlobal({ slug: 'newsletter-settings', overrideAccess: true })
  return Boolean(data.workerSeenAt && Date.now() - Date.parse(data.workerSeenAt) < 180000)
}
export async function updateCampaignIf(payload: Payload, id: string, statuses: string[], data: Record<string, unknown>, updatedAt?: string) {
  // The Mongo adapter's updateOne performs findOneAndUpdate atomically. The
  // high-level bulk Local API first finds documents and cannot provide this guard.
  return payload.db.updateOne({ collection: 'newsletter-campaigns', where: { and: [
    { id: { equals: id } }, { status: { in: statuses } }, ...(updatedAt ? [{ updatedAt: { equals: updatedAt } }] : []),
  ] }, data: { ...data, updatedAt: new Date().toISOString() } })
}
export async function sendEmail(to: string, subject: string, html: string, text: string, key: string, unsubscribe?: string) {
  if (!deliveryReady()) throw new NewsletterError('E-postlevering er ikke konfigurert. Ingen e-post er sendt.', 503)
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST', signal: AbortSignal.timeout(15000),
    headers: { Authorization: `Bearer ${process.env.NEWSLETTER_RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': key },
    body: JSON.stringify({ from: process.env.NEWSLETTER_FROM, to: [emailAddress(to)], subject, html, text, reply_to: 'post@somiklinikken.no',
      ...(unsubscribe ? { headers: { 'List-Unsubscribe': `<${unsubscribe}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' } } : {}),
    }),
  })
  const result = await response.json().catch(() => ({}))
  if (!response.ok || !result.id) throw new NewsletterError(response.status === 429 ? 'Leveransetjenesten ber oss vente. Prøv igjen senere.' : 'Leveransetjenesten avviste e-posten. Sjekk avsenderoppsettet.', response.status === 429 || response.status >= 500 ? 503 : 502)
  return String(result.id)
}
const limited = new Map<string, { count: number; until: number }>()
export function rateLimit(req: Request): void {
  // Nginx must overwrite X-Real-IP; no address is stored with subscriber data.
  const key = createHash('sha256').update(req.headers.get('x-real-ip') || 'unknown').digest('hex')
  const now = Date.now(); for (const [k, v] of limited) if (v.until < now) limited.delete(k)
  const entry = limited.get(key) || { count: 0, until: now + 600000 }
  if (++entry.count > 10 || limited.size > 2000) throw new NewsletterError('For mange forsøk. Prøv igjen om noen minutter.', 429)
  limited.set(key, entry)
}
export async function subscribe(payload: Payload, raw: Record<string, unknown>) {
  if (raw.website) return
  const email = emailAddress(raw.email), firstName = clean(raw.firstName ?? '', 80), lastName = clean(raw.lastName ?? '', 80)
  if (raw.consent !== true) throw new NewsletterError('Kryss av for at du ønsker nyhetsbrev.')
  const opts = await settings(payload)
  if (!opts.enabled || !deliveryReady()) throw new NewsletterError('Påmelding er ikke åpnet ennå. Prøv igjen senere.', 503)
  const old = (await payload.find({ collection: 'newsletter-subscribers', where: { email: { equals: email } }, limit: 1, overrideAccess: true })).docs[0]
  if (old?.status === 'active' || old?.status === 'bounced') return
  if (old?.confirmationSentAt && Date.now() - Date.parse(old.confirmationSentAt) < 300000) return
  const version = randomUUID(), now = new Date().toISOString()
  const data = { email, firstName, lastName, status: 'pending' as const, consentText: CONSENT_TEXT, consentVersion: CONSENT_VERSION,
    consentedAt: now, source: 'website', confirmVersion: version, unsubscribeVersion: old?.unsubscribeVersion || randomUUID() }
  let sub
  try { sub = old ? await payload.update({ collection: 'newsletter-subscribers', id: old.id, data, overrideAccess: true }) : await payload.create({ collection: 'newsletter-subscribers', data, overrideAccess: true }) }
  catch (err) { if (!old && (await payload.find({ collection: 'newsletter-subscribers', where: { email: { equals: email } }, limit: 1, overrideAccess: true })).totalDocs) return; throw err }
  const link = `${siteOrigin()}/nyhetsbrev?action=confirm&token=${encodeURIComponent(token(signingSecret(), String(sub.id), 'confirm', version, Date.now() + 86400000))}`
  await sendEmail(email, 'Bekreft nyhetsbrevet fra SOMI Klinikken', `<h1>Velkommen til SOMI</h1><p>Bekreft at du ønsker nyheter og tilbud fra oss.</p><p><a href="${escapeHTML(link)}">Bekreft påmelding</a></p><p>Lenken gjelder i 24 timer. Hvis du ikke ba om nyhetsbrevet, kan du se bort fra denne e-posten.</p>`, `Bekreft påmelding: ${link}\nLenken gjelder i 24 timer.`, `confirm-${sub.id}-${version}`)
  await payload.update({ collection: 'newsletter-subscribers', id: sub.id, data: { confirmationSentAt: now }, overrideAccess: true })
}
export async function consumeToken(payload: Payload, value: string, action: 'confirm' | 'unsubscribe') {
  const data = verifyToken(signingSecret(), value, action)
  const sub = await payload.findByID({ collection: 'newsletter-subscribers', id: data.id, overrideAccess: true }).catch(() => null)
  if (!sub || (action === 'confirm' ? sub.confirmVersion : sub.unsubscribeVersion) !== data.version) throw new NewsletterError('Lenken er ugyldig eller har utløpt.')
  if (action === 'confirm') {
    if (sub.status === 'active') return
    if (sub.status !== 'pending') throw new NewsletterError('Påmeldingen er ikke lenger gyldig. Meld deg på igjen.')
    await payload.update({ collection: 'newsletter-subscribers', id: sub.id, data: { status: 'active', confirmedAt: new Date().toISOString() }, overrideAccess: true })
  } else await payload.update({ collection: 'newsletter-subscribers', id: sub.id, data: { status: 'unsubscribed', unsubscribedAt: new Date().toISOString(), confirmVersion: randomUUID() }, overrideAccess: true })
}
export function unsubscribeLink(id: string, version: string) {
  return `${siteOrigin()}/api/nyhetsbrev/token?token=${encodeURIComponent(token(signingSecret(), id, 'unsubscribe', version))}`
}
export async function queueCampaign(payload: Payload, id: string) {
  const campaign = await payload.findByID({ collection: 'newsletter-campaigns', id, overrideAccess: true })
  if (campaign.status !== 'draft') throw new NewsletterError('Kampanjen er allerede planlagt eller sendt.')
  const data = campaignInput(campaign as unknown as Record<string, unknown>); readyToSend(data)
  if (!deliveryReady()) throw new NewsletterError('Koble til e-postlevering før utsending.', 503)
  if (data.scheduledAt && !await schedulerReady(payload)) throw new NewsletterError('Planlagt utsending krever en aktiv utsendingsjobb.', 503)
  const recipients = await payload.find({ collection: 'newsletter-subscribers', where: { status: { equals: 'active' } }, limit: 10001, depth: 0, overrideAccess: true })
  if (!recipients.totalDocs) throw new NewsletterError('Ingen bekreftede abonnenter ennå.')
  if (recipients.totalDocs > 10000) throw new NewsletterError('Kontakt administrator for utsending til mer enn 10 000 abonnenter.')
  const result = await updateCampaignIf(payload, id, ['draft'], { status: 'queued', queuedAt: new Date().toISOString(), cursor: 0,
    totalRecipients: recipients.totalDocs, audience: recipients.docs.map(d => String(d.id)) }, campaign.updatedAt)
  if (!result) throw new NewsletterError('Kampanjen er endret eller allerede lagt i kø. Last inn kladden igjen.')
  return recipients.totalDocs
}
// One Next process plus one serialized systemd timer. Provider idempotency also
// prevents duplicates if the process crashes after acceptance but before saving.
const workerState = globalThis as typeof globalThis & { __somiNewsletterWorking?: boolean }
export async function workQueue(payload: Payload) {
  if (workerState.__somiNewsletterWorking) return { busy: true, processed: 0 }
  if (!deliveryReady()) throw new NewsletterError('E-postlevering er ikke konfigurert.', 503)
  workerState.__somiNewsletterWorking = true
  try {
    const campaigns = await payload.find({ collection: 'newsletter-campaigns', where: { and: [
      { status: { in: ['queued', 'sending'] } }, { or: [{ scheduledAt: { exists: false } }, { scheduledAt: { equals: null } }, { scheduledAt: { less_than_equal: new Date().toISOString() } }] },
    ] }, limit: 1, sort: 'queuedAt', overrideAccess: true })
    const campaign = campaigns.docs[0]; if (!campaign) return { processed: 0 }
    const audience = campaign.audience as unknown as string[]
    if (!Array.isArray(audience)) throw new NewsletterError('Mottakerlisten mangler.', 500)
    const content = campaignInput(campaign as unknown as Record<string, unknown>)
    let cursor = campaign.cursor || 0, processed = 0
    if (!await updateCampaignIf(payload, String(campaign.id), ['queued', 'sending'], { status: 'sending' })) return { processed: 0 }
    while (cursor < audience.length && processed < 5) {
      const fresh = await payload.findByID({ collection: 'newsletter-campaigns', id: campaign.id, overrideAccess: true })
      if (fresh.status === 'cancelled') break
      const id = audience[cursor], key = `${campaign.id}:${id}`
      const sub = await payload.findByID({ collection: 'newsletter-subscribers', id, overrideAccess: true }).catch(() => null)
      let log = (await payload.find({ collection: 'newsletter-deliveries', where: { key: { equals: key } }, limit: 1, overrideAccess: true })).docs[0]
      if (!log && sub) log = await payload.create({ collection: 'newsletter-deliveries', data: { key, campaign: String(campaign.id), subscriber: id, email: sub.email, status: 'pending', attempts: 0 }, overrideAccess: true })
      if (log?.status === 'pending' && sub?.status === 'active') {
        const attempts = (log.attempts || 0) + 1
        // Never retry an ambiguous acceptance outside Resend's 24h idempotency window.
        if (attempts > 3 || Date.now() - Date.parse(log.createdAt) > 23 * 3600000) {
          await payload.update({ collection: 'newsletter-deliveries', id: log.id, data: { status: 'failed', lastError: 'Må kontrolleres manuelt; ingen ny automatisk utsending.' }, overrideAccess: true })
        } else {
          await payload.update({ collection: 'newsletter-deliveries', id: log.id, data: { attempts }, overrideAccess: true })
          const unsubscribe = unsubscribeLink(String(sub.id), sub.unsubscribeVersion)
          let providerId: string
          try { providerId = await sendEmail(sub.email, content.subject, emailHTML(content, unsubscribe), `${content.heading}\n\n${content.body}\n\n${content.terms}\n${content.url}\n\nMeld meg av: ${unsubscribe}`, `campaign-${campaign.id}-${id}`, unsubscribe) }
          catch (err) {
            await payload.update({ collection: 'newsletter-deliveries', id: log.id, data: { lastError: err instanceof NewsletterError ? err.message : 'Levering må kontrolleres.', ...(attempts >= 3 ? { status: 'failed' as const } : {}) }, overrideAccess: true })
            break
          }
          await payload.update({ collection: 'newsletter-deliveries', id: log.id, data: { status: 'accepted', providerId, acceptedAt: new Date().toISOString(), lastError: '' }, overrideAccess: true })
          await new Promise(resolve => setTimeout(resolve, 650))
        }
      } else if (log?.status === 'pending') await payload.update({ collection: 'newsletter-deliveries', id: log.id, data: { status: 'skipped' }, overrideAccess: true })
      cursor++; processed++
      // Cancellation cannot be overwritten by the worker's cursor update.
      await updateCampaignIf(payload, String(campaign.id), ['sending'], { cursor, ...(cursor === audience.length ? { status: 'finished' } : {}) })
    }
    return { processed, campaign: campaign.id, cursor, total: audience.length }
  } finally { workerState.__somiNewsletterWorking = false }
}
