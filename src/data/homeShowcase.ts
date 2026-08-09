/** Home showcase blocks matching Wuilt homepage content */
export type HomeCard = {
  slug: string
  title: string
  description: string
  image: string
  titleEn?: string
  descriptionEn?: string
}

export type HomeGalleryItem = {
  src: string
  alt: string
  altEn?: string
  /** True for cutout/transparent renders that should never be cropped */
  contain?: boolean
}

/** Product cards as shown on the live/Wuilt homepage */
export const HOME_PRODUCT_ROWS: HomeCard[][] = [
  [
    {
      slug: 'buffalo',
      title: 'منتجات لحوم البافلو',
      description: 'لحوم بافلو مجمدة بجودة عالية للتوريد والتصدير.',
      image: '/media/wuilt/04062022101830624d68f6b917d.webp',
      titleEn: 'Buffalo Meat Products',
      descriptionEn: 'High-quality frozen buffalo meat for supply and export.',
    },
    {
      slug: 'rice',
      title: 'منتجات الأرز',
      description: 'أرز بسمتي عالي الجودة من الهند وباكستان، جاهز للتصدير إلى كافة دول العالم.',
      image: '/media/wuilt/070720261701346a4d30eea5879.webp',
      titleEn: 'Rice Products',
      descriptionEn: 'High-quality basmati rice from India and Pakistan, ready for export worldwide.',
    },
    {
      slug: 'fresh-fruits',
      title: 'منتجات الفواكه',
      description: 'محاصيل فواكه طازجة موسمية، نزرعها ونصدّرها إلى كل دول العالم.',
      image: '/media/wuilt/070420260034436a4855238cb4d.webp',
      titleEn: 'Fruit Products',
      descriptionEn: 'Seasonal fresh fruit crops that we grow and export worldwide.',
    },
  ],
  [
    {
      slug: 'vegetables',
      title: 'منتجات الخضروات',
      description: 'محاصيل خضروات طازجة، نزرعها ونصدّرها إلى كافة دول العالم.',
      image: '/media/wuilt/070220260109206a45ba403361a.webp',
      titleEn: 'Vegetable Products',
      descriptionEn: 'Fresh vegetable crops that we grow and export worldwide.',
    },
    {
      slug: 'eggs',
      title: 'منتجات البيض',
      description: 'بيض دجاج طازج نصدّره إلى كل دول العالم.',
      image: '/media/wuilt/070220260425576a45e8556ba57.webp',
      titleEn: 'Egg Products',
      descriptionEn: 'Fresh chicken eggs exported worldwide.',
    },
    {
      slug: 'cashew',
      title: 'كاجو مملح',
      description: 'أجود أنواع الكاجو المملح للتوزيع والتصدير.',
      image: '/media/wuilt/070220260032276a45b19b6f929.webp',
      titleEn: 'Salted Cashews',
      descriptionEn: 'The finest grades of salted cashews for distribution and export.',
    },
  ],
  [
    {
      slug: 'frozen-chicken',
      title: 'منتجات الدجاج المجمد',
      description: 'دجاج مجمد حلال عالي الجودة بأحجام وأجزاء متنوعة.',
      image: '/media/wuilt/0706202313452564a6c5751e35c.webp',
      titleEn: 'Frozen Chicken Products',
      descriptionEn: 'High-quality halal frozen chicken in a range of sizes and cuts.',
    },
    {
      slug: 'frozen-fries',
      title: 'بطاطس نصف مقلية',
      description: 'بطاطس نصف مقلية فاخرة، سريعة التحضير.',
      image: '/media/wuilt/070320260035266a4703ce0c67d.webp',
      titleEn: 'Half-Fried Potatoes',
      descriptionEn: 'Premium par-fried potatoes, quick to prepare.',
    },
    {
      slug: 'seafood',
      title: 'منتجات الأسماك والأحياء البحرية',
      description: 'أسماك ومأكولات بحرية بجودة تصدير عالية.',
      image: '/media/wuilt/070220260420426a45e71a6a776.webp',
      titleEn: 'Fish & Seafood Products',
      descriptionEn: 'High export-quality fish and seafood.',
    },
  ],
]

