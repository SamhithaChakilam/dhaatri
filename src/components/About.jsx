export default function About() {
  return (
    <section id="about" className="bg-beige/50">
      <div className="section grid items-center gap-10 md:grid-cols-2">

        {/* Dhaatri Store */}
        <img
          src="https://i.ibb.co/MyLDDDy3/Elegant-Pink-Gold-Jewelry-Boutique.png"
          alt="Dhaatri One Gram Gold Jewellery store"
          loading="lazy"
          className="aspect-[4/3] w-full rounded-2xl object-cover shadow-sm"
        />

        {/* About Text */}
        <div>
          <h2 className="text-3xl font-semibold md:text-4xl">
            About Dhaatri
          </h2>

          <p className="mt-4 max-w-lg leading-relaxed text-cocoa/80">
            For over 19 years, Dhaatri has been part of your most special moments.
            We choose every piece with the same care we’d choose for our own family.
            From little everyday joys to grand celebrations, we’re here to add a little sparkle.
            <br />
            <br />
            <strong>
              Dhaatri — jewellery with a story, made to become part of yours.
            </strong>
          </p>
        </div>

      </div>
    </section>
  )
}