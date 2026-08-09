import { CONTACT } from '../data/site'
import { WHATSAPP_ICON_PATH } from './SocialLinks'

export default function WhatsAppButton() {
  return (
    <a
      href={CONTACT.social.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="تواصل عبر واتساب"
      className="btn-press fixed bottom-[max(1.1rem,env(safe-area-inset-bottom))] left-[max(1.1rem,env(safe-area-inset-left))] z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-xl shadow-black/30 transition hover:scale-105 hover:bg-primary hover:text-dark"
    >
      <svg viewBox="0 0 16 16" className="h-7 w-7" fill="currentColor" aria-hidden>
        <path d={WHATSAPP_ICON_PATH} />
      </svg>
    </a>
  )
}
