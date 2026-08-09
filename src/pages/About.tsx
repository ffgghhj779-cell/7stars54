import { Link } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import ScrollReveal from '../components/ScrollReveal'
import { SITE_COPY, WUILT } from '../data/site'

const values = [
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
]

const proof = [
  ['حلال وجودة', 'التزام بمعايير الذبح والجودة حيث ينطبق'],
  ['تعبئة احترافية', 'أحجام تناسب التجزئة والجملة والتصدير'],
  ['تغطية إقليمية', 'الإمارات · السعودية · الخليج'],
  ['شراكة B2B', 'عروض واضحة حسب الكمية وجدول الشحن'],
]

export default function About() {
  return (
    <div className="bg-paper text-ink">
      <PageTitle title="من نحن | سفنت ستار" />

      <section className="relative overflow-hidden bg-dark text-white">
        <div className="absolute inset-0">
          <img src={WUILT.aboutProduce} alt="" className="h-full w-full object-cover opacity-35" />
        </div>
        <div className="premium-grid absolute inset-0 opacity-25" aria-hidden />
        <div className="grain-overlay" aria-hidden />
        <div className="glow-spot -end-32 top-0 h-[480px] w-[480px] opacity-60" aria-hidden />
        <div className="shell relative pb-20 pt-36">
          <p className="eyebrow">من نحن</p>
          <h1 className="display-title mt-5 max-w-4xl text-4xl md:text-6xl lg:text-7xl">
            سفنت ستار إنتربرايزس ذ.م.م
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 md:text-lg">
            من شركات الأغذية العاملة في الشرق الأوسط — توريد طازج ومجمد بجودة عالية وشراكات تصدير موثوقة.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="shell grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <ScrollReveal>
            <div className="group overflow-hidden">
              <img
                src={WUILT.aboutOffice}
                alt="مكاتب سفنت ستار"
                className="img-zoom aspect-[5/4] w-full object-cover"
                loading="lazy"
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="eyebrow">قصتنا</p>
            <h2 className="display-title mt-5 text-3xl md:text-5xl">جودة المنتج أولًا. ثم التوسّع بثقة.</h2>
            <p className="mt-6 text-base leading-8 text-stone md:text-lg">{SITE_COPY.aboutLead}</p>
            <p className="mt-4 text-base leading-8 text-stone md:text-lg">
              نربط الموردين والأسواق بتجربة توريد واضحة: مواصفات دقيقة، تغليف احترافي، ومتابعة لوجستية.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-secondary text-white">
        <div className="grain-overlay" aria-hidden />
        <div className="shell relative grid gap-8 border-t border-white/10 py-12 md:grid-cols-4 md:gap-6 md:border-t-0 md:py-16">
          {proof.map(([title, text], index) => (
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
            <p className="eyebrow">قيمنا</p>
            <h2 className="display-title mt-5 text-3xl md:text-5xl">ما نلتزم به مع شركائنا</h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {values.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 80}>
                <div className="border-t border-line pt-6">
                  <p className="display-en text-xs font-bold tracking-[0.18em] text-primary">0{index + 1}</p>
                  <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
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
            <p className="eyebrow">الخطوة التالية</p>
            <h2 className="display-title mt-5 max-w-3xl text-4xl md:text-6xl">جاهزون لشراكة توريد؟</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/60">
              أخبرنا بالأصناف والكميات والأسواق المستهدفة — ونرجع بعرض واضح.
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
