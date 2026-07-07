import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "주문 관리 | 리빙포레스트",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-linen-deep">{children}</div>;
}
