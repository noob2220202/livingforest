import { Metadata } from "next";
import PhotoTile from "@/components/PhotoTile";

export const metadata: Metadata = {
  title: "브랜드 스토리 | 리빙포레스트",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs tracking-[0.3em] uppercase text-forest-soft mb-2">Our Story</p>
      <h1 className="font-display text-3xl mb-8">브랜드 스토리</h1>

      <PhotoTile src="/images/get-the-look.jpg" alt="리빙포레스트 침실" className="aspect-[16/9] w-full mb-8" />

      <div className="space-y-6 text-sm leading-relaxed text-charcoal/80">
        <p>
          리빙포레스트는 &quot;자연에 가장 가까운 휴식&quot;이라는 믿음에서 출발했습니다.
          엄선된 순면, 리넨, 실크 원단과 정직한 봉제 방식으로 매일의 잠자리를
          작은 사치로 바꾸는 것을 목표로 합니다.
        </p>
        <p>
          경상남도 양산의 작업장에서 원단 소싱부터 마감까지 꼼꼼히 검수하며,
          유행보다는 오래 두고 써도 질리지 않는 뉴트럴한 색감과 편안한 촉감에
          집중합니다.
        </p>
        <p>
          하나의 이불, 하나의 타월이 완성되기까지의 과정을 소중히 여기는
          마음으로, 앞으로도 좋은 소재와 좋은 만듦새를 이어가겠습니다.
        </p>
      </div>
    </div>
  );
}
