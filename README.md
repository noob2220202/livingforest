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

## 주문 관리자 (Admin)

주문 접수 내역을 확인/처리하는 관리자 페이지입니다.

- 접속: `/admin`
- 관리자 계정으로 로그인해야 대시보드가 노출되며, 미인증 시 로그인 폼만 보입니다.
- 시드 관리자 계정: `admin@livingforest.co.kr` / `Forest!2026`
  (`lib/server/store.ts`의 `SEED_ADMIN_*` 상수에서 관리)
- 기능: 통계 카드(총 주문 수·매출 합계·결제대기·전체 회원), 상태 필터 칩, 검색
  (주문번호·이름·이메일·연락처), 주문 목록 테이블, 행별 상태 변경 드롭다운, 주문 삭제

### 백엔드 / 데이터 저장

- Next.js Route Handler(`app/api/**`)로 구현했습니다.
- 데이터는 JSON 파일(`.data/store.json`, git 무시)에 영속화하며, 파일이 없으면
  관리자 계정과 데모용 주문이 자동으로 시드됩니다.
- 체크아웃(`/checkout`) 완료 시 `POST /api/orders`로 실제 주문이 저장되어
  관리자 화면에 반영됩니다.
- 세션은 HMAC 서명 httpOnly 쿠키를 사용합니다. 운영 환경에서는
  `ADMIN_SESSION_SECRET` 환경변수로 서명 키를 주입하세요.

## 참고

결제/재고 연동은 아직 없으며, 주문 접수까지만 처리되는 상태입니다.
