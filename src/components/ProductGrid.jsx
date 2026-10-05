import ProductCard from './ProductCard'
export default function ProductGrid({ products, onOpen }) {
  if (!products.length) return <p className="py-16 text-center text-cocoa/60">No jewellery found. Try changing your filters.</p>
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
      {products.map(p => <ProductCard key={p.id} product={p} onOpen={onOpen} />)}
    </div>)
}
