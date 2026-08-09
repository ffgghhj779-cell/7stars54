import { Link } from 'react-router-dom'
import PageTitle from '../components/PageTitle'

export default function NotFound() {
  return (
    <div className="relative overflow-hidden bg-dark text-white">
      <PageTitle title="الصفحة غير موجودة | سفنت ستار" />
      <div className="premium-grid absolute inset-0 opacity-20" aria-hidden />
      <div className="grain-overlay" aria-hidden />
      <div className="glow-spot -end-32 top-10 h-[420px] w-[420px] opacity-60" aria-hidden />
      <div className="glow-spot glow-spot-green -start-24 bottom-0 h-[360px] w-[360px] opacity-50" aria-hidden />
      <section className="relative mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center px-5 py-32 text-center sm:px-8">
        <p className="stat-num text-7xl text-primary md:text-8xl">404</p>
        <h1 className="display-title mt-6 text-3xl md:text-5xl">الصفحة غير موجودة</h1>
        <p className="mt-5 max-w-md text-base leading-8 text-white/60">
          الرابط غير صحيح أو الصفحة اتنقلت. تقدر ترجع للمنتجات أو الصفحة الرئيسية.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex bg-primary px-7 py-4 text-sm font-bold text-dark transition hover:bg-white"
          >
            الرئيسية
          </Link>
          <Link
            to="/products"
            className="inline-flex border border-white/30 px-7 py-4 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-dark"
          >
            المنتجات
          </Link>
        </div>
      </section>
    </div>
  )
}
