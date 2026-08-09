import { CONTACT } from '../data/site'
import { WHATSAPP_ICON_PATH } from '../data/social'
import { useLanguage } from '../i18n/language'

export default function WhatsAppButton() {
  const { t } = useLanguage()

  return (
    <a
      href={CONTACT.social.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label={t('whatsappAria')}
      className="btn-press fixed bottom-[max(1.1rem,env(safe-area-inset-bottom))] end-[max(1.1rem,env(safe-area-inset-left),env(safe-area-inset-right))] z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-xl shadow-black/30 transition hover:scale-105 hover:bg-primary hover:text-dark"
    >
      <svg viewBox="0 0 16 16" className="h-7 w-7" fill="currentColor" aria-hidden>
        <path d={WHATSAPP_ICON_PATH} />
      </svg>
    </a>
  )
}
