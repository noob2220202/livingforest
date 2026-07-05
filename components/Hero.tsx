import PlaceholderArt from "./PlaceholderArt";

export default function Hero() {
  return (
    <section className="relative">
      <PlaceholderArt
        palette={["#4a5d44", "#262421"]}
        className="h-[70vh] min-h-[420px]"
      />
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg text-linen">
            <p className="text-xs tracking-[0.3em] uppercase text-linen/70 mb-4">
              1973년부터 이어온 품질
            </p>
            <h1 className="font-display text-4xl sm:text-5xl leading-tight mb-6">
              자연을 담은
              <br />
              깊은 휴식의 시간
            </h1>
            <p className="text-linen/80 mb-8 leading-relaxed">
              엄선된 원단과 정직한 만듦새로 완성한 리빙포레스트의
              프리미엄 침구 &amp; 배스 컬렉션을 만나보세요.
            </p>
            <a
              href="#best-sellers"
              className="inline-block bg-linen text-forest px-8 py-3 text-sm tracking-wide hover:bg-white transition-colors"
            >
              베스트셀러 보기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
