// Placeholder photos (golden tiles). Real photos from Supabase replace these automatically.
const ph = (t, h = 40) => `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='800' height='1000'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='hsl(${h},45%,93%)'/><stop offset='1' stop-color='hsl(${h},38%,80%)'/></linearGradient></defs><rect width='800' height='1000' fill='url(#g)'/><circle cx='400' cy='450' r='130' fill='none' stroke='#C9A24D' stroke-width='6'/><circle cx='400' cy='450' r='90' fill='none' stroke='#C9A24D' stroke-width='2'/><text x='400' y='700' font-family='serif' font-size='44' text-anchor='middle' fill='#8a6d2f'>${t}</text></svg>`)}`
const mk = (i, name, category, price, featured, sizes = '') => ({
  id: 's' + i, name, category, price, featured, sizes,
  product_code: `DH-${category.slice(0, 2).toUpperCase()}${100 + i}`,
  description: `${name} – a graceful one-gram piece with a rich gold finish, made for festive and everyday wear. Light, comfortable and beautifully detailed.`,
  created_at: new Date(2026, 0, 30 - i).toISOString(),
  images: [ph(name, 38 + i), ph(name + ' – detail', 42 + i), ph(name + ' – worn', 36 + i)],
})
export const sampleProducts = [
  mk(1, 'Temple Kada Bangles', 'Bangles', 3200, true, '2.4, 2.6, 2.8'),
  mk(2, 'Antique Peacock Bangles', 'Bangles', 4800, false, '2.4, 2.6, 2.8'),
  mk(3, 'Rope Gold Chain', 'Chains', 2500, true, '18 in, 20 in, 24 in'),
  mk(4, 'Flat Link Chain', 'Chains', 6200, false, '20 in, 24 in'),
  mk(5, 'Jhumka Earrings', 'Earrings', 1800, true),
  mk(6, 'Pearl Drop Earrings', 'Earrings', 2200, false),
  mk(7, 'Lakshmi Haram Necklace', 'Necklaces', 12500, true),
  mk(8, 'Kasulaperu Necklace', 'Necklaces', 9800, false),
  mk(9, 'Floral Adjustable Ring', 'Rings', 1400, false, 'Adjustable'),
  mk(10, 'Charm Bracelet', 'Bracelets', 2900, false, '6.5 in, 7 in'),
  mk(11, 'Ganesha Pendant', 'Pendants', 3600, true),
  mk(12, 'Bridal Choker Set', 'Sets', 24500, true),
  mk(13, 'Ruby Haram Set', 'Sets', 18500, false),
  mk(14, 'Minimal Stud Earrings', 'Earrings', 900, false),
  mk(15, 'Layered Necklace', 'Necklaces', 5400, false),
  mk(16, 'Stackable Rings Pair', 'Rings', 1100, false, 'Adjustable'),
]
export const categoryImages = Object.fromEntries(
  ['Bangles','Chains','Earrings','Necklaces','Rings','Bracelets','Pendants','Sets'].map((c, i) => [c, ph(c, 36 + i * 3)]))
export const heroImage = ph('Dhaatri', 40)
