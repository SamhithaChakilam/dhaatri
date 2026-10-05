const LOGO_URL = "https://i.ibb.co/chXwkFBt/dhaatri-logo.jpg"

export default function Hero({ go }) {
  return (
    <section id="home" className="bg-gradient-to-b from-ivory to-beige/60">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-24">

        {/* Left side */}
        <div>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Dhaatri One Gram Gold Jewellery
          </h1>

          <p className="mt-4 font-serif text-xl text-gold-dark md:text-2xl">
            Elegance that lasts. Beauty that shines.
          </p>

          <p className="mt-4 max-w-md leading-relaxed text-cocoa/80">
            Discover timeless one-gram jewellery crafted to add elegance to every occasion.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              className="btn btn-gold"
              onClick={() => go('collection')}
            >
              Explore Collection
            </button>

            <button
              className="btn btn-line"
              onClick={() => go('contact')}
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Right side - Logo only */}
        <div className="flex items-center justify-center">
          <img
            src={LOGO_URL}
            alt="Dhaatri One Gram Gold Jewellery"
            className="w-full max-w-sm object-contain md:max-w-md"
          />
        </div>

      </div>
    </section>
  )
}