import { NextResponse } from 'next/server'
import { getAdmin } from '@/lib/newsletter/server'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const a = await getAdmin(req.headers)
  if (!a) return NextResponse.json({ error: 'Ikke innlogget' }, { status: 401 })
  const r = await a.payload.find({ collection: 'newsletter-campaigns', sort: '-updatedAt', limit: 100, depth: 0 })
  const docs = await Promise.all(r.docs.map(async (c) => {
    const q = (s: string) => a.payload.count({ collection: 'newsletter-deliveries', where: { and: [{ campaign: { equals: c.id } }, { status: { equals: s } }] } }).then((x) => x.totalDocs)
    return { ...c, delivered: await q('sent'), queued: await q('queued'), failedCount: await q('failed') }
  }))
  return NextResponse.json({ docs })
}

export async function POST(req: Request) {
  const a = await getAdmin(req.headers)
  if (!a) return NextResponse.json({ error: 'Ikke innlogget' }, { status: 401 })
  const b = await req.json().catch(() => ({}))
  const doc = await a.payload.create({ collection: 'newsletter-campaigns', data: {
    title: String(b.title || 'Nytt nyhetsbrev').slice(0, 200), subject: String(b.subject || 'Nytt nyhetsbrev').slice(0, 200),
    preheader: String(b.preheader || ''), body: String(b.body || ''), template: b.template || 'somi', segment: String(b.segment || ''), status: 'draft',
  } })
  return NextResponse.json({ doc })
}
