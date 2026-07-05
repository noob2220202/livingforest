"use client";

import { FormEvent, useState } from "react";

const OPENINGS = [
  { title: "MD/상품기획", team: "상품팀", type: "정규직 · 양산" },
  { title: "온라인 콘텐츠 마케터", team: "마케팅팀", type: "정규직 · 울산" },
  { title: "물류/배송 매니저", team: "운영팀", type: "정규직 · 양산" },
];

export default function CareersPage() {
  const [selected, setSelected] = useState<string>(OPENINGS[0].title);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs tracking-[0.3em] uppercase text-forest-soft mb-2">Careers</p>
      <h1 className="font-display text-3xl mb-8">채용</h1>

      <div className="space-y-4 mb-12">
        {OPENINGS.map((job) => (
          <label
            key={job.title}
            className={`flex items-center justify-between border px-5 py-4 cursor-pointer ${
              selected === job.title ? "border-forest bg-white" : "border-sand"
            }`}
          >
            <span>
              <span className="block text-sm font-medium">{job.title}</span>
              <span className="block text-xs text-charcoal/60 mt-0.5">
                {job.team} · {job.type}
              </span>
            </span>
            <input
              type="radio"
              name="position"
              className="accent-forest"
              checked={selected === job.title}
              onChange={() => setSelected(job.title)}
            />
          </label>
        ))}
      </div>

      <div className="border-t border-sand pt-10">
        <h2 className="font-display text-lg mb-4">지원하기 — {selected}</h2>
        {submitted ? (
          <p className="text-sm text-charcoal/80 py-6">
            지원서가 접수되었습니다. 서류 검토 후 개별 연락드리겠습니다.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <input
              type="text"
              required
              placeholder="이름"
              className="w-full px-4 py-2.5 text-sm border border-sand outline-none focus:border-forest"
            />
            <input
              type="email"
              required
              placeholder="이메일"
              className="w-full px-4 py-2.5 text-sm border border-sand outline-none focus:border-forest"
            />
            <textarea
              required
              placeholder="간단한 자기소개를 남겨주세요"
              rows={4}
              className="w-full px-4 py-2.5 text-sm border border-sand outline-none focus:border-forest resize-none"
            />
            <button
              type="submit"
              className="bg-forest text-linen px-8 py-3 text-sm tracking-wide hover:bg-forest-light transition-colors"
            >
              지원서 제출
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
