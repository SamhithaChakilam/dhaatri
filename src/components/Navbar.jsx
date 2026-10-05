import { useState } from 'react'

const links = [
  ['Home', 'home'],
  ['Collections', 'collection'],
  ['About', 'about'],
  ['Contact', 'contact'],
]

export default function Navbar({ go }) {
  const [open, setOpen] = useState(false)

  const click = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    go(id)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-beige bg-ivory/90 backdrop-blur">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3"
        aria-label="Main"
      >

        {/* Dhaatri Logo */}
        <a
          href="#/"
          onClick={click('home')}
          className="flex items-center"
        >
          <img
            src="https://i.ibb.co/chXwkFBt/dhaatri-logo.jpg"
            
            alt="Dhaatri One Gram Gold Jewellery"
            className="h-14 w-auto object-contain"
          />
        </a>

        {/* Desktop navigation */}
        <ul className="hidden gap-8 text-sm md:flex">
          {links.map(([l, id]) => (
            <li key={id}>
              <a
                href={'#' + id}
                onClick={click(id)}
                className="transition-colors hover:text-gold-dark"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className="p-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d={
                open
                  ? 'M5 5l14 14M19 5L5 19'
                  : 'M3 7h18M3 12h18M3 17h18'
              }
            />
          </svg>
        </button>
      </nav>

      {/* Mobile navigation */}
      {open && (
        <ul className="border-t border-beige px-5 pb-4 md:hidden">
          {links.map(([l, id]) => (
            <li key={id}>
              <a
                href={'#' + id}
                onClick={click(id)}
                className="block py-3"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}