/** Packaged / frozen product shots from homepage */
export const HOME_PACK_GALLERY: HomeGalleryItem[] = [
  { src: '/media/wuilt/070320262357186a484c5e5a301.webp', alt: 'خضروات مشكلة مجمدة', altEn: 'Frozen mixed vegetables' },
  { src: '/media/wuilt/060220231140056479d515ca477.webp', alt: 'منتج مجمد النجمة السابعة', altEn: 'Seventh Star frozen product' },
  { src: '/media/wuilt/060220231140176479d5215947b.webp', alt: 'ورق عنب', altEn: 'Grape leaves' },
  { src: '/media/wuilt/060220231140216479d5258b346.webp', alt: 'موزاريلا مبشورة', altEn: 'Shredded mozzarella' },
  { src: '/media/wuilt/060220231140256479d529e2851.webp', alt: 'ذرة حلوة', altEn: 'Sweet corn' },
  { src: '/media/wuilt/0706202313452564a6c5751e35c.webp', alt: 'دجاج مجمد', altEn: 'Frozen chicken' },
  { src: '/media/wuilt/060220231140296479d52d75e58.webp', alt: 'بازلاء خضراء', altEn: 'Green peas' },
  { src: '/media/wuilt/062220230440126493d0acead5f.webp', alt: 'عنب أخضر', altEn: 'Green grapes' },
  { src: '/media/wuilt/070420260034436a4855238cb4d.webp', alt: 'عنب طازج', altEn: 'Fresh grapes' },
  { src: '/media/wuilt/0608202221253762a113d19a6fc.webp', alt: 'زيت طبخ', altEn: 'Cooking oil' },
]

/** Fresh produce showcase from homepage — prefer highest-res available shots */
export const HOME_PRODUCE_GALLERY: HomeGalleryItem[] = [
  { src: '/media/wuilt/060220230901346479afee08dcd.webp', alt: 'بصل', altEn: 'Onion', contain: true },
  { src: '/media/wuilt/060220230928006479b62073c8f.webp', alt: 'بطيخ', altEn: 'Watermelon', contain: true },
  { src: '/media/wuilt/060220230957596479bd27b7c4d.webp', alt: 'مانجو', altEn: 'Mango', contain: true },
  { src: '/media/wuilt/060220231012146479c07e81a3f.webp', alt: 'عنب / فاكهة', altEn: 'Grapes / fruit', contain: true },
  { src: '/media/wuilt/062220230440126493d0acead5f.webp', alt: 'عنب أخضر', altEn: 'Green grapes' },
  { src: '/media/wuilt/070420260034436a4855238cb4d.webp', alt: 'عنب طازج', altEn: 'Fresh grapes' },
  { src: '/media/wuilt/070420260042276a4856f31f303.webp', alt: 'فواكه طازجة', altEn: 'Fresh fruits' },
  { src: '/media/wuilt/060720231046526480601cd8120.webp', alt: 'خضروات مجمدة', altEn: 'Frozen vegetables' },
]

export const HOME_EXTRA_CARDS: HomeCard[] = [
  {
    slug: 'grains',
    title: 'الحبوب',
    description: 'نستورد الحبوب مثل الأرز والسمسم للتوريد بالجملة.',
    image: '/media/wuilt/070220260421016a45e72d4b4c1.webp',
    titleEn: 'Grains',
    descriptionEn: 'We import grains such as rice and sesame for bulk supply.',
  },
  {
    slug: 'oils',
    title: 'زيوت الطبخ',
    description: 'زيوت طبخ للتوريد التجاري والاستخدام الصناعي.',
    image: '/media/wuilt/0608202221253762a113d19a6fc.webp',
    titleEn: 'Cooking Oils',
    descriptionEn: 'Cooking oils for commercial supply and industrial use.',
  },
  {
    slug: 'sesame',
    title: 'السمسم',
    description: 'سمسم للتوريد التجاري والاستخدام الصناعي والغذائي.',
    image: '/media/wuilt/070220260409026a45e45e8fab2.webp',
    titleEn: 'Sesame',
    descriptionEn: 'Sesame seeds for commercial supply and industrial and food use.',
  },
  {
    slug: 'frozen-produce',
    title: 'خضروات وفواكه مجمدة',
    description: 'خضروات وفواكه مجمدة جاهزة للتوزيع التجاري.',
    image: '/media/wuilt/070320262357186a484c5e5a301.webp',
    titleEn: 'Frozen Fruits & Vegetables',
    descriptionEn: 'Frozen fruits and vegetables ready for commercial distribution.',
  },
  {
    slug: 'meat',
    title: 'اللحوم',
    description: 'نستورد اللحوم المجمدة والمبردة وفق أعلى المواصفات والمقاييس العالمية.',
    image: '/media/wuilt/070220260419336a45e6d56e6c3.webp',
    titleEn: 'Meat',
    descriptionEn: 'We import frozen and chilled meat to the highest international specifications and standards.',
  },
  {
    slug: 'sawakni',
    title: 'السواكني',
    description: 'لحوم سواكني ضمن محفظة التوريد المبرّد للمجزر والموزعين.',
    image: '/media/wuilt/070220260419336a45e6d56e6c3.webp',
    titleEn: 'Sawakni Meat',
    descriptionEn: 'Sawakni meat cuts within our chilled supply portfolio for abattoirs and distributors.',
  },
]
