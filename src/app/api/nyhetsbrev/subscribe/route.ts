import { database, sameOrigin, rateLimit, jsonBody, subscribe, errorResponse } from '@/lib/newsletter/server'
export const dynamic = 'force-dynamic'
export async function POST(req: Request) {
  try {
    sameOrigin(req); rateLimit(req)
    const body = await jsonBody(req)
    await subscribe(await database(), body)
    return Response.json({ message: 'Sjekk innboksen for å bekrefte påmeldingen. Hvis du allerede er påmeldt, trenger du ikke gjøre noe.' }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (err) { return errorResponse(err) }
}
