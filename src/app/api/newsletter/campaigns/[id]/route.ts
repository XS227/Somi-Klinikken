import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/newsletter/server'

export const dynamic = 'force-dynamic'
type Ctx = { params: Promise<{ id: string }> }

export async function GET(req: Request, { params }: Ctx) {
  const a = await getAdmin(req.headers)
  if (!a) return NextResponse.json({ error: 'Ikke innlogget' }, { status: 401 })
  const { id } = await params
  try { return NextResponse.json({ doc: await a.payload.findByID({ collection: 'newsletter-campaigns', id, depth: 0 }) }) }
  catch { return NextResponse.json({ error: 'Finnes ikke' }, { status: 404 }) }
}

export async function PATCH(req: Request, { params }: Ctx) {
  const a = await getAdmin(req.headers)
  if (!a) return NextResponse.json({ error: 'Ikke innlogget' }, { status: 401 })
  const { id } = await params
  const cur = await a.payload.findByID({ collection: 'newsletter-campaigns', id, depth: 0 }).catch(() => null)
  if (!cur) return NextResponse.json({ error: 'Finnes ikke' }, { status: 404 })
  if (cur.status !== 'draft') return NextResponse.json({ error: 'Kun kladder kan redigeres. Avbryt planlegging først.' }, { status: 409 })
  const b = await req.json().catch(() => ({}))
  const data: Record<string, unknown> = {}
  for (const k of ['title', 'subject', 'preheader', 'body', 'template', 'segment'] as const) if (typeof b[k] === 'string') data[k] = b[k]
  const doc = await a.payload.update({ collection: 'newsletter-campaigns', id, data })
  return NextResponse.json({ doc })
}

export async function DELETE(req: Request, { params }: Ctx) {
  const a = await getAdmin(req.headers)
  if (!a) return NextResponse.json({ error: 'Ikke innlogget' }, { status: 401 })
  const { id } = await params
  const cur = await a.payload.findByID({ collection: 'newsletter-campaigns', id, depth: 0 }).catch(() => null)
  if (!cur) return NextResponse.json({ error: 'Finnes ikke' }, { status: 404 })
  if (cur.status === 'sending' || cur.status === 'sent') return NextResponse.json({ error: 'Sendte kampanjer beholdes som logg.' }, { status: 409 })
  await a.payload.delete({ collection: 'newsletter-campaigns', id })
  return NextResponse.json({ ok: true })
}
