import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import ScrollReveal from '../components/ScrollReveal'
import {
  HOME_EXTRA_CARDS,
  HOME_PACK_GALLERY,
  HOME_PRODUCE_GALLERY,
  HOME_PRODUCT_ROWS,
  type HomeCard,
} from '../data/homeShowcase'
import { SITE_COPY, WUILT } from '../data/site'
import { useLanguage } from '../i18n/language'
import { type Lang } from '../i18n/strings'

function HeroMedia({ poster }: { poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const onChange = () => setReduceMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reduceMotion) return
    const video = videoRef.current
    const wrap = wrapRef.current
    if (!video || !wrap) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => undefined)
        else video.pause()
      },
      { threshold: 0.2 },
    )
    io.observe(wrap)
    return () => io.disconnect()
  }, [reduceMotion])

  return (
    <div ref={wrapRef} className="hero-media absolute inset-0 bg-dark">
      {reduceMotion ? (
        <img
          src={poster}
          alt=""
          className="h-full w-full object-cover object-center"
          width={1920}
          height={1080}
        />
      ) : (
        <video
          ref={videoRef}
          className="hero-video h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden
        >
          <source src="/videos/hero.webm?v=20260815" type="video/webm" />
          <source src="/videos/hero.mp4?v=20260815" type="video/mp4" />
        </video>
      )}
    </div>
  )
}

