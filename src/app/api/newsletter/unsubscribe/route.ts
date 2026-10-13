import { NextResponse } from 'next/server'
import { getP } from '@/lib/newsletter/server'

export const dynamic = 'force-dynamic'

const page = (msg: string, form = '') => new NextResponse(`<!doctype html><html lang="nb"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Nyhetsbrev – SOMI Klinikken</title></head><body style="font-family:-apple-system,Segoe UI,Arial,sans-serif;background:#f7f2ee;color:#2b2320;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0;padding:16px"><div style="background:#fff;border-radius:12px;padding:32px;max-width:420px;text-align:center"><h1 style="font-family:Georgia,serif;font-weight:400;font-size:22px">SOMI Klinikken</h1><p>${msg}</p>${form}</div></body></html>`, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })

const tokenOk = (t: string | null) => (t && /^[a-f0-9]{48}$/.test(t) ? t : null)

// GET only shows a confirmation form (mail scanners prefetch links, so GET must not unsubscribe).
export async function GET(req: Request) {
  const t = tokenOk(new URL(req.url).searchParams.get('t'))
  if (!t) return page('Ugyldig lenke.')
  return page('Vil du melde deg av nyhetsbrevet?', `<form method="post" action="/api/newsletter/unsubscribe?t=${t}"><button style="background:#7a3a4a;color:#fff;border:0;border-radius:999px;padding:12px 24px;font-size:16px;cursor:pointer">Ja, meld meg av</button></form>`)
}

// POST handles both the form and RFC 8058 one-click (List-Unsubscribe-Post).
export async function POST(req: Request) {
  const t = tokenOk(new URL(req.url).searchParams.get('t'))
  if (!t) return page('Ugyldig lenke.')
  const payload = await getP()
  const r = await payload.find({ collection: 'newsletter-subscribers', where: { unsubscribeToken: { equals: t } }, limit: 1, depth: 0 })
  const s = r.docs[0]
  if (!s) return page('Ugyldig lenke.')
  if (s.status === 'subscribed') {
    await payload.update({ collection: 'newsletter-subscribers', id: s.id, data: { status: 'unsubscribed', unsubscribedAt: new Date().toISOString(), suppressionReason: 'Meldte seg av selv' } })
  }
  return page('Du er nå meldt av og vil ikke motta flere nyhetsbrev fra oss.')
}
