import { createContext, useContext } from 'react'
import { STRINGS, type Lang, type StringKey } from './strings'

export type LanguageContextValue = {
  lang: Lang
  dir: 'rtl' | 'ltr'
  /** Language URL prefix: '' for English (default), '/ar' for Arabic. */
  prefix: string
  /** Current path without language prefix. */
  barePath: string
  /** Path to the current page in the other language (slug-preserving). */
  otherLangPath: string
  /** Build a path for a given language from a bare path. */
  pathFor: (target: Lang, bare?: string) => string
  t: (key: StringKey) => string
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function deriveLang(pathname: string): Lang {
  return pathname === '/ar' || pathname.startsWith('/ar/') ? 'ar' : 'en'
}

export function stripLangPrefix(pathname: string): string {
  if (pathname === '/ar' || pathname.startsWith('/ar/')) {
    return pathname.replace(/^\/ar/, '') || '/'
  }
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return pathname.replace(/^\/en/, '') || '/'
  }
  return pathname || '/'
}

export function pathForLang(target: Lang, barePath = '/'): string {
  const bare = barePath === '/' ? '/' : barePath
  if (target === 'ar') {
    return bare === '/' ? '/ar' : `/ar${bare}`
  }
  return bare
}

export function langPrefix(lang: Lang): string {
  return lang === 'ar' ? '/ar' : ''
}

export function deriveOtherPath(pathname: string, lang: Lang): string {
  const bare = stripLangPrefix(pathname)
  return pathForLang(lang === 'en' ? 'ar' : 'en', bare)
}

export function makeContextValue(lang: Lang, dir: 'rtl' | 'ltr', pathname: string): LanguageContextValue {
  const barePath = stripLangPrefix(pathname)
  return {
    lang,
    dir,
    prefix: langPrefix(lang),
    barePath,
    otherLangPath: deriveOtherPath(pathname, lang),
    pathFor: (target, bare = barePath) => pathForLang(target, bare),
    t: (key) => STRINGS[key][lang],
  }
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
