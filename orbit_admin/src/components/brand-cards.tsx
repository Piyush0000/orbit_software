"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Building2, CheckCircle, XCircle } from "lucide-react"
import { getPlatformMetrics } from "@/lib/admin-api"

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function BrandCards() {
    const router = useRouter()
    const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true
        const load = async () => {
            setLoading(true)
            setError(null)
            try {
                const { metrics } = await getPlatformMetrics()
                if (!isMounted) return
                setStats({
                    total: metrics.stores,
                    active: metrics.activeStores,
                    inactive: Math.max(metrics.stores - metrics.activeStores, 0),
                })
            } catch (err) {
                if (!isMounted) return
                setError(err instanceof Error ? err.message : "Unable to load brand metrics")
            } finally {
                if (isMounted) setLoading(false)
            }
        }
        load()
        return () => {
            isMounted = false
        }
    }, [])

    const cards = [
        {
            title: "Total Brands",
            value: stats.total,
            icon: Building2,
            description: "All registered brands",
            gradient: "from-blue-500/10 to-blue-500/5",
            iconColor: "text-blue-600 dark:text-blue-400",
        },
        {
            title: "Active Brands",
            value: stats.active,
            icon: CheckCircle,
            description: "Currently active",
            gradient: "from-green-500/10 to-green-500/5",
            iconColor: "text-green-600 dark:text-green-400",
        },
        {
            title: "Inactive Brands",
            value: stats.inactive,
            icon: XCircle,
            description: "Inactive or pending",
            gradient: "from-amber-500/10 to-amber-500/5",
            iconColor: "text-amber-600 dark:text-amber-400",
        },
    ]

    return (
        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => {
                const Icon = card.icon
                return (
                    <Card
                        key={card.title}
                        className={`cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] bg-gradient-to-br ${card.gradient} border-muted`}
                        onClick={() => router.push("/dashboard/brands")}
                    >
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardDescription className="text-sm font-medium">
                                    {card.title}
                                </CardDescription>
                                <Icon className={`h-5 w-5 ${card.iconColor}`} />
                            </div>
                            <CardTitle className="text-4xl font-bold tabular-nums mt-2">
                                {loading ? "—" : error ? "Error" : card.value}
                            </CardTitle>
                            <p className="text-xs text-muted-foreground mt-1">
                                {error || card.description}
                            </p>
                        </CardHeader>
                    </Card>
                )
            })}
        </div>
    )
}
