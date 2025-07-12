import { Language } from './structure';
import { LANGUAGES } from './constants';

let supportedLanguages: Language[] = LANGUAGES;

export function getSupportedLocaleCodes(): string[] {
  
  return supportedLanguages.map(lang => lang.lang);
}

export function setSupportedLanguages(languages: Language[]): void {
  if (languages && languages.length > 0) {
    supportedLanguages = languages;
  }
}

export function getSupportedLanguages(): Language[] {
  return supportedLanguages;
}