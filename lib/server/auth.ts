import "server-only";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "lf_admin_session";
const MAX_AGE = 60 * 60 * 8; // 8시간

// 세션 서명 비밀키. 운영 환경에서는 ADMIN_SESSION_SECRET 환경변수로 주입한다.
const SECRET = process.env.ADMIN_SESSION_SECRET || "livingforest-admin-dev-secret";

function sign(payload: string) {
  return createHmac("sha256", SECRET).update(payload).digest("hex");
}

function serialize(email: string) {
  const payload = `${email}|${Date.now()}`;
  const encoded = Buffer.from(payload).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

function verify(token: string | undefined): string | null {
  if (!token) return null;
  const [encoded, sig] = token.split(".");
  if (!encoded || !sig) return null;
  const expected = sign(encoded);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const [email, ts] = Buffer.from(encoded, "base64url").toString("utf8").split("|");
    if (!email || !ts) return null;
    if (Date.now() - Number(ts) > MAX_AGE * 1000) return null;
    return email;
  } catch {
    return null;
  }
}

export async function createSession(email: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, serialize(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

// 현재 요청의 관리자 이메일을 반환 (미인증이면 null)
export async function getSessionEmail(): Promise<string | null> {
  const store = await cookies();
  return verify(store.get(COOKIE_NAME)?.value);
}