function ProductCard({ item, index, lang, prefix }: { item: HomeCard; index: number; lang: Lang; prefix: string }) {
  const title = lang === 'en' ? item.titleEn || item.title : item.title
  const description = lang === 'en' ? item.descriptionEn || item.description : item.description

  return (
    <Link to={`${prefix}/products/${item.slug}`} className="product-card group">
      <div className="relative overflow-hidden bg-mist aspect-[5/4]">
        <img
          src={item.image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="img-zoom h-full w-full object-cover"
        />
        <span className="stat-num absolute end-3 top-3 bg-dark/80 px-2.5 py-1 text-[11px] text-primary backdrop-blur-sm">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-secondary sm:text-lg md:text-xl">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-7 text-stone">{description}</p>
        <span className="mt-5 inline-flex w-fit border-b border-primary pb-1 text-sm font-bold text-primary transition group-hover:border-secondary group-hover:text-secondary">
          {lang === 'ar' ? 'المزيد' : 'More'}
        </span>
      </div>
    </Link>
  )
}

const pillars = {
  ar: [
    ['جودة تصدير', 'فرز وتعبئة وشحن بمعايير تناسب الأسواق العالمية'],
    ['سلاسل تبريد', 'حفظ الطزاجة من المصدر حتى وصول الشحنة'],
    ['شراكات تجارية', 'توريد بالجملة ودعم لوجستي للتجّار والموزعين'],
  ],
  en: [
    ['Export Quality', 'Sorting, packing and shipping to standards fit for global markets'],
    ['Cold Chains', 'Preserving freshness from origin through to shipment arrival'],
    ['Trade Partnerships', 'Bulk supply and logistics support for traders and distributors'],
  ],
}

const stats = {
  ar: [
    ['+15', 'عامًا من الخبرة'],
    ['+30', 'فئة منتج'],
    ['+6', 'دول توريد'],
    ['24/7', 'دعم الطلبات'],
  ],
  en: [
    ['+15', 'Years of Experience'],
    ['+30', 'Product Categories'],
    ['+6', 'Supply Countries'],
    ['24/7', 'Order Support'],
  ],
}

export default function Home() {
  const { lang, t, prefix } = useLanguage()

  // Full catalog preview — every category gets its own card on the homepage
  const featured = [...HOME_PRODUCT_ROWS.flat(), ...HOME_EXTRA_CARDS]
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
      <PageTitle
        title={
          lang === 'ar'
            ? 'النجمة السابعة | 7th Star Food — تصدير وتوريد أغذية بجودة عالمية'
            : 'Seventh Star | 7th Star Food — World-Class Food Export & Supply'
        }
        description={
          lang === 'ar'
            ? 'شركة النجمة السابعة — تصدير وتوريد الفواكه والخضروات الطازجة، اللحوم والدجاج المجمد، الأسماك، الحبوب والمزيد بجودة تصدير للأسواق الإقليمية والعالمية.'
            : 'Seventh Star Enterprises — exporting and supplying fresh fruits and vegetables, frozen meat and chicken, seafood, grains and more at export quality for regional and global markets.'
        }
      />

      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-dark text-white">
        <HeroMedia poster={WUILT.heroPoster} />
        <div className="premium-grid absolute inset-0 opacity-35" aria-hidden />
        <div className="grain-overlay" aria-hidden />
        <div className="glow-spot -end-40 top-0 hidden h-[560px] w-[560px] opacity-70 md:block" aria-hidden />
        <div className="glow-spot glow-spot-green -start-32 bottom-0 hidden h-[480px] w-[480px] opacity-60 md:block" aria-hidden />

        <div className="shell relative z-10 pb-[max(5rem,env(safe-area-inset-bottom))] pt-28 sm:pb-20 sm:pt-36 lg:pb-16">
          <p className="eyebrow display-en">7th STAR · Food & Export</p>
          <h1 className="display-title mt-5 max-w-4xl text-[clamp(2.35rem,9vw,6.6rem)] leading-[1.05] sm:mt-6">
            {lang === 'ar' ? SITE_COPY.homeHeadline : SITE_COPY.homeHeadlineEn}
            <span className="mt-2 block text-[0.92em] text-white/90">
              {lang === 'ar' ? SITE_COPY.homeSub : SITE_COPY.homeSubEn}
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-[0.95rem] leading-8 text-white/65 sm:mt-7 sm:text-base md:text-lg">
            {lang === 'ar' ? SITE_COPY.homeLead : SITE_COPY.homeLeadEn}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <Link
              to={`${prefix}/products`}
              className="btn-press inline-flex min-h-12 items-center justify-center bg-primary px-7 py-4 text-sm font-bold text-dark transition hover:bg-white"
            >
              {lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}
            </Link>
            <Link
              to={`${prefix}/contact`}
              className="btn-press inline-flex min-h-12 items-center justify-center border border-white/30 px-7 py-4 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-dark"
            >
              {t('requestQuote')}
            </Link>
          </div>
          <div className="mt-10 grid gap-2 border-t border-white/15 pt-5 text-[11px] leading-5 text-white/45 sm:mt-14 sm:grid-cols-3 sm:items-center sm:pt-6 sm:text-xs">
            <p>{lang === 'ar' ? 'الإمارات · السعودية · الخليج' : 'UAE · Saudi Arabia · GCC'}</p>
            <p className="sm:text-center">{lang === 'ar' ? 'تصدير وتوريد بالجملة' : 'Bulk Export & Supply'}</p>
            <p className="display-en sm:text-end">Seventh Star Enterprises LLC</p>
          </div>
        </div>
      </section>

      <div className="divider-fade" aria-hidden />

      <section className="border-b border-line bg-paper">
        <div className="shell hairline-grid md:grid-cols-3">
          {pillars[lang].map(([title, text]) => (
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
          {stats[lang].map(([num, label]) => (
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
                <p className="eyebrow">{t('ourProductsEyebrow')}</p>
                <h2 className="display-title mt-4 text-[1.85rem] sm:mt-5 sm:text-4xl md:text-6xl">
                  {lang === 'ar' ? 'كل فئات المنتجات في مكان واحد' : 'Every Product Category in One Place'}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-stone sm:mt-4 sm:text-base sm:leading-8">
                  {lang === 'ar'
                    ? `${featured.length} فئةً للطازج والمجمد — بتغليف احترافي وتوريد بالجملة، وبكارد مستقل لكل فئة.`
                    : `${featured.length} fresh and frozen categories — professionally packed, supplied in bulk, each with its own dedicated card.`}
                </p>
              </div>
              <Link
                to={`${prefix}/products`}
                className="inline-flex w-fit border-b border-secondary pb-2 text-sm font-bold text-secondary"
              >
                {lang === 'ar' ? 'تفاصيل كل فئة ←' : 'Explore every category →'}
              </Link>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-x-5 gap-y-10 sm:mt-14 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3">
            {featured.map((item, index) => (
              <ScrollReveal key={item.slug} delay={(index % 3) * 50}>
                <ProductCard item={item} index={index} lang={lang} prefix={prefix} />
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
                <p className="eyebrow">{lang === 'ar' ? 'بصريًا' : 'Visually'}</p>
                <h2 className="display-title mt-3 text-2xl sm:mt-4 sm:text-3xl md:text-5xl">
                  {lang === 'ar' ? 'من المنتج إلى التعبئة' : 'From Product to Packaging'}
                </h2>
              </div>
              <Link to={`${prefix}/products/frozen-produce`} className="text-sm font-bold text-secondary">
                {lang === 'ar' ? 'المجمدات ←' : 'Frozen products →'}
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3">
            {mosaicMobile.map((item, index) => (
              <ScrollReveal key={`m-${item.src}`} delay={(index % 3) * 30} className="bg-paper sm:hidden">
                <div className="group overflow-hidden aspect-square">
                  <img
                    src={item.src}
                    alt={lang === 'en' ? item.altEn || item.alt : item.alt}
                    loading="lazy"
                    decoding="async"
                    className={`img-zoom h-full w-full ${item.contain ? 'object-contain p-3' : 'object-cover'}`}
                  />
                </div>
              </ScrollReveal>
            ))}
            {mosaicDesktop.map((item, index) => (
              <ScrollReveal key={`d-${item.src}`} delay={(index % 3) * 40} className="hidden bg-paper sm:block">
                <div className="group overflow-hidden aspect-square">
                  <img
                    src={item.src}
                    alt={lang === 'en' ? item.altEn || item.alt : item.alt}
                    loading="lazy"
                    decoding="async"
                    className={`img-zoom h-full w-full ${item.contain ? 'object-contain p-3' : 'object-cover'}`}
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
                alt={lang === 'ar' ? 'مقر النجمة السابعة' : 'Seventh Star headquarters'}
                loading="lazy"
                decoding="async"
                className="img-zoom h-full w-full object-cover"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <p className="eyebrow">{t('aboutEyebrow')}</p>
            <h2 className="display-title mt-4 text-[1.85rem] sm:mt-5 sm:text-4xl md:text-5xl">
              {lang === 'ar' ? 'جودة المنتج أولًا. ثم التوسّع بثقة.' : 'Product Quality First. Then Expansion with Confidence.'}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-stone sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
              {lang === 'ar' ? SITE_COPY.aboutLead : SITE_COPY.aboutLeadEn}
            </p>
            <Link
              to={`${prefix}/about`}
              className="btn-press mt-7 inline-flex min-h-12 items-center bg-secondary px-7 py-4 text-sm font-bold text-white transition hover:bg-primary hover:text-dark sm:mt-8"
            >
              {lang === 'ar' ? 'اعرف المزيد' : 'Learn More'}
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
            <p className="eyebrow">{t('nextStep')}</p>
            <h2 className="display-title mt-4 max-w-3xl text-[1.85rem] sm:mt-5 sm:text-4xl md:text-6xl">
              {lang === 'ar' ? 'جاهزون لتوريد طلبك القادم؟' : 'Ready to Supply Your Next Order?'}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/60 sm:mt-6 sm:text-base sm:leading-8">
              {lang === 'ar'
                ? 'راسلنا بالمواصفات والكميات — ونرجع بعرض واضح.'
                : 'Send us your specifications and quantities — we\u2019ll come back with a clear quote.'}
            </p>
            <Link
              to={`${prefix}/contact`}
              className="btn-press mt-8 inline-flex min-h-12 items-center bg-primary px-7 py-4 text-sm font-bold text-dark transition hover:bg-white sm:mt-9"
            >
              {t('contactUs')}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
