import { NextResponse } from "next/server";
import { findAdmin, verifyAdminPassword } from "@/lib/server/store";
import { createSession } from "@/lib/server/auth";

export async function POST(request: Request) {
  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const email = body.email?.trim() ?? "";
  const password = body.password ?? "";
  if (!email || !password) {
    return NextResponse.json({ error: "이메일과 비밀번호를 입력해 주세요." }, { status: 400 });
  }

  const admin = await findAdmin(email);
  if (!admin || !verifyAdminPassword(admin, password)) {
    return NextResponse.json(
      { error: "이메일 또는 비밀번호가 올바르지 않습니다." },
      { status: 401 }
    );
  }

  await createSession(admin.email);
  return NextResponse.json({ email: admin.email, name: admin.name });
}
