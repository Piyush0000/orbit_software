"use client";

import { useEffect, useState } from "react";
import { OrdersTable } from "@/components/orders-table";
import { OrdersCards } from "@/components/orders-cards";
import { useAuth } from "@/contexts/AuthContext";
import { getStoreOrders } from "@/lib/api";
import { IconLoader } from "@tabler/icons-react";
import { ShoppingCart, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    if (!user?.stores?.[0]?.id) return;
    try {
      setLoading(true);
      const data = await getStoreOrders(user.stores[0].id);
      const orderData = Array.isArray(data) ? data : (data.orders || []);
      setOrders(orderData);
    } catch (error) {
      console.error("Orders fetch error:", error);
      toast.error("Failed to load orders from backend");
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

  return (
    <div className="flex flex-1 flex-col gap-6 pb-10">
      {/* Page Header */}
      <div className="flex items-center justify-between px-4 lg:px-6 pt-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 rounded-xl">
            <ShoppingCart className="size-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Orders</h1>
            <p className="text-sm text-muted-foreground">Manage and track all customer orders</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs font-semibold">
            {orders.length} Total
          </Badge>
          <Button variant="outline" size="sm" onClick={fetchData} className="gap-2">
            <RefreshCw className="size-3.5" />
            Refresh
          </Button>
        </div>
      </div>

      {/* KPI Strip */}
      <OrdersCards orders={orders} />

      {/* Table */}
      <div className="px-4 lg:px-6">
        <OrdersTable data={orders} />
      </div>
    </div>
  );
}
