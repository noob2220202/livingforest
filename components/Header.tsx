"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/lib/store-context";

const NAV_LINKS = [
  { label: "베스트셀러", href: "#best-sellers" },
  { label: "신상품", href: "#new-arrivals" },
  { label: "침구", href: "#categories" },
  { label: "배스", href: "#categories" },
  { label: "모노그램", href: "#monogram" },
  { label: "세일", href: "#sale" },
];

export default function Header() {
  const { cartCount, openSwatchRequest } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-linen/95 backdrop-blur border-b border-sand">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <button
            className="lg:hidden p-2 -ml-2 text-charcoal"
            aria-label="메뉴 열기"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          </button>

          <Link href="/" className="font-display text-xl sm:text-2xl tracking-[0.15em] text-forest">
            리빙포레스트
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm text-charcoal">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-forest transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-3">
            <button
              className="p-2 text-charcoal hover:text-forest transition-colors"
              aria-label="검색"
              onClick={() => setSearchOpen((v) => !v)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
              </svg>
            </button>
            <button
              className="hidden sm:block px-3 py-2 text-xs tracking-wide text-charcoal hover:text-forest transition-colors"
              onClick={openSwatchRequest}
            >
              스와치 요청
            </button>
            <button className="relative p-2 text-charcoal hover:text-forest transition-colors" aria-label="장바구니">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="pb-4">
            <input
              type="search"
              placeholder="상품 검색 (예: 리넨 이불커버)"
              className="w-full rounded-full border border-sand bg-white px-4 py-2 text-sm outline-none focus:border-forest"
            />
          </div>
        )}

        {menuOpen && (
          <nav className="lg:hidden flex flex-col gap-1 pb-4 text-sm text-charcoal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="py-2 border-b border-sand/70 last:border-none"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              className="py-2 text-left text-forest"
              onClick={() => {
                openSwatchRequest();
                setMenuOpen(false);
              }}
            >
              스와치 요청
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
