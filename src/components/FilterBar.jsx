import { CATEGORIES } from '../config'

export const PRICE_RANGES = [
  ['all', 'All prices', 0, Infinity],
  ['u500', 'Under ₹500', 0, 500],
  ['500-1000', '₹500 – ₹1,000', 500, 1000],
  ['1000-1500', '₹1,000 – ₹1,500', 1000, 1500],
  ['o1500', 'Above ₹1,500', 1500, Infinity],
]

export default function FilterBar({ f, setF }) {
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  return (
    <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <input
        className="input"
        type="search"
        placeholder="Search jewellery..."
        aria-label="Search jewellery"
        value={f.q}
        onChange={set('q')}
      />

      <select
        className="input"
        aria-label="Category"
        value={f.category}
        onChange={set('category')}
      >
        {['All', ...CATEGORIES].map(c => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <select
        className="input"
        aria-label="Price range"
        value={f.price}
        onChange={set('price')}
      >
        {PRICE_RANGES.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>

      <select
        className="input"
        aria-label="Sort by"
        value={f.sort}
        onChange={set('sort')}
      >
        <option value="new">Sort: Newest</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>
    </div>
  )
}