"use client";

import Link from "next/link";
import { useStore } from "@/lib/store-context";
import PhotoTile from "./PhotoTile";

function formatPrice(value: number) {
  return `${value.toLocaleString("ko-KR")}원`;
}

export default function CartDrawer() {
  const { cartOpen, closeCart, cartItems, cartTotal, removeFromCart, updateQty } = useStore();

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={closeCart}>
      <div className="absolute inset-0 bg-charcoal/50" />
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md bg-linen flex flex-col shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-sand">
          <h2 className="font-display text-lg">장바구니 ({cartItems.reduce((s, l) => s + l.qty, 0)})</h2>
          <button onClick={closeCart} aria-label="닫기" className="text-charcoal/60 hover:text-charcoal">
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-charcoal/60 text-sm">장바구니가 비어 있습니다.</p>
            <button
              onClick={closeCart}
              className="bg-forest text-linen px-6 py-2.5 text-sm tracking-wide hover:bg-forest-light transition-colors"
            >
              쇼핑 계속하기
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cartItems.map((line) => (
                <div key={line.key} className="flex gap-3">
                  <PhotoTile src={line.product.image} alt={line.product.name} className="w-20 h-20 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{line.product.name}</p>
                    <p className="text-xs text-charcoal/60 mt-0.5">
                      {line.size} · {line.color}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-sand">
                        <button
                          onClick={() => updateQty(line.key, line.qty - 1)}
                          aria-label="수량 감소"
                          className="w-7 h-7 flex items-center justify-center hover:bg-sand/50"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{line.qty}</span>
                        <button
                          onClick={() => updateQty(line.key, line.qty + 1)}
                          aria-label="수량 증가"
                          className="w-7 h-7 flex items-center justify-center hover:bg-sand/50"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-semibold">
                        {formatPrice(line.product.price * line.qty)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(line.key)}
                    aria-label="삭제"
                    className="text-charcoal/40 hover:text-charcoal self-start text-xs"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-sand px-6 py-5 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-charcoal/70">소계</span>
                <span className="text-lg font-semibold">{formatPrice(cartTotal)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block text-center bg-forest text-linen py-3 text-sm tracking-wide hover:bg-forest-light transition-colors"
              >
                주문하기
              </Link>
              <button
                onClick={closeCart}
                className="block w-full text-center text-sm text-charcoal/60 hover:text-charcoal"
              >
                쇼핑 계속하기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
