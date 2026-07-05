"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useStore } from "@/lib/store-context";
import PhotoTile from "@/components/PhotoTile";

function formatPrice(value: number) {
  return `${value.toLocaleString("ko-KR")}원`;
}

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useStore();
  const [placed, setPlaced] = useState(false);
  const [orderNo, setOrderNo] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const no = `LF${Date.now().toString().slice(-8)}`;
    setOrderNo(no);
    setPlaced(true);
    clearCart();
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-forest-soft mb-3">Order Complete</p>
        <h1 className="font-display text-3xl mb-4">주문이 접수되었습니다</h1>
        <p className="text-sm text-charcoal/70 mb-2">주문번호 {orderNo}</p>
        <p className="text-sm text-charcoal/70 mb-10">
          입력하신 연락처로 배송 안내를 보내드립니다. 이용해주셔서 감사합니다.
        </p>
        <Link
          href="/"
          className="inline-block bg-forest text-linen px-8 py-3 text-sm tracking-wide hover:bg-forest-light transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="font-display text-2xl mb-4">장바구니가 비어 있습니다</h1>
        <Link href="/products" className="text-sm text-forest hover:underline">
          상품 보러 가기
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 gap-12">
      <div>
        <h1 className="font-display text-2xl mb-6">주문 정보</h1>
        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            placeholder="받으실 분 성함"
            className="w-full px-4 py-2.5 text-sm border border-sand outline-none focus:border-forest"
          />
          <input
            type="tel"
            required
            placeholder="연락처"
            className="w-full px-4 py-2.5 text-sm border border-sand outline-none focus:border-forest"
          />
          <input
            type="text"
            required
            placeholder="배송 주소"
            className="w-full px-4 py-2.5 text-sm border border-sand outline-none focus:border-forest"
          />
          <input
            type="text"
            placeholder="배송 메모 (선택)"
            className="w-full px-4 py-2.5 text-sm border border-sand outline-none focus:border-forest"
          />
        </form>
      </div>

      <div>
        <h2 className="font-display text-lg mb-6">주문 상품</h2>
        <div className="space-y-4 mb-6">
          {cartItems.map((line) => (
            <div key={line.key} className="flex gap-3">
              <PhotoTile src={line.product.image} alt={line.product.name} className="w-16 h-16 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{line.product.name}</p>
                <p className="text-xs text-charcoal/60">
                  {line.size} · {line.color} · {line.qty}개
                </p>
              </div>
              <span className="text-sm">{formatPrice(line.product.price * line.qty)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-sand pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-charcoal/70">
            <span>상품 합계</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <div className="flex justify-between text-charcoal/70">
            <span>배송비</span>
            <span>{cartTotal >= 150000 ? "무료" : formatPrice(3000)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold pt-2 border-t border-sand">
            <span>총 결제금액</span>
            <span>{formatPrice(cartTotal >= 150000 ? cartTotal : cartTotal + 3000)}</span>
          </div>
        </div>
        <button
          type="submit"
          form="checkout-form"
          className="mt-6 w-full bg-forest text-linen py-3.5 text-sm tracking-wide hover:bg-forest-light transition-colors"
        >
          주문 완료하기
        </button>
      </div>
    </div>
  );
}
