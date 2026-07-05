import PhotoTile from "./PhotoTile";
import { newArrivals } from "@/data/products";

export default function GetTheLook() {
  return (
    <section className="bg-linen-deep">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-10 items-center">
        <PhotoTile
          src="/images/get-the-look.jpg"
          alt="엘라 리넨 컬렉션"
          label="Ella Collection"
          className="aspect-[4/3] w-full"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-forest-soft mb-2">Get the Look</p>
          <h2 className="font-display text-2xl sm:text-3xl mb-4">엘라 리넨 컬렉션</h2>
          <p className="text-charcoal/80 leading-relaxed mb-6">
            은은한 세이지 톤과 워시드 리넨의 자연스러운 질감이 어우러진 신규
            컬렉션. 침실에 편안한 자연의 색을 더해보세요.
          </p>
          <ul className="space-y-3 mb-8">
            {newArrivals.map((product) => (
              <li key={product.id} className="flex items-center justify-between text-sm border-b border-sand pb-3">
                <span>{product.name}</span>
                <span className="text-charcoal/70">{product.price.toLocaleString("ko-KR")}원</span>
              </li>
            ))}
          </ul>
          <a
            href="#new-arrivals"
            className="inline-block bg-forest text-linen px-8 py-3 text-sm tracking-wide hover:bg-forest-light transition-colors"
          >
            컬렉션 전체 보기
          </a>
        </div>
      </div>
    </section>
  );
}
