"use client";

import { FormEvent, useState } from "react";
import { products } from "@/data/products";

export default function MonogramPage() {
  const [productId, setProductId] = useState(products[0].id);
  const [initials, setInitials] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!initials.trim()) return;
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs tracking-[0.3em] uppercase text-forest-soft mb-2">Monogram Shop</p>
      <h1 className="font-display text-3xl mb-4">모노그램 각인 서비스</h1>
      <p className="text-sm text-charcoal/70 leading-relaxed mb-10">
        이니셜 또는 이름을 새겨 나만의 침구·타월을 완성해보세요. 각인은
        주문 확인 후 3~5 영업일이 추가로 소요되며, 완성 후에는 단순 변심에
        의한 교환/반품이 어려운 점 참고해주세요.
      </p>

      {submitted ? (
        <div className="border border-forest bg-white p-6">
          <p className="text-sm text-charcoal/80">
            <span className="font-medium text-forest">&quot;{initials}&quot;</span> 각인 신청이
            접수되었습니다. 담당자가 확인 후 각인 시안을 안내드립니다.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs tracking-wide text-charcoal/70 mb-2">각인할 상품</label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-sand outline-none focus:border-forest bg-white"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs tracking-wide text-charcoal/70 mb-2">
              각인 이니셜/이름 (최대 8자)
            </label>
            <input
              type="text"
              required
              maxLength={8}
              value={initials}
              onChange={(e) => setInitials(e.target.value)}
              placeholder="예: J&M 또는 리빙포레스트"
              className="w-full px-4 py-2.5 text-sm border border-sand outline-none focus:border-forest"
            />
          </div>
          <div>
            <label className="block text-xs tracking-wide text-charcoal/70 mb-2">연락처</label>
            <input
              type="tel"
              required
              placeholder="010-0000-0000"
              className="w-full px-4 py-2.5 text-sm border border-sand outline-none focus:border-forest"
            />
          </div>
          <button
            type="submit"
            className="bg-forest text-linen px-8 py-3 text-sm tracking-wide hover:bg-forest-light transition-colors"
          >
            각인 신청하기
          </button>
        </form>
      )}
    </div>
  );
}
