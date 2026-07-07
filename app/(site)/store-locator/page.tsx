import { Metadata } from "next";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "매장 찾기 | 리빙포레스트",
};

const STORES = [
  {
    name: "리빙포레스트 양산 본점",
    address: company.workplaceAddress,
    hours: "매일 10:00 - 19:00 (연중무휴)",
    phone: company.csPhone,
  },
  {
    name: "리빙포레스트 울산 쇼룸",
    address: company.headOfficeAddress,
    hours: "평일 10:00 - 18:00 (주말 예약제)",
    phone: company.csPhone,
  },
];

export default function StoreLocatorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs tracking-[0.3em] uppercase text-forest-soft mb-2">Visit Us</p>
      <h1 className="font-display text-3xl mb-8">매장 찾기</h1>

      <div className="space-y-6">
        {STORES.map((store) => (
          <div key={store.name} className="border border-sand p-6">
            <h2 className="font-display text-lg mb-2">{store.name}</h2>
            <p className="text-sm text-charcoal/80">{store.address}</p>
            <p className="text-sm text-charcoal/60 mt-1">{store.hours}</p>
            {store.phone && <p className="text-sm text-charcoal/60">고객센터 {store.phone}</p>}
          </div>
        ))}
      </div>

      <p className="text-xs text-charcoal/50 mt-8">
        방문 전 재고 확인이 필요하신 상품은 고객센터로 미리 문의해주세요.
      </p>
    </div>
  );
}
