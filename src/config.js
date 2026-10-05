// ✏️ Shop owner: change these details to your real ones.
export const SHOP = {
  name: 'Dhaatri One Gram Gold Jewellery',
  whatsapp: '9347950477',
  instagram: 'https://instagram.com/dhaatri.jewelleryy',
  address: 'Dhaatri Shopping Corner, Subedari, Hanamkonda, Telangana 506001',
  hours: '10:30 AM – 9:30 PM',
  mapQuery: '17.9937759,79.5355508',
  mapsUrl: 'https://maps.app.goo.gl/3BXMWg7Ff4kcp6CP6',
}

export const CATEGORIES = [
  'Bangles',
  'Chains',
  'Earrings',
  'Sets',
  'Other Jewellery'
]

export const wa = (text) =>
  `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`