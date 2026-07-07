import type { Metadata } from "next";
import { Noto_Serif_KR, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSerifKr = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "리빙포레스트 | LIVING FOREST",
  description: "1973년의 정신을 이어가는 프리미엄 침구 & 배스 텍스타일, 리빙포레스트.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSerifKr.variable} ${notoSansKr.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-linen text-charcoal">{children}</body>
    </html>
  );
}
