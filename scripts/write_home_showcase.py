# -*- coding: utf-8 -*-
"""Write UTF-8 home showcase data file for React."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src" / "data" / "homeShowcase.ts"

content = r'''/** Home showcase blocks matching Wuilt homepage content */
export type HomeCard = {
  slug: string
  title: string
  description: string
  image: string
}

export type HomeGalleryItem = {
  src: string
  alt: string
}

/** Product cards as shown on the live/Wuilt homepage */
export const HOME_PRODUCT_ROWS: HomeCard[][] = [
  [
    {
      slug: 'buffalo',
      title: 'منتجات للحوم البافلو',
      description: 'لحوم البافلو بجودة عالية',
      image: '/media/wuilt/070220260420166a45e700c7d48.jpg',
    },
    {
      slug: 'rice',
      title: 'منتجات الارز',
      description: 'ارز عالي الجودة من الهند وباكستان جاهزة للتصدير لكافة دول العالم',
      image: '/media/wuilt/070220260426396a45e87f48aed.jpg',
    },
    {
      slug: 'fresh-fruits',
      title: 'منتجات الفواكه',
      description: 'نمتلك محاصيل زراعية ونصدرها الى كل دول العالم',
      image: '/media/wuilt/070320260038196a47047bc4704.jpg',
    },
  ],
  [
    {
      slug: 'vegetables',
      title: 'منتجات الخضروات',
      description: 'نمتلك محاصيل زراعية من الخضار ونصدرها لكافة دول العالم',
      image: '/media/wuilt/070220260109206a45ba403361a.jpg',
    },
    {
      slug: 'eggs',
      title: 'منتجات البيض',
      description: 'نصدر البيض الى كل دول العالم',
      image: '/media/wuilt/070220260425576a45e8556ba57.jpg',
    },
    {
      slug: 'cashew',
      title: 'كاجو مملوح',
      description: 'لدينا أجود أنواع الكاجو',
      image: '/media/wuilt/070220260032276a45b19b6f929.jpg',
    },
  ],
  [
    {
      slug: 'frozen-chicken',
      title: 'منتجات الدجاج المجمد',
      description: 'دجاج مجمد عالي الجودة',
      image: '/media/wuilt/070220260431456a45e9b132e9c.jpg',
    },
    {
      slug: 'frozen-fries',
      title: 'بطاطس نصف مقلية',
      description: 'بطاطس مقلية سريعة التحضير',
      image: '/media/wuilt/070320260035266a4703ce0c67d.jpg',
    },
    {
      slug: 'seafood',
      title: 'لحوم الأسماك والأحياء البحرية',
      description: 'لحوم أسماك بجودة عالية',
      image: '/media/wuilt/070220260420426a45e71a6a776.jpg',
    },
  ],
]

/** Packaged / frozen product shots from homepage */
export const HOME_PACK_GALLERY: HomeGalleryItem[] = [
  { src: '/media/wuilt/070220260331536a45dba98f2da.jpg', alt: 'خضروات مشكلة مجمدة' },
  { src: '/media/wuilt/060220231140056479d515ca477.jpg', alt: 'منتج مجمد سفنث ستار' },
  { src: '/media/wuilt/060220231140176479d5215947b.jpg', alt: 'ورق عنب' },
  { src: '/media/wuilt/060220231140216479d5258b346.jpg', alt: 'موزاريلا مبشورة' },
  { src: '/media/wuilt/060220231140256479d529e2851.jpg', alt: 'ذرة حلوة' },
  { src: '/media/wuilt/070120262359306a45a9e235f4a.jpg', alt: 'بطاطس نصف مقلية' },
  { src: '/media/wuilt/060220231140296479d52d75e58.jpg', alt: 'بازلاء خضراء' },
  { src: '/media/wuilt/060220231140336479d5311ade6.jpg', alt: 'منتج مجمد' },
  { src: '/media/wuilt/060220231140366479d534f3226.jpg', alt: 'منتج مجمد' },
  { src: '/media/wuilt/060220231140406479d538be659.jpg', alt: 'منتج مجمد' },
]

/** Fresh produce showcase from homepage */
export const HOME_PRODUCE_GALLERY: HomeGalleryItem[] = [
  { src: '/media/wuilt/060220230849466479ad2a4c2e2.png', alt: 'برتقال' },
  { src: '/media/wuilt/060220230901346479afee08dcd.png', alt: 'بصل' },
  { src: '/media/wuilt/060220230908456479b19dbe073.png', alt: 'يوسف أفندي' },
  { src: '/media/wuilt/060220230920016479b44125786.png', alt: 'فراولة' },
  { src: '/media/wuilt/060220230928006479b62073c8f.png', alt: 'بطيخ' },
  { src: '/media/wuilt/060220230951416479bbadc22b6.png', alt: 'بطاطس' },
  { src: '/media/wuilt/060220230957596479bd27b7c4d.png', alt: 'مانجو' },
  { src: '/media/wuilt/060220231003276479be6f4314a.png', alt: 'رمان' },
  { src: '/media/wuilt/060220231012146479c07e81a3f.png', alt: 'عنب / فاكهة' },
  { src: '/media/wuilt/041320221439346256e0a636871.jpg', alt: 'فواكه طازجة' },
]

export const HOME_EXTRA_CARDS: HomeCard[] = [
  {
    slug: 'grains',
    title: 'الحبوب',
    description: 'نستورد الحبوب مثل الأرز والسمسم للتوريد بالجملة',
    image: '/media/wuilt/070220260421016a45e72d4b4c1.jpg',
  },
  {
    slug: 'oils',
    title: 'زيوت الطبخ',
    description: 'زيوت طبخ للتوريد والاستخدام التجاري',
    image: '/media/wuilt/070220260429036a45e90fcf008.jpg',
  },
  {
    slug: 'sesame',
    title: 'السمسم',
    description: 'سمسم للتوريد التجاري والاستخدام الصناعي والغذائي',
    image: '/media/wuilt/070220260409026a45e45e8fab2.jpg',
  },
  {
    slug: 'frozen-produce',
    title: 'خضروات وفواكه مجمدة',
    description: 'خضروات وفواكه مجمدة جاهزة للتوزيع التجاري',
    image: '/media/wuilt/070220260331536a45dba98f2da.jpg',
  },
  {
    slug: 'meat',
    title: 'اللحوم',
    description: 'نقوم باستيراد اللحوم المجمدة والمبردة حسب المواصفات العالمية',
    image: '/media/wuilt/070220260419336a45e6d56e6c3.jpg',
  },
  {
    slug: 'sawakni',
    title: 'السواكني',
    description: 'لحوم سواكني ضمن منتجات التوريد المبرّد',
    image: '/media/wuilt/070220260419336a45e6d56e6c3.jpg',
  },
]
'''

OUT.write_text(content, encoding='utf-8')
print('wrote', OUT)
