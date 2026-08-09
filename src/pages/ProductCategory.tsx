import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageTitle from '../components/PageTitle'
import { getCatalogItem, getChildren } from '../data/catalog'
import { CATALOG_OVERRIDES } from '../data/catalogOverrides'

function usefulDetails(
  details: { title: string; lines: string[] }[],
  override?: { title: string; lines: string[] }[],
) {
  if (override?.length) return override
  return details.filter((block) => {
    const lines = block.lines.filter((line) => line && line !== block.title)
    return lines.length > 0
  }).map((block) => ({
    ...block,
    lines: block.lines.filter((line) => line && line !== block.title),
  }))
}

export default function ProductCategory() {
  const { slug } = useParams()
  const raw = slug ? getCatalogItem(slug) : undefined
  const override = slug ? CATALOG_OVERRIDES[slug] : undefined

  const item = useMemo(() => {
    if (!raw) return undefined
    return {
      ...raw,
      blurb: override?.blurb || raw.blurb,
      details: usefulDetails(raw.details || [], override?.details),
    }
  }, [raw, override])

  const gallery = useMemo(() => {
    if (!item) return []
    const list = item.gallery?.length ? item.gallery : [item.image]
    return Array.from(new Set(list)).slice(0, 12)
  }, [item])

  const [active, setActive] = useState(0)
  const children = item ? getChildren(item.slug) : []
  const parent = item?.parent ? getCatalogItem(item.parent) : undefined

  useEffect(() => {
    setActive(0)
  }, [slug])

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-40 text-center">
        <PageTitle title="القسم غير موجود | سفنت ستار" />
        <h1 className="display-title text-3xl">القسم غير موجود</h1>
        <Link to="/products" className="mt-6 inline-flex font-bold text-secondary">
          العودة للمنتجات
        </Link>
      </div>
    )
  }

  const mainImage = gallery[active] || item.image

  return (
    <div className="bg-paper text-ink">
      <PageTitle title={`${item.title} | سفنت ستار`} />

      <section className="shell grid items-start gap-8 pb-14 pt-28 md:grid-cols-2 md:gap-14 md:pb-28 md:pt-32">
        <div className="order-2 md:order-1">
          <p className="eyebrow">منتجاتنا{parent ? ` · ${parent.title}` : ''}</p>
          <h1 className="display-title mt-4 text-[1.85rem] sm:mt-5 sm:text-4xl md:text-6xl">{item.title}</h1>
          <p className="mt-4 text-sm leading-7 text-stone sm:mt-6 sm:text-base sm:leading-8 md:text-lg">{item.blurb}</p>

          {children.length > 0 && (
            <div className="mt-8 border-t border-line pt-6 sm:mt-10 sm:pt-8">
              <h2 className="text-lg font-semibold text-secondary">أقسام فرعية</h2>
              <div className="mt-5 divide-y divide-line border-y border-line">
                {children.map((child) => {
                  const childOverride = CATALOG_OVERRIDES[child.slug]
                  return (
                    <Link
                      key={child.slug}
                      to={`/products/${child.slug}`}
                      className="group flex min-h-14 items-start justify-between gap-4 py-4 transition hover:bg-light/80 sm:py-5"
                    >
                      <div>
                        <p className="font-semibold group-hover:text-secondary">{child.title}</p>
                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-stone">
                          {childOverride?.blurb || child.blurb}
                        </p>
                      </div>
                      <span className="mt-1 text-primary transition group-hover:-translate-x-1">←</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {item.details.length > 0 ? (
            item.details.map((block, index) => (
              <div key={`${block.title}-${index}`} className="mt-8 border-t border-line pt-6">
                <h2 className="text-lg font-semibold text-secondary">{block.title}</h2>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-stone">
                  {block.lines.map((line, lineIndex) => (
                    <li key={`${index}-${lineIndex}`}>{line}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div className="mt-8 border-t border-line pt-6 sm:mt-10">
              <p className="text-sm leading-7 text-stone">
                {override?.emptyNote ||
                  'تفاصيل المواصفات والتعبئة تُحدَّد حسب طلب العميل. تواصل معنا لعرض سعر مخصص.'}
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            {parent && (
              <Link
                to={`/products/${parent.slug}`}
                className="btn-press inline-flex min-h-12 items-center justify-center border border-line px-6 py-4 text-sm font-bold text-ink transition hover:border-secondary"
              >
                العودة إلى {parent.title}
              </Link>
            )}
            <Link
              to="/contact"
              className="btn-press inline-flex min-h-12 items-center justify-center bg-secondary px-7 py-4 text-sm font-bold text-white transition hover:bg-primary hover:text-dark"
            >
              اطلب عرض سعر لهذا القسم
            </Link>
          </div>
        </div>

        <div className="order-1 space-y-3 md:sticky md:top-28 md:order-2">
          <div className="overflow-hidden bg-mist aspect-[5/4]">
            <img
              key={mainImage}
              src={mainImage}
              alt={item.title}
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          {gallery.length > 1 && (
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:pb-0">
              {gallery.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`h-16 w-16 shrink-0 overflow-hidden bg-mist aspect-square transition sm:h-auto sm:w-auto ${
                    active === index ? 'ring-2 ring-primary' : 'opacity-80 hover:opacity-100'
                  }`}
                  aria-label={`عرض صورة ${index + 1}`}
                >
                  <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden bg-dark text-white section-y-sm">
        <div className="grain-overlay" aria-hidden />
        <div className="glow-spot end-10 -top-16 hidden h-[320px] w-[320px] opacity-50 md:block" aria-hidden />
        <div className="shell relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="eyebrow">اطلب الآن</p>
            <h2 className="display-title mt-4 max-w-lg text-xl sm:text-2xl md:text-3xl">
              مهتم بـ{item.title}؟ نجهّز لك عرض سعر بالمواصفات والكمية المطلوبة.
            </h2>
          </div>
          <Link
            to="/contact"
            className="btn-press inline-flex min-h-12 w-full shrink-0 items-center justify-center bg-primary px-7 py-4 text-sm font-bold text-dark transition hover:bg-white sm:w-auto"
          >
            تواصل معنا
          </Link>
        </div>
      </section>
    </div>
  )
}
