import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getAdmin, getP, processQueue } from '@/lib/newsletter/server'

export const dynamic = 'force-dynamic'

/** Called by cron (header x-newsletter-secret) or by a logged-in admin. */
export async function POST(req: Request) {
  const secret = process.env.NEWSLETTER_CRON_SECRET
  const given = req.headers.get('x-newsletter-secret') || ''
  const okSecret = Boolean(secret) && given.length === secret!.length && crypto.timingSafeEqual(Buffer.from(given), Buffer.from(secret!))
  if (!okSecret && !(await getAdmin(req.headers))) return NextResponse.json({ error: 'Ikke tillatt' }, { status: 401 })
  return NextResponse.json(await processQueue(await getP()))
}
