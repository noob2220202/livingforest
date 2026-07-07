import { Metadata } from "next";

export const metadata: Metadata = {
  title: "사이즈 가이드 | 리빙포레스트",
};

const BEDDING_SIZES = [
  { label: "싱글 (Single)", mattress: "100 x 200cm", duvet: "150 x 210cm" },
  { label: "슈퍼싱글 (Super Single)", mattress: "110 x 200cm", duvet: "170 x 210cm" },
  { label: "퀸 (Queen)", mattress: "150 x 200cm", duvet: "220 x 240cm" },
  { label: "킹 (King)", mattress: "180 x 200cm", duvet: "250 x 240cm" },
];

const TOWEL_SIZES = [
  { label: "페이스 타월", size: "34 x 80cm" },
  { label: "핸드 타월", size: "40 x 60cm" },
  { label: "배스 타월", size: "70 x 140cm" },
];

export default function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs tracking-[0.3em] uppercase text-forest-soft mb-2">Customer Care</p>
      <h1 className="font-display text-3xl mb-8">사이즈 가이드</h1>

      <section className="mb-10">
        <h2 className="font-display text-lg mb-4">침구 사이즈</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-sand text-charcoal/60">
                <th className="py-2 pr-4 font-normal">사이즈</th>
                <th className="py-2 pr-4 font-normal">매트리스 기준</th>
                <th className="py-2 font-normal">이불커버 기준</th>
              </tr>
            </thead>
            <tbody>
              {BEDDING_SIZES.map((row) => (
                <tr key={row.label} className="border-b border-sand/60">
                  <td className="py-3 pr-4">{row.label}</td>
                  <td className="py-3 pr-4 text-charcoal/70">{row.mattress}</td>
                  <td className="py-3 text-charcoal/70">{row.duvet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg mb-4">타월 사이즈</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-sand text-charcoal/60">
                <th className="py-2 pr-4 font-normal">종류</th>
                <th className="py-2 font-normal">사이즈</th>
              </tr>
            </thead>
            <tbody>
              {TOWEL_SIZES.map((row) => (
                <tr key={row.label} className="border-b border-sand/60">
                  <td className="py-3 pr-4">{row.label}</td>
                  <td className="py-3 text-charcoal/70">{row.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
