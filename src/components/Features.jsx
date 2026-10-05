const I = { // simple line icons
  gem: 'M6 3h12l4 6-10 12L2 9zM2 9h20', hand: 'M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z',
  tag: 'M3 12V3h9l9 9-9 9zM7.5 7.5h.01', chat: 'M4 5h16v11H9l-5 4z' }
const items = [['gem', 'Elegant Designs', 'Beautiful designs inspired by timeless jewellery traditions.'],
  ['hand', 'Quality Craftsmanship', 'Carefully selected and crafted jewellery.'],
  ['tag', 'Affordable Luxury', 'Premium-looking jewellery at accessible prices.'],
  ['chat', 'Personal Assistance', 'Easy enquiries and personalized assistance through WhatsApp.']]
export default function Features() {
  return (
    <section className="section">
      <h2 className="title">Why Choose Us</h2>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([ic, t, d]) => (
          <div key={t} className="text-center">
            <svg className="mx-auto mb-3" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#C9A24D" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true"><path d={I[ic]} /></svg>
            <h3 className="text-xl font-semibold">{t}</h3><p className="mt-1 text-sm text-cocoa/70">{d}</p>
          </div>))}
      </div></section>)
}
