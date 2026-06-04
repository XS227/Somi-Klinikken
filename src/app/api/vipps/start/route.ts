import { NextResponse } from 'next/server'
import crypto from 'crypto'

const WELL_KNOWN_PROD =
  'https://api.vipps.no/access-management-1.0/access/.well-known/openid-configuration'
const WELL_KNOWN_TEST =
  'https://apitest.vipps.no/access-management-1.0/access/.well-known/openid-configuration'

export async function GET(): Promise<NextResponse> {
  const env = process.env.VIPPS_ENV === 'prod' ? 'prod' : 'test'
  const wellKnownUrl = env === 'prod' ? WELL_KNOWN_PROD : WELL_KNOWN_TEST

  let wkRes: Response
  try {
    wkRes = await fetch(wellKnownUrl, {
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    })
  } catch (err) {
    console.error('[vipps/start] Well-known fetch failed:', err)
    return NextResponse.json({ error: 'Vipps unreachable' }, { status: 502 })
  }
  if (!wkRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch Vipps metadata' }, { status: 500 })
  }
  const wk = await wkRes.json()
  const authEndpoint: string = wk.authorization_endpoint
  if (!authEndpoint) {
    return NextResponse.json({ error: 'Missing authorization_endpoint' }, { status: 500 })
  }

  // PKCE
  const verifier = crypto.randomBytes(32).toString('base64url')
  const challenge = crypto.createHash('sha256').update(verifier).digest('base64url')

  // CSRF state
  const csrf = crypto.randomBytes(16).toString('hex')
  const state = Buffer.from(JSON.stringify({ csrf, t: Date.now() })).toString('base64url')

  const params = new URLSearchParams({
    client_id: process.env.VIPPS_CLIENT_ID!,
    response_type: 'code',
    scope: 'openid profile phoneNumber',
    redirect_uri: process.env.VIPPS_REDIRECT_URI!,
    state,
    code_challenge: challenge,
    code_challenge_method: 'S256',
  })

  const authUrl = `${authEndpoint}?${params.toString()}`

  const response = NextResponse.redirect(authUrl)
  const cookieOpts = { httpOnly: true, secure: true, sameSite: 'lax' as const, path: '/', maxAge: 600 }
  response.cookies.set('vipps_pkce', verifier, cookieOpts)
  response.cookies.set('vipps_csrf', csrf, cookieOpts)
  return response
}
