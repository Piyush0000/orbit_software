"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ─── Colour palette ───────────────────────────────────────────────────────────
const BAR_GRADIENT = [
  "#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe",
  "#8b5cf6", "#a78bfa", "#7c3aed",
];

const PIE_COLORS = [
  "#6366f1", // Unfulfilled – indigo
  "#10b981", // Fulfilled – emerald
  "#f59e0b", // Shipped – amber
  "#22d3ee", // Delivered – cyan
  "#f43f5e", // Cancelled – rose
];

// ─── Utility ──────────────────────────────────────────────────────────────────
const fmt = (v: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v);

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border/60 bg-card/95 backdrop-blur px-3 py-2 shadow-xl text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.fill || p.stroke }}>
          {p.name}: <span className="font-mono font-bold">{typeof p.value === "number" && p.name.includes("Revenue") ? fmt(p.value) : p.value}</span>
        </p>
      ))}
    </div>
  );
};

// ─── Props shape ──────────────────────────────────────────────────────────────
interface DashboardChartsProps {
  salesTrend?: { date: string; revenue: number; orders: number }[];
  logistics?: { status: string; count: number }[];
  products?: { name: string; sales: number }[];
}

export function DashboardCharts({ salesTrend = [], logistics = [], products = [] }: DashboardChartsProps) {
  // Build bar data — last 7 days, short date label
  const barData = salesTrend.slice(-7).map((d) => ({
    ...d,
    label: new Date(d.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
  }));

  // Pie data — fulfillment status
  const pieData = logistics.length
    ? logistics
    : [{ status: "UNFULFILLED", count: 1 }]; // placeholder so pie renders

  // Top 5 products for horizontal bars
  const topProducts = products.slice(0, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 lg:px-6">
      {/* ── 1. Revenue Bar Chart (spans 2 cols) ── */}
      <Card className="md:col-span-2 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Revenue — Last 7 Days</CardTitle>
          <CardDescription>Daily revenue in INR</CardDescription>
        </CardHeader>
        <CardContent className="h-[260px] p-0 pb-4 px-2">
          {barData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <defs>
                  {barData.map((_, i) => (
                    <linearGradient key={i} id={`barGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={BAR_GRADIENT[i % BAR_GRADIENT.length]} stopOpacity={0.9} />
                      <stop offset="100%" stopColor={BAR_GRADIENT[i % BAR_GRADIENT.length]} stopOpacity={0.4} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.1} />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Bar dataKey="revenue" name="Revenue" radius={[6, 6, 0, 0]} maxBarSize={48}>
                  {barData.map((_, i) => (
                    <Cell key={i} fill={`url(#barGrad${i})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground italic">
              No sales data in the last 7 days.
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── 2. Order Status Donut ── */}
      <Card className="md:col-span-1 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Fulfillment Status</CardTitle>
          <CardDescription>Order breakdown by state</CardDescription>
        </CardHeader>
        <CardContent className="h-[260px] p-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                strokeWidth={0}
              >
                {pieData.map((_: any, i: number) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0];
                  return (
                    <div className="rounded-lg border bg-card px-3 py-2 text-xs shadow-xl">
                      <p className="font-semibold capitalize">{String(d.name).toLowerCase().replace(/_/g, " ")}</p>
                      <p className="font-mono font-bold text-primary">{d.value} orders</p>
                    </div>
                  );
                }}
              />
              <Legend
                formatter={(value) => (
                  <span className="text-[10px] capitalize text-muted-foreground">
                    {String(value).toLowerCase().replace(/_/g, " ")}
                  </span>
                )}
                iconSize={8}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ── 3. Top Products Horizontal Bars ── */}
      <Card className="md:col-span-3 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Top Products by Units Sold</CardTitle>
          <CardDescription>Best-performing SKUs this period</CardDescription>
        </CardHeader>
        <CardContent>
          {topProducts.length > 0 ? (
            <div className="space-y-3">
              {topProducts.map((p, i) => {
                const max = topProducts[0].sales || 1;
                const pct = Math.round((p.sales / max) * 100);
                return (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium truncate max-w-[200px]">{p.name}</span>
                      <span className="font-mono font-bold text-primary ml-2">{p.sales} units</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${pct}%`,
                          background: `linear-gradient(90deg, ${PIE_COLORS[i % PIE_COLORS.length]}, ${BAR_GRADIENT[i % BAR_GRADIENT.length]}88)`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex h-16 items-center justify-center text-xs text-muted-foreground italic">
              No product sales data available yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
