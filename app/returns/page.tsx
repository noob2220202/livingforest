import { Metadata } from "next";

export const metadata: Metadata = {
  title: "교환/반품 안내 | 리빙포레스트",
};

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs tracking-[0.3em] uppercase text-forest-soft mb-2">Customer Care</p>
      <h1 className="font-display text-3xl mb-8">교환/반품 안내</h1>

      <div className="space-y-8 text-sm leading-relaxed text-charcoal/80">
        <section>
          <h2 className="font-display text-lg text-charcoal mb-2">교환/반품 기간</h2>
          <p>상품 수령일로부터 7일 이내 신청하실 수 있습니다. 세탁 또는 사용 흔적이 있는 상품, 위생상 이유로 개봉된 침구·베개류는 교환/반품이 제한될 수 있습니다.</p>
        </section>
        <section>
          <h2 className="font-display text-lg text-charcoal mb-2">단순 변심 반품</h2>
          <p>고객 단순 변심에 의한 반품 시 왕복 배송비 6,000원이 부과됩니다. 상품 불량 또는 오배송의 경우 배송비는 저희가 부담합니다.</p>
        </section>
        <section>
          <h2 className="font-display text-lg text-charcoal mb-2">모노그램 각인 상품</h2>
          <p>이름/이니셜을 각인한 맞춤 제작 상품은 제작 완료 후 단순 변심에 의한 교환/반품이 불가합니다. 불량의 경우는 예외적으로 교환해드립니다.</p>
        </section>
        <section>
          <h2 className="font-display text-lg text-charcoal mb-2">신청 방법</h2>
          <p>고객센터로 주문번호와 사유를 남겨주시면 순차적으로 안내드립니다.</p>
        </section>
      </div>
    </div>
  );
}
