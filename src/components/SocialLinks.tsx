import { SOCIAL_ITEMS } from '../data/social'
import { useLanguage } from '../i18n/language'

type Props = {
  tone?: 'light' | 'dark'
  className?: string
}

export default function SocialLinks({ tone = 'dark', className = '' }: Props) {
  const { t } = useLanguage()
  const style =
    tone === 'light'
      ? 'border-white/25 text-white/80 hover:border-primary hover:bg-primary hover:text-dark'
      : 'border-line text-ink/55 hover:border-secondary hover:bg-secondary hover:text-white'

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`} aria-label={t('socialAria')}>
      {SOCIAL_ITEMS.map((item) => (
        <a
          key={item.key}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          aria-label={item.label}
          title={item.label}
          className={`inline-flex h-8 w-8 items-center justify-center border transition-colors duration-300 ${style}`}
        >
          {item.icon}
        </a>
      ))}
    </div>
  )
}
