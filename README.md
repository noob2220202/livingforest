# 리빙포레스트 (Living Forest)

주식회사 리빙포레스트 양산의 프리미엄 침구/배스 텍스타일 쇼핑몰 마케팅 프론트엔드입니다.
Next.js(App Router) + TypeScript + Tailwind CSS로 구성되어 있으며, 상품 데이터는
현재 `data/products.ts`에 샘플/더미 데이터로 채워져 있습니다.

## 개발 서버 실행

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 구조

- `app/` — 페이지 및 레이아웃
- `components/` — Header, Footer, Hero, 상품 카드, Quick View/스와치 요청 모달 등
- `data/products.ts` — 상품 샘플 데이터 (추후 실제 상품 데이터로 교체 필요)
- `data/company.ts` — 사업자 정보 (사업자등록증 기재 내용을 반영, 통신판매업신고번호 등
  미발급 항목은 발급 후 채워 넣어야 함)
- `lib/store-context.tsx` — 장바구니 카운트, Quick View, 스와치 요청 모달 상태 관리

## 참고

현재는 결제/재고 연동이 없는 마케팅용 프론트엔드입니다. 실제 커머스 기능(장바구니
영속화, 결제, 회원가입 등)은 별도 백엔드 연동이 필요합니다.
