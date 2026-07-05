"use client";

import { useState } from "react";
import { useStore } from "@/lib/store-context";
import PlaceholderArt from "./PlaceholderArt";

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart } = useStore();
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;
  const product = quickViewProduct;

  function handleClose() {
    setSize(null);
    setColor(null);
    setAdded(false);
    closeQuickView();
  }

  function handleAddToCart() {
    addToCart(1);
    setAdded(true);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4"
      onClick={handleClose}
    >
      <div
        className="bg-linen max-w-2xl w-full grid sm:grid-cols-2 gap-6 p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <PlaceholderArt palette={product.palette} className="aspect-square w-full" />
        <div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-forest-soft">{product.material}</p>
              <h3 className="font-display text-xl mt-1">{product.name}</h3>
            </div>
            <button onClick={handleClose} aria-label="닫기" className="text-charcoal/60 hover:text-charcoal">
              ✕
            </button>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm">
            <span className="text-gold">★</span>
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-charcoal/40">({product.reviewCount}개 리뷰)</span>
          </div>
          <p className="text-lg font-semibold mt-3">{product.price.toLocaleString("ko-KR")}원</p>
          <p className="text-sm text-charcoal/70 mt-3 leading-relaxed">{product.description}</p>

          <div className="mt-5">
            <p className="text-xs tracking-wide text-charcoal/70 mb-2">사이즈</p>
            <div className="flex flex-wrap gap-2">
              {product.options.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3 py-1.5 text-xs border ${
                    size === s ? "border-forest bg-forest text-linen" : "border-sand text-charcoal"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs tracking-wide text-charcoal/70 mb-2">컬러</p>
            <div className="flex flex-wrap gap-2">
              {product.options.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-3 py-1.5 text-xs border ${
                    color === c ? "border-forest bg-forest text-linen" : "border-sand text-charcoal"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-6 w-full bg-forest text-linen py-3 text-sm tracking-wide hover:bg-forest-light transition-colors disabled:opacity-50"
          >
            {added ? "장바구니에 담았습니다" : "장바구니 담기"}
          </button>
        </div>
      </div>
    </div>
  );
}
