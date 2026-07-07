import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { randomBytes, scryptSync } from "crypto";
import {
  Member,
  Order,
  OrderStats,
  OrderStatus,
  ORDER_STATUSES,
  REVENUE_EXCLUDED_STATUSES,
} from "@/lib/orders";

export interface AdminUser {
  email: string;
  name: string;
  salt: string;
  passwordHash: string;
}

interface StoreData {
  admins: AdminUser[];
  members: Member[];
  orders: Order[];
}

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "store.json");

// 시드용 관리자 계정 (데이터 파일이 없을 때 자동 생성)
export const SEED_ADMIN_EMAIL = "admin@livingforest.co.kr";
export const SEED_ADMIN_PASSWORD = "Forest!2026";

function hashPassword(password: string, salt: string) {
  return scryptSync(password, salt, 64).toString("hex");
}

export function makeAdmin(email: string, name: string, password: string): AdminUser {
  const salt = randomBytes(16).toString("hex");
  return { email, name, salt, passwordHash: hashPassword(password, salt) };
}

export function verifyAdminPassword(admin: AdminUser, password: string) {
  return hashPassword(password, admin.salt) === admin.passwordHash;
}

// ---- 시드 데이터 ---------------------------------------------------------

function daysAgo(days: number, hour = 10, minute = 0) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

