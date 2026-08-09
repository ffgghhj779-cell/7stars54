import { useEffect } from 'react'

const SITE_URL = 'https://7thstarfood.com'

const TITLES: Record<string, string> = {
  '/': 'الرئيسية | سفنت ستار',
  '/about': 'من نحن | سفنت ستار',
  '/products': 'منتجاتنا | سفنت ستار',
  '/contact': 'تواصل معنا | سفنت ستار',
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

type Props = {
  title?: string
  description?: string
}

export default function PageTitle({ title, description }: Props) {
  useEffect(() => {
    const path = window.location.pathname
    const matched =
      title ||
      TITLES[path] ||
      (path.startsWith('/products/') ? 'تفاصيل المنتج | سفنت ستار' : 'سفنت ستار | 7th Star Food')
    document.title = matched

    const canonicalUrl = `${SITE_URL}${path === '/' ? '' : path}`
    setCanonical(canonicalUrl)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:title', matched)
    setMeta('name', 'twitter:title', matched)

    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
      setMeta('name', 'twitter:description', description)
    }
  }, [title, description])

  return null
}
