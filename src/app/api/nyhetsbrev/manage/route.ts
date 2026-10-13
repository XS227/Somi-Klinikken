import { randomUUID } from 'node:crypto'
import { administrator, sameOrigin, jsonBody, settings, deliveryReady, schedulerReady, sendEmail, workQueue, queueCampaign, updateCampaignIf, errorResponse } from '@/lib/newsletter/server'
import { clean, emailAddress, campaignInput, emailHTML, csvCell, parseCSV, NewsletterError, CONSENT_TEXT, CONSENT_VERSION } from '@/lib/newsletter/model'
export const dynamic = 'force-dynamic'
const noCache = { 'Cache-Control': 'private, no-store' }
const publicSubscriber = (d: Record<string, unknown>) => Object.fromEntries(['id', 'email', 'firstName', 'lastName', 'status', 'source', 'consentedAt', 'confirmedAt'].map(k => [k, d[k]]))
const publicCampaign = (d: Record<string, unknown>) => { const { audience: _audience, ...rest } = d; return rest }
export async function GET(req: Request) {
  try {
    const { payload, user } = await administrator(req)
    const url = new URL(req.url)
    if (url.searchParams.get('export') === 'csv') {
      const data = await payload.find({ collection: 'newsletter-subscribers', limit: 10001, depth: 0, user, overrideAccess: false })
      if (data.totalDocs > 10000) throw new NewsletterError('Kontakt administrator for eksport av mer enn 10 000 kontakter.')
      const columns = ['email', 'firstName', 'lastName', 'status', 'source', 'consentedAt', 'confirmedAt'] as const
      const csv = '\uFEFF' + columns.join(';') + '\n' + data.docs.map(d => columns.map(k => csvCell(d[k])).join(';')).join('\n')
      return new Response(csv, { headers: { ...noCache, 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="Somi-abonnenter.csv"' } })
    }
    const page = Math.max(1, Math.min(10000, Number(url.searchParams.get('page')) || 1))
    const [opts, subscribers, campaigns, active, pending, unsubscribed, accepted, failed] = await Promise.all([
      settings(payload),
      payload.find({ collection: 'newsletter-subscribers', page, limit: 50, depth: 0, sort: '-createdAt', user, overrideAccess: false }),
      payload.find({ collection: 'newsletter-campaigns', limit: 100, sort: '-createdAt', user, overrideAccess: false }),
      ...['active', 'pending', 'unsubscribed'].map(status => payload.count({ collection: 'newsletter-subscribers', where: { status: { equals: status } }, user, overrideAccess: false })),
      ...['accepted', 'failed'].map(status => payload.count({ collection: 'newsletter-deliveries', where: { status: { equals: status } }, user, overrideAccess: false })),
    ])
    return Response.json({ settings: opts, deliveryReady: deliveryReady(), schedulerReady: await schedulerReady(payload),
      subscribers: subscribers.docs.map(d => publicSubscriber(d as unknown as Record<string, unknown>)), page: subscribers.page, totalPages: subscribers.totalPages, totalSubscribers: subscribers.totalDocs,
      campaigns: campaigns.docs.map(d => publicCampaign(d as unknown as Record<string, unknown>)), stats: { active: active.totalDocs, pending: pending.totalDocs, unsubscribed: unsubscribed.totalDocs, accepted: accepted.totalDocs, failed: failed.totalDocs } }, { headers: noCache })
  } catch (err) { return errorResponse(err) }
}
export async function POST(req: Request) {
  try {
    sameOrigin(req)
    const { payload } = await administrator(req)
    const raw = await jsonBody(req), action = clean(raw.action, 40)
    if (action === 'settings') {
      if (raw.enabled === true && !deliveryReady()) throw new NewsletterError('E-postlevering må kobles til før påmelding åpnes.', 503)
      const delaySeconds = Number(raw.delaySeconds)
      if (!Number.isInteger(delaySeconds) || delaySeconds < 5 || delaySeconds > 120 || !['delay', 'scroll', 'manual'].includes(String(raw.trigger))) throw new NewsletterError('Ugyldig visningsinnstilling.')
      const title = clean(raw.title, 90), intro = clean(raw.intro, 400), button = clean(raw.button, 50)
      if (!title || !intro || !button) throw new NewsletterError('Fyll inn popupens tekster.')
      await payload.updateGlobal({ slug: 'newsletter-settings', data: { enabled: raw.enabled === true, title, intro, button, trigger: raw.trigger as 'delay' | 'scroll' | 'manual', delaySeconds }, overrideAccess: true })
      return Response.json({ message: 'Påmeldingsvinduet er lagret.' }, { headers: noCache })
    }
    if (action === 'save') {
      const data = campaignInput(raw)
      const store = { ...data, scheduledAt: data.scheduledAt ? new Date(data.scheduledAt).toISOString() : null }
      let saved
      if (raw.id) {
        const id = clean(raw.id, 80)
        saved = await updateCampaignIf(payload, id, ['draft'], store)
        if (!saved) throw new NewsletterError('Bare kladder kan redigeres.')
      } else saved = await payload.create({ collection: 'newsletter-campaigns', data: { ...store, status: 'draft' }, overrideAccess: true })
      return Response.json({ message: 'Kampanjekladden er lagret.', campaign: publicCampaign(saved as unknown as Record<string, unknown>) }, { headers: noCache })
    }
    if (action === 'test') {
      const content = campaignInput(raw)
      // An explicit administrator action to the address entered in this form.
      const providerId = await sendEmail(emailAddress(raw.testEmail), `[TEST] ${content.subject}`, emailHTML(content, 'https://somiklinikken.no/nyhetsbrev'), `${content.heading}\n${content.body}\nDette er en testmail fra SOMI.`, `test-${randomUUID()}`)
      return Response.json({ message: 'Testmailen er akseptert av e-posttjenesten. Sjekk innboksen.', providerId }, { headers: noCache })
    }
    if (action === 'queue') {
      if (raw.confirm !== true) throw new NewsletterError('Bekreft utsendingen først.')
      const recipients = await queueCampaign(payload, clean(raw.id, 80))
      return Response.json({ message: `Kampanjen er lagt i kø til ${recipients} bekreftede abonnenter.`, recipients }, { headers: noCache })
    }
    if (action === 'work') return Response.json(await workQueue(payload), { headers: noCache })
    if (action === 'cancel') {
      const result = await updateCampaignIf(payload, clean(raw.id, 80), ['queued', 'sending'], { status: 'cancelled' })
      if (!result) throw new NewsletterError('Kampanjen kan ikke stoppes i denne statusen.')
      return Response.json({ message: 'Videre utsending er stoppet. E-poster som allerede er akseptert, kan ikke trekkes tilbake.' }, { headers: noCache })
    }
    if (action === 'unsubscribe') {
      await payload.update({ collection: 'newsletter-subscribers', id: clean(raw.id, 80), data: { status: 'unsubscribed', unsubscribedAt: new Date().toISOString(), confirmVersion: randomUUID() }, overrideAccess: true })
      return Response.json({ message: 'Abonnenten er meldt av.' }, { headers: noCache })
    }
    if (action === 'import') {
      if (raw.confirm !== true) throw new NewsletterError('Bekreft at kontaktene har gitt tillatelse til nyhetsbrev.')
      const rows = parseCSV(clean(raw.csv, 50000))
      const prepared = rows.map(row => {
        const email = emailAddress(row.email), evidence = clean(row.evidence || '', 600), consentedAt = clean(row.consentedat || '', 60)
        if (evidence.length < 5 || !Number.isFinite(Date.parse(consentedAt)) || Date.parse(consentedAt) > Date.now()) throw new NewsletterError('Alle kontakter må ha consentedAt (dato) og evidence (dokumentasjon på tillatelse).')
        return { email, firstName: clean(row.firstname || '', 80), lastName: clean(row.lastname || '', 80), evidence, consentedAt: new Date(consentedAt).toISOString() }
      })
      let imported = 0, skipped = 0
      for (const data of prepared) {
        const existing = await payload.find({ collection: 'newsletter-subscribers', where: { email: { equals: data.email } }, limit: 1, overrideAccess: true })
        // Never reactivate suppressions or override a pending subscriber by import.
        if (existing.totalDocs) { skipped++; continue }
        await payload.create({ collection: 'newsletter-subscribers', data: { ...data, source: 'documented-import', status: 'active', consentText: CONSENT_TEXT, consentVersion: CONSENT_VERSION, confirmedAt: data.consentedAt, confirmVersion: randomUUID(), unsubscribeVersion: randomUUID() }, overrideAccess: true }); imported++
      }
      return Response.json({ message: `${imported} kontakter importert. ${skipped} eksisterende adresser hoppet over.`, imported, skipped }, { headers: noCache })
    }
    throw new NewsletterError('Ukjent handling.')
  } catch (err) { return errorResponse(err) }
}
