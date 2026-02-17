"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { BrandCards } from "@/components/brand-cards"
import { OnboardingFunnel } from "@/components/onboarding-funnel"
import { AlertsSection } from "@/components/alerts-section"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider suppressHydrationWarning>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col" suppressHydrationWarning>
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-6 py-6 md:gap-8 md:py-8">
              {/* Brand Metric Cards */}
              <BrandCards />

              {/* Onboarding Funnel and Alerts */}
              <div className="grid grid-cols-1 gap-6 px-4 lg:px-6 lg:grid-cols-2">
                <OnboardingFunnel />
                <AlertsSection />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
