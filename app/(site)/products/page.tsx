import Link from "next/link";
import { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { ProductCategory } from "@/lib/types";

export const metadata: Metadata = {
  title: "전체 상품 | 리빙포레스트",
};

const CATEGORIES: ProductCategory[] = ["침구", "배스", "액세서리"];

function buildHref(category?: string, filter?: string) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (filter) params.set("filter", filter);
  const qs = params.toString();
  return qs ? `/products?${qs}` : "/products";
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; filter?: string }>;
}) {
  const { category, filter } = await searchParams;

  let list = products;
  if (category && CATEGORIES.includes(category as ProductCategory)) {
    list = list.filter((p) => p.category === category);
  }
  if (filter === "new") {
    list = list.filter((p) => p.badge === "NEW");
  } else if (filter === "sale") {
    list = list.filter((p) => p.badge === "SALE" || p.compareAtPrice);
  }

  const heading =
    filter === "new" ? "신상품" : filter === "sale" ? "세일" : category ? category : "전체 상품";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <p className="text-xs tracking-[0.3em] uppercase text-forest-soft mb-2">Shop</p>
      <h1 className="font-display text-3xl mb-8">{heading}</h1>

      <div className="flex flex-wrap gap-2 mb-10 text-sm">
        <Link
          href="/products"
          className={`px-4 py-2 border ${
            !category && !filter ? "border-forest bg-forest text-linen" : "border-sand text-charcoal"
          }`}
        >
          전체
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            href={buildHref(c)}
            className={`px-4 py-2 border ${
              category === c ? "border-forest bg-forest text-linen" : "border-sand text-charcoal"
            }`}
          >
            {c}
          </Link>
        ))}
        <Link
          href={buildHref(undefined, "new")}
          className={`px-4 py-2 border ${
            filter === "new" ? "border-forest bg-forest text-linen" : "border-sand text-charcoal"
          }`}
        >
          신상품
        </Link>
        <Link
          href={buildHref(undefined, "sale")}
          className={`px-4 py-2 border ${
            filter === "sale" ? "border-forest bg-forest text-linen" : "border-sand text-charcoal"
          }`}
        >
          세일
        </Link>
      </div>

      {list.length === 0 ? (
        <p className="text-sm text-charcoal/60 py-16 text-center">해당 조건의 상품이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
          {list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
