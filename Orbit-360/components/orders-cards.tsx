import React from "react";
import {
  ShoppingCart,
  Package,
  Truck,
  XCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface OrdersCardsProps {
  orders?: any[];
}

export const OrdersCards: React.FC<OrdersCardsProps> = ({ orders = [] }) => {
  const safeOrders = Array.isArray(orders) ? orders : [];

  const totalOrders = safeOrders.length;
  const pendingOrders = safeOrders.filter(o => o.status === "PENDING" || o.status === "PROCESSING").length;
  const shippedToday = safeOrders.filter(o => {
    const today = new Date().toISOString().split("T")[0];
    return o.status === "SHIPPED" && o.createdAt?.startsWith(today);
  }).length;
  const refunds = safeOrders.filter(o => o.status === "REFUNDED" || o.status === "CANCELLED").length;
  const confirmed = safeOrders.filter(o => o.status === "CONFIRMED" || o.status === "DELIVERED").length;

  const metrics = [
    {
      label: "Total Orders",
      value: totalOrders,
      sub: "All time volume",
      icon: ShoppingCart,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-600",
      topStrip: "bg-gradient-to-r from-blue-400 to-cyan-500",
      trend: <span className="flex items-center gap-1 text-emerald-600 text-[11px] font-semibold"><TrendingUp className="size-3" /> Lifetime</span>,
    },
    {
      label: "Pending Fulfillment",
      value: pendingOrders,
      sub: "Awaiting dispatch",
      icon: Clock,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-600",
      topStrip: "bg-gradient-to-r from-amber-400 to-orange-500",
      trend: pendingOrders > 0
        ? <span className="flex items-center gap-1 text-amber-600 text-[11px] font-semibold"><TrendingDown className="size-3" /> Needs action</span>
        : <span className="flex items-center gap-1 text-emerald-600 text-[11px] font-semibold"><CheckCircle2 className="size-3" /> All clear</span>,
    },
    {
      label: "Shipped Today",
      value: shippedToday,
      sub: "Dispatched from facility",
      icon: Truck,
      iconBg: "bg-indigo-500/10",
      iconColor: "text-indigo-600",
      topStrip: "bg-gradient-to-r from-indigo-400 to-violet-500",
      trend: <span className="flex items-center gap-1 text-indigo-600 text-[11px] font-semibold"><TrendingUp className="size-3" /> In transit</span>,
    },
    {
      label: "Returns / Cancelled",
      value: refunds,
      sub: "Impact on net revenue",
      icon: XCircle,
      iconBg: "bg-rose-500/10",
      iconColor: "text-rose-600",
      topStrip: "bg-gradient-to-r from-rose-400 to-red-500",
      trend: refunds > 0
        ? <span className="flex items-center gap-1 text-rose-600 text-[11px] font-semibold"><TrendingDown className="size-3" /> Monitor</span>
        : <span className="flex items-center gap-1 text-emerald-600 text-[11px] font-semibold"><CheckCircle2 className="size-3" /> No issues</span>,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 px-4 lg:px-6">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div key={m.label} className="rounded-xl border bg-card overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            <div className={`h-1 w-full ${m.topStrip}`} />
            <div className="p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className={`p-2.5 rounded-xl ${m.iconBg}`}>
                  <Icon className={`size-5 ${m.iconColor}`} />
                </div>
                {m.trend}
              </div>
              <div>
                <div className="text-3xl font-black tabular-nums">{m.value}</div>
                <div className="text-sm font-semibold text-foreground mt-0.5">{m.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{m.sub}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
