import { Metadata } from "next";

export const metadata: Metadata = {
  title: "배송 안내 | 리빙포레스트",
};

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs tracking-[0.3em] uppercase text-forest-soft mb-2">Customer Care</p>
      <h1 className="font-display text-3xl mb-8">배송 안내</h1>

      <div className="space-y-8 text-sm leading-relaxed text-charcoal/80">
        <section>
          <h2 className="font-display text-lg text-charcoal mb-2">배송 기간</h2>
          <p>주문 확인 후 평균 2~4 영업일 이내 출고되며, 출고 후 1~2일 내 수령하실 수 있습니다. 모노그램 각인 등 맞춤 제작 상품은 제작 기간이 추가로 3~5 영업일 소요됩니다.</p>
        </section>
        <section>
          <h2 className="font-display text-lg text-charcoal mb-2">배송비</h2>
          <p>15만원 이상 구매 시 무료배송이며, 미만 구매 시 배송비 3,000원이 부과됩니다. 도서·산간 지역은 추가 배송비가 발생할 수 있습니다.</p>
        </section>
        <section>
          <h2 className="font-display text-lg text-charcoal mb-2">배송 조회</h2>
          <p>출고 시 등록하신 연락처로 운송장 번호를 안내드립니다. 배송 관련 문의는 고객센터를 통해 접수해주세요.</p>
        </section>
      </div>
    </div>
  );
}
