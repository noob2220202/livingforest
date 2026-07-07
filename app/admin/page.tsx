"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  Order,
  OrderStats,
  OrderStatus,
  ORDER_STATUSES,
  formatPrice,
} from "@/lib/orders";

type AuthState = "loading" | "unauth" | "auth";

interface OrdersResponse {
  orders: Order[];
  stats: OrderStats;
}

const STATUS_STYLES: Record<OrderStatus, string> = {
  결제대기: "bg-gold/15 text-gold border-gold/30",
  결제완료: "bg-forest-soft/15 text-forest border-forest-soft/30",
  배송준비: "bg-forest-light/15 text-forest-light border-forest-light/30",
  배송중: "bg-forest/10 text-forest border-forest/25",
  배송완료: "bg-forest/90 text-linen border-forest",
  취소: "bg-charcoal/10 text-charcoal/60 border-charcoal/20",
};

export default function AdminPage() {
  const [auth, setAuth] = useState<AuthState>("loading");
  const [data, setData] = useState<OrdersResponse | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast((t) => (t === msg ? null : t)), 2600);
  }, []);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/orders", { cache: "no-store" });
    if (res.status === 401) {
      setAuth("unauth");
      setData(null);
      return;
    }
    const json = (await res.json()) as OrdersResponse;
    setData(json);
    setAuth("auth");
  }, []);

  useEffect(() => {
    // load()는 fetch 이후 비동기적으로만 setState하므로 동기 cascading render가 아니다.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  if (auth === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-forest-soft">
        불러오는 중…
      </div>
    );
  }

  if (auth === "unauth") {
    return <LoginView onSuccess={load} />;
  }

  return (
    <>
      <Dashboard data={data!} reload={load} showToast={showToast} />
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <div className="rounded bg-forest px-5 py-3 text-sm text-linen shadow-lg">{toast}</div>
        </div>
      )}
    </>
  );
}

// ---- 로그인 화면 ---------------------------------------------------------

