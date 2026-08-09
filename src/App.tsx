import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppButton from './components/WhatsAppButton'
import { LanguageProvider } from './i18n/LanguageContext'
import { stripLangPrefix } from './i18n/language'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ProductCategory = lazy(() => import('./pages/ProductCategory'))
const Products = lazy(() => import('./pages/Products'))

/** Legacy `/en/*` bookmarks → English default (unprefixed). */
function LegacyEnRedirect() {
  const location = useLocation()
  const bare = stripLangPrefix(location.pathname)
  return <Navigate to={`${bare}${location.search}${location.hash}`} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ScrollToTop />
        <Navbar />
        <main className="w-full max-w-full">
          <Suspense fallback={<div className="min-h-[60svh] bg-paper" />}>
            <Routes>
              {/* English (default) */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:slug" element={<ProductCategory />} />
              <Route path="/contact" element={<Contact />} />

              {/* Arabic */}
              <Route path="/ar" element={<Home />} />
              <Route path="/ar/about" element={<About />} />
              <Route path="/ar/products" element={<Products />} />
              <Route path="/ar/products/:slug" element={<ProductCategory />} />
              <Route path="/ar/contact" element={<Contact />} />

              {/* Back-compat for previous English URLs */}
              <Route path="/en/*" element={<LegacyEnRedirect />} />
              <Route path="/en" element={<LegacyEnRedirect />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppButton />
      </LanguageProvider>
    </BrowserRouter>
  )
}
