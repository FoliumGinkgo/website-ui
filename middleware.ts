import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSupportedLocaleCodes } from './src/config/languageConfig';

const LANGUAGE_COOKIE_NAME = 'preferred_language';

function detectPreferredLang(request: NextRequest): string {
  const locales = getSupportedLocaleCodes();
  const pathname = request.nextUrl.pathname;

  const hasLocaleInPath = locales.find(locale =>
    pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocaleInPath) return hasLocaleInPath;

  const cookieLang = request.cookies.get(LANGUAGE_COOKIE_NAME)?.value;
  if (cookieLang && locales.includes(cookieLang)) return cookieLang;

  const acceptLang = request.headers.get('accept-language');
  if (acceptLang) {
    const matched = acceptLang
      .split(',')
      .map(l => l.trim().split(';')[0])
      .find(lang => locales.includes(lang));
    if (matched) return matched;
  }

  return locales.includes('en') ? 'en' : locales[0];
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const locales = getSupportedLocaleCodes();
  const hasLangPrefix = locales.some(locale =>
    pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLangPrefix) return NextResponse.next();

  const preferredLang = detectPreferredLang(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLang}${pathname === '/' ? '' : pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set(LANGUAGE_COOKIE_NAME, preferredLang, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365
  });

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(svg|png|jpg|jpeg|webp|js|css)).*)'],
};