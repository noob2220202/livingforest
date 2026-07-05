"use client";

import { Product } from "@/lib/types";
import { useStore } from "@/lib/store-context";
import PhotoTile from "./PhotoTile";

const BADGE_STYLE: Record<NonNullable<Product["badge"]>, string> = {
  BEST: "bg-forest text-linen",
  NEW: "bg-gold text-white",
  SALE: "bg-charcoal text-linen",
};

function formatPrice(value: number) {
  return `${value.toLocaleString("ko-KR")}원`;
}

export default function ProductCard({ product }: { product: Product }) {
  const { openQuickView } = useStore();

  return (
    <div className="group flex flex-col">
      <div className="relative">
        <PhotoTile src={product.image} alt={product.name} className="aspect-[4/5] w-full" />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-2 py-1 text-[10px] tracking-wider ${BADGE_STYLE[product.badge]}`}
          >
            {product.badge}
          </span>
        )}
        <button
          onClick={() => openQuickView(product)}
          className="absolute inset-x-3 bottom-3 bg-white/95 text-charcoal text-xs tracking-wide py-2 opacity-0 translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0 focus:opacity-100 focus:translate-y-0"
        >
          Quick View
        </button>
      </div>
      <div className="mt-3">
        <p className="text-xs text-forest-soft">{product.material}</p>
        <h3 className="text-sm mt-1">{product.name}</h3>
        <div className="flex items-center gap-1 mt-1 text-xs text-charcoal/70">
          <span className="text-gold">★</span>
          <span>{product.rating.toFixed(1)}</span>
          <span className="text-charcoal/40">({product.reviewCount})</span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-xs text-charcoal/40 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
