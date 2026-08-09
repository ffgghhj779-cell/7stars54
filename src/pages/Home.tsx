import { Link } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import ScrollReveal from '../components/ScrollReveal'
import {
  HOME_PACK_GALLERY,
  HOME_PRODUCE_GALLERY,
  HOME_PRODUCT_ROWS,
  type HomeCard,
} from '../data/homeShowcase'
import { SITE_COPY, WUILT } from '../data/site'

function ProductCard({ item, index }: { item: HomeCard; index: number }) {
  return (
    <Link
      to={`/products/${item.slug}`}
      className="card-surface group flex h-full flex-col p-3 sm:p-4"
    >
      <div className={`relative overflow-hidden bg-mist aspect-[5/4] ${index % 2 === 1 ? 'md:mt-10' : ''}`}>
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="img-zoom h-full w-full object-cover"
        />
        <span className="stat-num absolute end-3 top-3 flex h-8 w-8 items-center justify-center bg-dark/80 text-[11px] text-primary backdrop-blur-sm sm:h-9 sm:w-9 sm:text-xs">
          0{index + 1}
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-4 sm:pt-5">
        <h3 className="text-base font-semibold text-secondary sm:text-lg md:text-xl">{item.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-7 text-stone">{item.description}</p>
        <span className="mt-4 inline-flex w-fit border-b border-primary pb-1 text-sm font-bold text-primary transition group-hover:border-secondary group-hover:text-secondary sm:mt-5">
          المزيد
        </span>
      </div>
    </Link>
  )
}

const pillars = [
  ['جودة تصدير', 'فرز وتعبئة وشحن بمعايير تناسب الأسواق العالمية'],
  ['سلاسل تبريد', 'حفظ الطزاجة من المصدر حتى وصول الشحنة'],
  ['شراكة B2B', 'توريد بالجملة ودعم لوجستي للتجّار والموزعين'],
]

const stats = [
  ['+15', 'عامًا من الخبرة'],
  ['+30', 'فئة منتج'],
  ['+6', 'دول توريد'],
  ['24/7', 'دعم الطلبات'],
]

export default function Home() {
  // Editorial selection: first two Wuilt rows (6 cards) — rest live on /products
  const featured = [...HOME_PRODUCT_ROWS[0], ...HOME_PRODUCT_ROWS[1]]
  // Fewer mosaic tiles on small screens = faster paint + cleaner mobile rhythm
  const mosaicDesktop = [
    ...HOME_PACK_GALLERY.slice(0, 4),
    ...HOME_PRODUCE_GALLERY.slice(0, 5),
  ]
  const mosaicMobile = [
    ...HOME_PACK_GALLERY.slice(0, 2),
    ...HOME_PRODUCE_GALLERY.slice(0, 4),
  ]

  return (
    <div className="bg-paper text-ink">
      <PageTitle title="الرئيسية | سفنت ستار" />

      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-dark text-white">
        <div className="hero-media absolute inset-0">
          <img
            src={WUILT.heroFries}
            alt=""
            className="hero-image h-full w-full object-cover object-[center_35%] sm:object-center"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="premium-grid absolute inset-0 opacity-35" aria-hidden />
        <div className="grain-overlay" aria-hidden />
        <div className="glow-spot -end-40 top-0 hidden h-[560px] w-[560px] opacity-70 md:block" aria-hidden />
        <div className="glow-spot glow-spot-green -start-32 bottom-0 hidden h-[480px] w-[480px] opacity-60 md:block" aria-hidden />

        <div className="shell relative z-10 pb-[max(5rem,env(safe-area-inset-bottom))] pt-28 sm:pb-20 sm:pt-36 lg:pb-16">
          <p className="eyebrow">7th STAR · Food & Export</p>
          <h1 className="display-title mt-5 max-w-4xl text-[clamp(2.35rem,9vw,6.6rem)] leading-[1.05] sm:mt-6">
            {SITE_COPY.homeHeadline}
            <span className="mt-2 block text-[0.92em] text-white/90">{SITE_COPY.homeSub}</span>
          </h1>
          <p className="mt-5 max-w-xl text-[0.95rem] leading-8 text-white/65 sm:mt-7 sm:text-base md:text-lg">
            {SITE_COPY.homeLead}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <Link
              to="/products"
              className="btn-press inline-flex min-h-12 items-center justify-center bg-primary px-7 py-4 text-sm font-bold text-dark transition hover:bg-white"
            >
              ابدأ الآن
            </Link>
            <Link
              to="/contact"
              className="btn-press inline-flex min-h-12 items-center justify-center border border-white/30 px-7 py-4 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-dark"
            >
              اطلب عرض سعر
            </Link>
          </div>
          <div className="mt-10 grid gap-2 border-t border-white/15 pt-5 text-[11px] leading-5 text-white/45 sm:mt-14 sm:grid-cols-3 sm:items-center sm:pt-6 sm:text-xs">
            <p>الإمارات · السعودية · الخليج</p>
            <p className="sm:text-center">تصدير وتوريد بالجملة</p>
            <p className="display-en sm:text-end">Seventh Star Enterprises LLC</p>
          </div>
        </div>
      </section>

      <div className="divider-fade" aria-hidden />

      <section className="border-b border-line bg-paper">
        <div className="shell hairline-grid md:grid-cols-3">
          {pillars.map(([title, text]) => (
            <div key={title} className="py-7 md:px-8 md:py-9 md:first:ps-0 md:last:pe-0">
              <p className="text-sm font-bold">{title}</p>
              <p className="mt-2 text-sm leading-7 text-stone">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-secondary text-white">
        <div className="grain-overlay" aria-hidden />
        <div className="glow-spot end-1/4 -top-24 hidden h-[380px] w-[380px] opacity-40 md:block" aria-hidden />
        <div className="shell relative grid grid-cols-2 gap-x-4 gap-y-8 py-10 md:grid-cols-4 md:gap-8 md:py-16">
          {stats.map(([num, label]) => (
            <div key={label} className="text-center md:border-s md:border-white/15 md:first:border-s-0">
              <p className="stat-num text-3xl text-primary sm:text-4xl md:text-5xl">{num}</p>
              <p className="mt-2 text-[11px] text-white/65 sm:text-xs md:text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-y bg-paper">
        <div className="shell">
          <ScrollReveal>
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end md:gap-6">
              <div className="max-w-3xl">
                <p className="eyebrow">منتجاتنا</p>
                <h2 className="display-title mt-4 text-[1.85rem] sm:mt-5 sm:text-4xl md:text-6xl">
                  مختارات بجودة تصدير
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-stone sm:mt-4 sm:text-base sm:leading-8">
                  أبرز فئاتنا للطازج والمجمد — بتغليف احترافي وتوريد بالجملة.
                </p>
              </div>
              <Link
                to="/products"
                className="inline-flex w-fit border-b border-secondary pb-2 text-sm font-bold text-secondary"
              >
                كل الفئات
              </Link>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-x-5 gap-y-10 sm:mt-14 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3">
            {featured.map((item, index) => (
              <ScrollReveal key={item.slug} delay={(index % 3) * 50}>
                <ProductCard item={item} index={index} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y-sm bg-light">
        <div className="shell">
          <ScrollReveal>
            <div className="mb-8 flex flex-col justify-between gap-4 md:mb-10 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">بصريًا</p>
                <h2 className="display-title mt-3 text-2xl sm:mt-4 sm:text-3xl md:text-5xl">
                  من المنتج إلى التعبئة
                </h2>
              </div>
              <Link to="/products/frozen-produce" className="text-sm font-bold text-secondary">
                المجمدات ←
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3">
            {mosaicMobile.map((item, index) => (
              <ScrollReveal key={`m-${item.src}`} delay={(index % 3) * 30} className="bg-paper sm:hidden">
                <div className="group overflow-hidden aspect-square">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className={`img-zoom h-full w-full ${
                      item.src.endsWith('.png') ? 'object-contain p-3' : 'object-cover'
                    }`}
                  />
                </div>
              </ScrollReveal>
            ))}
            {mosaicDesktop.map((item, index) => (
              <ScrollReveal key={`d-${item.src}`} delay={(index % 3) * 40} className="hidden bg-paper sm:block">
                <div className="group overflow-hidden aspect-square">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className={`img-zoom h-full w-full ${
                      item.src.endsWith('.png') ? 'object-contain p-3' : 'object-cover'
                    }`}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-paper">
        <div className="shell grid items-center gap-8 md:grid-cols-2 md:gap-16">
          <ScrollReveal>
            <div className="group overflow-hidden aspect-[4/5] md:aspect-[5/6]">
              <img
                src={WUILT.aboutOffice}
                alt="مقر سفنت ستار"
                loading="lazy"
                decoding="async"
                className="img-zoom h-full w-full object-cover"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="eyebrow">من نحن</p>
            <h2 className="display-title mt-4 text-[1.85rem] sm:mt-5 sm:text-4xl md:text-5xl">
              جودة المنتج أولًا. ثم التوسّع بثقة.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-stone sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
              {SITE_COPY.aboutLead}
            </p>
            <Link
              to="/about"
              className="btn-press mt-7 inline-flex min-h-12 items-center bg-secondary px-7 py-4 text-sm font-bold text-white transition hover:bg-primary hover:text-dark sm:mt-8"
            >
              اعرف المزيد
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-dark text-white section-y">
        <div className="grain-overlay" aria-hidden />
        <div className="premium-grid absolute inset-0 opacity-20" aria-hidden />
        <div className="glow-spot -start-40 top-0 hidden h-[520px] w-[520px] opacity-60 md:block" aria-hidden />
        <div className="shell relative">
          <ScrollReveal>
            <p className="eyebrow">الخطوة التالية</p>
            <h2 className="display-title mt-4 max-w-3xl text-[1.85rem] sm:mt-5 sm:text-4xl md:text-6xl">
              جاهزون لتوريد طلبك القادم؟
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/60 sm:mt-6 sm:text-base sm:leading-8">
              راسلنا بالمواصفات والكميات — ونرجع بعرض واضح.
            </p>
            <Link
              to="/contact"
              className="btn-press mt-8 inline-flex min-h-12 items-center bg-primary px-7 py-4 text-sm font-bold text-dark transition hover:bg-white sm:mt-9"
            >
              تواصل معنا
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
