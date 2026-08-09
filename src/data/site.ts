import { CATALOG, type CatalogItem } from './catalog'

export const CONTACT = {
  email: 'info@7thstarfood.com',
  phones: ['+966566806610'],
  whatsapp: '966566806610',
  addressAr: 'الشارقة ميديا سيتي، الإمارات العربية المتحدة',
  addressEn: 'Sharjah Media City, United Arab Emirates',
  social: {
    whatsapp: 'https://wa.me/966566806610',
    instagram: 'https://www.instagram.com/7thstarfood/',
    snapchat: 'https://www.snapchat.com/add/seventhstarfood',
    twitter: 'https://twitter.com/7thstarfood',
    facebook: 'https://www.facebook.com/profile.php?id=100092366444979',
    linkedin: 'https://www.linkedin.com/company/7thstar-enterprises-llc/',
    youtube: 'https://youtube.com/@7thstarfood',
    tiktok: 'https://www.tiktok.com/@7thstarfood',
  },
}

const m = (file: string) => `/media/wuilt/${file}`

/** صور الموقع الأصلية بعد التصدير من Wuilt */
export const WUILT = {
  logo: m('070520261749366a4a993087b3c.png'),
  heroFries: m('070120262359306a45a9e235f4a.jpg'),
  aboutOffice: m('070220260306366a45d5bce2061.jpg'),
  aboutProduce: m('070320262340366a4848742be4a.jpg'),
  packShot: m('070220260331536a45dba98f2da.jpg'),
  homeGallery: [
    m('070720261701346a4d30eea5879.jpg'),
    m('070320262357186a484c5e5a301.jpg'),
    m('070320262358056a484c8d40545.jpg'),
    m('070220260043256a45b42dcfb8c.jpg'),
    m('070420260042276a4856f31f303.jpg'),
    m('070420260034436a4855238cb4d.jpg'),
  ],
}

export type ProductDetailBlock = {
  title: string
  lines: string[]
}

export type ProductCategory = CatalogItem

/** Full product catalog extracted from the live Wuilt site */
export const PRODUCT_CATEGORIES: ProductCategory[] = CATALOG

export const SITE_COPY = {
  homeHeadline: 'سفنت ستار',
  homeSub: 'أغذية بجودة تستحق التصدير.',
  homeLead:
    'نوفر منتجات طازجة ومجمدة للأسواق الإقليمية والعالمية — بتغليف احترافي وسلاسل إمداد منضبطة.',
  aboutLead:
    'سفنت ستار إنتربرايزس من الشركات العاملة في توريد وتصدير الأغذية بالشرق الأوسط، مع تركيز واضح على جودة المنتج، التغليف، والدعم اللوجستي للشركاء التجاريين.',
  motto: 'إن القيام بعمل جديد يجلب قوة جديدة.',
}
