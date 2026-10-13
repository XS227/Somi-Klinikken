import crypto from 'crypto'
import nodemailer, { type Transporter } from 'nodemailer'
import { headers as nextHeaders } from 'next/headers'
import { getPayload, type Payload, type Where } from 'payload'
import config from '@payload-config'
import { renderEmail, type Template } from './render'

export const getP = async (): Promise<Payload> => getPayload({ config })

/** Returns the logged-in Payload admin (Vipps-whitelisted users) or null. */
export async function getAdmin(headers?: Headers) {
  const payload = await getP()
  const { user } = await payload.auth({ headers: headers ?? (await nextHeaders()) })
  return user ? { payload, user } : null
}

export const siteUrl = () => (process.env.NEXT_PUBLIC_SERVER_URL || 'https://somiklinikken.no').replace(/\/$/, '')
export const newToken = () => crypto.randomBytes(24).toString('hex')
export const normEmail = (e: string) => e.trim().toLowerCase()
export const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e) && e.length <= 254

const sender = () => ({
  name: process.env.NEWSLETTER_SENDER_NAME || 'SOMI Klinikken',
  address: process.env.NEWSLETTER_SENDER_ADDRESS || 'Langgata 31, 4306 Sandnes',
})

export function mailConfig() {
  const host = process.env.NEWSLETTER_SMTP_HOST
  const from = process.env.NEWSLETTER_FROM
  return {
    smtpConfigured: Boolean(host && from),
    sendingEnabled: process.env.NEWSLETTER_SENDING_ENABLED === 'true',
    testRecipients: (process.env.NEWSLETTER_TEST_RECIPIENTS || '').split(',').map(normEmail).filter(Boolean),
    ratePerMinute: Math.max(1, Number(process.env.NEWSLETTER_RATE_PER_MINUTE) || 30),
    from,
  }
}

let transport: Transporter | null = null
function getTransport() {
  if (!transport) {
    const port = Number(process.env.NEWSLETTER_SMTP_PORT) || 587
    transport = nodemailer.createTransport({
      host: process.env.NEWSLETTER_SMTP_HOST,
      port,
      secure: port === 465,
      auth: process.env.NEWSLETTER_SMTP_USER
        ? { user: process.env.NEWSLETTER_SMTP_USER, pass: process.env.NEWSLETTER_SMTP_PASS }
        : undefined,
      pool: true,
      maxConnections: 2,
    })
  }
  return transport
}

interface CampaignLike { subject: string; preheader?: string | null; body?: string | null; template?: string | null }

