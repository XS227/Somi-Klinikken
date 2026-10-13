import { timingSafeEqual } from 'node:crypto'
import { database, workQueue, errorResponse } from '@/lib/newsletter/server'
import { NewsletterError } from '@/lib/newsletter/model'
export const dynamic = 'force-dynamic'
export async function POST(req: Request) {
  try {
    const secret = process.env.NEWSLETTER_WORKER_SECRET || ''
    const supplied = req.headers.get('authorization') || ''
    const a = Buffer.from(supplied), b = Buffer.from(`Bearer ${secret}`)
    if (secret.length < 32 || a.length !== b.length || !timingSafeEqual(a, b)) throw new NewsletterError('Ingen tilgang.', 401)
    const payload = await database()
    await payload.updateGlobal({ slug: 'newsletter-settings', data: { workerSeenAt: new Date().toISOString() }, overrideAccess: true })
    return Response.json(await workQueue(payload), { headers: { 'Cache-Control': 'no-store' } })
  } catch (err) { return errorResponse(err) }
}
