import { Link } from 'react-router-dom'
import { CONTACT, WUILT } from '../data/site'
import { useLanguage } from '../i18n/language'
import LanguageSwitcher from './LanguageSwitcher'
import SocialLinks from './SocialLinks'

const HEADLINE = {
  ar: 'شريكك في توريد الأغذية بجودة تستحق الثقة.',
  en: 'Your trusted partner in food supply.',
}

const FRESH_FRUITS_TITLE = { ar: 'الفواكه الطازجة', en: 'Fresh Fruits' }
const FROZEN_CHICKEN_TITLE = { ar: 'الدجاج المجمد', en: 'Frozen Chicken' }

export default function Footer() {
  const { lang, t, prefix } = useLanguage()

  return (
    <footer className="relative overflow-hidden bg-dark text-white">
      <div className="grain-overlay" aria-hidden />
      <div className="glow-spot -end-40 -top-24 hidden h-[420px] w-[420px] opacity-40 md:block" aria-hidden />
      <div className="shell section-y-sm relative">
        <div className="grid gap-14 border-b border-white/10 pb-16 lg:grid-cols-[1.4fr_0.7fr_0.8fr]">
          <div>
            <img
              src={WUILT.logo}
              alt="Seventh Star Enterprises LLC"
              className="h-16 w-auto object-contain sm:h-[4.5rem]"
            />
            <h2 className="display-title mt-6 max-w-xl text-3xl md:text-5xl">{HEADLINE[lang]}</h2>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <SocialLinks tone="light" />
              <LanguageSwitcher tone="light" />
            </div>
            <Link
              to={`${prefix}/contact`}
              className="mt-8 inline-flex border-b border-primary pb-2 text-sm font-bold text-primary transition hover:text-white"
            >
              {t('contactUs')}
            </Link>
          </div>

          <div>
            <p className="mb-5 text-[11px] font-bold tracking-[0.18em] text-white/35">{t('footerExplore')}</p>
            <div className="flex flex-col gap-3 text-sm text-white/70">
              <Link to={`${prefix}/about`} className="hover:text-primary">
                {t('navAbout')}
              </Link>
              <Link to={`${prefix}/products`} className="hover:text-primary">
                {t('navProducts')}
              </Link>
              <Link to={`${prefix}/products/fresh-fruits`} className="hover:text-primary">
                {FRESH_FRUITS_TITLE[lang]}
              </Link>
              <Link to={`${prefix}/products/frozen-chicken`} className="hover:text-primary">
                {FROZEN_CHICKEN_TITLE[lang]}
              </Link>
              <Link to={`${prefix}/contact`} className="hover:text-primary">
                {t('navContact')}
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-5 text-[11px] font-bold tracking-[0.18em] text-white/35">{t('footerContact')}</p>
            <div className="flex flex-col gap-3 text-sm text-white/70">
              <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-primary" dir="ltr">
                {CONTACT.email}
              </a>
              {CONTACT.phones.map((phone) => (
                <a key={phone} href={`tel:${phone}`} className="hover:text-primary" dir="ltr">
                  {phone}
                </a>
              ))}
              <p className="pt-1 text-white/45">{lang === 'ar' ? CONTACT.addressAr : CONTACT.addressEn}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p className="display-en" dir="ltr">
            © {new Date().getFullYear()} Seventh Star Enterprises LLC
          </p>
          <p className="display-en" dir="ltr">
            Food · Export · Logistics
          </p>
        </div>
      </div>
    </footer>
  )
}
