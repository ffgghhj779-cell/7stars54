import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import ScrollReveal from '../components/ScrollReveal'
import { getCatalogItem, getChildren, type CatalogBlock } from '../data/catalog'
import { CATALOG_EN } from '../data/catalog.en'
import { CATALOG_OVERRIDES } from '../data/catalogOverrides'
import { useLanguage } from '../i18n/language'
import type { Lang } from '../i18n/strings'

function cleanTitle(title: string) {
  return title.replace(/\\+"/g, '').replace(/\s+/g, ' ').trim()
}

function usefulDetails(
  details: CatalogBlock[],
  override?: CatalogBlock[],
) {
  if (override?.length) return override
  return details
    .map((block) => ({
      title: cleanTitle(block.title),
      lines: block.lines
        .map((line) => cleanTitle(line))
        .filter((line) => line && line !== cleanTitle(block.title)),
    }))
    .filter((block) => block.title.length > 1)
}

type ShowcaseCard = {
  key: string
  image?: string
  title: string
  lines: string[]
  index: number
}

function buildShowcases(gallery: string[], details: CatalogBlock[], lang: Lang): ShowcaseCard[] {
  const count = Math.max(gallery.length, details.length)
  const cards: ShowcaseCard[] = []

  for (let i = 0; i < count; i += 1) {
    const detail = details[i]
    const image = gallery[i]
    const title = detail?.title || (lang === 'ar' ? `صنف ${String(i + 1).padStart(2, '0')}` : `Item ${String(i + 1).padStart(2, '0')}`)
    const lines =
      detail?.lines?.length
        ? detail.lines
        : [
            lang === 'ar'
              ? 'مواصفات وتعبئة حسب طلب العميل — تواصل معنا لعرض مخصص.'
              : 'Specifications and packing available on request — contact us for a custom quote.',
          ]

    // Skip empty noise (no image and title-only duplicate)
    if (!image && lines.length === 1 && lines[0] === title) continue

    cards.push({
      key: `${i}-${image || title}`,
      image,
      title,
      lines: lines.slice(0, 8),
      index: i + 1,
    })
  }

  return cards
}

export default function ProductCategory() {
  const { slug } = useParams()
  const { lang, t, prefix } = useLanguage()
  const raw = slug ? getCatalogItem(slug) : undefined
  const override = slug ? CATALOG_OVERRIDES[slug] : undefined
  const enOverride = slug ? CATALOG_EN[slug] : undefined

  const item = useMemo(() => {
    if (!raw) return undefined
    if (lang === 'en') {
      return {
        ...raw,
        title: enOverride?.title || raw.title,
        blurb: enOverride?.blurb || raw.blurb,
        details: usefulDetails(raw.details || [], enOverride?.details),
      }
    }
    return {
      ...raw,
      blurb: override?.blurb || raw.blurb,
      details: usefulDetails(raw.details || [], override?.details),
    }
  }, [raw, override, enOverride, lang])

  const gallery = useMemo(() => {
    if (!item) return []
    const list = item.gallery?.length ? item.gallery : [item.image]
    return Array.from(new Set(list)).slice(0, 16)
  }, [item])

  const children = item ? getChildren(item.slug) : []
  const parent = item?.parent ? getCatalogItem(item.parent) : undefined
  const parentTitle = parent ? (lang === 'en' ? CATALOG_EN[parent.slug]?.title || parent.title : parent.title) : undefined

  // Hub categories (with subcategories) rely on the children cards above as the
  // primary navigation — only render a per-image showcase grid here if there's
  // real, curated content for the hub itself (avoids recycling raw noisy text).
  const showShowcase =
    children.length === 0 || Boolean((lang === 'en' ? enOverride?.details : override?.details)?.length)

  const showcases = useMemo(() => {
    if (!item || !showShowcase) return []
    return buildShowcases(gallery, item.details, lang)
  }, [gallery, item, showShowcase, lang])

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-40 text-center">
        <PageTitle title={lang === 'ar' ? 'القسم غير موجود | النجمة السابعة' : 'Category Not Found | Seventh Star'} />
        <h1 className="display-title text-3xl">{lang === 'ar' ? 'القسم غير موجود' : 'Category Not Found'}</h1>
        <Link to={`${prefix}/products`} className="mt-6 inline-flex font-bold text-secondary">
          {t('backToProducts')}
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full max-w-full bg-paper text-ink">
      <PageTitle title={`${item.title} | ${lang === 'ar' ? 'النجمة السابعة' : 'Seventh Star'}`} description={item.blurb} />

      {/* Intro */}
      <section className="relative overflow-hidden border-b border-line bg-dark text-white">
        <div className="absolute inset-0">
          <img
            src={item.image}
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
        </div>
        <div className="premium-grid absolute inset-0 opacity-20" aria-hidden />
        <div className="grain-overlay" aria-hidden />
        <div className="shell relative pb-12 pt-28 sm:pb-16 sm:pt-36">
          <p className="eyebrow break-safe">
            {t('ourProductsEyebrow')}
            {parentTitle ? ` · ${parentTitle}` : ''}
          </p>
          <h1 className="display-title mt-4 max-w-4xl text-[1.85rem] sm:mt-5 sm:text-4xl md:text-6xl">
            {item.title}
          </h1>
          <p className="break-safe mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:mt-5 sm:text-base sm:leading-8">
            {item.blurb}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to={`${prefix}/contact`}
              className="btn-press inline-flex min-h-12 items-center justify-center bg-primary px-7 py-4 text-sm font-bold text-dark transition hover:bg-white"
            >
              {t('requestQuote')}
            </Link>
            {parent && (
              <Link
                to={`${prefix}/products/${parent.slug}`}
                className="btn-press inline-flex min-h-12 items-center justify-center border border-white/30 px-7 py-4 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-dark"
              >
                {lang === 'ar' ? `العودة إلى ${parentTitle}` : `Back to ${parentTitle}`}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Subcategories as cards */}
      {children.length > 0 && (
        <section className="section-y border-b border-line bg-light">
          <div className="shell">
            <ScrollReveal>
              <div className="section-label">
                <div>
                  <p className="eyebrow">{t('subcategories')}</p>
                  <h2 className="display-title text-2xl sm:text-3xl md:text-4xl">
                    {lang === 'ar' ? 'اختر الفئة المناسبة' : 'Choose the Right Category'}
                  </h2>
                </div>
              </div>
            </ScrollReveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {children.map((child, index) => {
                const childEn = CATALOG_EN[child.slug]
                const childAr = CATALOG_OVERRIDES[child.slug]
                const childTitle = lang === 'en' ? childEn?.title || child.title : child.title
                const childBlurb = lang === 'en' ? childEn?.blurb || child.blurb : childAr?.blurb || child.blurb
                return (
                  <ScrollReveal key={child.slug} delay={(index % 3) * 60}>
                    <Link to={`${prefix}/products/${child.slug}`} className="product-card group">
                      <div className="relative overflow-hidden bg-mist aspect-[5/4]">
                        <img
                          src={child.image}
                          alt={childTitle}
                          loading="lazy"
                          decoding="async"
                          className="img-zoom h-full w-full object-cover"
                        />
                        <span className="stat-num absolute end-3 top-3 bg-dark/80 px-2.5 py-1 text-[11px] text-primary backdrop-blur-sm">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="break-safe text-lg font-semibold text-secondary">
                          {childTitle}
                        </h3>
                        <p className="break-safe mt-2 flex-1 text-sm leading-7 text-stone">
                          {childBlurb}
                        </p>
                        <span className="mt-5 inline-flex w-fit border-b border-primary pb-1 text-sm font-bold text-primary transition group-hover:border-secondary group-hover:text-secondary">
                          {t('viewCategory')}
                        </span>
                      </div>
                    </Link>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Each product / image as its own card with specs */}
      {showShowcase && (
      <section className="section-y">
        <div className="shell">
          <ScrollReveal>
            <div className="section-label">
              <div>
                <p className="eyebrow">{lang === 'ar' ? 'المعرض والمواصفات' : 'Gallery & Specifications'}</p>
                <h2 className="display-title text-2xl sm:text-3xl md:text-4xl">
                  {lang === 'ar' ? 'كل صنف بكارد ومواصفات واضحة' : 'Every Item with Its Own Card & Clear Specs'}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-stone">
                  {lang === 'ar'
                    ? 'كل صورة وكل مجموعة مواصفات معروضة بشكل مستقل — بسيط، واضح، وبتفاصيل توريد عملية.'
                    : 'Every image and every specification set is presented independently — simple, clear, and with practical supply details.'}
                </p>
              </div>
              <p className="display-en text-xs font-bold tracking-[0.14em] text-primary">
                {String(showcases.length).padStart(2, '0')} items
              </p>
            </div>
          </ScrollReveal>

          {showcases.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {showcases.map((card, index) => (
                <ScrollReveal key={card.key} delay={(index % 3) * 55}>
                  <article className="product-card">
                    <div className="relative overflow-hidden bg-mist aspect-[5/4]">
                      {card.image ? (
                        <img
                          src={card.image}
                          alt={card.title}
                          loading="lazy"
                          decoding="async"
                          className="img-zoom h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-secondary/10 px-6 text-center">
                          <p className="display-en text-sm font-bold tracking-[0.14em] text-primary">
                            SPECS
                          </p>
                        </div>
                      )}
                      <span className="stat-num absolute end-3 top-3 bg-dark/80 px-2.5 py-1 text-[11px] text-primary backdrop-blur-sm">
                        {String(card.index).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="break-safe text-lg font-semibold text-secondary">
                        {card.title}
                      </h3>
                      <ul className="mt-3 flex-1 space-y-2 border-t border-line pt-3 text-sm leading-7 text-stone">
                        {card.lines.map((line, lineIndex) => (
                          <li key={`${card.key}-${lineIndex}`} className="break-safe flex gap-2">
                            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to={`${prefix}/contact`}
                        className="mt-5 inline-flex w-fit border-b border-primary pb-1 text-sm font-bold text-primary transition hover:border-secondary hover:text-secondary"
                      >
                        {t('requestThisItem')}
                      </Link>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="spec-card max-w-2xl">
              <p className="break-safe text-sm leading-7 text-stone">
                {lang === 'ar'
                  ? override?.emptyNote || 'تفاصيل المواصفات والتعبئة تُحدَّد حسب طلب العميل. تواصل معنا لعرض سعر مخصص.'
                  : 'Packing and specification details are determined per customer request. Contact us for a custom quote.'}
              </p>
            </div>
          )}
        </div>
      </section>
      )}

      {/* CTA */}
      <section className="relative overflow-hidden bg-dark text-white section-y-sm">
        <div className="grain-overlay" aria-hidden />
        <div className="shell relative flex w-full min-w-0 flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="w-full min-w-0">
            <p className="eyebrow">{t('nextStep')}</p>
            <h2 className="display-title mt-4 max-w-xl text-xl sm:text-2xl md:text-3xl">
              {lang === 'ar'
                ? `جاهزون نجهّز عرض سعر لـ ${item.title} حسب الكمية والمواصفات؟`
                : `Ready for us to prepare a quote for ${item.title} based on quantity and specs?`}
            </h2>
          </div>
          <Link
            to={`${prefix}/contact`}
            className="btn-press inline-flex min-h-12 w-full shrink-0 items-center justify-center bg-primary px-7 py-4 text-sm font-bold text-dark transition hover:bg-white sm:w-auto"
          >
            {t('contactUs')}
          </Link>
        </div>
      </section>
    </div>
  )
}
