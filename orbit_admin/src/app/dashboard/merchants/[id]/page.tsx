"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import {
    ChevronLeft,
    Mail,
    Phone,
    Calendar,
    User,
    Shield,
    CheckCircle2,
    Circle,
    ExternalLink,
    Globe,
    Palette,
    Settings,
    Package,
    TrendingUp,
    AlertTriangle,
    Pause,
    Flag,
    ArrowUpRight,
    Search,
    BarChart3,
    ShoppingCart,
    CreditCard
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { getBrandDetail, getBrandMetrics } from "@/lib/admin-api"
import { MerchantActivationModal } from "@/components/MerchantActivationModal"

type MerchantDetail = {
    id: string
    logo?: string | null
    brandName: string
    status: "live" | "paused" | "pending"
    subscriptionPlan: string
    ownerName: string
    email: string
    phone: string
    signupDate: string
    assignedAdmin: string
    onboardingProgress: number
    onboardingSteps: Array<{ label: string; completed: boolean }>
    storeDetails: {
        url: string
        themeName: string
        themeConfig: Record<string, unknown>
        domainStatus: "connected" | "pending"
        cdnStatus: "active" | "inactive"
    }
    inventory: {
        totalProducts: number
        outOfStock: number
        hiddenProducts: number
        topSelling: Array<{ name: string; units: number }>
    }
    performance: {
        traffic: number
        conversionRate: number
        aov: number
        funnelDropoff: number
        utmTags: string[]
    }
    revenue: number
    riskFlag: "none" | "low" | "medium" | "high"
    compliance: {
        refundRate: number
        chargebacks: number
        complaints: number
        violations: number
    }
}

