import { database, settings, deliveryReady } from '@/lib/newsletter/server'
import { CONSENT_TEXT, CONSENT_VERSION } from '@/lib/newsletter/model'
export const dynamic = 'force-dynamic'
export async function GET() {
  try {
    const opts = await settings(await database())
    return Response.json({ ...opts, enabled: opts.enabled && deliveryReady(), consentText: CONSENT_TEXT, consentVersion: CONSENT_VERSION }, { headers: { 'Cache-Control': 'no-store' } })
  } catch { return Response.json({ enabled: false }, { status: 503, headers: { 'Cache-Control': 'no-store' } }) }
}
