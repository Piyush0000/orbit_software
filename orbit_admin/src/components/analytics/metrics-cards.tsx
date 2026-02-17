import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnalyticsMetrics } from "@/types/analytics"
import { IndianRupee, ShoppingCart, Users, Activity } from "lucide-react"

interface MetricsCardsProps {
    metrics: AnalyticsMetrics
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₹{metrics.revenue.toLocaleString('en-IN')}</div>
                    <p className="text-xs text-muted-foreground">Real-time platform total</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Orders</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+{metrics.orders.toLocaleString('en-US')}</div>
                    <p className="text-xs text-muted-foreground">Total orders to date</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Traffic</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+{metrics.traffic.toLocaleString('en-US')}</div>
                    <p className="text-xs text-muted-foreground">Active merchant count</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{metrics.conversions}%</div>
                    <p className="text-xs text-muted-foreground">Average order value</p>
                </CardContent>
            </Card>
        </div>
    )
}
