import { NextResponse } from 'next/server'
import type { Where } from 'payload'
import { getAdmin, newToken, normEmail, validEmail } from '@/lib/newsletter/server'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const a = await getAdmin(req.headers)
  if (!a) return NextResponse.json({ error: 'Ikke innlogget' }, { status: 401 })
  const url = new URL(req.url)
  const q = url.searchParams.get('q')?.trim().toLowerCase()
  const status = url.searchParams.get('status')
  const and: Where[] = []
  if (q) and.push({ or: [{ email: { contains: q } }, { name: { contains: q } }] })
  if (status) and.push({ status: { equals: status } })
  const r = await a.payload.find({ collection: 'newsletter-subscribers', where: and.length ? { and } : {}, sort: '-createdAt', limit: 500, depth: 0 })
  return NextResponse.json({ docs: r.docs.map(({ unsubscribeToken: _t, ...d }) => d), total: r.totalDocs })
}

/** Consent-aware import. Body: {rows:[{email,name?,segments?}], consentBasis, consentSource, consentConfirmed:true} */
export async function POST(req: Request) {
  const a = await getAdmin(req.headers)
  if (!a) return NextResponse.json({ error: 'Ikke innlogget' }, { status: 401 })
  const b = await req.json().catch(() => ({}))
  if (b.consentConfirmed !== true) return NextResponse.json({ error: 'Du må bekrefte at samtykke/rettslig grunnlag foreligger.' }, { status: 400 })
  if (!['consent', 'existing-customer'].includes(b.consentBasis)) return NextResponse.json({ error: 'Velg rettslig grunnlag.' }, { status: 400 })
  const source = String(b.consentSource || '').trim()
  if (!source) return NextResponse.json({ error: 'Oppgi kilde for samtykket.' }, { status: 400 })
  const rows: { email?: string; name?: string; segments?: string[] }[] = Array.isArray(b.rows) ? b.rows.slice(0, 5000) : []
  const res = { added: 0, skippedExisting: 0, skippedSuppressed: 0, invalid: [] as string[] }
  const seen = new Set<string>()
  for (const r of rows) {
    const email = normEmail(String(r.email || ''))
    if (!validEmail(email)) { res.invalid.push(String(r.email || '').slice(0, 80)); continue }
    if (seen.has(email)) continue
    seen.add(email)
    const ex = await a.payload.find({ collection: 'newsletter-subscribers', where: { email: { equals: email } }, limit: 1, depth: 0 })
    if (ex.docs[0]) {
      if (ex.docs[0].status === 'subscribed') res.skippedExisting++; else res.skippedSuppressed++ // never re-subscribe unsubscribed/suppressed via import
      continue
    }
    await a.payload.create({ collection: 'newsletter-subscribers', data: {
      email, name: r.name?.slice(0, 120), segments: (r.segments || []).map((s) => String(s).trim()).filter(Boolean),
      status: 'subscribed', consentBasis: b.consentBasis, consentAt: new Date().toISOString(), consentSource: source.slice(0, 300), unsubscribeToken: newToken() } })
    res.added++
  }
  return NextResponse.json(res)
}
