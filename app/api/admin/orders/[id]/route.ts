import { NextResponse } from "next/server";
import { getSessionEmail } from "@/lib/server/auth";
import { deleteOrder, updateOrderStatus } from "@/lib/server/store";
import { isOrderStatus } from "@/lib/orders";

async function requireAuth() {
  const email = await getSessionEmail();
  return email
    ? null
    : NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = await requireAuth();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  let body: { status?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (!isOrderStatus(body.status)) {
    return NextResponse.json({ error: "유효하지 않은 상태입니다." }, { status: 400 });
  }

  const order = await updateOrderStatus(id, body.status);
  if (!order) {
    return NextResponse.json({ error: "주문을 찾을 수 없습니다." }, { status: 404 });
  }
  return NextResponse.json({ order });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = await requireAuth();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const removed = await deleteOrder(id);
  if (!removed) {
    return NextResponse.json({ error: "주문을 찾을 수 없습니다." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
