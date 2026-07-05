import Link from "next/link";
import { bestSellers } from "@/data/products";
import ProductCard from "./ProductCard";

export default function BestSellers() {
  return (
    <section id="best-sellers" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-forest-soft mb-2">Best Sellers</p>
          <h2 className="font-display text-2xl sm:text-3xl">가장 사랑받는 컬렉션</h2>
        </div>
        <Link href="/products" className="hidden sm:block text-sm text-forest hover:underline">
          전체 보기
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
