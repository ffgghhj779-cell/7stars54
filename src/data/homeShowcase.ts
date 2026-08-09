/** Home showcase blocks matching Wuilt homepage content */
export type HomeCard = {
  slug: string
  title: string
  description: string
  image: string
}

export type HomeGalleryItem = {
  src: string
  alt: string
  /** True for cutout/transparent renders that should never be cropped */
  contain?: boolean
}

/** Product cards as shown on the live/Wuilt homepage */
export const HOME_PRODUCT_ROWS: HomeCard[][] = [
  [
    {
      slug: 'buffalo',
      title: 'منتجات للحوم البافلو',
      description: 'لحوم البافلو بجودة عالية',
      image: '/media/wuilt/0412202222433762560099d84a6.webp',
    },
    {
      slug: 'rice',
      title: 'منتجات الارز',
      description: 'ارز عالي الجودة من الهند وباكستان جاهزة للتصدير لكافة دول العالم',
      image: '/media/wuilt/070720261701346a4d30eea5879.webp',
    },
    {
      slug: 'fresh-fruits',
      title: 'منتجات الفواكه',
      description: 'نمتلك محاصيل زراعية ونصدرها الى كل دول العالم',
      image: '/media/wuilt/070320260038196a47047bc4704.webp',
    },
  ],
  [
    {
      slug: 'vegetables',
      title: 'منتجات الخضروات',
      description: 'نمتلك محاصيل زراعية من الخضار ونصدرها لكافة دول العالم',
      image: '/media/wuilt/070220260109206a45ba403361a.webp',
    },
    {
      slug: 'eggs',
      title: 'منتجات البيض',
      description: 'نصدر البيض الى كل دول العالم',
      image: '/media/wuilt/030620231155526405d4c8d15b8.webp',
    },
    {
      slug: 'cashew',
      title: 'كاجو مملوح',
      description: 'لدينا أجود أنواع الكاجو',
      image: '/media/wuilt/0618202210485262adad94b2cd0.webp',
    },
  ],
  [
    {
      slug: 'frozen-chicken',
      title: 'منتجات الدجاج المجمد',
      description: 'دجاج مجمد عالي الجودة',
      image: '/media/wuilt/070220260431456a45e9b132e9c.webp',
    },
    {
      slug: 'frozen-fries',
      title: 'بطاطس نصف مقلية',
      description: 'بطاطس مقلية سريعة التحضير',
      image: '/media/wuilt/070320260035266a4703ce0c67d.webp',
    },
    {
      slug: 'seafood',
      title: 'لحوم الأسماك والأحياء البحرية',
      description: 'لحوم أسماك بجودة عالية',
      image: '/media/wuilt/06022023150105647a04314a31c.webp',
    },
  ],
]

/** Packaged / frozen product shots from homepage */
export const HOME_PACK_GALLERY: HomeGalleryItem[] = [
  { src: '/media/wuilt/070220260331536a45dba98f2da.webp', alt: 'خضروات مشكلة مجمدة' },
  { src: '/media/wuilt/060220231140056479d515ca477.webp', alt: 'منتج مجمد سفنث ستار' },
  { src: '/media/wuilt/060220231140176479d5215947b.webp', alt: 'ورق عنب' },
  { src: '/media/wuilt/060220231140216479d5258b346.webp', alt: 'موزاريلا مبشورة' },
  { src: '/media/wuilt/060220231140256479d529e2851.webp', alt: 'ذرة حلوة' },
  { src: '/media/wuilt/070120262359306a45a9e235f4a.webp', alt: 'بطاطس نصف مقلية' },
  { src: '/media/wuilt/060220231140296479d52d75e58.webp', alt: 'بازلاء خضراء' },
  { src: '/media/wuilt/060220231140336479d5311ade6.webp', alt: 'منتج مجمد' },
  { src: '/media/wuilt/060220231140366479d534f3226.webp', alt: 'منتج مجمد' },
  { src: '/media/wuilt/060220231140406479d538be659.webp', alt: 'منتج مجمد' },
]

/** Fresh produce showcase from homepage */
export const HOME_PRODUCE_GALLERY: HomeGalleryItem[] = [
  { src: '/media/wuilt/060220230849466479ad2a4c2e2.webp', alt: 'برتقال', contain: true },
  { src: '/media/wuilt/060220230901346479afee08dcd.webp', alt: 'بصل', contain: true },
  { src: '/media/wuilt/060220230908456479b19dbe073.webp', alt: 'يوسف أفندي', contain: true },
  { src: '/media/wuilt/060220230920016479b44125786.webp', alt: 'فراولة', contain: true },
  { src: '/media/wuilt/060220230928006479b62073c8f.webp', alt: 'بطيخ', contain: true },
  { src: '/media/wuilt/060220230951416479bbadc22b6.webp', alt: 'بطاطس', contain: true },
  { src: '/media/wuilt/060220230957596479bd27b7c4d.webp', alt: 'مانجو', contain: true },
  { src: '/media/wuilt/060220231003276479be6f4314a.webp', alt: 'رمان', contain: true },
  { src: '/media/wuilt/060220231012146479c07e81a3f.webp', alt: 'عنب / فاكهة', contain: true },
  { src: '/media/wuilt/041320221439346256e0a636871.webp', alt: 'فواكه طازجة' },
]

export const HOME_EXTRA_CARDS: HomeCard[] = [
  {
    slug: 'grains',
    title: 'الحبوب',
    description: 'نستورد الحبوب مثل الأرز والسمسم للتوريد بالجملة',
    image: '/media/wuilt/070220260421016a45e72d4b4c1.webp',
  },
  {
    slug: 'oils',
    title: 'زيوت الطبخ',
    description: 'زيوت طبخ للتوريد والاستخدام التجاري',
    image: '/media/wuilt/070220260429036a45e90fcf008.webp',
  },
  {
    slug: 'sesame',
    title: 'السمسم',
    description: 'سمسم للتوريد التجاري والاستخدام الصناعي والغذائي',
    image: '/media/wuilt/070220260409026a45e45e8fab2.webp',
  },
  {
    slug: 'frozen-produce',
    title: 'خضروات وفواكه مجمدة',
    description: 'خضروات وفواكه مجمدة جاهزة للتوزيع التجاري',
    image: '/media/wuilt/070220260331536a45dba98f2da.webp',
  },
  {
    slug: 'meat',
    title: 'اللحوم',
    description: 'نقوم باستيراد اللحوم المجمدة والمبردة حسب المواصفات العالمية',
    image: '/media/wuilt/070220260419336a45e6d56e6c3.webp',
  },
  {
    slug: 'sawakni',
    title: 'السواكني',
    description: 'لحوم سواكني ضمن منتجات التوريد المبرّد',
    image: '/media/wuilt/070220260419336a45e6d56e6c3.webp',
  },
]
