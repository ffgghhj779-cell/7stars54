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
      className="card-surface group flex h-full flex-col p-4"
    >
      <div className={`relative overflow-hidden bg-mist aspect-[5/4] ${index % 2 === 1 ? 'md:mt-10' : ''}`}>
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="img-zoom h-full w-full object-cover"
        />
        <span className="stat-num absolute end-3 top-3 flex h-9 w-9 items-center justify-center bg-dark/80 text-xs text-primary backdrop-blur-sm">
          0{index + 1}
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <h3 className="text-lg font-semibold text-secondary md:text-xl">{item.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-7 text-stone">{item.description}</p>
        <span className="mt-5 inline-flex w-fit border-b border-primary pb-1 text-sm font-bold text-primary transition group-hover:border-secondary group-hover:text-secondary">
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
  const mosaic = [
    ...HOME_PACK_GALLERY.slice(0, 4),
    ...HOME_PRODUCE_GALLERY.slice(0, 5),
  ]

  return (
    <div className="bg-paper text-ink">
      <PageTitle title="الرئيسية | سفنت ستار" />

      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-dark text-white">
        <div className="hero-media absolute inset-0">
          <img
            src={WUILT.heroFries}
            alt=""
            className="hero-image h-full w-full object-cover object-center"
            fetchPriority="high"
          />
        </div>
        <div className="premium-grid absolute inset-0 opacity-35" aria-hidden />
        <div className="grain-overlay" aria-hidden />
        <div className="glow-spot -end-40 top-0 h-[560px] w-[560px] opacity-70" aria-hidden />
        <div className="glow-spot glow-spot-green -start-32 bottom-0 h-[480px] w-[480px] opacity-60" aria-hidden />

        <div className="shell relative z-10 pb-20 pt-36 lg:pb-16">
          <p className="eyebrow">7th STAR · Food & Export</p>
          <h1 className="display-title mt-6 max-w-4xl text-[clamp(2.8rem,7vw,6.6rem)] leading-[1.05]">
            {SITE_COPY.homeHeadline}
            <span className="mt-2 block text-white/90">{SITE_COPY.homeSub}</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-white/65 md:text-lg">{SITE_COPY.homeLead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/products"
              className="inline-flex items-center justify-center bg-primary px-7 py-4 text-sm font-bold text-dark transition hover:bg-white"
            >
              ابدأ الآن
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center border border-white/30 px-7 py-4 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-dark"
            >
              اطلب عرض سعر
            </Link>
          </div>
          <div className="mt-14 grid gap-2 border-t border-white/15 pt-6 text-xs text-white/45 sm:grid-cols-3 sm:items-center">
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
            <div key={title} className="py-9 md:px-8 md:first:ps-0 md:last:pe-0">
              <p className="text-sm font-bold">{title}</p>
              <p className="mt-2 text-sm leading-7 text-stone">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-secondary text-white">
        <div className="grain-overlay" aria-hidden />
        <div className="glow-spot end-1/4 -top-24 h-[380px] w-[380px] opacity-40" aria-hidden />
        <div className="shell relative grid grid-cols-2 gap-8 py-12 md:grid-cols-4 md:py-16">
          {stats.map(([num, label]) => (
            <div key={label} className="text-center md:border-s md:border-white/15 md:first:border-s-0">
              <p className="stat-num text-4xl text-primary md:text-5xl">{num}</p>
              <p className="mt-2 text-xs text-white/65 md:text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-y bg-paper">
        <div className="shell">
          <ScrollReveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-3xl">
                <p className="eyebrow">منتجاتنا</p>
                <h2 className="display-title mt-5 text-4xl md:text-6xl">
                  مختارات بجودة تصدير
                </h2>
                <p className="mt-4 max-w-xl text-base leading-8 text-stone">
                  أبرز فئاتنا للطازج والمجمد — بتغليف احترافي وتوريد بالجملة.
                </p>
              </div>
              <Link
                to="/products"
                className="inline-flex border-b border-secondary pb-2 text-sm font-bold text-secondary"
              >
                كل الفئات
              </Link>
            </div>
          </ScrollReveal>

          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item, index) => (
              <ScrollReveal key={item.slug} delay={(index % 3) * 70}>
                <ProductCard item={item} index={index} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y-sm bg-light">
        <div className="shell">
          <ScrollReveal>
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">بصريًا</p>
                <h2 className="display-title mt-4 text-3xl md:text-5xl">من المنتج إلى التعبئة</h2>
              </div>
              <Link to="/products/frozen-produce" className="text-sm font-bold text-secondary">
                المجمدات ←
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
            {mosaic.map((item, index) => (
              <ScrollReveal key={item.src} delay={(index % 3) * 40} className="bg-paper">
                <div className="group overflow-hidden aspect-square">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
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
        <div className="shell grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <ScrollReveal>
            <div className="group overflow-hidden aspect-[4/5] md:aspect-[5/6]">
              <img
                src={WUILT.aboutOffice}
                alt="مقر سفنت ستار"
                loading="lazy"
                className="img-zoom h-full w-full object-cover"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <p className="eyebrow">من نحن</p>
            <h2 className="display-title mt-5 text-4xl md:text-5xl">
              جودة المنتج أولًا. ثم التوسّع بثقة.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-stone md:text-lg">{SITE_COPY.aboutLead}</p>
            <Link
              to="/about"
              className="mt-8 inline-flex bg-secondary px-7 py-4 text-sm font-bold text-white transition hover:bg-primary hover:text-dark"
            >
              اعرف المزيد
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-dark text-white section-y">
        <div className="grain-overlay" aria-hidden />
        <div className="premium-grid absolute inset-0 opacity-20" aria-hidden />
        <div className="glow-spot -start-40 top-0 h-[520px] w-[520px] opacity-60" aria-hidden />
        <div className="shell relative">
          <ScrollReveal>
            <p className="eyebrow">الخطوة التالية</p>
            <h2 className="display-title mt-5 max-w-3xl text-4xl md:text-6xl">
              جاهزون لتوريد طلبك القادم؟
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/60">
              راسلنا بالمواصفات والكميات — ونرجع بعرض واضح.
            </p>
            <Link
              to="/contact"
              className="mt-9 inline-flex bg-primary px-7 py-4 text-sm font-bold text-dark transition hover:bg-white"
            >
              تواصل معنا
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
