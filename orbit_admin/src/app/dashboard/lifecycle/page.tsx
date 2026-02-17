"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle,
  TrendingUp,
  Users,
  ShoppingCart,
  Loader2
} from "lucide-react"
import { getOnboardingFunnel, getPlatformMetrics, getBrands, Store } from "@/lib/admin-api"

export default function LifecyclePage() {
    const [loading, setLoading] = React.useState(true)
    const [metrics, setMetrics] = React.useState<any>(null)
    const [funnel, setFunnel] = React.useState<any>(null)
    const [recentStores, setRecentStores] = React.useState<Store[]>([])
    const [error, setError] = React.useState<string | null>(null)

    React.useEffect(() => {
        async function loadData() {
            try {
                setLoading(true)
                const [metricsRes, funnelRes, brandsRes] = await Promise.all([
                    getPlatformMetrics(),
                    getOnboardingFunnel(),
                    getBrands()
                ])
                setMetrics(metricsRes.metrics)
                setFunnel(funnelRes.metrics)
                // Take top 5 recent stores
                setRecentStores(brandsRes.stores.slice(0, 5))
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load lifecycle data")
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [])

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    const lifecycleStages = [
        {
            stage: "Lead",
            count: funnel?.statusSummary?.['NOT_STARTED'] || 0,
            trend: "New Signups",
            icon: Users,
            color: "text-blue-500",
            bgColor: "bg-blue-50 dark:bg-blue-950",
        },
        {
            stage: "Prospect",
            count: funnel?.statusSummary?.['IN_PROGRESS'] || 0,
            trend: "Onboarding",
            icon: TrendingUp,
            color: "text-purple-500",
            bgColor: "bg-purple-50 dark:bg-purple-950",
        },
        {
            stage: "Customer",
            count: funnel?.statusSummary?.['COMPLETED'] || 0,
            trend: "Finished",
            icon: ShoppingCart,
            color: "text-green-500",
            bgColor: "bg-green-50 dark:bg-green-950",
        },
        {
            stage: "Active",
            count: metrics?.activeStores || 0,
            trend: "Live Stores",
            icon: CheckCircle2,
            color: "text-emerald-500",
            bgColor: "bg-emerald-50 dark:bg-emerald-950",
        },
    ]

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'COMPLETED': return { icon: CheckCircle2, color: "text-green-500" }
            case 'IN_PROGRESS': return { icon: Clock, color: "text-yellow-500" }
            case 'NOT_STARTED': return { icon: AlertCircle, color: "text-orange-500" }
            default: return { icon: AlertCircle, color: "text-gray-500" }
        }
    }

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr)
        const diff = Date.now() - date.getTime()
        const hours = Math.floor(diff / (1000 * 60 * 60))
        if (hours < 1) return "Just now"
        if (hours < 24) return `${hours}h ago`
        return `${Math.floor(hours / 24)}d ago`
    }

    return (
        <SidebarProvider suppressHydrationWarning>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8" suppressHydrationWarning>
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-bold tracking-tight">Merchant Lifecycle</h2>
                    </div>

                    {error && (
                        <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Lifecycle Stages */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {lifecycleStages.map((stage) => {
                            const Icon = stage.icon
                            return (
                                <Card key={stage.stage}>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {stage.stage}
                                        </CardTitle>
                                        <div className={`${stage.bgColor} p-2 rounded-lg`}>
                                            <Icon className={`h-4 w-4 ${stage.color}`} />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stage.count}</div>
                                        <p className="text-xs text-muted-foreground">
                                            {stage.trend}
                                        </p>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>

                    {/* Recent Activities */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Signups & Changes</CardTitle>
                            <CardDescription>
                                Most recent merchants entering the system
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentStores.length > 0 ? recentStores.map((store) => {
                                    const { icon: Icon, color } = getStatusIcon(store.onboardingStatus)
                                    return (
                                        <div
                                            key={store.id}
                                            className="flex items-center justify-between p-4 border rounded-lg"
                                        >
                                            <div className="flex items-center gap-4">
                                                <Icon className={`h-5 w-5 ${color}`} />
                                                <div>
                                                    <p className="font-medium">{store.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {formatTime(store.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge variant="outline">{store.onboardingStatus}</Badge>
                                        </div>
                                    )
                                }) : (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No recent activity found.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Lifecycle Funnel */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Onboarding Progression</CardTitle>
                            <CardDescription>
                                Distribution of stores across onboarding stages
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'].map((status) => {
                                    const count = funnel?.statusSummary?.[status] || 0
                                    const percentage = funnel?.totalStores ? Math.round((count / funnel.totalStores) * 100) : 0
                                    const colors = {
                                        'NOT_STARTED': 'bg-blue-500',
                                        'IN_PROGRESS': 'bg-yellow-500',
                                        'COMPLETED': 'bg-green-500'
                                    }
                                    return (
                                        <div key={status} className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span>{status.replace('_', ' ')}</span>
                                                <span className="font-medium">{count} ({percentage}%)</span>
                                            </div>
                                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full ${colors[status as keyof typeof colors]}`} 
                                                    style={{ width: `${percentage}%` }} 
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
