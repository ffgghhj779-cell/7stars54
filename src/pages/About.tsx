import { Link } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import ScrollReveal from '../components/ScrollReveal'
import { SITE_COPY, WUILT } from '../data/site'
import { useLanguage } from '../i18n/language'

const values = {
  ar: [
    {
      title: 'خدمة تجارية موثوقة',
      text: 'نبني علاقات طويلة الأمد عبر الالتزام بالمواصفات ومواعيد التسليم.',
    },
    {
      title: 'تطوير الوصول للأسواق',
      text: 'ندعم توسّع المنتجات في السعودية والخليج والأسواق الدولية المستهدفة.',
    },
    {
      title: 'لوجستيات وتصدير',
      text: 'خبرة في التعبئة، الحاويات المبرّدة، ومتطلبات الشحن للتوريد بالجملة.',
    },
  ],
  en: [
    {
      title: 'Trusted Trade Service',
      text: 'We build long-term relationships through commitment to specifications and delivery schedules.',
    },
    {
      title: 'Market Access Development',
      text: 'We support product expansion into Saudi Arabia, the GCC and targeted international markets.',
    },
    {
      title: 'Logistics & Export',
      text: 'Expertise in packaging, refrigerated containers, and shipping requirements for bulk supply.',
    },
  ],
}

const proof = {
  ar: [
    ['حلال وجودة', 'التزام بمعايير الذبح والجودة حيث ينطبق'],
    ['تعبئة احترافية', 'أحجام تناسب التجزئة والجملة والتصدير'],
    ['تغطية إقليمية', 'الإمارات · السعودية · الخليج'],
    ['شراكة تجارية', 'عروض واضحة حسب الكمية وجدول الشحن'],
  ],
  en: [
    ['Halal & Quality', 'Commitment to slaughter and quality standards where applicable'],
    ['Professional Packing', 'Sizes suited to retail, wholesale and export'],
    ['Regional Coverage', 'UAE · Saudi Arabia · GCC'],
    ['Trade Partnership', 'Clear quotes based on quantity and shipping schedule'],
  ],
}

export default function About() {
  const { lang, t, prefix } = useLanguage()

  return (
    <div className="bg-paper text-ink">
      <PageTitle
        title={lang === 'ar' ? 'من نحن | سفنت ستار إنتربرايزس' : 'About Us | Seventh Star Enterprises'}
        description={
          lang === 'ar'
            ? 'سفنت ستار إنتربرايزس ذ.م.م — شركة أغذية عاملة في الشرق الأوسط، متخصصة في توريد وتصدير المنتجات الطازجة والمجمدة بجودة عالية وشراكات تصدير موثوقة.'
            : 'Seventh Star Enterprises LLC — a food company operating in the Middle East, specializing in the supply and export of fresh and frozen products with high quality and trusted export partnerships.'
        }
      />

      <section className="relative overflow-hidden bg-dark text-white">
        <div className="absolute inset-0">
          <img src={WUILT.aboutProduce} alt="" className="h-full w-full object-cover opacity-35" />
        </div>
        <div className="premium-grid absolute inset-0 opacity-25" aria-hidden />
        <div className="grain-overlay" aria-hidden />
        <div className="glow-spot -end-32 top-0 hidden h-[480px] w-[480px] opacity-60 md:block" aria-hidden />
        <div className="shell relative pb-14 pt-28 sm:pb-20 sm:pt-36">
          <p className="eyebrow">{t('aboutEyebrow')}</p>
          <h1 className="display-title mt-4 max-w-4xl text-[1.85rem] sm:mt-5 sm:text-4xl md:text-6xl lg:text-7xl">
            {lang === 'ar' ? 'سفنت ستار إنتربرايزس ذ.م.م' : 'Seventh Star Enterprises LLC'}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
            {lang === 'ar'
              ? 'من شركات الأغذية العاملة في الشرق الأوسط — توريد طازج ومجمد بجودة عالية وشراكات تصدير موثوقة.'
              : 'A food company operating across the Middle East — fresh and frozen supply at high quality, backed by trusted export partnerships.'}
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="shell grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <ScrollReveal>
            <div className="group overflow-hidden">
              <img
                src={WUILT.aboutOffice}
                alt={lang === 'ar' ? 'مكاتب سفنت ستار' : 'Seventh Star offices'}
                className="img-zoom aspect-[5/4] w-full object-cover"
                loading="lazy"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="eyebrow">{lang === 'ar' ? 'قصتنا' : 'Our Story'}</p>
            <h2 className="display-title mt-5 text-3xl md:text-5xl">
              {lang === 'ar' ? 'جودة المنتج أولًا. ثم التوسّع بثقة.' : 'Product Quality First. Then Expansion with Confidence.'}
            </h2>
            <p className="mt-6 text-base leading-8 text-stone md:text-lg">
              {lang === 'ar' ? SITE_COPY.aboutLead : SITE_COPY.aboutLeadEn}
            </p>
            <p className="mt-4 text-base leading-8 text-stone md:text-lg">
              {lang === 'ar'
                ? 'نربط الموردين والأسواق بتجربة توريد واضحة: مواصفات دقيقة، تغليف احترافي، ومتابعة لوجستية.'
                : 'We connect suppliers and markets with a clear supply experience: precise specifications, professional packaging, and dedicated logistics follow-up.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-secondary text-white">
        <div className="grain-overlay" aria-hidden />
        <div className="shell relative grid gap-8 border-t border-white/10 py-12 md:grid-cols-4 md:gap-6 md:border-t-0 md:py-16">
          {proof[lang].map(([title, text], index) => (
            <div key={title} className="border-t border-white/15 pt-6 md:border-t-0 md:border-s md:ps-6 md:first:border-s-0 md:first:ps-0">
              <p className="stat-num text-xs text-primary">0{index + 1}</p>
              <p className="mt-2 text-sm font-bold text-white">{title}</p>
              <p className="mt-2 text-sm leading-7 text-white/60">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-y">
        <div className="shell">
          <ScrollReveal>
            <p className="eyebrow">{lang === 'ar' ? 'قيمنا' : 'Our Values'}</p>
            <h2 className="display-title mt-5 text-3xl md:text-5xl">
              {lang === 'ar' ? 'ما نلتزم به مع شركائنا' : 'What We Commit to with Our Partners'}
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {values[lang].map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 80}>
                <div className="spec-card">
                  <p className="display-en text-xs font-bold tracking-[0.18em] text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-secondary">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-dark text-white section-y">
        <div className="grain-overlay" aria-hidden />
        <div className="premium-grid absolute inset-0 opacity-20" aria-hidden />
        <div className="glow-spot -end-32 bottom-0 h-[440px] w-[440px] opacity-60" aria-hidden />
        <div className="shell relative">
          <ScrollReveal>
            <p className="eyebrow">{t('nextStep')}</p>
            <h2 className="display-title mt-5 max-w-3xl text-4xl md:text-6xl">
              {lang === 'ar' ? 'جاهزون لشراكة توريد؟' : 'Ready for a Supply Partnership?'}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/60">
              {lang === 'ar'
                ? 'أخبرنا بالأصناف والكميات والأسواق المستهدفة — ونرجع بعرض واضح.'
                : 'Tell us the items, quantities and target markets — we\u2019ll come back with a clear quote.'}
            </p>
            <Link
              to={`${prefix}/contact`}
              className="mt-9 inline-flex bg-primary px-7 py-4 text-sm font-bold text-dark transition hover:bg-white"
            >
              {t('contactUs')}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