export default function MerchantDetailPage() {
    const params = useParams()
    const router = useRouter()
    const id = params?.id as string
    const [merchant, setMerchant] = React.useState<MerchantDetail | null>(null)
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)

    React.useEffect(() => {
        let isMounted = true
        const load = async () => {
            if (!id) return
            setLoading(true)
            setError(null)
            try {
                const [detail, metrics] = await Promise.all([
                    getBrandDetail(id),
                    getBrandMetrics(id),
                ])
                if (!isMounted) return
                const revenue = Number((metrics.metrics as { totalRevenue?: number }).totalRevenue || 0)
                const aov = Number((metrics.metrics as { averageOrderValue?: number }).averageOrderValue || 0)
                const store = detail.store
                const onboardingSteps =
                    store.onboardingSteps?.map((step) => ({
                        label: step.stepKey,
                        completed: step.status === "COMPLETED",
                    })) || []
                setMerchant({
                    id: store.id,
                    logo: (store as any).logo,
                    brandName: store.name,
                    status: store.isActive ? "live" : "paused",
                    subscriptionPlan: "Not provided",
                    ownerName: store.user?.fullName || "Unknown",
                    email: store.user?.email || "Not provided",
                    phone: "Not provided",
                    signupDate: new Date(store.createdAt).toLocaleDateString("en-US"),
                    assignedAdmin: "Unassigned",
                    onboardingProgress: store.onboarding?.completionPercent || 0,
                    onboardingSteps,
                    storeDetails: {
                        url: store.customDomain || `${store.subdomain}.localhost:3000`,
                        themeName: "Not provided",
                        themeConfig: {},
                        domainStatus: store.customDomain ? "connected" : "pending",
                        cdnStatus: "inactive",
                    },
                    inventory: {
                        totalProducts: 0,
                        outOfStock: 0,
                        hiddenProducts: 0,
                        topSelling: [],
                    },
                    performance: {
                        traffic: 0,
                        conversionRate: 0,
                        aov,
                        funnelDropoff: 0,
                        utmTags: [],
                    },
                    revenue,
                    riskFlag: "none",
                    compliance: {
                        refundRate: 0,
                        chargebacks: 0,
                        complaints: 0,
                        violations: 0,
                    },
                })
            } catch (err) {
                if (!isMounted) return
                setError(err instanceof Error ? err.message : "Unable to load merchant")
            } finally {
                if (isMounted) setLoading(false)
            }
        }
        load()
        return () => {
            isMounted = false
        }
    }, [id])

    if (loading && !merchant) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <p className="text-muted-foreground">Loading merchant...</p>
                </div>
            </div>
        )
    }

    if (!merchant) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Merchant Not Found</h2>
                    <p className="text-muted-foreground mb-3">{error}</p>
                    <Button variant="link" onClick={() => router.push("/dashboard/merchants")}>
                        Back to Listing
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col p-4 md:p-8 pt-6 space-y-6 max-w-7xl mx-auto w-full">
                    {/* Header / Navigation */}
                    <div className="flex items-center justify-between">
                        <Button variant="ghost" className="pl-0" onClick={() => router.push("/dashboard/merchants")}>
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back to Merchants
                        </Button>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/communication?brand=${merchant.id}`)}>
                                <Mail className="mr-2 h-4 w-4" />
                                Contact Merchant
                            </Button>
                            
                            {/* NEW: Activation Flow */}
                            {merchant.status === "pending" && (
                                <MerchantActivationModal 
                                    brandId={merchant.id} 
                                    brandName={merchant.brandName} 
                                    onSuccess={() => {
                                        // Refresh data
                                        window.location.reload()
                                    }}
                                />
                            )}
                            
                            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                <Pause className="mr-2 h-4 w-4" />
                                Pause Store
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Section 1: Merchant Overview */}
                        <Card className="lg:col-span-1">
                            <CardHeader className="text-center">
                                <div className="mx-auto w-24 h-24 rounded-full overflow-hidden border-4 border-muted mb-4 flex items-center justify-center bg-muted/30">
                                    {merchant.logo ? (
                                        <img src={merchant.logo} alt={merchant.brandName} className="w-full h-full object-crop" />
                                    ) : (
                                        <span className="text-2xl font-semibold text-muted-foreground">
                                            {merchant.brandName.slice(0, 1).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <CardTitle className="text-2xl">{merchant.brandName}</CardTitle>
                                <CardDescription className="flex items-center justify-center gap-2">
                                    <Badge variant={merchant.status === "live" ? "default" : "secondary"}>{merchant.status}</Badge>
                                    <Badge variant="outline">{merchant.subscriptionPlan}</Badge>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1">
                                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Owner</div>
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span>{merchant.ownerName}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Contact Details</div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{merchant.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">{merchant.phone}</span>
                                    </div>
                                </div>
                                <Separator />
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Signup Date</div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            {merchant.signupDate}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Assigned Admin</div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Shield className="h-4 w-4 text-muted-foreground" />
                                            {merchant.assignedAdmin}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="lg:col-span-2 space-y-6">
                            {/* Section 2: Onboarding Tracker */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>Onboarding Tracker</CardTitle>
                                            <CardDescription>Visual progress of merchant journey</CardDescription>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold">{merchant.onboardingProgress}%</div>
                                            <div className="text-xs text-muted-foreground">Completion</div>
                                        </div>
                                    </div>
                                    <Progress value={merchant.onboardingProgress} className="h-2 mt-4" />
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                        {merchant.onboardingSteps.map((step, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-2 rounded-lg border bg-muted/30">
                                                <div className="flex items-center gap-3">
                                                    {step.completed ? (
                                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                    ) : (
                                                        <Circle className="h-5 w-5 text-muted-foreground" />
                                                    )}
                                                    <span className={step.completed ? "font-medium" : "text-muted-foreground"}>{step.label}</span>
                                                </div>
                                                <Button variant="ghost" size="sm" className="h-8 text-xs">
                                                    {step.completed ? "Undo" : "Override"}
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="bg-muted/30 py-3 block border-t">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-muted-foreground">Merchant stuck? Send a reminder.</span>
                                        <Button variant="outline" size="sm">Send Reminder Email</Button>
                                    </div>
                                </CardFooter>
                            </Card>

                            {/* Section 3: Store Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Globe className="h-5 w-5" />
                                        Store Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-medium text-muted-foreground uppercase">Store URL</label>
                                            <div className="flex items-center gap-2 mt-1">
                                                <a
                                                    href={`http://${merchant.storeDetails.url}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="font-mono text-sm hover:underline flex items-center gap-1 group"
                                                >
                                                    {merchant.storeDetails.url}
                                                    <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                                                </a>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-muted-foreground uppercase">Active Theme</label>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Palette className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm">{merchant.storeDetails.themeName}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-muted-foreground uppercase">Theme Configuration</label>
                                            <div className="mt-1 p-2 bg-muted rounded font-mono text-[10px] overflow-x-auto">
                                                {JSON.stringify(merchant.storeDetails.themeConfig, null, 2)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">Domain Status</span>
                                            <Badge variant={merchant.storeDetails.domainStatus === "connected" ? "default" : "secondary"}>
                                                {merchant.storeDetails.domainStatus}
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">CDN / Cache</span>
                                            <Badge variant={merchant.storeDetails.cdnStatus === "active" ? "default" : "secondary"}>
                                                {merchant.storeDetails.cdnStatus}
                                            </Badge>
                                        </div>
                                        <Separator />
                                        <Button variant="outline" className="w-full justify-start" size="sm">
                                            <Settings className="mr-2 h-4 w-4" />
                                            Manage Store Configuration
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Section 4: Products & Inventory */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="h-5 w-5" />
                                    Products & Inventory
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="p-4 rounded-lg border bg-card shadow-sm">
                                        <div className="text-xs text-muted-foreground">Total Products</div>
                                        <div className="text-2xl font-bold">{merchant.inventory.totalProducts}</div>
                                    </div>
                                    <div className="p-4 rounded-lg border bg-card shadow-sm">
                                        <div className="text-xs text-muted-foreground">Out of Stock</div>
                                        <div className={`text-2xl font-bold ${merchant.inventory.outOfStock > 0 ? "text-destructive" : ""}`}>
                                            {merchant.inventory.outOfStock}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="text-sm font-medium">Top Selling Products</div>
                                    {merchant.inventory.topSelling.length > 0 ? (
                                        merchant.inventory.topSelling.map((p, i) => (
                                            <div key={i} className="flex items-center justify-between text-sm p-2 rounded border bg-muted/20">
                                                <span>{p.name} ({p.units} units)</span>
                                                <TrendingUp className="h-4 w-4 text-green-500" />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-sm text-muted-foreground italic">No sales data available</div>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="bg-muted/30 py-3 border-t">
                                <div className="w-full flex justify-between text-xs">
                                    <span>Hidden/Disabled Products</span>
                                    <span className="font-bold">{merchant.inventory.hiddenProducts}</span>
                                </div>
                            </CardFooter>
                        </Card>

                        {/* Section 5: Performance & Marketing Analytics (Read-only) */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5" />
                                    Performance Analytics
                                </CardTitle>
                                <CardDescription>Read-only metrics from the last 30 days</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-muted-foreground">
                                            <UsersIcon className="h-3 w-3" />
                                            Traffic
                                        </div>
                                        <div className="text-xl font-bold">{new Intl.NumberFormat().format(merchant.performance.traffic)}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-muted-foreground">
                                            <ShoppingCart className="h-3 w-3" />
                                            Conversion Rate
                                        </div>
                                        <div className="text-xl font-bold">{merchant.performance.conversionRate}%</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-muted-foreground">
                                            <CreditCard className="h-3 w-3" />
                                            Avg Order Value
                                        </div>
                                        <div className="text-xl font-bold">${merchant.performance.aov}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-muted-foreground">
                                            <TrendingUp className="h-3 w-3" />
                                            Revenue
                                        </div>
                                        <div className="text-xl font-bold">
                                            {new Intl.NumberFormat("en-IN", {
                                                style: "currency",
                                                currency: "INR",
                                                maximumFractionDigits: 0,
                                            }).format(merchant.revenue)}
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Funnel Drop-off Rate</span>
                                        <span className="font-bold">{merchant.performance.funnelDropoff}%</span>
                                    </div>
                                    <Progress value={merchant.performance.funnelDropoff} className="h-1.5" />
                                </div>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {merchant.performance.utmTags.map((tag, i) => (
                                        <Badge key={i} variant="outline" className="text-[10px]">UTM: {tag}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Section 6: Risk & Compliance */}
                    <Card className={merchant.riskFlag === "high" ? "border-red-200 bg-red-50/10" : ""}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    Risk & Compliance
                                </CardTitle>
                                <Badge
                                    className={`px-3 py-1 ${merchant.riskFlag === "high" ? "bg-red-500" : merchant.riskFlag === "medium" ? "bg-yellow-500" : ""}`}
                                >
                                    Risk Level: {merchant.riskFlag.toUpperCase()}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="p-4 rounded-lg bg-card border text-center">
                                    <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Refund Rate</div>
                                    <div className={`text-xl font-bold ${merchant.compliance.refundRate > 3 ? "text-destructive" : ""}`}>
                                        {merchant.compliance.refundRate}%
                                    </div>
                                </div>
                                <div className="p-4 rounded-lg bg-card border text-center">
                                    <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Chargebacks</div>
                                    <div className={`text-xl font-bold ${merchant.compliance.chargebacks > 0 ? "text-destructive" : ""}`}>
                                        {merchant.compliance.chargebacks}
                                    </div>
                                </div>
                                <div className="p-4 rounded-lg bg-card border text-center">
                                    <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Complaints</div>
                                    <div className={`text-xl font-bold ${merchant.compliance.complaints > 10 ? "text-destructive" : ""}`}>
                                        {merchant.compliance.complaints}
                                    </div>
                                </div>
                                <div className="p-4 rounded-lg bg-card border text-center">
                                    <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Violations</div>
                                    <div className={`text-xl font-bold ${merchant.compliance.violations > 0 ? "text-destructive" : ""}`}>
                                        {merchant.compliance.violations}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col sm:flex-row gap-3 bg-muted/30 py-4 border-t">
                            <Button variant="outline" className="flex-1">
                                <Flag className="mr-2 h-4 w-4" />
                                Flag for Review
                            </Button>
                            <Button variant="outline" className="flex-1">
                                <Settings className="mr-2 h-4 w-4" />
                                Restrict Features
                            </Button>
                            <Button variant="destructive" className="flex-1">
                                <AlertTriangle className="mr-2 h-4 w-4" />
                                Take Compliance Action
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

function UsersIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}
