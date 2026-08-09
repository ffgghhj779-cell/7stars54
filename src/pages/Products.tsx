import { Link } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import ScrollReveal from '../components/ScrollReveal'
import { PRODUCT_NAV, getCatalogItem, getChildren } from '../data/catalog'
import { CATALOG_EN } from '../data/catalog.en'
import { CATALOG_OVERRIDES } from '../data/catalogOverrides'
import { useLanguage } from '../i18n/language'
import type { Lang } from '../i18n/strings'

/** Correct numeral agreement per language: Arabic has مفرد/مثنى/جمع(3-10)/منصوب(11+); English is a simple singular/plural check. */
function formatCount(
  lang: Lang,
  count: number,
  forms: { one: string; two: string; few: string; many: string },
) {
  if (lang === 'en') return `${count} ${count === 1 ? forms.one : forms.many}`
  if (count === 1) return forms.one
  if (count === 2) return forms.two
  if (count >= 3 && count <= 10) return `${count} ${forms.few}`
  return `${count} ${forms.many}`
}

export default function Products() {
  const { lang, t, prefix } = useLanguage()
  const items = PRODUCT_NAV.flatMap((node) => {
    const item = getCatalogItem(node.slug)
    return item ? [{ node, item }] : []
  })

  return (
    <div className="bg-paper text-ink">
      <PageTitle
        title={
          lang === 'ar'
            ? 'منتجاتنا | النجمة السابعة — فئات الفواكه، الخضروات، اللحوم والمجمدات'
            : 'Our Products | Seventh Star — Fruits, Vegetables, Meat & Frozen Categories'
        }
        description={
          lang === 'ar'
            ? 'استكشف كل فئات منتجات النجمة السابعة: الفواكه والخضروات الطازجة، اللحوم والدجاج المجمد، الأسماك، الحبوب، الزيوت والمكسرات — بمواصفات توريد وتعبئة واضحة لكل فئة.'
            : 'Explore every Seventh Star product category: fresh fruits and vegetables, frozen meat and chicken, seafood, grains, oils and nuts — with clear supply and packing specifications for each category.'
        }
      />

      <section className="relative overflow-hidden border-b border-line bg-dark text-white">
        <div className="premium-grid absolute inset-0 opacity-20" aria-hidden />
        <div className="grain-overlay" aria-hidden />
        <div className="shell relative pb-12 pt-28 sm:pb-14 sm:pt-36">
          <p className="eyebrow">{t('ourProductsEyebrow')}</p>
          <h1 className="display-title mt-4 max-w-4xl text-[1.85rem] sm:mt-5 sm:text-4xl md:text-6xl">
            {lang === 'ar' ? 'فئات المنتجات' : 'Product Categories'}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
            {lang === 'ar'
              ? 'كل فئة معروضة في كارد مستقل — بوصف واضح، صورة مميزة، ودخول سريع للأقسام الفرعية.'
              : 'Each category is presented in its own card — with a clear description, a featured image, and quick access to subcategories.'}
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="shell">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {items.map(({ node, item }, index) => {
              const en = CATALOG_EN[item.slug]
              const title = lang === 'en' ? en?.title || item.title : item.title
              const blurb = lang === 'en' ? en?.blurb || item.blurb : CATALOG_OVERRIDES[item.slug]?.blurb || item.blurb
              const childCount = node.children?.length || getChildren(item.slug).length
              const imageCount = Array.from(new Set(item.gallery?.length ? item.gallery : [item.image])).length

              return (
                <ScrollReveal key={item.slug} delay={(index % 3) * 60}>
                  <Link to={`${prefix}/products/${item.slug}`} className="product-card group">
                    <div className="relative overflow-hidden bg-mist aspect-[5/4]">
                      <img
                        src={item.image}
                        alt={title}
                        loading="lazy"
                        decoding="async"
                        className="img-zoom h-full w-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/75 to-transparent p-4 pt-12">
                        <p className="stat-num text-[11px] text-primary">
                          {String(index + 1).padStart(2, '0')}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="break-safe text-xl font-semibold text-secondary">{title}</h2>
                      <p className="break-safe mt-2 flex-1 text-sm leading-7 text-stone">{blurb}</p>

                      <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4 text-[11px] font-semibold text-stone">
                        {childCount > 0 && (
                          <span className="border border-line bg-light px-2.5 py-1">
                            {formatCount(lang, childCount, {
                              one: lang === 'ar' ? 'قسم فرعي واحد' : 'Subcategory',
                              two: 'قسمان فرعيان',
                              few: lang === 'ar' ? 'أقسام فرعية' : 'Subcategories',
                              many: lang === 'ar' ? 'قسمًا فرعيًا' : 'Subcategories',
                            })}
                          </span>
                        )}
                        <span className="border border-line bg-light px-2.5 py-1">
                          {formatCount(lang, imageCount, {
                            one: lang === 'ar' ? 'صورة واحدة' : 'Photo',
                            two: 'صورتان',
                            few: lang === 'ar' ? 'صور' : 'Photos',
                            many: lang === 'ar' ? 'صورةً' : 'Photos',
                          })}
                        </span>
                      </div>

                      {node.children?.length ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {node.children.slice(0, 4).map((child) => (
                            <span
                              key={child.slug}
                              className="max-w-full break-safe border border-line px-2.5 py-1 text-xs text-ink/70"
                            >
                              {lang === 'en' ? CATALOG_EN[child.slug]?.title || child.title : child.title}
                            </span>
                          ))}
                          {node.children.length > 4 && (
                            <span className="px-1 text-xs text-stone">+{node.children.length - 4}</span>
                          )}
                        </div>
                      ) : null}

                      <span className="mt-5 inline-flex w-fit border-b border-primary pb-1 text-sm font-bold text-primary transition group-hover:border-secondary group-hover:text-secondary">
                        {t('exploreCategory')}
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-secondary text-white section-y-sm">
        <div className="grain-overlay" aria-hidden />
        <div className="shell relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="eyebrow">{lang === 'ar' ? 'توريد بالجملة' : 'Bulk Supply'}</p>
            <h2 className="display-title mt-4 max-w-xl text-2xl md:text-3xl">
              {lang === 'ar' ? 'حدّد الفئة والكميات — ونرجع بعرض واضح.' : 'Choose the category and quantities — we\u2019ll come back with a clear quote.'}
            </h2>
          </div>
          <Link
            to={`${prefix}/contact`}
            className="btn-press inline-flex min-h-12 w-full items-center justify-center bg-primary px-7 py-4 text-sm font-bold text-dark transition hover:bg-white sm:w-auto"
          >
            {t('requestQuote')}
          </Link>
        </div>
      </section>
    </div>
  )
}
