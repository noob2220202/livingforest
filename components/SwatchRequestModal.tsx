"use client";

import { FormEvent, useState } from "react";
import { useStore } from "@/lib/store-context";
import { products } from "@/data/products";

export default function SwatchRequestModal() {
  const { swatchOpen, closeSwatchRequest } = useStore();
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  if (!swatchOpen) return null;

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : prev.length < 5 ? [...prev, id] : prev
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleClose() {
    setSelected([]);
    setSubmitted(false);
    closeSwatchRequest();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4" onClick={handleClose}>
      <div
        className="bg-linen max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-forest-soft">Swatch Request</p>
            <h3 className="font-display text-xl mt-1">원단 스와치 요청</h3>
          </div>
          <button onClick={handleClose} aria-label="닫기" className="text-charcoal/60 hover:text-charcoal">
            ✕
          </button>
        </div>

        {submitted ? (
          <p className="text-sm text-charcoal/80 py-8 text-center">
            스와치 요청이 접수되었습니다. 영업일 기준 3~5일 내 발송해드립니다.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-charcoal/70">
              구매 전 원단 질감을 직접 확인해보세요. 최대 5개까지 선택할 수 있습니다. ({selected.length}/5)
            </p>
            <div className="grid grid-cols-2 gap-2">
              {products.map((p) => (
                <label
                  key={p.id}
                  className={`flex items-center gap-2 text-xs border px-3 py-2 cursor-pointer ${
                    selected.includes(p.id) ? "border-forest bg-white" : "border-sand"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="accent-forest"
                    checked={selected.includes(p.id)}
                    onChange={() => toggle(p.id)}
                  />
                  {p.name}
                </label>
              ))}
            </div>
            <input
              type="text"
              required
              placeholder="받으실 분 성함"
              className="w-full px-4 py-2.5 text-sm border border-sand outline-none focus:border-forest"
            />
            <input
              type="text"
              required
              placeholder="배송 주소"
              className="w-full px-4 py-2.5 text-sm border border-sand outline-none focus:border-forest"
            />
            <button
              type="submit"
              disabled={selected.length === 0}
              className="w-full bg-forest text-linen py-3 text-sm tracking-wide hover:bg-forest-light transition-colors disabled:opacity-40"
            >
              스와치 요청하기
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
