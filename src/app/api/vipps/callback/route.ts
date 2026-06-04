import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import crypto from 'crypto'

const WELL_KNOWN_PROD =
  'https://api.vipps.no/access-management-1.0/access/.well-known/openid-configuration'
const WELL_KNOWN_TEST =
  'https://apitest.vipps.no/access-management-1.0/access/.well-known/openid-configuration'

// Only these phone numbers may log in (E.164 format)
const PHONE_WHITELIST = ['+4741227175', '+4745219525']

// Derive public base URL from the redirect URI so redirects work behind NGINX
const SITE_ORIGIN = new URL(process.env.VIPPS_REDIRECT_URI!).origin  // https://somi.setai.no

// Normalise any phone format to E.164 (+47XXXXXXXX)
function normalizePhone(raw: string | undefined | null): string {
  if (!raw) return ''
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 8) return `+47${digits}`                              // 41227175
  if (digits.length === 10 && digits.startsWith('47')) return `+${digits}`    // 4741227175
  if (digits.length === 12 && digits.startsWith('0047')) return `+${digits.slice(2)}` // 004741227175
  if (raw.startsWith('+')) return raw.replace(/\s/g, '')                      // already E.164
  return raw.replace(/\s/g, '')
}

function parseCookies(req: NextRequest): Record<string, string> {
  const cookies: Record<string, string> = {}
  const header = req.headers.get('cookie') || ''
  for (const pair of header.split(';')) {
    const [k, ...v] = pair.trim().split('=')
    if (k) cookies[k.trim()] = decodeURIComponent(v.join('='))
  }
  return cookies
}

