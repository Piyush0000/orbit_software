import React from "react";
import {
  Package,
  AlertTriangle,
  XOctagon,
  Tag,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
} from "lucide-react";

interface ProductCardsProps {
  products?: any[];
}

export const ProductCards: React.FC<ProductCardsProps> = ({ products = [] }) => {
  const totalProducts = products.length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock < 10).length;
  const outOfStock = products.filter(p => p.stock <= 0).length;
  const inStock = products.filter(p => p.stock >= 10).length;

  // Find top category
  const categories: Record<string, number> = {};
  products.forEach(p => {
    if (p.category) categories[p.category] = (categories[p.category] || 0) + 1;
  });
  const topCategory = Object.keys(categories).sort((a, b) => categories[b] - categories[a])[0] || "—";

  const metrics = [
    {
      label: "Total Catalog",
      value: totalProducts,
      sub: "Active SKUs in store",
      icon: Package,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-600",
      topStrip: "bg-gradient-to-r from-blue-400 to-cyan-500",
      trend: <span className="flex items-center gap-1 text-emerald-600 text-[11px] font-semibold"><TrendingUp className="size-3" /> Live</span>,
    },
    {
      label: "Low Stock Alert",
      value: lowStock,
      sub: "Items below 10 units",
      icon: AlertTriangle,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-600",
      topStrip: "bg-gradient-to-r from-amber-400 to-orange-500",
      trend: lowStock > 0
        ? <span className="flex items-center gap-1 text-amber-600 text-[11px] font-semibold"><TrendingDown className="size-3" /> Restock</span>
        : <span className="flex items-center gap-1 text-emerald-600 text-[11px] font-semibold"><CheckCircle2 className="size-3" /> Healthy</span>,
    },
    {
      label: "Out of Stock",
      value: outOfStock,
      sub: "Zero inventory detected",
      icon: XOctagon,
      iconBg: "bg-rose-500/10",
      iconColor: "text-rose-600",
      topStrip: "bg-gradient-to-r from-rose-400 to-red-500",
      trend: outOfStock > 0
        ? <span className="flex items-center gap-1 text-rose-600 text-[11px] font-semibold"><TrendingDown className="size-3" /> Urgent</span>
        : <span className="flex items-center gap-1 text-emerald-600 text-[11px] font-semibold"><CheckCircle2 className="size-3" /> All stocked</span>,
    },
    {
      label: "Top Category",
      value: topCategory,
      sub: "Highest product count",
      icon: Tag,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-600",
      topStrip: "bg-gradient-to-r from-violet-400 to-purple-500",
      trend: <span className="flex items-center gap-1 text-violet-600 text-[11px] font-semibold"><TrendingUp className="size-3" /> #1 Sector</span>,
      isText: true,
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
                <div className={`font-black tabular-nums mt-0.5 ${m.isText ? "text-xl truncate" : "text-3xl"}`}>
                  {m.value}
                </div>
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
