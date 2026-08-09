import type { ReactNode } from 'react'
import { CONTACT } from './site'

export type SocialItem = {
  key: string
  label: string
  href: string
  icon: ReactNode
}

const iconClass = 'h-[14px] w-[14px]'

/** Verified Bootstrap Icons WhatsApp glyph (correct winding — renders crisp, no artifacts) */
export const WHATSAPP_ICON_PATH =
  'M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.559.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.56 7.93-7.928a7.9 7.9 0 0 0-2.327-5.609m-5.607 12.19h-.003a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.589 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.093-.093.211-.24.315-.36.1-.118.133-.202.2-.335.065-.134.034-.248-.015-.347-.05-.099-.454-1.09-.622-1.494-.164-.393-.331-.34-.454-.346-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.906 1.987.774 1.987.518 2.344.486.356-.033 1.171-.478 1.335-.94.164-.46.164-.86.114-.94-.049-.081-.182-.13-.38-.229'

/** Brand-coherent icons (gold/white) — Esteem tone, not rainbow Wuilt */
export const SOCIAL_ITEMS: SocialItem[] = [
  {
    key: 'youtube',
    label: 'YouTube',
    href: CONTACT.social.youtube,
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor" aria-hidden>
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8ZM9.8 15.5v-7l6.3 3.5-6.3 3.5Z" />
      </svg>
    ),
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: CONTACT.social.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor" aria-hidden>
        <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3.5 9.5h3V21h-3V9.5Zm6 0h2.9v1.6h.1c.4-.8 1.4-1.7 2.9-1.7 3.1 0 3.7 2 3.7 4.7V21h-3v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-3V9.5Z" />
      </svg>
    ),
  },
  {
    key: 'facebook',
    label: 'Facebook',
    href: CONTACT.social.facebook,
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor" aria-hidden>
        <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z" />
      </svg>
    ),
  },
  {
    key: 'twitter',
    label: 'X',
    href: CONTACT.social.twitter,
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor" aria-hidden>
        <path d="M18.2 2H21l-6.6 7.5L22 22h-6.8l-4.4-6.3L5.2 22H2.4l7-8L2 2h7l4 5.8L18.2 2Zm-1.2 18h1.9L7.1 3.9H5.1L17 20Z" />
      </svg>
    ),
  },
  {
    key: 'snapchat',
    label: 'Snapchat',
    href: CONTACT.social.snapchat,
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor" aria-hidden>
        <path d="M12 2c2.7 0 4.7 1.9 4.7 5.1v.7c.5.2 1 .7 1.4 1.3.3.5.2 1-.3 1.2-.5.2-.8.6-.7 1.1.1.6.8 1.1 1.7 1.5.5.2.7.6.5 1-.3.7-1.5 1.1-2.5 1.4-.2.7-.6 1.6-1.2 2.2 1 .4 1.8 1 2.3 1.7.3.4.1.9-.4 1-.7.2-1.5.6-1.8 1.1-.2.4-.6.5-1 .3-1-.5-2-.5-3.1 0-.4.2-.8 0-1-.3-.3-.5-1.1-.9-1.8-1.1-.5-.1-.7-.6-.4-1 .5-.7 1.3-1.3 2.3-1.7-.6-.6-1-1.5-1.2-2.2-1-.3-2.2-.7-2.5-1.4-.2-.4 0-.8.5-1 .9-.4 1.6-.9 1.7-1.5.1-.5-.2-.9-.7-1.1-.5-.2-.6-.7-.3-1.2.4-.6.9-1.1 1.4-1.3v-.7C7.3 3.9 9.3 2 12 2Z" />
      </svg>
    ),
  },
  {
    key: 'instagram',
    label: 'Instagram',
    href: CONTACT.social.instagram,
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor" aria-hidden>
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm11 1.8a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Z" />
      </svg>
    ),
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    href: CONTACT.social.tiktok,
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor" aria-hidden>
        <path d="M14.5 3c.4 2.3 1.8 3.9 4 4.3v2.4c-1.4 0-2.7-.4-4-1.2v5.7a5.8 5.8 0 1 1-5.8-5.8c.3 0 .7 0 1 .1v2.5a3.2 3.2 0 1 0 2.3 3.1V3h2.5Z" />
      </svg>
    ),
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    href: CONTACT.social.whatsapp,
    icon: (
      <svg viewBox="0 0 16 16" className={iconClass} fill="currentColor" aria-hidden>
        <path d={WHATSAPP_ICON_PATH} />
      </svg>
    ),
  },
]
