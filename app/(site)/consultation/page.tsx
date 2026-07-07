"use client";

import { FormEvent, useState } from "react";

const TOPICS = ["침구 스타일링", "배스 공간 꾸미기", "전체 홈 스타일링", "선물 큐레이션"];

export default function ConsultationPage() {
  const [topics, setTopics] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function toggleTopic(topic: string) {
    setTopics((prev) => (prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs tracking-[0.3em] uppercase text-forest-soft mb-2">Design Consultation</p>
      <h1 className="font-display text-3xl mb-4">디자인 상담</h1>
      <p className="text-sm text-charcoal/70 leading-relaxed mb-10">
        침실이나 욕실 공간에 어울리는 소재·색상 조합이 고민이신가요? 리빙포레스트
        스타일리스트가 공간에 맞는 큐레이션을 도와드립니다.
      </p>

      {submitted ? (
        <div className="border border-forest bg-white p-6">
          <p className="text-sm text-charcoal/80">
            상담 신청이 접수되었습니다. 영업일 기준 1~2일 내 담당 스타일리스트가
            연락드립니다.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs tracking-wide text-charcoal/70 mb-2">상담 희망 항목 (중복 선택)</label>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((topic) => (
                <button
                  type="button"
                  key={topic}
                  onClick={() => toggleTopic(topic)}
                  className={`px-3 py-1.5 text-xs border ${
                    topics.includes(topic) ? "border-forest bg-forest text-linen" : "border-sand text-charcoal"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
          <input
            type="text"
            required
            placeholder="이름"
            className="w-full px-4 py-2.5 text-sm border border-sand outline-none focus:border-forest"
          />
          <input
            type="tel"
            required
            placeholder="연락처"
            className="w-full px-4 py-2.5 text-sm border border-sand outline-none focus:border-forest"
          />
          <input
            type="email"
            required
            placeholder="이메일"
            className="w-full px-4 py-2.5 text-sm border border-sand outline-none focus:border-forest"
          />
          <textarea
            placeholder="공간 정보나 원하는 스타일을 자유롭게 남겨주세요 (선택)"
            rows={4}
            className="w-full px-4 py-2.5 text-sm border border-sand outline-none focus:border-forest resize-none"
          />
          <button
            type="submit"
            className="bg-forest text-linen px-8 py-3 text-sm tracking-wide hover:bg-forest-light transition-colors"
          >
            상담 신청하기
          </button>
        </form>
      )}
    </div>
  );
}
