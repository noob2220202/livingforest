"use client";

import Link from "next/link";
import { company } from "@/data/company";
import { useStore } from "@/lib/store-context";

const FOOTER_LINKS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "쇼핑",
    links: [
      { label: "베스트셀러", href: "/#best-sellers" },
      { label: "신상품", href: "/products?filter=new" },
      { label: "침구", href: "/products?category=침구" },
      { label: "배스", href: "/products?category=배스" },
      { label: "모노그램 샵", href: "/monogram" },
      { label: "세일", href: "/products?filter=sale" },
    ],
  },
  {
    heading: "고객지원",
    links: [
      { label: "배송 안내", href: "/shipping" },
      { label: "교환/반품 안내", href: "/returns" },
      { label: "사이즈 가이드", href: "/size-guide" },
      { label: "매장 찾기", href: "/store-locator" },
    ],
  },
  {
    heading: "브랜드",
    links: [
      { label: "브랜드 스토리", href: "/about" },
      { label: "지속가능성", href: "/sustainability" },
      { label: "디자인 상담", href: "/consultation" },
      { label: "채용", href: "/careers" },
    ],
  },
];

export default function Footer() {
  const { openSwatchRequest } = useStore();

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
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-linen transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
                {group.heading === "고객지원" && (
                  <li>
                    <button onClick={openSwatchRequest} className="hover:text-linen transition-colors">
                      스와치 요청
                    </button>
                  </li>
                )}
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
