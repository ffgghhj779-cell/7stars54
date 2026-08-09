import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/language'

type Props = {
  tone?: 'light' | 'dark'
  className?: string
  /** Compact segmented control for header (default). */
  compact?: boolean
}

export default function LanguageSwitcher({ tone = 'dark', className = '', compact = true }: Props) {
  const { lang, pathFor, t } = useLanguage()

  if (!compact) {
    const style =
      tone === 'light'
        ? 'border-white/25 text-white/80 hover:border-primary hover:bg-primary hover:text-dark'
        : 'border-line text-ink/65 hover:border-secondary hover:bg-secondary hover:text-white'

    return (
      <Link
        to={pathFor(lang === 'en' ? 'ar' : 'en')}
        className={`display-en inline-flex h-8 items-center justify-center border px-3 text-xs font-bold transition-colors duration-300 ${style} ${className}`}
        aria-label={t('switchToEn')}
      >
        {t('switchToEn')}
      </Link>
    )
  }

  const shell =
    tone === 'light'
      ? 'border-white/30 bg-white/10 text-white backdrop-blur-sm'
      : 'border-line/90 bg-paper/90 text-ink shadow-sm'

  const idle = tone === 'light' ? 'text-white/70 hover:text-white' : 'text-ink/55 hover:text-ink'
  const active =
    tone === 'light' ? 'bg-primary text-dark shadow-sm' : 'bg-secondary text-white shadow-sm'

  return (
    <div
      role="group"
      aria-label={t('switchToEn')}
      className={`lang-switch inline-flex h-10 items-center rounded-sm border p-0.5 ${shell} ${className}`}
    >
      <Link
        to={pathFor('en')}
        className={`display-en inline-flex h-full min-w-[2.35rem] items-center justify-center px-2.5 text-[11px] font-extrabold tracking-[0.1em] transition-colors ${
          lang === 'en' ? active : idle
        }`}
        aria-current={lang === 'en' ? 'true' : undefined}
      >
        {t('langEn')}
      </Link>
      <Link
        to={pathFor('ar')}
        className={`inline-flex h-full min-w-[2.35rem] items-center justify-center px-2.5 text-[14px] font-bold transition-colors ${
          lang === 'ar' ? active : idle
        }`}
        aria-current={lang === 'ar' ? 'true' : undefined}
        lang="ar"
      >
        {t('langAr')}
      </Link>
    </div>
  )
}
