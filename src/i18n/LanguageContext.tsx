import { useEffect, useMemo, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { deriveLang, LanguageContext, makeContextValue } from './language'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const lang = deriveLang(location.pathname)
  const dir: 'rtl' | 'ltr' = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  const value = useMemo(
    () => makeContextValue(lang, dir, location.pathname),
    [lang, dir, location.pathname],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
