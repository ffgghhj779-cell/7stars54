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
      image: '/media/wuilt/0412202222433762560099d84a6.webp',
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
      image: '/media/wuilt/070320260038196a47047bc4704.webp',
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
      image: '/media/wuilt/030620231155526405d4c8d15b8.webp',
      titleEn: 'Egg Products',
      descriptionEn: 'Fresh chicken eggs exported worldwide.',
    },
    {
      slug: 'cashew',
      title: 'كاجو مملح',
      description: 'أجود أنواع الكاجو المملح للتوزيع والتصدير.',
      image: '/media/wuilt/0618202210485262adad94b2cd0.webp',
      titleEn: 'Salted Cashews',
      descriptionEn: 'The finest grades of salted cashews for distribution and export.',
    },
  ],
  [
    {
      slug: 'frozen-chicken',
      title: 'منتجات الدجاج المجمد',
      description: 'دجاج مجمد حلال عالي الجودة بأحجام وأجزاء متنوعة.',
      image: '/media/wuilt/070220260431456a45e9b132e9c.webp',
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
      image: '/media/wuilt/06022023150105647a04314a31c.webp',
      titleEn: 'Fish & Seafood Products',
      descriptionEn: 'High export-quality fish and seafood.',
    },
  ],
]

/** Packaged / frozen product shots from homepage */
export const HOME_PACK_GALLERY: HomeGalleryItem[] = [
  { src: '/media/wuilt/070220260331536a45dba98f2da.webp', alt: 'خضروات مشكلة مجمدة', altEn: 'Frozen mixed vegetables' },
  { src: '/media/wuilt/060220231140056479d515ca477.webp', alt: 'منتج مجمد سفنت ستار', altEn: 'Seventh Star frozen product' },
  { src: '/media/wuilt/060220231140176479d5215947b.webp', alt: 'ورق عنب', altEn: 'Grape leaves' },
  { src: '/media/wuilt/060220231140216479d5258b346.webp', alt: 'موزاريلا مبشورة', altEn: 'Shredded mozzarella' },
  { src: '/media/wuilt/060220231140256479d529e2851.webp', alt: 'ذرة حلوة', altEn: 'Sweet corn' },
  { src: '/media/wuilt/070120262359306a45a9e235f4a.webp', alt: 'بطاطس نصف مقلية', altEn: 'Half-fried potatoes' },
  { src: '/media/wuilt/060220231140296479d52d75e58.webp', alt: 'بازلاء خضراء', altEn: 'Green peas' },
  { src: '/media/wuilt/060220231140336479d5311ade6.webp', alt: 'منتج مجمد', altEn: 'Frozen product' },
  { src: '/media/wuilt/060220231140366479d534f3226.webp', alt: 'منتج مجمد', altEn: 'Frozen product' },
  { src: '/media/wuilt/060220231140406479d538be659.webp', alt: 'منتج مجمد', altEn: 'Frozen product' },
]

/** Fresh produce showcase from homepage */
export const HOME_PRODUCE_GALLERY: HomeGalleryItem[] = [
  { src: '/media/wuilt/060220230849466479ad2a4c2e2.webp', alt: 'برتقال', altEn: 'Orange', contain: true },
  { src: '/media/wuilt/060220230901346479afee08dcd.webp', alt: 'بصل', altEn: 'Onion', contain: true },
  { src: '/media/wuilt/060220230908456479b19dbe073.webp', alt: 'يوسف أفندي', altEn: 'Yusuf Effendi mandarin', contain: true },
  { src: '/media/wuilt/060220230920016479b44125786.webp', alt: 'فراولة', altEn: 'Strawberry', contain: true },
  { src: '/media/wuilt/060220230928006479b62073c8f.webp', alt: 'بطيخ', altEn: 'Watermelon', contain: true },
  { src: '/media/wuilt/060220230951416479bbadc22b6.webp', alt: 'بطاطس', altEn: 'Potato', contain: true },
  { src: '/media/wuilt/060220230957596479bd27b7c4d.webp', alt: 'مانجو', altEn: 'Mango', contain: true },
  { src: '/media/wuilt/060220231003276479be6f4314a.webp', alt: 'رمان', altEn: 'Pomegranate', contain: true },
  { src: '/media/wuilt/060220231012146479c07e81a3f.webp', alt: 'عنب / فاكهة', altEn: 'Grapes / fruit', contain: true },
  { src: '/media/wuilt/041320221439346256e0a636871.webp', alt: 'فواكه طازجة', altEn: 'Fresh fruits' },
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
    image: '/media/wuilt/070220260429036a45e90fcf008.webp',
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
    image: '/media/wuilt/070220260331536a45dba98f2da.webp',
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
