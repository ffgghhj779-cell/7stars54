import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { PRODUCT_NAV } from '../data/catalog'
import { CATALOG_EN } from '../data/catalog.en'
import { WUILT } from '../data/site'
import { useLanguage } from '../i18n/language'
import LanguageSwitcher from './LanguageSwitcher'
import SocialLinks from './SocialLinks'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { lang, t, prefix, barePath } = useLanguage()
  const productTitle = (slug: string, arTitle: string) =>
    lang === 'en' ? CATALOG_EN[slug]?.title || arTitle : arTitle

  const homePath = prefix || '/'
  const links = [
    { to: homePath, label: t('navHome') },
    { to: `${prefix}/about`, label: t('navAbout') },
    { to: `${prefix}/products`, label: t('navProducts'), mega: true },
    { to: `${prefix}/contact`, label: t('navContact') },
  ]

  const isHome = barePath === '/'
  const isDarkHero =
    isHome || barePath === '/about' || barePath === '/products' || barePath === '/contact'
  const transparent = open || (isDarkHero && !scrolled)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setProductsOpen(false)
    document.body.classList.remove('is-nav-locked')
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
  }, [location.pathname])

  useEffect(() => {
    if (open) {
      document.body.classList.add('is-nav-locked')
    } else {
      document.body.classList.remove('is-nav-locked')
    }
    return () => {
      document.body.classList.remove('is-nav-locked')
    }
  }, [open])

  const linkTone = (active: boolean) =>
    transparent
      ? active
        ? 'text-white'
        : 'text-white/75 hover:text-white'
      : active
        ? 'text-ink'
        : 'text-ink/65 hover:text-ink'

  const brandNameTone = transparent ? 'text-white' : 'text-ink'
  const brandSloganTone = transparent ? 'text-white/72' : 'text-stone'

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,padding] duration-500 ${
          transparent
            ? 'border-transparent bg-transparent py-3 sm:py-4'
            : 'border-line/80 bg-paper/95 py-2 backdrop-blur-md sm:py-2.5'
        }`}
      >
        <div
          className="mx-auto flex max-w-[1440px] items-center gap-3 sm:gap-4 lg:gap-6"
          style={{
            paddingInlineStart: 'max(1rem, env(safe-area-inset-left))',
            paddingInlineEnd: 'max(1rem, env(safe-area-inset-right))',
          }}
        >
          <Link
            to={homePath}
            className="brand-lockup group flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3.5 lg:flex-none"
            aria-label={`${t('brandName')} — ${t('brandSlogan')}`}
          >
            <img
              src={WUILT.logo}
              alt=""
              className="brand-lockup__mark h-10 w-auto shrink-0 object-contain sm:h-12 lg:h-14"
            />
            <span className="brand-lockup__text min-w-0">
              <span className={`brand-lockup__name block truncate ${brandNameTone}`}>{t('brandName')}</span>
              <span className={`brand-lockup__slogan block truncate ${brandSloganTone}`}>
                {t('brandSlogan')}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 xl:gap-8 lg:flex" aria-label={t('mainMenu')}>
            {links.map((link) =>
              link.mega ? (
                <div
                  key={link.to}
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `relative inline-flex items-center gap-1.5 py-2 text-[13px] font-semibold transition-colors ${linkTone(
                        isActive || barePath.startsWith('/products'),
                      )}`
                    }
                  >
                    {link.label}
                    <span className="text-[10px] opacity-70">▾</span>
                  </NavLink>

                  {productsOpen && (
                    <div className="dropdown-in absolute end-0 top-full z-50 min-w-[300px] border-t-2 border-primary bg-paper py-3 text-ink shadow-2xl">
                      {PRODUCT_NAV.map((node) => (
                        <div key={node.slug} className="group/item relative">
                          <Link
                            to={`${prefix}/products/${node.slug}`}
                            className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-ink/80 transition hover:bg-light hover:text-secondary"
                          >
                            <span>{productTitle(node.slug, node.title)}</span>
                            {node.children?.length ? <span className="text-xs text-stone">‹</span> : null}
                          </Link>
                          {node.children?.length ? (
                            <div className="invisible absolute end-full top-0 min-w-[240px] border-t-2 border-primary bg-paper py-2 opacity-0 shadow-2xl transition group-hover/item:visible group-hover/item:opacity-100">
                              {node.children.map((child) => (
                                <Link
                                  key={child.slug}
                                  to={`${prefix}/products/${child.slug}`}
                                  className="block px-4 py-2.5 text-sm text-ink/75 transition hover:bg-light hover:text-secondary"
                                >
                                  {productTitle(child.slug, child.title)}
                                </Link>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === homePath}
                  className={({ isActive }) =>
                    `relative py-2 text-[13px] font-semibold transition-colors ${linkTone(isActive)}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span
                        className={`absolute inset-x-0 bottom-0 h-px origin-right bg-primary transition-transform duration-300 ${
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ),
            )}
          </nav>

          <div className="ms-auto flex shrink-0 items-center gap-2 sm:gap-3">
            <LanguageSwitcher tone={transparent ? 'light' : 'dark'} />

            <div className="hidden items-center gap-3 xl:gap-4 lg:flex">
              <SocialLinks tone={transparent ? 'light' : 'dark'} />
              <Link
                to={`${prefix}/contact`}
                className={`inline-flex items-center border px-5 py-3 text-xs font-bold transition-colors ${
                  transparent
                    ? 'border-white/35 text-white hover:border-primary hover:bg-primary hover:text-dark'
                    : 'border-secondary bg-secondary text-white hover:border-primary hover:bg-primary hover:text-dark'
                }`}
              >
                {t('requestQuote')}
              </Link>
            </div>

            <button
              type="button"
              className={`inline-flex h-10 w-10 items-center justify-center lg:hidden ${
                transparent ? 'text-white' : 'text-ink'
              }`}
              aria-label={open ? t('closeMenu') : t('openMenu')}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{t('menu')}</span>
              <div className="flex w-5 flex-col gap-1.5">
                <span
                  className={`h-px w-full bg-current transition ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
                />
                <span className={`h-px w-full bg-current transition ${open ? 'opacity-0' : ''}`} />
                <span
                  className={`h-px w-full bg-current transition ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="mobile-menu-in fixed inset-0 z-40 overflow-y-auto bg-dark px-5 pb-[max(4rem,env(safe-area-inset-bottom))] pt-[max(6.5rem,calc(env(safe-area-inset-top)+5.5rem))] text-white lg:hidden">
          <div className="grain-overlay" aria-hidden />
          <div className="glow-spot -end-24 top-0 h-[280px] w-[280px] opacity-40" aria-hidden />
          <nav className="relative flex flex-col gap-1" aria-label={t('mobileMenu')}>
            {links.map((link) =>
              link.mega ? (
                <div key={link.to} className="border-b border-white/10 py-3.5">
                  <button
                    type="button"
                    className="flex min-h-12 w-full items-center justify-between text-[1.65rem] font-semibold leading-tight"
                    onClick={() => setProductsOpen((v) => !v)}
                  >
                    {link.label}
                    <span className="text-base text-primary">{productsOpen ? '−' : '+'}</span>
                  </button>
                  {productsOpen && (
                    <div className="mt-3 space-y-1 border-s border-primary/40 pe-2 ps-4 text-base text-white/80">
                      {PRODUCT_NAV.map((node) => (
                        <div key={node.slug}>
                          <Link to={`${prefix}/products/${node.slug}`} className="block min-h-11 py-2.5 font-semibold">
                            {productTitle(node.slug, node.title)}
                          </Link>
                          {node.children?.map((child) => (
                            <Link
                              key={child.slug}
                              to={`${prefix}/products/${child.slug}`}
                              className="block min-h-10 py-2 pe-4 text-sm text-white/60"
                            >
                              {productTitle(child.slug, child.title)}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex min-h-14 items-center border-b border-white/10 py-3.5 text-[1.65rem] font-semibold leading-tight"
                >
                  {link.label}
                </Link>
              ),
            )}
            <Link
              to={`${prefix}/contact`}
              className="btn-press mt-8 inline-flex min-h-12 items-center justify-center bg-primary px-6 py-4 text-sm font-bold text-dark"
            >
              {t('requestQuote')}
            </Link>
            <div className="mt-8">
              <SocialLinks tone="light" />
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
