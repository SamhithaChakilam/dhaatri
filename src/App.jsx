import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CategoryCard from './components/CategoryCard'
import ProductGrid from './components/ProductGrid'
import ProductCard from './components/ProductCard'
import FilterBar, { PRICE_RANGES } from './components/FilterBar'
import ProductDetails from './components/ProductDetails'
import About from './components/About'
import Features from './components/Features'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Admin from './pages/Admin'
import { CATEGORIES } from './config'
import { categoryImages } from './lib/sampleProducts'
import { useProducts } from './lib/useProducts'

export default function App() {
  const { products, loading, reload } = useProducts()

  const [hash, setHash] = useState(location.hash)
  const [product, setProduct] = useState(null)

  const [f, setF] = useState({
    q: '',
    category: 'All',
    price: 'all',
    sort: 'new',
  })

  useEffect(() => {
    const h = () => setHash(location.hash)

    addEventListener('hashchange', h)

    return () => {
      removeEventListener('hashchange', h)
    }
  }, [])

  const go = (id) => {
    setProduct(null)

    if (location.hash === '#/dhaatri-manage') {
      location.hash = '#/'
    }

    setTimeout(() => {
      if (id === 'home') {
        scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      } else {
        document
          .getElementById(id)
          ?.scrollIntoView({
            behavior: 'smooth',
          })
      }
    }, 60)
  }

  const open = (p) => {
    setProduct(p)
    scrollTo(0, 0)
  }

  const pickCategory = (c) => {
    setF({
      ...f,
      category: c,
    })

    go('collection')
  }

  const shown = useMemo(() => {
    const [, , lo, hi] = PRICE_RANGES.find(
      (r) => r[0] === f.price
    )

    const q = f.q.trim().toLowerCase()

    const getPrice = (p) =>
      p.offer_price != null
        ? Number(p.offer_price)
        : Number(p.original_price)

    const list = products.filter((p) => {
      const sellingPrice = getPrice(p)

      const matchesCategory =
        f.category === 'All' ||
        p.category === f.category

      const matchesPrice =
        f.price === 'all' ||
        (
          sellingPrice >= lo &&
          (
            hi === Infinity
              ? sellingPrice >= lo
              : sellingPrice < hi
          )
        )

      const matchesSearch =
        !q ||
        `${p.name} ${p.category} ${p.product_code}`
          .toLowerCase()
          .includes(q)

      return (
        matchesCategory &&
        matchesPrice &&
        matchesSearch
      )
    })

    return list.sort((a, b) => {
      const priceA = getPrice(a)
      const priceB = getPrice(b)

      if (f.sort === 'low') {
        return priceA - priceB
      }

      if (f.sort === 'high') {
        return priceB - priceA
      }

      return (
        new Date(b.created_at) -
        new Date(a.created_at)
      )
    })
  }, [products, f])

  // Hidden admin route
  if (hash === '#/dhaatri-manage') {
    return (
      <Admin
        products={products}
        reload={reload}
      />
    )
  }

  const featured = products
    .filter((p) => p.featured)
    .slice(0, 8)

  return (
    <>
      <Navbar go={go} />

      <main>
        {product ? (
          <ProductDetails
            product={product}
            onBack={() => {
              go('collection')
            }}
          />
        ) : (
          <>
            {/* ================= HERO ================= */}
            <Hero go={go} />

            {/* ================= CATEGORIES ================= */}
            <section className="section pb-8">
              <h2 className="title">
                Categories
              </h2>

              <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
                {CATEGORIES.map((c) => (
                  <CategoryCard
                    key={c}
                    name={c}
                    image={
                      products.find(
                        (p) => p.category === c
                      )?.images[0] ||
                      categoryImages[c]
                    }
                    onClick={() =>
                      pickCategory(c)
                    }
                  />
                ))}
              </div>
            </section>

            {/* ================= FEATURED ================= */}
            {featured.length > 0 && (
              <section className="bg-beige/50">
                <div className="section">
                  <h2 className="title">
                    Featured Jewellery
                  </h2>

                  <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
                    {featured.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        onOpen={open}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* ================= COLLECTION ================= */}
            <section
              id="collection"
              className="section pt-8"
            >
              <h2 className="title">
                Our Collection
              </h2>

              <div className="mt-10">
                <FilterBar
                  f={f}
                  setF={setF}
                />

                {loading ? (
                  <p className="py-16 text-center">
                    Loading…
                  </p>
                ) : (
                  <ProductGrid
                    products={shown}
                    onOpen={open}
                  />
                )}
              </div>
            </section>

            {/* ================= ABOUT ================= */}
            <About />

            {/* ================= WHY CHOOSE US ================= */}
            <Features />

            {/* ================= CONTACT ================= */}
            <Contact />
          </>
        )}
      </main>

      {/* ================= FOOTER ================= */}
      <Footer go={go} />
    </>
  )
}