function orderNo(dateIso: string, seq: number) {
  const d = new Date(dateIso);
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
    d.getDate()
  ).padStart(2, "0")}`;
  return `LF${ymd}-${String(seq).padStart(3, "0")}`;
}

function buildSeed(): StoreData {
  const admin = makeAdmin(SEED_ADMIN_EMAIL, "리빙포레스트 관리자", SEED_ADMIN_PASSWORD);

  const seedOrders: Omit<Order, "id">[] = [
    {
      customerName: "김서연",
      customerPhone: "010-2345-6789",
      customerEmail: "seoyeon.kim@gmail.com",
      shippingAddress: "서울특별시 강남구 테헤란로 152, 3층 (역삼동)",
      items: [{ name: "시그니처 순면 사틴 침구 세트", qty: 1, price: 189000 }],
      amount: 189000,
      status: "배송완료",
      createdAt: daysAgo(21, 9, 12),
    },
    {
      customerName: "이준호",
      customerPhone: "010-4567-1234",
      customerEmail: "junho.lee@naver.com",
      shippingAddress: "부산광역시 해운대구 우동 1500, 센텀아파트 102동 1804호",
      items: [
        { name: "워시드 리넨 이불커버", qty: 1, price: 156000 },
        { name: "실크 베개커버", qty: 2, price: 48000 },
      ],
      amount: 252000,
      status: "배송중",
      createdAt: daysAgo(6, 14, 3),
    },
    {
      customerName: "박지민",
      customerPhone: "010-8765-4321",
      customerEmail: "jimin.park@daum.net",
      shippingAddress: "경기도 성남시 분당구 판교역로 235, 에이치스퀘어 601호",
      items: [{ name: "퍼케일 호텔식 시트 세트", qty: 2, price: 129000 }],
      amount: 261000,
      status: "배송준비",
      createdAt: daysAgo(3, 11, 47),
    },
    {
      customerName: "최유진",
      customerPhone: "010-3210-9876",
      customerEmail: "yujin.choi@gmail.com",
      shippingAddress: "인천광역시 연수구 송도과학로 32, 송도더샵 305동 2201호",
      items: [
        { name: "마틀라세 누빔 커버렛", qty: 1, price: 168000 },
        { name: "워시드 코튼 타월 세트", qty: 1, price: 72000 },
      ],
      amount: 240000,
      status: "결제완료",
      createdAt: daysAgo(2, 20, 15),
    },
    {
      customerName: "정도현",
      customerPhone: "010-5555-7788",
      customerEmail: "dohyun.jung@kakao.com",
      shippingAddress: "대구광역시 수성구 범어동 45-3, 범어그랜드빌 1102호",
      items: [{ name: "구스 다운 이불", qty: 1, price: 219000 }],
      amount: 219000,
      status: "결제대기",
      createdAt: daysAgo(1, 8, 30),
    },
    {
      customerName: "한소희",
      customerPhone: "010-9999-1212",
      customerEmail: "sohee.han@gmail.com",
      shippingAddress: "서울특별시 마포구 월드컵북로 400, 문화콘텐츠센터 오피스텔 812호",
      items: [
        { name: "실크 베개커버", qty: 2, price: 48000 },
        { name: "라벤더 룸 미스트", qty: 1, price: 32000 },
      ],
      amount: 131000,
      status: "배송완료",
      createdAt: daysAgo(14, 16, 5),
    },
    {
      customerName: "오세훈",
      customerPhone: "010-2727-3636",
      customerEmail: "sehun.oh@outlook.com",
      shippingAddress: "광주광역시 서구 상무중앙로 110, 상무센트럴타워 1507호",
      items: [{ name: "코튼 목욕 가운", qty: 1, price: 98000 }],
      amount: 101000,
      status: "취소",
      createdAt: daysAgo(9, 13, 22),
    },
    {
      customerName: "윤채원",
      customerPhone: "010-6161-4242",
      customerEmail: "chaewon.yoon@naver.com",
      shippingAddress: "제주특별자치도 제주시 애월읍 애월해안로 240",
      items: [
        { name: "워시드 리넨 이불커버", qty: 1, price: 156000 },
        { name: "퍼케일 호텔식 시트 세트", qty: 1, price: 129000 },
      ],
      amount: 285000,
      status: "배송중",
      createdAt: daysAgo(4, 10, 51),
    },
    {
      customerName: "강민재",
      customerPhone: "010-3434-8080",
      customerEmail: "minjae.kang@gmail.com",
      shippingAddress: "대전광역시 유성구 대학로 99, 궁동스카이빌 703호",
      items: [{ name: "울 블랑켓 스로우", qty: 1, price: 112000 }],
      amount: 115000,
      status: "결제완료",
      createdAt: daysAgo(0, 9, 5),
    },
    {
      customerName: "서지우",
      customerPhone: "010-7070-5050",
      customerEmail: "jiwoo.seo@daum.net",
      shippingAddress: "경상남도 양산시 물금읍 증산역로 55, 이지더원 2단지 208동 1503호",
      items: [{ name: "시그니처 순면 사틴 침구 세트", qty: 1, price: 189000 }],
      amount: 189000,
      status: "결제대기",
      createdAt: daysAgo(0, 21, 40),
    },
  ];

  // 시드 주문에서 고객 목록을 유도 (이메일 기준 중복 제거)
  const memberMap = new Map<string, Member>();
  const orders: Order[] = seedOrders.map((o, i) => {
    const id = orderNo(o.createdAt, i + 1);
    if (!memberMap.has(o.customerEmail)) {
      memberMap.set(o.customerEmail, {
        id: `M${String(i + 1).padStart(4, "0")}`,
        name: o.customerName,
        email: o.customerEmail,
        phone: o.customerPhone,
        createdAt: o.createdAt,
      });
    }
    return { id, ...o };
  });

  return {
    admins: [admin],
    members: Array.from(memberMap.values()),
    orders,
  };
}

// ---- 파일 영속화 ---------------------------------------------------------

let cache: StoreData | null = null;
let writeQueue: Promise<void> = Promise.resolve();

async function load(): Promise<StoreData> {
  if (cache) return cache;
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    cache = JSON.parse(raw) as StoreData;
  } catch {
    cache = buildSeed();
    await persist(cache);
  }
  return cache;
}

async function persist(data: StoreData) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

// 쓰기 직렬화로 동시 수정 시 파일 손상 방지
function save(data: StoreData) {
  cache = data;
  writeQueue = writeQueue.then(() => persist(data)).catch(() => {});
  return writeQueue;
}

// ---- 공개 API ------------------------------------------------------------

export async function findAdmin(email: string): Promise<AdminUser | undefined> {
  const data = await load();
  return data.admins.find((a) => a.email.toLowerCase() === email.toLowerCase());
}

export async function listOrders(): Promise<Order[]> {
  const data = await load();
  return [...data.orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getStats(): Promise<OrderStats> {
  const data = await load();
  const statusCounts = ORDER_STATUSES.reduce(
    (acc, s) => ({ ...acc, [s]: 0 }),
    {} as Record<OrderStatus, number>
  );
  let revenue = 0;
  for (const o of data.orders) {
    statusCounts[o.status] += 1;
    if (!REVENUE_EXCLUDED_STATUSES.includes(o.status)) revenue += o.amount;
  }
  return {
    totalOrders: data.orders.length,
    revenue,
    pendingCount: statusCounts["결제대기"],
    memberCount: data.members.length,
    statusCounts,
  };
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<Order | null> {
  const data = await load();
  const order = data.orders.find((o) => o.id === id);
  if (!order) return null;
  order.status = status;
  await save(data);
  return order;
}

export async function deleteOrder(id: string): Promise<boolean> {
  const data = await load();
  const before = data.orders.length;
  data.orders = data.orders.filter((o) => o.id !== id);
  if (data.orders.length === before) return false;
  await save(data);
  return true;
}

export async function createOrder(
  input: Omit<Order, "id" | "createdAt" | "status"> & { status?: OrderStatus }
): Promise<Order> {
  const data = await load();
  const now = new Date().toISOString();
  const ymd = `${now.slice(0, 4)}${now.slice(5, 7)}${now.slice(8, 10)}`;
  // 같은 날짜의 기존 주문번호 최대 시퀀스 +1 (시드 주문과 충돌 방지)
  const todaySeq =
    data.orders
      .filter((o) => o.id.startsWith(`LF${ymd}-`))
      .reduce((max, o) => Math.max(max, Number(o.id.split("-")[1]) || 0), 0) + 1;
  const order: Order = {
    id: orderNo(now, todaySeq),
    status: input.status ?? "결제대기",
    createdAt: now,
    customerName: input.customerName,
    customerPhone: input.customerPhone,
    customerEmail: input.customerEmail,
    shippingAddress: input.shippingAddress,
    items: input.items,
    amount: input.amount,
  };
  data.orders.push(order);

  // 신규 이메일이면 회원으로 등록
  if (!data.members.some((m) => m.email.toLowerCase() === order.customerEmail.toLowerCase())) {
    data.members.push({
      id: `M${String(data.members.length + 1).padStart(4, "0")}`,
      name: order.customerName,
      email: order.customerEmail,
      phone: order.customerPhone,
      createdAt: now,
    });
  }

  await save(data);
  return order;
}
