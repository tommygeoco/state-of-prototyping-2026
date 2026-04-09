import { NextResponse, type NextRequest } from 'next/server'

import { buildContentSecurityPolicy, buildReportToHeader, isSensitiveDataPath, isStaticAssetPath } from '@/lib/security/csp'

function createNonce() {
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  return btoa(String.fromCharCode(...bytes))
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isSensitiveDataPath(pathname)) {
    console.warn('[security]', JSON.stringify({ event: 'blocked-public-microdata-access', pathname, at: new Date().toISOString() }))

    return NextResponse.json(
      {
        error: 'Row-level microdata is no longer publicly distributed.',
        available_downloads: ['/api/v1/download/json', '/api/v1/download/csv'],
      },
      {
        status: 410,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    )
  }

  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || isStaticAssetPath(pathname)) {
    return NextResponse.next()
  }

  if (!['GET', 'HEAD'].includes(request.method)) {
    return NextResponse.next()
  }

  const accept = request.headers.get('accept') ?? ''
  if (!accept.includes('text/html')) {
    return NextResponse.next()
  }

  const nonce = createNonce()
  const isDev = process.env.NODE_ENV !== 'production'
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  response.headers.set('Content-Security-Policy', buildContentSecurityPolicy(nonce, isDev))
  response.headers.set('Report-To', buildReportToHeader())
  response.headers.set('x-nonce', nonce)

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
