import { useEffect } from 'react'

const TITLES: Record<string, string> = {
  '/': 'الرئيسية | سفنت ستار',
  '/about': 'من نحن | سفنت ستار',
  '/products': 'منتجاتنا | سفنت ستار',
  '/contact': 'تواصل معنا | سفنت ستار',
}

export default function PageTitle({ title }: { title?: string }) {
  useEffect(() => {
    const path = window.location.pathname
    const matched =
      title ||
      TITLES[path] ||
      (path.startsWith('/products/') ? 'تفاصيل المنتج | سفنت ستار' : 'سفنت ستار | 7th Star Food')
    document.title = matched
  }, [title])

  return null
}
