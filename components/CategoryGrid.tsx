import PhotoTile from "./PhotoTile";

const CATEGORIES = [
  { name: "침구", desc: "시트 · 이불커버 · 커버렛", image: "/images/cat-bedding.jpg" },
  { name: "배스", desc: "타월 · 가운 · 배스 러그", image: "/images/cat-bath.jpg" },
  { name: "액세서리", desc: "스로우 · 필로우 · 홈케어", image: "/images/cat-accessory.jpg" },
];

export default function CategoryGrid() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <p className="text-xs tracking-[0.3em] uppercase text-forest-soft mb-2">Shop by Category</p>
        <h2 className="font-display text-2xl sm:text-3xl">카테고리별로 둘러보기</h2>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {CATEGORIES.map((cat) => (
          <a key={cat.name} href="#" className="group block">
            <PhotoTile
              src={cat.image}
              alt={cat.name}
              className="aspect-[3/4] w-full"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
            <div className="mt-3">
              <h3 className="font-display text-lg group-hover:text-forest transition-colors">{cat.name}</h3>
              <p className="text-sm text-charcoal/60">{cat.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
