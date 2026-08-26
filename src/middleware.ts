import { NextResponse, type NextRequest } from 'next/server'

const SEO_PAGE_PASSWORD = '2026'

export function middleware(request: NextRequest) {
  const auth = request.headers.get('authorization')

  if (auth?.startsWith('Basic ')) {
    const decoded = atob(auth.slice(6))
    const password = decoded.split(':').slice(1).join(':')
    if (password === SEO_PAGE_PASSWORD) {
      return NextResponse.next()
    }
  }

  return new NextResponse('Autentisering kreves', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="SOMI internt"' },
  })
}

export const config = {
  matcher: '/seo',
}
