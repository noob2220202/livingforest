import { company } from "@/data/company";

const FOOTER_LINKS = [
  {
    heading: "쇼핑",
    links: ["베스트셀러", "신상품", "침구", "배스", "모노그램 샵", "세일"],
  },
  {
    heading: "고객지원",
    links: ["배송 안내", "교환/반품 안내", "사이즈 가이드", "스와치 요청", "매장 찾기"],
  },
  {
    heading: "브랜드",
    links: ["브랜드 스토리", "지속가능성", "디자인 상담", "채용"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-forest text-linen mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-xl tracking-[0.15em] mb-3">리빙포레스트</div>
            <p className="text-sm text-linen/70 leading-relaxed">
              1973년의 정신을 이어, 자연스러운 소재와 정직한 만듦새로
              완성하는 프리미엄 홈 텍스타일.
            </p>
          </div>
          {FOOTER_LINKS.map((group) => (
            <div key={group.heading}>
              <div className="text-sm font-semibold mb-3 tracking-wide">{group.heading}</div>
              <ul className="space-y-2 text-sm text-linen/70">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-linen transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-linen/15 text-xs leading-relaxed text-linen/60 space-y-1">
          <p>
            {company.legalName} · 대표 {company.ceo} · 사업자등록번호 {company.bizRegNo} · 법인등록번호{" "}
            {company.corpRegNo}
          </p>
          <p>
            사업장 소재지 {company.workplaceAddress} · 본점 소재지 {company.headOfficeAddress}
          </p>
          <p>업태 {company.businessType} · 종목 {company.businessItems}</p>
          <p>
            통신판매업신고번호 {company.mailOrderNo ?? "등록 예정"} · 고객센터{" "}
            {company.csPhone ?? "등록 예정"} · 이메일 {company.csEmail ?? "등록 예정"}
          </p>
          <p className="pt-2 text-linen/40">
            &copy; {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
