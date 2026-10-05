export default function CategoryCard({ name, image, onClick }) {
  return (
    <button onClick={onClick} className="group text-center">
      <div className="overflow-hidden rounded-2xl bg-beige ring-1 ring-gold/20">
        <img src={image} alt={name} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <h3 className="mt-3 text-xl font-semibold">{name}</h3>
      <span className="text-sm text-gold-dark underline-offset-4 group-hover:underline">View Collection</span>
    </button>)
}
