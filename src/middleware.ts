import { NextRequest, NextResponse } from 'next/server'

const LOCALE_COOKIE = 'locale'
const SUPPORTED_LOCALES = ['pt', 'en'] as const
const DEFAULT_LOCALE = 'pt'

function detectLocale(request: NextRequest): string {
  // 1. Check cookie preference (user manually selected)
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as typeof SUPPORTED_LOCALES[number])) {
    return cookieLocale
  }

  // 2. Check Accept-Language header
  const acceptLang = request.headers.get('accept-language') || ''
  const preferred = acceptLang.split(',')[0]?.split('-')[0]?.toLowerCase()
  if (preferred && SUPPORTED_LOCALES.includes(preferred as typeof SUPPORTED_LOCALES[number])) {
    return preferred
  }

  return DEFAULT_LOCALE
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static assets and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/img') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const locale = detectLocale(request)
  const response = NextResponse.next()

  // Set locale cookie if not already set
  if (!request.cookies.get(LOCALE_COOKIE)) {
    response.cookies.set(LOCALE_COOKIE, locale, {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      sameSite: 'lax',
    })
  }

  response.headers.set('x-locale', locale)
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
