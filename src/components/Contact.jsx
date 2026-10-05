import { SHOP, wa } from '../config'
export default function Contact() {
  const rows = [['Store Address', SHOP.address], ['WhatsApp', SHOP.whatsapp], ['Instagram', '@dhaatri.jewelleryy'], ['Opening Hours', SHOP.hours]]
  return (
    <section id="contact" className="bg-beige/50"><div className="section">
      <h2 className="title">Visit Dhaatri</h2>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <dl className="space-y-4">{rows.map(([k, v]) => <div key={k}><dt className="text-sm text-cocoa/60">{k}</dt><dd>{v}</dd></div>)}</dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn btn-gold" target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SHOP.address)}`}>Get Directions</a>
            <a className="btn btn-line" target="_blank" rel="noreferrer" href={wa(`Hi, I'd like to know more about ${SHOP.name}.`)}>WhatsApp Us</a>
            <a className="btn btn-line" target="_blank" rel="noreferrer" href={SHOP.instagram}>Follow on Instagram</a>
          </div>
        </div>
        <iframe title="Store location" loading="lazy" className="h-72 w-full rounded-2xl border-0 md:h-full"
          src={`https://www.google.com/maps?q=${encodeURIComponent(SHOP.address)}&output=embed`} />
      </div></div></section>)
}
