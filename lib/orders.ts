// 주문 도메인 타입 및 상태 정의 (클라이언트/서버 공용)

export const ORDER_STATUSES = [
  "결제대기",
  "결제완료",
  "배송준비",
  "배송중",
  "배송완료",
  "취소",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

// 매출 합계에서 제외할 상태 (취소 / 결제대기)
export const REVENUE_EXCLUDED_STATUSES: OrderStatus[] = ["취소", "결제대기"];

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string; // 주문번호 (예: LF20260701-001)
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: string;
  items: OrderItem[];
  amount: number; // 배송비 포함 총액
  status: OrderStatus;
  createdAt: string; // ISO 8601
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface OrderStats {
  totalOrders: number;
  revenue: number;
  pendingCount: number;
  memberCount: number;
  statusCounts: Record<OrderStatus, number>;
}

export function isOrderStatus(value: unknown): value is OrderStatus {
  return typeof value === "string" && (ORDER_STATUSES as readonly string[]).includes(value);
}

export function formatPrice(value: number) {
  return `${value.toLocaleString("ko-KR")}원`;
}
