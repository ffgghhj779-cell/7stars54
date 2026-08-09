export type Lang = 'ar' | 'en'

type Entry = { ar: string; en: string }

/** Shared UI copy reused across multiple pages/components (nav, CTAs, labels, aria-labels). */
export const STRINGS = {
  navHome: { ar: 'الرئيسية', en: 'Home' },
  navAbout: { ar: 'من نحن', en: 'About' },
  navProducts: { ar: 'منتجاتنا', en: 'Products' },
  navContact: { ar: 'تواصل معنا', en: 'Contact' },

  requestQuote: { ar: 'اطلب عرض سعر', en: 'Request a Quote' },
  contactUs: { ar: 'تواصل معنا', en: 'Contact Us' },
  exploreCategory: { ar: 'استكشف الفئة', en: 'Explore Category' },
  viewCategory: { ar: 'عرض القسم', en: 'View Category' },
  requestThisItem: { ar: 'اطلب هذا الصنف', en: 'Request This Item' },
  more: { ar: 'المزيد', en: 'More' },
  backToProducts: { ar: 'العودة للمنتجات', en: 'Back to Products' },
  home: { ar: 'الرئيسية', en: 'Home' },
  products: { ar: 'المنتجات', en: 'Products' },

  mainMenu: { ar: 'القائمة الرئيسية', en: 'Main menu' },
  openMenu: { ar: 'فتح القائمة', en: 'Open menu' },
  closeMenu: { ar: 'إغلاق القائمة', en: 'Close menu' },
  menu: { ar: 'القائمة', en: 'Menu' },
  mobileMenu: { ar: 'قائمة الجوال', en: 'Mobile menu' },

  footerExplore: { ar: 'استكشف', en: 'Explore' },
  footerContact: { ar: 'تواصل', en: 'Contact' },
  address: { ar: 'العنوان', en: 'Address' },
  phone: { ar: 'الهاتف', en: 'Phone' },
  email: { ar: 'البريد', en: 'Email' },
  social: { ar: 'السوشيال', en: 'Social' },

  whatsappAria: { ar: 'تواصل عبر واتساب', en: 'Contact us on WhatsApp' },
  socialAria: { ar: 'وسائل التواصل', en: 'Social channels' },

  subcategories: { ar: 'أقسام فرعية', en: 'Subcategories' },
  nextStep: { ar: 'الخطوة التالية', en: 'Next Step' },
  ourProductsEyebrow: { ar: 'منتجاتنا', en: 'Our Products' },
  aboutEyebrow: { ar: 'من نحن', en: 'About Us' },

  switchToEn: { ar: 'English', en: 'العربية' },
  langEn: { ar: 'EN', en: 'EN' },
  langAr: { ar: 'ع', en: 'ع' },
  brandName: { ar: 'سفنت ستار', en: 'Seventh Star' },
  brandSlogan: { ar: 'أغذية بجودة تستحق التصدير', en: 'Food quality worth exporting' },
} satisfies Record<string, Entry>

export type StringKey = keyof typeof STRINGS
