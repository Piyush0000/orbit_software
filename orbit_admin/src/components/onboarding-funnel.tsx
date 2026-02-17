"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle, Clock } from "lucide-react"
import { getOnboardingFunnel } from "@/lib/admin-api"

export function OnboardingFunnel() {
    const [totalStores, setTotalStores] = useState(0)
    const [statusSummary, setStatusSummary] = useState<Record<string, number>>({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true
        const load = async () => {
            setLoading(true)
            setError(null)
            try {
                const { metrics } = await getOnboardingFunnel()
                if (!isMounted) return
                setTotalStores(metrics.totalStores)
                setStatusSummary(metrics.statusSummary || {})
            } catch (err) {
                if (!isMounted) return
                setError(err instanceof Error ? err.message : "Unable to load onboarding metrics")
            } finally {
                if (isMounted) setLoading(false)
            }
        }
        load()
        return () => {
            isMounted = false
        }
    }, [])

    const funnelData = useMemo(() => {
        const stages = [
            { key: "NOT_STARTED", label: "Not Started" },
            { key: "IN_PROGRESS", label: "In Progress" },
            { key: "COMPLETED", label: "Completed" },
            { key: "BLOCKED", label: "Blocked" },
        ]
        if (error) return stages.map(s => ({ stage: s.label, count: 0, percentage: 0, status: "pending" }));
        
        return stages.map((stage) => {
            const count = statusSummary[stage.key] || 0
            const percentage = totalStores ? Math.round((count / totalStores) * 100) : 0
            return {
                stage: stage.label,
                count,
                percentage,
                status:
                    stage.key === "COMPLETED"
                        ? "completed"
                        : stage.key === "IN_PROGRESS"
                            ? "in-progress"
                            : "pending",
            }
        })
    }, [statusSummary, totalStores, error])

    return (
        <Card className="bg-card border-muted">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    Onboarding Funnel
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    {error || "Brand onboarding progress overview"}
                </p>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {loading && (
                        <p className="text-sm text-muted-foreground">Loading onboarding metrics...</p>
                    )}
                    {funnelData.map((item, index) => {
                        const isCompleted = item.status === "completed"
                        const isInProgress = item.status === "in-progress"

                        return (
                            <div key={item.stage} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {isCompleted ? (
                                            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        ) : isInProgress ? (
                                            <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        ) : (
                                            <Circle className="h-5 w-5 text-muted-foreground" />
                                        )}
                                        <span className="font-medium text-sm">{item.stage}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-muted-foreground">
                                            {item.count} brands
                                        </span>
                                        <span className="text-sm font-semibold tabular-nums min-w-[45px] text-right">
                                            {item.percentage}%
                                        </span>
                                    </div>
                                </div>
                                <Progress
                                    value={item.percentage}
                                    className="h-2"
                                    indicatorClassName={
                                        isCompleted
                                            ? "bg-green-600 dark:bg-green-400"
                                            : isInProgress
                                                ? "bg-blue-600 dark:bg-blue-400"
                                                : "bg-muted-foreground"
                                    }
                                />
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
