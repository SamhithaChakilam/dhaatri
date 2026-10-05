import { SHOP, wa } from '../config'
export default function Footer({ go }) {
  const L = [['Home', 'home'], ['Collections', 'collection'], ['About', 'about'], ['Contact', 'contact']]
  return (
    <footer className="bg-cocoa text-ivory/80"><div className="mx-auto max-w-7xl px-5 py-12 text-center">
      <p className="font-serif text-2xl text-ivory">Dhaatri One Gram Jewellery</p>
      <p className="mt-1 text-sm">Elegance that lasts. Beauty that shines.</p>
      <ul className="mt-6 flex justify-center gap-6 text-sm">{L.map(([l, id]) => <li key={id}><a href={'#' + id} onClick={(e) => { e.preventDefault(); go(id) }} className="hover:text-gold">{l}</a></li>)}</ul>
      <div className="mt-6 flex justify-center gap-5 text-sm">
        <a href={SHOP.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-gold">Instagram</a>
        <a href={wa('Hi!')} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:text-gold">WhatsApp</a>
      </div>
      <p className="mt-8 text-xs text-ivory/50">© 2026 Dhaatri One Gram Jewellery. All rights reserved.</p>
    </div></footer>)
}
