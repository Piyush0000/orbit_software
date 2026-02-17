"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlatformAnalytics } from "./platform-analytics"
import { BrandAnalytics } from "./brand-analytics"

export function AnalyticsDashboard() {
    const [activeTab, setActiveTab] = useState("platform")

    return (
        <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
            </div>
            <Tabs defaultValue="platform" className="space-y-4" onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="platform">Platform Overview</TabsTrigger>
                    <TabsTrigger value="brand">Brand Performance</TabsTrigger>
                </TabsList>
                <TabsContent value="platform" className="space-y-4">
                    <PlatformAnalytics />
                </TabsContent>
                <TabsContent value="brand" className="space-y-4">
                    <BrandAnalytics />
                </TabsContent>
            </Tabs>
        </div>
    )
}
