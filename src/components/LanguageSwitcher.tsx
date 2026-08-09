import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/language'

type Props = {
  tone?: 'light' | 'dark'
  className?: string
}

export default function LanguageSwitcher({ tone = 'dark', className = '' }: Props) {
  const { otherLangPath, t } = useLanguage()

  const style =
    tone === 'light'
      ? 'border-white/25 text-white/80 hover:border-primary hover:bg-primary hover:text-dark'
      : 'border-line text-ink/65 hover:border-secondary hover:bg-secondary hover:text-white'

  return (
    <Link
      to={otherLangPath}
      className={`display-en inline-flex h-8 items-center justify-center border px-3 text-xs font-bold transition-colors duration-300 ${style} ${className}`}
    >
      {t('switchToEn')}
    </Link>
  )
}
