"use client"

import { useEffect, useState } from "react"
import { MetricsCards } from "./metrics-cards"
import { GrowthChart } from "./growth-chart"
import { TrafficChart } from "./traffic-chart"
import { BrandSelector } from "./brand-selector"
import { DateRangeSelector } from "@/components/ui/date-range-selector"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import { getBrandMetrics, getBrands } from "@/lib/admin-api"
import { AnalyticsMetrics, ChartDataPoint } from "@/types/analytics"

export function BrandAnalytics() {
    const [brands, setBrands] = useState<Array<{ id: string; name: string }>>([])
    const [selectedBrandId, setSelectedBrandId] = useState("")
    const [metrics, setMetrics] = useState<AnalyticsMetrics>({
        revenue: 0,
        orders: 0,
        traffic: 0,
        conversions: 0,
    })
    const [chartData, setChartData] = useState<ChartDataPoint[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true
        const loadBrands = async () => {
            try {
                const { stores } = await getBrands()
                if (!isMounted) return
                const mapped = stores.map((store) => ({ id: store.id, name: store.name }))
                setBrands(mapped)
                setSelectedBrandId(mapped[0]?.id || "")
            } catch (err) {
                if (!isMounted) return
                setError(err instanceof Error ? err.message : "Unable to load brands")
            }
        }
        loadBrands()
        return () => {
            isMounted = false
        }
    }, [])

    useEffect(() => {
        let isMounted = true
        const loadMetrics = async () => {
            if (!selectedBrandId) return
            setLoading(true)
            setError(null)
            try {
                const { metrics } = await getBrandMetrics(selectedBrandId)
                if (!isMounted) return
                const revenue = Number((metrics as { totalRevenue?: number }).totalRevenue || 0)
                const orders = Number((metrics as { orderCount?: number }).orderCount || 0)
                const aov = Number((metrics as { averageOrderValue?: number }).averageOrderValue || 0)
                setMetrics({
                    revenue,
                    orders,
                    traffic: 0,
                    conversions: aov,
                })
                setChartData([])
            } catch (err) {
                if (!isMounted) return
                setError(err instanceof Error ? err.message : "Unable to load brand analytics")
            } finally {
                if (isMounted) setLoading(false)
            }
        }
        loadMetrics()
        return () => {
            isMounted = false
        }
    }, [selectedBrandId])

    return (
        <div className="space-y-4">
            <div className="flex items-end justify-between gap-4">
                <div className="flex items-center gap-4">
                    <BrandSelector
                        selectedBrandId={selectedBrandId}
                        onBrandChange={setSelectedBrandId}
                        brands={brands}
                    />
                    <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-medium">Date Range</h3>
                        <div className="w-[200px]">
                            <DateRangeSelector
                                defaultValue="last-30-days"
                                onValueChange={(value, start, end) => {
                                    console.log("Date range changed:", value, start, end);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                    <FileDown className="h-4 w-4" />
                    Export CSV
                </Button>
            </div>
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
                <p className="text-xs text-muted-foreground">Loading brand analytics...</p>
            )}
        </div>
    )
}
