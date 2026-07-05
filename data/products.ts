import { Product } from "@/lib/types";

export const products: Product[] = [
  {
    id: "signature-sateen-set",
    name: "시그니처 순면 사틴 침구 세트",
    category: "침구",
    material: "300수 순면 사틴",
    price: 189000,
    compareAtPrice: 252000,
    rating: 4.9,
    reviewCount: 312,
    badge: "BEST",
    palette: ["#f5f1e8", "#cfc6ac"],
    options: {
      sizes: ["싱글", "슈퍼싱글", "퀸", "킹"],
      colors: ["아이보리", "그레이지", "포레스트그린"],
    },
    description:
      "부드러운 광택의 300수 사틴 원단으로 완성한 리빙포레스트의 시그니처 침구 세트입니다.",
  },
  {
    id: "washed-linen-duvet",
    name: "워시드 리넨 이불커버",
    category: "침구",
    material: "100% 벨기에 리넨",
    price: 156000,
    rating: 4.8,
    reviewCount: 187,
    badge: "NEW",
    palette: ["#e9e2d0", "#a7b09a"],
    options: {
      sizes: ["퀸", "킹"],
      colors: ["내추럴", "차콜", "세이지"],
    },
    description:
      "워싱 가공으로 부드러운 촉감을 살린 순수 리넨 이불커버, 사계절 내내 쾌적합니다.",
  },
  {
    id: "percale-sheet-set",
    name: "퍼케일 호텔식 시트 세트",
    category: "침구",
    material: "200수 순면 퍼케일",
    price: 129000,
    rating: 4.7,
    reviewCount: 241,
    palette: ["#ffffff", "#dfe3da"],
    options: {
      sizes: ["싱글", "퀸", "킹"],
      colors: ["화이트", "그레이지"],
    },
    description: "바삭하고 시원한 촉감의 퍼케일 원단으로 만든 호텔식 시트 세트.",
  },
  {
    id: "matelasse-coverlet",
    name: "마틀라세 누빔 커버렛",
    category: "침구",
    material: "순면 마틀라세",
    price: 168000,
    rating: 4.9,
    reviewCount: 98,
    badge: "BEST",
    palette: ["#f0ece1", "#4a5d44"],
    options: {
      sizes: ["퀸", "킹"],
      colors: ["아이보리", "포레스트그린"],
    },
    description:
      "은은한 입체 패턴이 돋보이는 마틀라세 커버렛으로 침실에 깊이를 더합니다.",
  },
  {
    id: "silk-pillowcase",
    name: "실크 필로우케이스",
    category: "액세서리",
    material: "22미미 멀버리 실크",
    price: 79000,
    rating: 4.8,
    reviewCount: 156,
    badge: "NEW",
    palette: ["#e7ded0", "#b08d57"],
    options: {
      sizes: ["스탠다드", "퀸"],
      colors: ["샴페인", "차콜", "더스티로즈"],
    },
    description: "모발과 피부 자극을 최소화하는 프리미엄 멀버리 실크 필로우케이스.",
  },
  {
    id: "washed-cotton-towel-set",
    name: "워시드 코튼 타월 6종 세트",
    category: "배스",
    material: "600g 강연사 순면",
    price: 68000,
    compareAtPrice: 89000,
    rating: 4.7,
    reviewCount: 203,
    badge: "SALE",
    palette: ["#f5f1e8", "#8b9a86"],
    options: {
      sizes: ["페이스", "핸드", "배스"],
      colors: ["화이트", "세이지", "그레이지"],
    },
    description: "풍성한 볼륨과 뛰어난 흡수력을 자랑하는 강연사 타월 세트.",
  },
  {
    id: "wool-throw-blanket",
    name: "울 혼방 스로우 블랑켓",
    category: "액세서리",
    material: "울 70% 캐시미어 30%",
    price: 149000,
    rating: 4.9,
    reviewCount: 74,
    palette: ["#cfc6ac", "#3d3a34"],
    options: {
      sizes: ["단일 사이즈"],
      colors: ["오트밀", "포레스트그린", "차콜"],
    },
    description: "캐시미어를 더해 한층 부드러운 촉감의 사계절 스로우 블랑켓.",
  },
  {
    id: "bath-robe",
    name: "와플 코튼 배스로브",
    category: "배스",
    material: "순면 와플",
    price: 92000,
    rating: 4.6,
    reviewCount: 61,
    palette: ["#e9e2d0", "#6b7a63"],
    options: {
      sizes: ["S/M", "L/XL"],
      colors: ["아이보리", "포레스트그린"],
    },
    description: "가볍고 통기성이 뛰어난 와플 조직의 배스로브, 사계절 활용 가능.",
  },
];

export const bestSellers = [...products]
  .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
  .slice(0, 4);
export const newArrivals = products.filter((p) => p.badge === "NEW");