export async function sendOne(c: CampaignLike, to: string, unsubscribeToken: string, subjectPrefix = '') {
  const url = `${siteUrl()}/api/newsletter/unsubscribe?t=${unsubscribeToken}`
  const { html, text } = renderEmail({
    subject: c.subject, preheader: c.preheader || '', body: c.body || '',
    template: (c.template as Template) || 'somi', unsubscribeUrl: url, sender: sender(),
  })
  await getTransport().sendMail({
    from: mailConfig().from, to, subject: subjectPrefix + c.subject, html, text,
    headers: { 'List-Unsubscribe': `<${url}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' },
  })
}

/** Recipients = subscribed, optionally within a segment. Suppressed/unsubscribed never included. */
export async function recipientsFor(payload: Payload, segment?: string | null) {
  const where: Where = { status: { equals: 'subscribed' } }
  if (segment) where.segments = { in: [segment] }
  const res = await payload.find({ collection: 'newsletter-subscribers', where, limit: 0, pagination: false, depth: 0 })
  return res.docs
}

/** Create the delivery queue for an approved campaign (idempotent per campaign+email). */
export async function enqueueCampaign(payload: Payload, campaignId: string) {
  const c = await payload.findByID({ collection: 'newsletter-campaigns', id: campaignId, depth: 0 })
  const subs = await recipientsFor(payload, c.segment)
  const existing = await payload.find({ collection: 'newsletter-deliveries', where: { campaign: { equals: campaignId } }, limit: 0, pagination: false, depth: 0 })
  const have = new Set(existing.docs.map((d) => d.email))
  for (const s of subs) {
    if (have.has(s.email)) continue
    await payload.create({ collection: 'newsletter-deliveries', data: { campaign: campaignId, email: s.email, status: 'queued', attempts: 0, nextAttemptAt: new Date().toISOString() } })
  }
  await payload.update({ collection: 'newsletter-campaigns', id: campaignId, data: { recipientCount: subs.length } })
  return subs.length
}

const MAX_ATTEMPTS = 3

/** Process due campaigns and send up to one minute's worth of rate-limited mail. */
export async function processQueue(payload: Payload) {
  const cfg = mailConfig()
  const result = { sent: 0, failed: 0, skipped: '' as string }
  if (!cfg.sendingEnabled || !cfg.smtpConfigured) {
    result.skipped = !cfg.smtpConfigured ? 'SMTP er ikke konfigurert' : 'Utsendelse er ikke aktivert (NEWSLETTER_SENDING_ENABLED)'
    return result
  }
  const now = new Date().toISOString()
  // Approved + due scheduled campaigns start sending.
  const due = await payload.find({ collection: 'newsletter-campaigns', where: { and: [{ status: { equals: 'scheduled' } }, { scheduledAt: { less_than_equal: now } }, { approvedAt: { exists: true } }] }, limit: 20, depth: 0 })
  for (const c of due.docs) {
    await enqueueCampaign(payload, c.id)
    await payload.update({ collection: 'newsletter-campaigns', id: c.id, data: { status: 'sending' } })
  }
  const sendNow = new Date().toISOString()
  const sending = await payload.find({ collection: 'newsletter-campaigns', where: { status: { equals: 'sending' } }, limit: 20, depth: 0 })
  let budget = cfg.ratePerMinute
  for (const c of sending.docs) {
    if (budget <= 0) break
    const q = await payload.find({ collection: 'newsletter-deliveries', where: { and: [{ campaign: { equals: c.id } }, { status: { equals: 'queued' } }, { nextAttemptAt: { less_than_equal: sendNow } }] }, limit: budget, depth: 0 })
    for (const d of q.docs) {
      budget--
      const sub = await payload.find({ collection: 'newsletter-subscribers', where: { email: { equals: d.email } }, limit: 1, depth: 0 })
      const s = sub.docs[0]
      if (!s || s.status !== 'subscribed') {
        await payload.update({ collection: 'newsletter-deliveries', id: d.id, data: { status: 'failed', error: 'Mottaker er avmeldt/blokkert', attempts: d.attempts ?? 0 } })
        continue
      }
      try {
        await sendOne(c, d.email, s.unsubscribeToken)
        await payload.update({ collection: 'newsletter-deliveries', id: d.id, data: { status: 'sent', sentAt: new Date().toISOString(), attempts: (d.attempts ?? 0) + 1, error: '' } })
        result.sent++
      } catch (e) {
        const attempts = (d.attempts ?? 0) + 1
        const final = attempts >= MAX_ATTEMPTS
        await payload.update({ collection: 'newsletter-deliveries', id: d.id, data: {
          status: final ? 'failed' : 'queued', attempts, error: String((e as Error).message).slice(0, 300),
          nextAttemptAt: new Date(Date.now() + attempts * 5 * 60_000).toISOString() } })
        if (final) result.failed++
      }
    }
    const left = await payload.count({ collection: 'newsletter-deliveries', where: { and: [{ campaign: { equals: c.id } }, { status: { equals: 'queued' } }] } })
    if (left.totalDocs === 0) await payload.update({ collection: 'newsletter-campaigns', id: c.id, data: { status: 'sent', sentAt: new Date().toISOString() } })
  }
  return result
}
