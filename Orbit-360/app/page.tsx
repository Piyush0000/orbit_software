"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getStoreAnalytics, getStoreOrders } from "@/lib/api";
import { toast } from "sonner";
import { IconLoader } from "@tabler/icons-react";
import { SummaryDashboard } from "@/components/summary-dashboard";

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const [analytics, setAnalytics] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user?.stores?.[0]?.id) return;
      try {
        setLoading(true);
        const storeId = user.stores[0].id;
        const [analyticData, rawOrderData] = await Promise.all([
          getStoreAnalytics(storeId),
          getStoreOrders(storeId),
        ]);
        setAnalytics(analyticData);
        setOrders(Array.isArray(rawOrderData) ? rawOrderData : (rawOrderData.orders || []));
      } catch (error: any) {
        console.error("Dashboard fetch error:", error);
        toast.error("Failed to fetch data from backend");
      } finally {
        setLoading(false);
      }
    }
    if (!authLoading) fetchData();
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <IconLoader className="animate-spin size-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col">
          <SummaryDashboard analytics={analytics} />
      </div>
    </div>
  );
}