function LoginView({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setError(json.error ?? "로그인에 실패했습니다.");
        return;
      }
      onSuccess();
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-forest-soft">Living Forest</p>
          <h1 className="font-display text-2xl text-forest">주문 관리자</h1>
          <p className="mt-2 text-sm text-charcoal/60">관리자 계정으로 로그인해 주세요.</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-lg border border-sand bg-linen p-6 shadow-sm"
        >
          <input
            type="email"
            autoComplete="username"
            required
            placeholder="관리자 이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-sand bg-linen px-4 py-2.5 text-sm outline-none focus:border-forest"
          />
          <input
            type="password"
            autoComplete="current-password"
            required
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-sand bg-linen px-4 py-2.5 text-sm outline-none focus:border-forest"
          />
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-forest py-3 text-sm tracking-wide text-linen transition-colors hover:bg-forest-light disabled:opacity-60"
          >
            {loading ? "확인 중…" : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ---- 대시보드 ------------------------------------------------------------

function Dashboard({
  data,
  reload,
  showToast,
}: {
  data: OrdersResponse;
  reload: () => Promise<void>;
  showToast: (msg: string) => void;
}) {
  const { orders, stats } = data;
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "전체">("전체");
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      if (statusFilter !== "전체" && o.status !== statusFilter) return false;
      if (!q) return true;
      return [o.id, o.customerName, o.customerEmail, o.customerPhone]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [orders, statusFilter, query]);

  async function changeStatus(order: Order, status: OrderStatus) {
    if (status === order.status) return;
    setBusyId(order.id);
    try {
      const res = await fetch(`/api/admin/orders/${encodeURIComponent(order.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      await reload();
      showToast(`${order.id} 상태를 '${status}'(으)로 변경했습니다.`);
    } catch {
      showToast("상태 변경에 실패했습니다.");
    } finally {
      setBusyId(null);
    }
  }

  async function removeOrder(order: Order) {
    if (!window.confirm(`주문 ${order.id}을(를) 삭제하시겠습니까?\n삭제 후에는 복구할 수 없습니다.`)) {
      return;
    }
    setBusyId(order.id);
    try {
      const res = await fetch(`/api/admin/orders/${encodeURIComponent(order.id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      await reload();
      showToast(`주문 ${order.id}을(를) 삭제했습니다.`);
    } catch {
      showToast("주문 삭제에 실패했습니다.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    await reload();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-forest-soft">Living Forest Admin</p>
          <h1 className="font-display text-2xl text-forest">주문 관리</h1>
        </div>
        <button
          onClick={handleLogout}
          className="border border-sand bg-linen px-4 py-2 text-sm text-charcoal/70 transition-colors hover:border-forest hover:text-forest"
        >
          로그아웃
        </button>
      </header>

      {/* 통계 카드 */}
      <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="총 주문 수" value={`${stats.totalOrders.toLocaleString("ko-KR")}건`} />
        <StatCard label="매출 합계" value={formatPrice(stats.revenue)} accent />
        <StatCard label="결제대기" value={`${stats.pendingCount.toLocaleString("ko-KR")}건`} />
        <StatCard label="전체 회원" value={`${stats.memberCount.toLocaleString("ko-KR")}명`} />
      </section>

      {/* 상태 필터 칩 */}
      <section className="mb-4 flex flex-wrap gap-2">
        <Chip
          active={statusFilter === "전체"}
          label="전체"
          count={stats.totalOrders}
          onClick={() => setStatusFilter("전체")}
        />
        {ORDER_STATUSES.map((s) => (
          <Chip
            key={s}
            active={statusFilter === s}
            label={s}
            count={stats.statusCounts[s]}
            onClick={() => setStatusFilter(s)}
          />
        ))}
      </section>

      {/* 검색 */}
      <section className="mb-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="주문번호 · 이름 · 이메일 · 연락처 검색"
          className="w-full max-w-md border border-sand bg-linen px-4 py-2.5 text-sm outline-none focus:border-forest"
        />
      </section>

      {/* 주문 테이블 */}
      <section className="overflow-hidden rounded-lg border border-sand bg-linen">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-sand bg-linen-deep text-left text-xs uppercase tracking-wide text-forest-soft">
                <th className="px-4 py-3 font-medium">주문번호</th>
                <th className="px-4 py-3 font-medium">주문자</th>
                <th className="px-4 py-3 font-medium">주문 상품 / 배송지</th>
                <th className="px-4 py-3 text-right font-medium">금액</th>
                <th className="px-4 py-3 font-medium">주문일시</th>
                <th className="px-4 py-3 font-medium">상태</th>
                <th className="px-4 py-3 font-medium">관리</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-charcoal/50">
                    조건에 맞는 주문이 없습니다.
                  </td>
                </tr>
              )}
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-sand/60 align-top last:border-0">
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-forest">{o.id}</td>
                  <td className="px-4 py-4">
                    <div className="font-medium">{o.customerName}</div>
                    <div className="text-xs text-charcoal/60">{o.customerPhone}</div>
                    <div className="text-xs text-charcoal/60">{o.customerEmail}</div>
                  </td>
                  <td className="max-w-xs px-4 py-4">
                    <ul className="space-y-0.5">
                      {o.items.map((it, i) => (
                        <li key={i} className="text-charcoal/80">
                          {it.name} <span className="text-charcoal/50">× {it.qty}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-1 text-xs text-charcoal/50">{o.shippingAddress}</div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-right font-medium">
                    {formatPrice(o.amount)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-xs text-charcoal/60">
                    {formatDateTime(o.createdAt)}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={o.status} />
                    <select
                      value={o.status}
                      disabled={busyId === o.id}
                      onChange={(e) => changeStatus(o, e.target.value as OrderStatus)}
                      className="mt-2 block w-full border border-sand bg-linen px-2 py-1.5 text-xs outline-none focus:border-forest disabled:opacity-50"
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <button
                      onClick={() => removeOrder(o)}
                      disabled={busyId === o.id}
                      className="text-xs text-charcoal/50 underline-offset-2 transition-colors hover:text-red-700 hover:underline disabled:opacity-50"
                    >
                      주문 삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-lg border p-5 ${
        accent ? "border-forest bg-forest text-linen" : "border-sand bg-linen"
      }`}
    >
      <p className={`text-xs ${accent ? "text-linen/70" : "text-forest-soft"}`}>{label}</p>
      <p className={`mt-2 font-display text-2xl ${accent ? "text-linen" : "text-forest"}`}>
        {value}
      </p>
    </div>
  );
}

function Chip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        active
          ? "border-forest bg-forest text-linen"
          : "border-sand bg-linen text-charcoal/70 hover:border-forest-soft"
      }`}
    >
      <span>{label}</span>
      <span
        className={`rounded-full px-1.5 text-xs ${
          active ? "bg-linen/20 text-linen" : "bg-linen-deep text-charcoal/60"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

function formatDateTime(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}
