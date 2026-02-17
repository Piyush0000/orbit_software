"use client"

import { useEffect, useMemo, useState } from "react"
import { MetricsCards } from "./metrics-cards"
import { GrowthChart } from "./growth-chart"
import { TrafficChart } from "./traffic-chart"
import { getPlatformAggregates, getPlatformMetrics } from "@/lib/admin-api"
import { AnalyticsMetrics, ChartDataPoint } from "@/types/analytics"

export function PlatformAnalytics() {
    const [metrics, setMetrics] = useState<AnalyticsMetrics>({
        revenue: 0,
        orders: 0,
        traffic: 0,
        conversions: 0,
    })
    const [series, setSeries] = useState<ChartDataPoint[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true
        const load = async () => {
            setLoading(true)
            setError(null)
            try {
                const [{ metrics }, { aggregates }] = await Promise.all([
                    getPlatformMetrics(),
                    getPlatformAggregates({ periodType: "DAILY" }),
                ])
                if (!isMounted) return
                setMetrics({
                    revenue: Number(metrics.revenue) || 0,
                    orders: metrics.orders || 0,
                    traffic: metrics.merchants || 0,
                    conversions: Number(metrics.averageOrderValue) || 0,
                })
                const mapped = (aggregates || [])
                    .map((item) => ({
                        date: String((item as { periodStart?: string }).periodStart || ""),
                        revenue: Number((item as { totalRevenue?: number }).totalRevenue || 0),
                        orders: Number((item as { totalOrders?: number }).totalOrders || 0),
                        traffic: Number((item as { totalOrders?: number }).totalOrders || 0),
                    }))
                    .filter((point) => point.date)
                    .reverse()
                setSeries(mapped)
            } catch (err) {
                if (!isMounted) return
                setError(err instanceof Error ? err.message : "Unable to load analytics")
            } finally {
                if (isMounted) setLoading(false)
            }
        }
        load()
        return () => {
            isMounted = false
        }
    }, [])

    const chartData = useMemo(() => (series.length > 0 ? series : []), [series])

    return (
        <div className="space-y-4">
            {error && <p className="text-sm text-muted-foreground">{error}</p>}
            <MetricsCards metrics={metrics} />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                    <GrowthChart data={chartData} />
                </div>
                <div className="col-span-3">
                    <TrafficChart data={chartData} />
                </div>
            </div>
            {loading && (
                <p className="text-xs text-muted-foreground">Loading platform analytics...</p>
            )}
        </div>
    )
}
