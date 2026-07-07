import { Metadata } from "next";

export const metadata: Metadata = {
  title: "지속가능성 | 리빙포레스트",
};

const PRINCIPLES = [
  {
    title: "오래 쓰는 소재",
    body: "유행을 타지 않는 뉴트럴 톤과 내구성 좋은 원단을 선택해 제품의 수명을 늘립니다.",
  },
  {
    title: "책임 있는 소싱",
    body: "인증된 방적 공정을 거친 순면·리넨을 우선적으로 사용하며, 협력 공장의 근로 환경을 정기적으로 점검합니다.",
  },
  {
    title: "포장 최소화",
    body: "과대 포장을 지양하고 재생 가능한 종이 포장재 비중을 늘려가고 있습니다.",
  },
];

export default function SustainabilityPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs tracking-[0.3em] uppercase text-forest-soft mb-2">Our Commitment</p>
      <h1 className="font-display text-3xl mb-8">지속가능성</h1>

      <p className="text-sm leading-relaxed text-charcoal/80 mb-10">
        리빙포레스트는 &apos;오래 두고 쓸 수 있는 침구&apos;가 가장 지속가능한
        선택이라고 믿습니다. 작은 실천부터 하나씩 지켜가고 있습니다.
      </p>

      <div className="space-y-6">
        {PRINCIPLES.map((p) => (
          <div key={p.title} className="border-l-2 border-forest pl-4">
            <h2 className="font-display text-lg mb-1">{p.title}</h2>
            <p className="text-sm text-charcoal/70 leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
