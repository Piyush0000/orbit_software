"use client";

import { useEffect, useState } from "react";
import { CustomersTable } from "@/components/customers-table";
import { useAuth } from "@/contexts/AuthContext";
import { getStoreCustomers } from "@/lib/api";
import { IconLoader } from "@tabler/icons-react";
import { Users, RefreshCw, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function CustomersPage() {
  const { user, loading: authLoading } = useAuth();
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    if (!user?.stores?.[0]?.id) return;
    try {
      setLoading(true);
      const data = await getStoreCustomers(user.stores[0].id);
      setCustomers(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("Customers fetch error:", error);
      toast.error("Failed to load customers from backend");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!authLoading) fetchData();
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-20">
        <IconLoader className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  // Mini KPI cards
  const returning = customers.filter((c: any) => (c.orderCount || 0) > 1).length;
  const newCustomers = customers.filter((c: any) => (c.orderCount || 0) === 1).length;

  const kpis = [
    { label: "Total Customers", value: customers.length, icon: "👥", color: "from-blue-400 to-cyan-400", sub: "All time" },
    { label: "Returning Buyers", value: returning, icon: "🔄", color: "from-emerald-400 to-teal-400", sub: "2+ orders" },
    { label: "New Customers", value: newCustomers, icon: "✨", color: "from-violet-400 to-purple-400", sub: "First order" },
    { label: "Avg. Orders", value: customers.length ? (customers.reduce((a: number, c: any) => a + (c.orderCount || 1), 0) / customers.length).toFixed(1) : "0", icon: "📦", color: "from-amber-400 to-orange-400", sub: "Per customer" },
  ];

  return (
    <div className="flex flex-1 flex-col gap-6 pb-10">
      {/* Page Header */}
      <div className="flex items-center justify-between px-4 lg:px-6 pt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 rounded-xl">
            <Users className="size-5 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
            <p className="text-sm text-muted-foreground">View and manage your customer base</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs font-semibold">{customers.length} Total</Badge>
          <Button variant="outline" size="sm" onClick={fetchData} className="gap-2">
            <RefreshCw className="size-3.5" />
            Refresh
          </Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 px-4 lg:px-6">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border bg-card overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            <div className={`h-1 w-full bg-gradient-to-r ${k.color}`} />
            <div className="p-4 flex items-center gap-3">
              <div className="text-2xl">{k.icon}</div>
              <div>
                <div className="text-2xl font-black tabular-nums">{k.value}</div>
                <div className="text-xs font-semibold">{k.label}</div>
                <div className="text-[10px] text-muted-foreground">{k.sub}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="px-4 lg:px-6">
        <CustomersTable data={customers} />
      </div>
    </div>
  );
}
