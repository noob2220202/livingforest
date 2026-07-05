import PlaceholderArt from "./PlaceholderArt";

const CATEGORIES = [
  { name: "침구", desc: "시트 · 이불커버 · 커버렛", palette: ["#cfc6ac", "#2f3e2f"] as [string, string] },
  { name: "배스", desc: "타월 · 가운 · 배스 러그", palette: ["#e9e2d0", "#6b7a63"] as [string, string] },
  { name: "액세서리", desc: "스로우 · 필로우 · 홈케어", palette: ["#e4dcc6", "#b08d57"] as [string, string] },
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
            <PlaceholderArt palette={cat.palette} className="aspect-[3/4] w-full" />
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
