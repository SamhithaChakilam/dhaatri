export default function ProductCard({ product, onOpen }) {
  const hasOffer =
    product.offer_price != null &&
    product.offer_price < product.original_price

  const effectivePrice = hasOffer
    ? product.offer_price
    : product.original_price

  const discount = hasOffer
    ? Math.round(
        ((product.original_price - product.offer_price) /
          product.original_price) *
          100
      )
    : 0

  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <button
        onClick={() => onOpen(product)}
        className="block w-full text-left"
        aria-label={`View ${product.name}`}
      >
        <div className="overflow-hidden bg-beige">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-3 md:p-4">
          <h3 className="truncate text-lg font-semibold leading-tight">
            {product.name}
          </h3>

          <p className="text-xs text-cocoa/60">
            {product.category}
          </p>

          {effectivePrice != null && (
            <div className="mt-1">
              {hasOffer ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-cocoa/50 line-through">
                    ₹{Number(product.original_price).toLocaleString('en-IN')}
                  </span>

                  <span className="text-sm font-semibold text-gold-dark">
                    ₹{Number(product.offer_price).toLocaleString('en-IN')}
                  </span>

                  <span className="text-[10px] font-semibold text-green-700">
                    {discount}% OFF
                  </span>
                </div>
              ) : (
                <p className="text-sm font-medium text-gold-dark">
                  ₹{Number(effectivePrice).toLocaleString('en-IN')}
                </p>
              )}
            </div>
          )}

          <span className="mt-3 inline-block rounded-full border border-gold px-4 py-1.5 text-xs transition-colors group-hover:bg-gold group-hover:text-white">
            View Details
          </span>
        </div>
      </button>
    </article>
  )
}