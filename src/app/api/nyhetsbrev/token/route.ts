import { database, consumeToken, jsonBody, sameOrigin, errorResponse, siteOrigin } from '@/lib/newsletter/server'
import { NewsletterError, clean } from '@/lib/newsletter/model'
export const dynamic = 'force-dynamic'
export function GET(req: Request) {
  const value = new URL(req.url).searchParams.get('token') || ''
  // Viewing a link never changes subscription status (mail scanners follow GETs).
  return Response.redirect(`${siteOrigin()}/nyhetsbrev?action=unsubscribe&token=${encodeURIComponent(value)}`, 303)
}
export async function POST(req: Request) {
  try {
    let value: string, action: 'confirm' | 'unsubscribe'
    if (req.headers.get('content-type')?.startsWith('application/x-www-form-urlencoded')) {
      // RFC 8058 one-click unsubscribe. The unguessable signed token authorizes
      // only suppression of this one subscription; no cookies or PII required.
      const form = await req.formData()
      if (form.get('List-Unsubscribe') !== 'One-Click') throw new NewsletterError('Ugyldig avmelding.')
      value = new URL(req.url).searchParams.get('token') || ''; action = 'unsubscribe'
    } else {
      sameOrigin(req)
      const body = await jsonBody(req)
      if (body.action !== 'confirm' && body.action !== 'unsubscribe') throw new NewsletterError('Ugyldig handling.')
      action = body.action; value = clean(body.token, 1200)
    }
    await consumeToken(await database(), value, action)
    return Response.json({ message: action === 'confirm' ? 'Du er nå påmeldt nyhetsbrevet fra SOMI. Velkommen!' : 'Du er meldt av. Du vil ikke få flere nyhetsbrev fra oss.' }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (err) { return errorResponse(err) }
}
