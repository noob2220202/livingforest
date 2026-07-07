import { NextResponse } from "next/server";
import { getSessionEmail } from "@/lib/server/auth";
import { getStats, listOrders } from "@/lib/server/store";

export async function GET() {
  const email = await getSessionEmail();
  if (!email) {
    return NextResponse.json({ error: "인증이 필요합니다." }, { status: 401 });
  }

  const [orders, stats] = await Promise.all([listOrders(), getStats()]);
  return NextResponse.json({ orders, stats });
}
