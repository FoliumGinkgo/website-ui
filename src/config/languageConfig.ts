import { Language } from './structure';
import { LANGUAGES } from './constants';

// 这个文件将在构建时生成
// 默认使用constants.ts中的LANGUAGES
let supportedLanguages: Language[] = LANGUAGES;

// 获取支持的语言代码列表
export function getSupportedLocaleCodes(): string[] {
  return supportedLanguages.map(lang => lang.lang);
}

// 设置支持的语言列表
export function setSupportedLanguages(languages: Language[]): void {
  if (languages && languages.length > 0) {
    supportedLanguages = languages;
  }
}

// 获取支持的语言列表
export function getSupportedLanguages(): Language[] {
  return supportedLanguages;
}