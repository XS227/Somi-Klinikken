import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/newsletter/server'

export const dynamic = 'force-dynamic'
type Ctx = { params: Promise<{ id: string }> }

/** PATCH {status:'unsubscribed'|'suppressed', reason?} or {segments:[]}. Re-subscribing is deliberately not possible here. */
export async function PATCH(req: Request, { params }: Ctx) {
  const a = await getAdmin(req.headers)
  if (!a) return NextResponse.json({ error: 'Ikke innlogget' }, { status: 401 })
  const { id } = await params
  const b = await req.json().catch(() => ({}))
  const data: Record<string, unknown> = {}
  if (b.status === 'unsubscribed' || b.status === 'suppressed') {
    data.status = b.status; data.unsubscribedAt = new Date().toISOString(); data.suppressionReason = String(b.reason || '').slice(0, 200)
  }
  if (Array.isArray(b.segments)) data.segments = b.segments.map((s: unknown) => String(s).trim()).filter(Boolean)
  if (typeof b.name === 'string') data.name = b.name.slice(0, 120)
  try { return NextResponse.json({ doc: await a.payload.update({ collection: 'newsletter-subscribers', id, data }) }) }
  catch { return NextResponse.json({ error: 'Finnes ikke' }, { status: 404 }) }
}

/** Deleting would drop the suppression record, so only allowed for active subscribers (GDPR erasure); others stay. */
export async function DELETE(req: Request, { params }: Ctx) {
  const a = await getAdmin(req.headers)
  if (!a) return NextResponse.json({ error: 'Ikke innlogget' }, { status: 401 })
  const { id } = await params
  const s = await a.payload.findByID({ collection: 'newsletter-subscribers', id, depth: 0 }).catch(() => null)
  if (!s) return NextResponse.json({ error: 'Finnes ikke' }, { status: 404 })
  if (s.status !== 'subscribed') return NextResponse.json({ error: 'Avmeldte/blokkerte beholdes i suppression-listen så de ikke får mail igjen.' }, { status: 409 })
  await a.payload.delete({ collection: 'newsletter-subscribers', id })
  return NextResponse.json({ ok: true })
}
