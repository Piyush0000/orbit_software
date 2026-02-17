"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock } from "lucide-react";
import { getInactiveOnboarding } from "@/lib/admin-api";

type AlertItem = {
  id: string;
  type: string;
  severity: "high" | "medium" | "low";
  brand: string;
  brand_id: string;
  status: "unresolved" | "resolved";
  created_at: string;
};

const severityConfig = {
  high: {
    icon: AlertTriangle,
    color: "text-red-600 dark:text-red-400",
    badge: "destructive" as const,
    bg: "bg-red-50 dark:bg-red-950/20",
  },
  medium: {
    icon: AlertTriangle,
    color: "text-orange-600 dark:text-orange-400",
    badge: "default" as const,
    bg: "bg-orange-50 dark:bg-orange-950/20",
  },
  low: {
    icon: AlertTriangle,
    color: "text-blue-600 dark:text-blue-400",
    badge: "secondary" as const,
    bg: "bg-blue-50 dark:bg-blue-950/20",
  },
};

export function AlertsSection() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const { stores, inactivityDays } = await getInactiveOnboarding(7);
        if (!isMounted) return;
        const items: AlertItem[] = stores.map((store) => ({
          id: store.id,
          type: `Inactive onboarding (${inactivityDays}d)`,
          severity: "high",
          brand: store.name,
          brand_id: store.subdomain,
          status: "unresolved",
          created_at: store.lastOnboardingActivityAt || store.createdAt,
        }));
        setAlerts(items);
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Unable to load alerts");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Card className="bg-card border-muted">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Alerts</CardTitle>
        <p className="text-sm text-muted-foreground">
          {error || "Latest system notifications and issues"}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Loading alerts...
            </div>
          )}
          {!loading && alerts.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No alerts right now.
            </p>
          )}
          {alerts.map((alert) => {
            const config = severityConfig[alert.severity];
            const Icon = config.icon;
            const isResolved = alert.status === "resolved";

            return (
              <div
                key={alert.id}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                  isResolved
                    ? "bg-muted/30 border-muted opacity-70"
                    : `${config.bg} border-muted`
                }`}
              >
                <Icon
                  className={`h-5 w-5 mt-0.5 flex-shrink-0 ${config.color}`}
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <p className="font-medium text-sm leading-tight">
                        {alert.type}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {alert.brand}{" "}
                        <span className="opacity-60">({alert.brand_id})</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge
                        variant={config.badge}
                        className="text-xs capitalize"
                      >
                        {alert.severity}
                      </Badge>
                      <Badge
                        variant={isResolved ? "outline" : "secondary"}
                        className="text-xs"
                      >
                        {alert.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(alert.created_at).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
