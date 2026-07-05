"use client";

import { useState, FormEvent } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
  }

  return (
    <section className="bg-forest text-linen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-linen/60 mb-2">Newsletter</p>
        <h2 className="font-display text-2xl sm:text-3xl mb-3">첫 구매 10% 할인 받기</h2>
        <p className="text-linen/70 mb-6">
          신제품 소식과 단독 혜택을 이메일로 가장 먼저 받아보세요.
        </p>
        {submitted ? (
          <p className="text-linen">구독해주셔서 감사합니다. 할인 코드를 이메일로 보내드렸어요.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 주소"
              className="flex-1 px-4 py-3 text-sm text-charcoal bg-linen rounded-none outline-none"
            />
            <button
              type="submit"
              className="bg-linen text-forest px-6 py-3 text-sm tracking-wide hover:bg-white transition-colors"
            >
              구독하기
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