function clearAuthCookies(res: NextResponse): void {
  res.cookies.set('vipps_pkce', '', { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 0 })
  res.cookies.set('vipps_csrf', '', { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 0 })
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const stateParam = searchParams.get('state')

  if (!code || !stateParam) {
    return NextResponse.json({ error: 'Missing code or state' }, { status: 400 })
  }

  const cookies = parseCookies(req)
  const verifier = cookies['vipps_pkce']
  const storedCsrf = cookies['vipps_csrf']

  if (!verifier || !storedCsrf) {
    return NextResponse.json({ error: 'Missing session cookies' }, { status: 400 })
  }

  // Verify CSRF
  let stateData: { csrf: string; t: number }
  try {
    stateData = JSON.parse(Buffer.from(stateParam, 'base64url').toString('utf8'))
  } catch {
    return NextResponse.json({ error: 'Invalid state' }, { status: 400 })
  }
  if (stateData.csrf !== storedCsrf) {
    return NextResponse.json({ error: 'CSRF mismatch' }, { status: 400 })
  }

  // Fetch token endpoint from well-known
  const env = process.env.VIPPS_ENV === 'prod' ? 'prod' : 'test'
  const wellKnownUrl = env === 'prod' ? WELL_KNOWN_PROD : WELL_KNOWN_TEST
  let wkRes: Response
  try {
    wkRes = await fetch(wellKnownUrl, {
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    })
  } catch (err) {
    console.error('[vipps/callback] Well-known fetch failed:', err)
    return NextResponse.json({ error: 'Vipps unreachable' }, { status: 502 })
  }
  if (!wkRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch Vipps metadata' }, { status: 500 })
  }
  const wk = await wkRes.json()

  // Token exchange
  const tokenBody = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.VIPPS_REDIRECT_URI!,
    client_id: process.env.VIPPS_CLIENT_ID!,
    code_verifier: verifier,
  })

  const credentials = Buffer.from(
    `${process.env.VIPPS_CLIENT_ID}:${process.env.VIPPS_CLIENT_SECRET}`,
  ).toString('base64')

  let tokenRes: Response
  try {
    tokenRes = await fetch(wk.token_endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${credentials}`,
        'Ocp-Apim-Subscription-Key': process.env.VIPPS_SUBSCRIPTION_KEY!,
        'Merchant-Serial-Number': process.env.VIPPS_MSN!,
        'Vipps-System-Name': 'SomiKlinikken',
        'Vipps-System-Version': '1.0.0',
      },
      body: tokenBody.toString(),
      signal: AbortSignal.timeout(15_000),
    })
  } catch (err) {
    console.error('[vipps/callback] Token exchange fetch failed:', err)
    const denied = NextResponse.redirect(new URL('/admin/login?error=vipps_timeout', SITE_ORIGIN))
    clearAuthCookies(denied)
    return denied
  }

  if (!tokenRes.ok) {
    const err = await tokenRes.text()
    return NextResponse.json({ error: 'Token exchange failed', detail: err }, { status: 500 })
  }
  const tokenData = await tokenRes.json()
  const accessToken: string = tokenData.access_token
  if (!accessToken) {
    return NextResponse.json({ error: 'No access_token in response' }, { status: 500 })
  }

  // Fetch userinfo
  let userInfoRes: Response
  try {
    userInfoRes = await fetch(wk.userinfo_endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Ocp-Apim-Subscription-Key': process.env.VIPPS_SUBSCRIPTION_KEY!,
        'Merchant-Serial-Number': process.env.VIPPS_MSN!,
      },
      signal: AbortSignal.timeout(10_000),
    })
  } catch (err) {
    console.error('[vipps/callback] Userinfo fetch failed:', err)
    const denied = NextResponse.redirect(new URL('/admin/login?error=vipps_timeout', SITE_ORIGIN))
    clearAuthCookies(denied)
    return denied
  }
  if (!userInfoRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch userinfo' }, { status: 500 })
  }
  const userInfo = await userInfoRes.json()

  const sub: string = userInfo.sub
  const phone = normalizePhone(userInfo.phone_number ?? userInfo.phoneNumber)
  const name: string = userInfo.name ?? userInfo.given_name ?? 'Vipps User'
  const email: string = userInfo.email ?? `${sub}@vipps.user`

  // Whitelist check
  console.log('[vipps/callback] phone raw:', userInfo.phone_number ?? userInfo.phoneNumber, '→ normalized:', phone)
  if (!PHONE_WHITELIST.includes(phone)) {
    const denied = NextResponse.redirect(
      new URL('/admin/login?error=not_authorized', SITE_ORIGIN),
    )
    clearAuthCookies(denied)
    return denied
  }

  // Find or create user in Payload
  const payload = await getPayload({ config: configPromise })

  let userId: string
  const existing = await payload.find({
    collection: 'users',
    where: { vippsSub: { equals: sub } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    userId = String(existing.docs[0].id)
    // Keep phone in sync
    await payload.update({
      collection: 'users',
      id: userId,
      data: { phone },
      overrideAccess: true,
    })
  } else {
    const newUser = await payload.create({
      collection: 'users',
      data: {
        email,
        password: crypto.randomUUID(), // never used — Vipps is the auth provider
        vippsSub: sub,
        phone,
      },
      overrideAccess: true,
    })
    userId = String(newUser.id)
  }

  // Payload hashes the raw secret: sha256(secret).hex().slice(0,32)
  // This must match exactly what Payload uses internally for jwtVerify
  const payloadSecret = crypto
    .createHash('sha256')
    .update(process.env.PAYLOAD_SECRET!)
    .digest('hex')
    .slice(0, 32)
  const secret = new TextEncoder().encode(payloadSecret)
  const token = await new SignJWT({ id: userId, email, collection: 'users' })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secret)

  console.log('[vipps/callback] login success — userId:', userId, 'redirecting to /admin')

  const redirectTo = new URL('/admin', SITE_ORIGIN)
  const response = NextResponse.redirect(redirectTo)
  clearAuthCookies(response)

  // Use Next.js cookies API (not raw headers) for reliable cookie propagation
  response.cookies.set('payload-token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 7200,
  })

  return response
}
