"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { MetaAdsDashboard } from "@/components/marketing/meta-ads-dashboard";

export default function MetaAdsPage() {
  return (
    <SidebarProvider suppressHydrationWarning>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 bg-[#f8fafc]" suppressHydrationWarning>
          <div className="max-w-7xl mx-auto w-full">
            <MetaAdsDashboard />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
