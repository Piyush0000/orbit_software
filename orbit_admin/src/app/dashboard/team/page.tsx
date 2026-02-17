"use client"

import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const teamMembers = [
  { name: "Nishant Raj", role: "CEO" },
  { name: "Piyush Rathore", role: "CTO" },
  { name: "Sahil Solanki", role: "CMO" },
  { name: "Kishor Irnak", role: "COO" },
  { name: "Shreya Singh Chauhan", role: "Developer" },
  { name: "Priya Mahato", role: "Developer" },
]

export default function TeamPage() {
  return (
    <SidebarProvider suppressHydrationWarning>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-4 md:p-8 pt-6" suppressHydrationWarning>
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Team</h2>
            <p className="text-muted-foreground">
              Leadership and core contributors for the admin platform.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <Card key={member.name} className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{member.name}</CardTitle>
                  <CardDescription>Orbit Admin Team</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">{member.role}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
