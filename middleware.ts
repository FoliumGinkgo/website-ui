import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSupportedLocaleCodes } from './src/config/languageConfig';

// 获取请求的语言，优先使用路径中的语言，其次是Accept-Language头
function getLocale(request: NextRequest) {
  // 获取支持的语言代码列表
  const locales = getSupportedLocaleCodes();
  
  // 检查URL路径中是否已经包含语言代码
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameLocale) return pathnameLocale;

  // 从Accept-Language头中获取语言偏好
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim())
      .find(lang => locales.some(locale => lang.startsWith(locale)));
    
    if (preferredLocale) {
      const locale = locales.find(loc => preferredLocale.startsWith(loc));
      if (locale) return locale;
    }
  }

  // 默认返回英语或第一个可用的语言
  return locales[0] || 'en';
}

export function middleware(request: NextRequest) {
  // 获取支持的语言代码列表
  const locales = getSupportedLocaleCodes();
  
  const pathname = request.nextUrl.pathname;
  
  // 如果请求是静态资源或API，不进行重定向
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.') // 静态文件通常包含扩展名
  ) {
    return NextResponse.next();
  }

  // 检查URL路径中是否已经包含语言代码
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // 修改这部分逻辑，确保根路径也能正确重定向
  // if (pathname === '/') {
  //   const locale = getLocale(request);
  //   return NextResponse.redirect(new URL(`/${locale}`, request.url));
  // }

  // 原有逻辑保持不变
  if (pathnameLocale) return NextResponse.next();
  
  // 获取用户偏好的语言
  const locale = getLocale(request);
  
  // 构建重定向URL
  const url = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url);
  url.search = request.nextUrl.search;
  
  // 重定向到带有语言代码的URL
  return NextResponse.redirect(url);
}

export const config = {
  // 匹配所有路径，除了静态资源和API
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};