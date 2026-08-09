import { Link } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import ScrollReveal from '../components/ScrollReveal'
import { PRODUCT_NAV, getCatalogItem } from '../data/catalog'
import { CATALOG_OVERRIDES } from '../data/catalogOverrides'

export default function Products() {
  const items = PRODUCT_NAV.flatMap((node) => {
    const item = getCatalogItem(node.slug)
    return item ? [{ node, item }] : []
  })

  return (
    <div className="bg-paper text-ink">
      <PageTitle title="منتجاتنا | سفنت ستار" />

      <section className="relative overflow-hidden border-b border-line bg-dark text-white">
        <div className="premium-grid absolute inset-0 opacity-20" aria-hidden />
        <div className="grain-overlay" aria-hidden />
        <div className="glow-spot -end-32 top-0 h-[440px] w-[440px] opacity-60" aria-hidden />
        <div className="glow-spot glow-spot-green -start-24 bottom-0 h-[360px] w-[360px] opacity-50" aria-hidden />
        <div className="shell relative pb-14 pt-36">
          <p className="eyebrow">منتجاتنا</p>
          <h1 className="display-title mt-5 max-w-4xl text-4xl md:text-6xl">فئات المنتجات</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 md:text-lg">
            محفظة متكاملة من الطازج والمجمد — بتعبئة وتوريد تناسب الأسواق الإقليمية والعالمية.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="shell space-y-16">
          {items.map(({ node, item }, index) => {
            const blurb = CATALOG_OVERRIDES[item.slug]?.blurb || item.blurb
            const reverse = index % 2 === 1
            return (
              <ScrollReveal key={item.slug}>
                <div
                  className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 ${
                    reverse ? 'md:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <Link to={`/products/${item.slug}`} className="group overflow-hidden bg-mist aspect-[5/4]">
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      className="img-zoom h-full w-full object-cover"
                    />
                  </Link>
                  <div>
                    <p className="display-en text-[11px] font-bold tracking-[0.16em] text-primary">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <Link to={`/products/${item.slug}`}>
                      <h2 className="mt-3 text-2xl font-semibold transition hover:text-secondary md:text-3xl">
                        {item.title}
                      </h2>
                    </Link>
                    <p className="mt-4 text-sm leading-7 text-stone md:text-base">{blurb}</p>
                    {node.children?.length ? (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {node.children.map((child) => (
                          <Link
                            key={child.slug}
                            to={`/products/${child.slug}`}
                            className="border border-line px-3 py-1.5 text-xs font-semibold text-ink/70 transition hover:border-secondary hover:text-secondary"
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                    <Link
                      to={`/products/${item.slug}`}
                      className="mt-6 inline-flex border-b border-primary pb-1 text-sm font-bold text-primary transition hover:border-secondary hover:text-secondary"
                    >
                      عرض الفئة
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </section>
    </div>
  )
}
