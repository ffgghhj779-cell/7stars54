import { useEffect } from 'react'
import { useLanguage } from '../i18n/language'

const SITE_URL = 'https://7thstarfood.com'

const TITLES: Record<string, { ar: string; en: string }> = {
  '/': { ar: 'الرئيسية | سفنت ستار', en: 'Home | Seventh Star' },
  '/about': { ar: 'من نحن | سفنت ستار', en: 'About Us | Seventh Star' },
  '/products': { ar: 'منتجاتنا | سفنت ستار', en: 'Our Products | Seventh Star' },
  '/contact': { ar: 'تواصل معنا | سفنت ستار', en: 'Contact Us | Seventh Star' },
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setAlternate(hreflang: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'alternate')
    el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

type Props = {
  title?: string
  description?: string
}

export default function PageTitle({ title, description }: Props) {
  const { lang } = useLanguage()

  useEffect(() => {
    const path = window.location.pathname
    const isEn = path === '/en' || path.startsWith('/en/')
    const arPath = isEn ? path.replace(/^\/en/, '') || '/' : path
    const enPath = isEn ? path : path === '/' ? '/en' : `/en${path}`

    const fallback =
      arPath.startsWith('/products/')
        ? { ar: 'تفاصيل المنتج | سفنت ستار', en: 'Product Details | Seventh Star' }
        : { ar: 'سفنت ستار | 7th Star Food', en: 'Seventh Star | 7th Star Food' }
    const matched = title || TITLES[arPath]?.[lang] || fallback[lang]
    document.title = matched

    const canonicalUrl = `${SITE_URL}${path === '/' ? '' : path}`
    setCanonical(canonicalUrl)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:title', matched)
    setMeta('property', 'og:locale', lang === 'ar' ? 'ar_AE' : 'en_US')
    setMeta('name', 'twitter:title', matched)

    setAlternate('ar', `${SITE_URL}${arPath === '/' ? '' : arPath}`)
    setAlternate('en', `${SITE_URL}${enPath}`)
    setAlternate('x-default', `${SITE_URL}${arPath === '/' ? '' : arPath}`)

    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
      setMeta('name', 'twitter:description', description)
    }
  }, [title, description, lang])

  return null
}
