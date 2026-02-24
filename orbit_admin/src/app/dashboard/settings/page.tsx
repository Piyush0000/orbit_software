"use client"

import * as React from "react"
import {
    Info,
    ShieldCheck,
    Layout,
    Rocket,
    History,
    Save,
    RefreshCw
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

type SystemConfig = {
    key: string
    label: string
    description: string
    value: string | boolean | number
    updated_at: string
}

export default function SettingsPage() {
    const [config, setConfig] = React.useState<SystemConfig[]>([
        {
            key: "onboarding_enabled",
            label: "Onboarding Flow",
            description: "Enable or disable the merchant onboarding process",
            value: true,
            updated_at: "2024-01-15T10:30:00Z"
        },
        {
            key: "analytics_enabled",
            label: "Analytics Module",
            description: "Enable advanced analytics and reporting features",
            value: true,
            updated_at: "2024-01-20T14:15:00Z"
        },
        {
            key: "email_notifications",
            label: "Email Notifications",
            description: "Send automated email notifications for system events",
            value: true,
            updated_at: "2024-01-18T09:45:00Z"
        },
        {
            key: "payment_processing",
            label: "Payment Processing",
            description: "Enable payment gateway integrations for merchants",
            value: true,
            updated_at: "2024-01-10T16:20:00Z"
        },
        {
            key: "platform_version",
            label: "Platform Version",
            description: "Current version of the Orbit admin platform",
            value: "v2.1.4",
            updated_at: "2024-01-25T08:00:00Z"
        },
        {
            key: "active_merchants",
            label: "Active Merchants",
            description: "Total number of active merchant accounts",
            value: "142",
            updated_at: "2024-01-25T12:30:00Z"
        },
        {
            key: "uptime_percentage",
            label: "System Uptime",
            description: "Platform availability percentage over the last 30 days",
            value: "99.8%",
            updated_at: "2024-01-25T12:30:00Z"
        },
        {
            key: "last_deployment",
            label: "Last Deployment",
            description: "Date and time of the most recent platform deployment",
            value: "2024-01-25 14:30 UTC",
            updated_at: "2024-01-25T14:30:00Z"
        }
    ])

    const [saving, setSaving] = React.useState(false)

    const handleToggle = (key: string) => {
        setConfig(prev => prev.map(item =>
            item.key === key ? { ...item, value: !item.value, updated_at: new Date().toISOString() } : item
        ))
    }

    const handleSave = async () => {
        setSaving(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSaving(false)
        // In a real app, you would save to backend here
    }

    const handleReset = () => {
        setConfig(prev => prev.map(item => ({
            ...item,
            value: typeof item.value === 'boolean' ? true : item.value,
            updated_at: new Date().toISOString()
        })))
    }

    const featureToggles = config.filter(c => typeof c.value === 'boolean')
    const systemInfo = config.filter(c => typeof c.value !== 'boolean')

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col p-4 md:p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2 mb-6">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
                            <p className="text-muted-foreground">
                                Manage platform-level configurations and global feature flags
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={handleReset}>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Reset
                            </Button>
                            <Button size="sm" onClick={handleSave} disabled={saving}>
                                {saving ? (
                                    <>
                                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {config.length === 0 && (
                        <p className="text-sm text-muted-foreground mb-4">
                            No system settings available from the backend.
                        </p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* FEATURE CONFIGURATIONS */}
                        <div className="space-y-6">
                            <Card className="border-slate-200 shadow-sm">
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="h-5 w-5 text-primary" />
                                        <CardTitle>Feature Controls</CardTitle>
                                    </div>
                                    <CardDescription>
                                        Enable or disable core platform modules and onboarding flows.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {featureToggles.map((item) => (
                                        <div key={item.key} className="flex items-start justify-between space-x-4">
                                            <div className="space-y-0.5">
                                                <div className="font-medium">{item.label}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {item.description}
                                                </div>
                                            </div>
                                            <Switch
                                                checked={item.value as boolean}
                                                onCheckedChange={() => handleToggle(item.key)}
                                            />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card className="bg-muted/30">
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <History className="h-5 w-5 text-muted-foreground" />
                                        <CardTitle className="text-base">Recent Updates</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {[...config]
                                        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
                                        .slice(0, 3)
                                        .map((item) => (
                                            <div key={item.key} className="flex items-center justify-between text-xs">
                                                <span className="text-muted-foreground">{item.label}</span>
                                                <span className="font-mono">{new Date(item.updated_at).toLocaleString("en-US", { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        ))}
                                </CardContent>
                            </Card>
                        </div>

                        {/* SYSTEM INFORMATION (READ-ONLY) */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <Info className="h-5 w-5 text-primary" />
                                        <CardTitle>System Information</CardTitle>
                                    </div>
                                    <CardDescription>
                                        Read-only details about the current platform state.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {systemInfo.map((item) => (
                                        <div key={item.key} className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                                                <Badge variant="outline" className="font-mono">
                                                    {item.value}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground italic">
                                                {item.description}
                                            </p>
                                            <Separator className="mt-4" />
                                        </div>
                                    ))}

                                    <div className="pt-4 space-y-4">
                                        <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                                            <div className="h-10 w-10 flex items-center justify-center rounded-md bg-primary/10 text-primary">
                                                <Layout className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold">Global Themes</div>
                                                <div className="text-xs text-muted-foreground">Standardized UI templates</div>
                                            </div>
                                            <Badge className="ml-auto" variant="secondary">Active</Badge>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                                            <div className="h-10 w-10 flex items-center justify-center rounded-md bg-primary/10 text-primary">
                                                <Rocket className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold">Deployment Sync</div>
                                                <div className="text-xs text-muted-foreground">Vercel Edge Network</div>
                                            </div>
                                            <Badge className="ml-auto" variant="secondary">Stable</Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
