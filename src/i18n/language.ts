import { createContext, useContext } from 'react'
import { STRINGS, type Lang, type StringKey } from './strings'

export type LanguageContextValue = {
  lang: Lang
  dir: 'rtl' | 'ltr'
  /** Path to the current page in the other language (slug-preserving). */
  otherLangPath: string
  t: (key: StringKey) => string
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function deriveLang(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ar'
}

export function deriveOtherPath(pathname: string, lang: Lang): string {
  if (lang === 'en') {
    const stripped = pathname.replace(/^\/en/, '')
    return stripped === '' ? '/' : stripped
  }
  return pathname === '/' ? '/en' : `/en${pathname}`
}

export function makeContextValue(lang: Lang, dir: 'rtl' | 'ltr', otherLangPath: string): LanguageContextValue {
  return {
    lang,
    dir,
    otherLangPath,
    t: (key) => STRINGS[key][lang],
  }
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
