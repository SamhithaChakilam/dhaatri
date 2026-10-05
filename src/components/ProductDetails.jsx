import { useState } from 'react'
import { SHOP, wa } from '../config'

export default function ProductDetails({ product: p, onBack }) {
  const [i, setI] = useState(0)
  const [zoom, setZoom] = useState(null)

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()

    setZoom(
      `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`
    )
  }

  const hasOffer =
    p.offer_price != null &&
    p.original_price != null &&
    Number(p.offer_price) < Number(p.original_price)

  const originalPrice = Number(p.original_price)
  const offerPrice = Number(p.offer_price)

  const sellingPrice = hasOffer
    ? offerPrice
    : originalPrice

  const discount = hasOffer
    ? Math.round(
        ((originalPrice - offerPrice) / originalPrice) * 100
      )
    : 0

  return (
    <section className="section">
      <button
        onClick={onBack}
        className="mb-6 text-sm text-gold-dark hover:underline"
      >
        ← Back to Collection
      </button>

      <div className="grid gap-10 md:grid-cols-2">

        {/* Images */}
        <div>
          <div
            className="overflow-hidden rounded-2xl bg-beige"
            onMouseMove={move}
            onMouseLeave={() => setZoom(null)}
          >
            <img
              src={p.images[i]}
              alt={p.name}
              className="max-h-[600px] w-full object-contain transition-transform duration-200"
              style={
                zoom
                  ? {
                      transform: 'scale(1.8)',
                      transformOrigin: zoom
                    }
                  : undefined
              }
            />
          </div>

          <div className="mt-3 flex gap-3 overflow-x-auto">
            {p.images.map((src, n) => (
              <button
                key={n}
                onClick={() => setI(n)}
                aria-label={`Show image ${n + 1}`}
                className={`h-20 w-16 shrink-0 overflow-hidden rounded-lg border-2 ${
                  n === i
                    ? 'border-gold'
                    : 'border-transparent'
                }`}
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div>
          <p className="text-sm text-cocoa/60">
            {p.category}
          </p>

          <h1 className="mt-1 text-3xl font-semibold md:text-4xl">
            {p.name}
          </h1>

          {/* Price */}
          {p.original_price != null && (
            <div className="mt-4">
              {hasOffer ? (
                <div className="flex flex-wrap items-center gap-3">

                  {/* Original Price */}
                  <span className="text-lg text-cocoa/40 line-through">
                    ₹{originalPrice.toLocaleString('en-IN')}
                  </span>

                  {/* Offer Price */}
                  <span className="text-2xl font-semibold text-gold-dark">
                    ₹{offerPrice.toLocaleString('en-IN')}
                  </span>

                  {/* Discount */}
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {discount}% OFF
                  </span>

                </div>
              ) : (
                <p className="text-2xl text-gold-dark">
                  ₹{originalPrice.toLocaleString('en-IN')}
                </p>
              )}
            </div>
          )}

          {/* Description */}
          {p.description && (
            <p className="mt-5 leading-relaxed text-cocoa/80">
              {p.description}
            </p>
          )}

          {/* Product Details */}
          <dl className="mt-6 space-y-2 text-sm">

            {p.product_code && (
              <div className="flex gap-2">
                <dt className="text-cocoa/60">
                  Product code:
                </dt>
                <dd>{p.product_code}</dd>
              </div>
            )}

            {p.sizes && (
              <div className="flex gap-2">
                <dt className="text-cocoa/60">
                  Available sizes:
                </dt>
                <dd>{p.sizes}</dd>
              </div>
            )}

          </dl>

          {/* WhatsApp Enquiry */}
          <a
            className="btn btn-gold mt-8"
            target="_blank"
            rel="noreferrer"
            href={wa(
              `Hi, I'm interested in ${p.name}${
                p.product_code
                  ? ` (${p.product_code})`
                  : ''
              } from ${SHOP.name}. price: ₹${sellingPrice.toLocaleString(
                'en-IN'
              )}.`
            )}
          >
            Enquire on WhatsApp
          </a>

        </div>
      </div>
    </section>
  )
}