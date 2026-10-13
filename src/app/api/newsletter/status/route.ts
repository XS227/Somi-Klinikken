import { NextResponse } from 'next/server'
import { getAdmin, mailConfig } from '@/lib/newsletter/server'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const a = await getAdmin(req.headers)
  if (!a) return NextResponse.json({ error: 'Ikke innlogget' }, { status: 401 })
  const c = mailConfig()
  const counts: Record<string, number> = {}
  for (const s of ['subscribed', 'unsubscribed', 'suppressed']) {
    counts[s] = (await a.payload.count({ collection: 'newsletter-subscribers', where: { status: { equals: s } } })).totalDocs
  }
  return NextResponse.json({ smtpConfigured: c.smtpConfigured, sendingEnabled: c.sendingEnabled, testRecipients: c.testRecipients, ratePerMinute: c.ratePerMinute, counts })
}
