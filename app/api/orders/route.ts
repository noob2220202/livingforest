import { NextResponse } from "next/server";
import { createOrder } from "@/lib/server/store";
import { OrderItem } from "@/lib/orders";

interface CreateOrderBody {
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  shippingAddress?: string;
  items?: OrderItem[];
  amount?: number;
}

export async function POST(request: Request) {
  let body: CreateOrderBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const { customerName, customerPhone, customerEmail, shippingAddress, items, amount } = body;

  if (
    !customerName?.trim() ||
    !customerPhone?.trim() ||
    !shippingAddress?.trim() ||
    !Array.isArray(items) ||
    items.length === 0 ||
    typeof amount !== "number"
  ) {
    return NextResponse.json({ error: "주문 정보가 올바르지 않습니다." }, { status: 400 });
  }

  const order = await createOrder({
    customerName: customerName.trim(),
    customerPhone: customerPhone.trim(),
    customerEmail: customerEmail?.trim() || "미입력",
    shippingAddress: shippingAddress.trim(),
    items: items.map((i) => ({ name: String(i.name), qty: Number(i.qty), price: Number(i.price) })),
    amount,
    status: "결제대기",
  });

  return NextResponse.json({ orderNo: order.id });
}
