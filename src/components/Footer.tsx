import { Link } from 'react-router-dom'
import { CONTACT, WUILT } from '../data/site'
import SocialLinks from './SocialLinks'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-dark text-white">
      <div className="grain-overlay" aria-hidden />
      <div className="glow-spot -end-40 -top-24 h-[420px] w-[420px] opacity-40" aria-hidden />
      <div className="shell section-y-sm relative">
        <div className="grid gap-14 border-b border-white/10 pb-16 lg:grid-cols-[1.4fr_0.7fr_0.8fr]">
          <div>
            <img
              src={WUILT.logo}
              alt="Seventh Star Enterprises LLC"
              className="h-14 w-auto object-contain"
            />
            <h2 className="display-title mt-6 max-w-xl text-3xl md:text-5xl">
              شريكك في توريد الأغذية بجودة تستحق الثقة.
            </h2>
            <SocialLinks tone="light" className="mt-8" />
            <Link
              to="/contact"
              className="mt-8 inline-flex border-b border-primary pb-2 text-sm font-bold text-primary transition hover:text-white"
            >
              تواصل معنا
            </Link>
          </div>

          <div>
            <p className="mb-5 text-[11px] font-bold tracking-[0.18em] text-white/35">استكشف</p>
            <div className="flex flex-col gap-3 text-sm text-white/70">
              <Link to="/about" className="hover:text-primary">
                من نحن
              </Link>
              <Link to="/products" className="hover:text-primary">
                منتجاتنا
              </Link>
              <Link to="/products/fresh-fruits" className="hover:text-primary">
                الفواكه الطازجة
              </Link>
              <Link to="/products/frozen-chicken" className="hover:text-primary">
                الدجاج المجمد
              </Link>
              <Link to="/contact" className="hover:text-primary">
                تواصل معنا
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-5 text-[11px] font-bold tracking-[0.18em] text-white/35">تواصل</p>
            <div className="flex flex-col gap-3 text-sm text-white/70">
              <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-primary" dir="ltr">
                {CONTACT.email}
              </a>
              {CONTACT.phones.map((phone) => (
                <a key={phone} href={`tel:${phone}`} className="hover:text-primary" dir="ltr">
                  {phone}
                </a>
              ))}
              <p className="pt-1 text-white/45">{CONTACT.addressAr}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Seventh Star Enterprises LLC</p>
          <p className="display-en">Food · Export · Logistics</p>
        </div>
      </div>
    </footer>
  )
}
