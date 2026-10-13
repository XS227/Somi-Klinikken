import { NextResponse } from 'next/server'
import { getAdmin, mailConfig, normEmail, recipientsFor, sendOne, newToken } from '@/lib/newsletter/server'

export const dynamic = 'force-dynamic'
type Ctx = { params: Promise<{ id: string }> }

/** POST {action:'test', to} | {action:'schedule', scheduledAt, approved:true} | {action:'unschedule'} | {action:'count'} */
export async function POST(req: Request, { params }: Ctx) {
  const a = await getAdmin(req.headers)
  if (!a) return NextResponse.json({ error: 'Ikke innlogget' }, { status: 401 })
  const { id } = await params
  const c = await a.payload.findByID({ collection: 'newsletter-campaigns', id, depth: 0 }).catch(() => null)
  if (!c) return NextResponse.json({ error: 'Finnes ikke' }, { status: 404 })
  const b = await req.json().catch(() => ({}))
  const cfg = mailConfig()

  if (b.action === 'count') {
    return NextResponse.json({ recipients: (await recipientsFor(a.payload, c.segment)).length })
  }

  if (b.action === 'test') {
    const to = normEmail(String(b.to || ''))
    if (!cfg.smtpConfigured) return NextResponse.json({ error: 'SMTP er ikke konfigurert på serveren.' }, { status: 503 })
    if (!cfg.testRecipients.includes(to)) return NextResponse.json({ error: 'Testmail kan kun sendes til godkjente testadresser (NEWSLETTER_TEST_RECIPIENTS).' }, { status: 403 })
    try { await sendOne(c, to, newToken(), '[TEST] ') } catch (e) { return NextResponse.json({ error: `Sending feilet: ${(e as Error).message}` }, { status: 502 }) }
    return NextResponse.json({ ok: true })
  }

  if (b.action === 'schedule') {
    if (c.status !== 'draft') return NextResponse.json({ error: 'Kampanjen er ikke en kladd.' }, { status: 409 })
    if (b.approved !== true) return NextResponse.json({ error: 'Utsendelsen må eksplisitt godkjennes.' }, { status: 400 })
    if (!c.subject || !c.body?.trim()) return NextResponse.json({ error: 'Emne og innhold må fylles ut.' }, { status: 400 })
    const when = b.scheduledAt ? new Date(b.scheduledAt) : new Date()
    if (isNaN(when.getTime())) return NextResponse.json({ error: 'Ugyldig tidspunkt.' }, { status: 400 })
    const doc = await a.payload.update({ collection: 'newsletter-campaigns', id, data: {
      status: 'scheduled', scheduledAt: when.toISOString(), approvedAt: new Date().toISOString(), approvedBy: String(b.approvedBy || a.user.email).slice(0, 120) } })
    return NextResponse.json({ doc, warning: !cfg.sendingEnabled || !cfg.smtpConfigured ? 'Planlagt, men serveren sender ikke før SMTP er konfigurert og utsendelse er aktivert.' : undefined })
  }

  if (b.action === 'unschedule') {
    if (c.status !== 'scheduled') return NextResponse.json({ error: 'Kampanjen er ikke planlagt.' }, { status: 409 })
    const doc = await a.payload.update({ collection: 'newsletter-campaigns', id, data: { status: 'draft', approvedAt: null, approvedBy: '' } })
    return NextResponse.json({ doc })
  }

  if (b.action === 'cancel') {
    if (c.status !== 'sending') return NextResponse.json({ error: 'Kampanjen sendes ikke.' }, { status: 409 })
    const doc = await a.payload.update({ collection: 'newsletter-campaigns', id, data: { status: 'cancelled' } })
    return NextResponse.json({ doc })
  }
  return NextResponse.json({ error: 'Ukjent handling' }, { status: 400 })
}
