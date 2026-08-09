import { useState, type FormEvent } from 'react'
import PageTitle from '../components/PageTitle'
import ScrollReveal from '../components/ScrollReveal'
import SocialLinks from '../components/SocialLinks'
import { CONTACT } from '../data/site'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '')
    const email = String(form.get('email') || '')
    const message = String(form.get('message') || '')
    const text = encodeURIComponent(`مرحبا، أنا ${name}\nالبريد: ${email}\n\n${message}`)
    window.open(`${CONTACT.social.whatsapp}?text=${text}`, '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  return (
    <div className="bg-paper text-ink">
      <PageTitle title="تواصل معنا | سفنت ستار" />

      <section className="relative overflow-hidden border-b border-line bg-dark text-white">
        <div className="premium-grid absolute inset-0 opacity-20" aria-hidden />
        <div className="grain-overlay" aria-hidden />
        <div className="glow-spot -end-32 top-0 hidden h-[440px] w-[440px] opacity-60 md:block" aria-hidden />
        <div className="shell relative pb-12 pt-28 sm:pb-16 sm:pt-36">
          <p className="eyebrow">تواصل معنا</p>
          <h1 className="display-title mt-4 max-w-3xl text-[1.85rem] sm:mt-5 sm:text-4xl md:text-6xl">
            نحن هنا لاستفساراتك وطلبات التوريد.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 sm:mt-6 sm:text-base sm:leading-8">
            أرسل تفاصيل الطلب عبر النموذج أو واتساب — ونرجع لك في أقرب وقت.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="shell grid gap-14 md:grid-cols-[0.85fr_1.15fr]">
          <ScrollReveal>
            <div className="space-y-4">
              <div className="spec-card">
                <p className="text-[11px] font-bold tracking-[0.16em] text-primary">العنوان</p>
                <p className="mt-2 text-sm leading-7">{CONTACT.addressAr}</p>
                <p className="display-en mt-1 text-xs text-stone" dir="ltr">
                  {CONTACT.addressEn}
                </p>
              </div>
              <div className="spec-card">
                <p className="text-[11px] font-bold tracking-[0.16em] text-primary">الهاتف</p>
                <div className="mt-2 space-y-1 text-sm">
                  {CONTACT.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone}`} className="block hover:text-secondary" dir="ltr">
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
              <div className="spec-card">
                <p className="text-[11px] font-bold tracking-[0.16em] text-primary">البريد</p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="mt-2 block text-sm hover:text-secondary"
                  dir="ltr"
                >
                  {CONTACT.email}
                </a>
              </div>
              <div className="spec-card">
                <p className="mb-3 text-[11px] font-bold tracking-[0.16em] text-primary">السوشيال</p>
                <SocialLinks tone="dark" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <form onSubmit={onSubmit} className="space-y-8 border border-line bg-light/60 p-6 sm:p-9">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                  الاسم
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="w-full border-b border-line bg-transparent px-0 py-3 text-sm outline-none transition focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                  البريد الإلكتروني
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full border-b border-line bg-transparent px-0 py-3 text-sm outline-none transition focus:border-primary"
                  dir="ltr"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold">
                  رسالتك / تفاصيل الطلب
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full resize-y border-b border-line bg-transparent px-0 py-3 text-sm outline-none transition focus:border-primary"
                />
              </div>
              <button
                type="submit"
                className="btn-press inline-flex min-h-12 w-full items-center justify-center bg-secondary px-7 py-4 text-sm font-bold text-white transition hover:bg-primary hover:text-dark sm:w-auto"
              >
                إرسال عبر واتساب
              </button>
              {sent && (
                <p className="text-sm text-secondary">
                  تم تجهيز الرسالة. لو واتساب ما اتفتحش، اسمح بالنوافذ المنبثقة.
                </p>
              )}
            </form>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
