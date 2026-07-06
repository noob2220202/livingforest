// 사업자등록증 기재 정보를 그대로 반영. 미확정 항목은 null로 두면
// 푸터/매장 찾기 페이지에서 해당 줄이 자동으로 숨겨진다.
export const company = {
  brandName: "리빙포레스트",
  brandNameEn: "LIVING FOREST",
  legalName: "주식회사 리빙포레스트 양산",
  ceo: "박해길",
  bizRegNo: "266-85-03206",
  corpRegNo: "230111-0043098",
  foundedOn: "2025-10-01",
  businessType: "도소매업",
  businessItems: "침구류, 가정용품, 잡화류, 섬유제품, 수출입업",
  workplaceAddress: "경상남도 양산시 평산11길 16 (평산동)",
  headOfficeAddress: "울산광역시 북구 매곡로 92-3, 1층 (매곡동)",
  mailOrderNo: "2025-경남양산-774" as string | null,
  csPhone: null as string | null,
  csEmail: null as string | null,
} as const;
