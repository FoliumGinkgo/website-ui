import { getSupportedLocaleCodes } from '@/config/languageConfig';

/**
 * 移除路径中的语言前缀
 */
export function stripLangPrefix(pathname: string): string {
  const supportedLangs = getSupportedLocaleCodes();
  const pattern = new RegExp(`^\/(${supportedLangs.join('|')})(\/|$)`, 'i');
  return pathname.replace(pattern, '/');
}

/**
 * 添加语言前缀到路径
 */
export function withLangPrefix(pathname: string, lang: string): string {
  const cleanPath = stripLangPrefix(pathname);
  return `/${lang}${cleanPath}`.replace(/\/+$/, ''); // 清理多余斜杠
}
