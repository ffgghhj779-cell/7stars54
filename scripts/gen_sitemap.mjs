import { writeFileSync } from 'node:fs'

const pages = [
  '/',
  '/about',
  '/products',
  '/contact',
  '/products/fresh-fruits',
  '/products/meat',
  '/products/frozen-chicken',
  '/products/buffalo',
  '/products/seafood',
  '/products/sawakni',
  '/products/grains',
  '/products/sesame',
  '/products/rice',
  '/products/vegetables',
  '/products/frozen-produce',
  '/products/frozen-fries',
  '/products/eggs',
  '/products/oils',
  '/products/cashew',
]

const priorityMap = {
  '/': '1.0',
  '/products': '0.9',
  '/about': '0.8',
  '/contact': '0.8',
}

const base = 'https://7thstarfood.com'
const enLoc = (p) => (p === '/' ? `${base}/` : `${base}${p}`)
const arLoc = (p) => (p === '/' ? `${base}/ar` : `${base}/ar${p}`)

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
`

for (const p of pages) {
  const priority = priorityMap[p] || '0.7'
  const en = enLoc(p)
  const ar = arLoc(p)
  for (const loc of [en, ar]) {
    xml += `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${ar}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${en}"/>
    <priority>${priority}</priority>
  </url>
`
  }
}

xml += `</urlset>
`
writeFileSync('public/sitemap.xml', xml)
console.log(`Wrote ${pages.length * 2} URLs`)
