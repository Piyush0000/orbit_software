"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Palette,
  Store,
  History,
  Layers,
  Settings2,
  CheckCircle2,
  ArrowUpCircle,
  XCircle,
  RotateCcw,
  FileCode,
  ChevronRight,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type Theme = {
  id: string;
  name: string;
  status: string;
  current_version: string;
  preview_url: string;
  active_stores: number;
  layout_sections: Array<any>;
  description: string;
  config_schema: Record<string, any>;
  default_values: Record<string, any>;
  change_log: Array<any>;
};

export default function ThemeDetailPage() {
  const router = useRouter();
  const { themeId } = useParams();

  const theme: Theme = {
    id: Array.isArray(themeId) ? themeId[0] : (themeId || "main") as string,
    name: "Standard Theme",
    status: "Live",
    current_version: "1.0.0",
    preview_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    active_stores: 12,
    layout_sections: [],
    description: "A standard clean theme for all categories.",
    config_schema: {},
    default_values: {},
    change_log: []
  };

  if (!theme) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground font-medium">
          No theme data available from the backend.
        </p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-4 md:p-8 pt-6">
          {/* TOP HEADER */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.back()}
              className="h-9 w-9 border-border/50"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex flex-1 items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  {theme.name}
                </h2>
                <Badge
                  variant={theme.status === "Live" ? "default" : "secondary"}
                >
                  {theme.status}
                </Badge>
                <span className="text-sm font-mono text-muted-foreground">
                  v{theme.current_version}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="font-semibold text-destructive hover:bg-destructive/5 hover:text-destructive border-border/50"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Disable
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-semibold border-border/50 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Rollback
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="font-semibold bg-primary hover:bg-primary/90"
                >
                  <ArrowUpCircle className="mr-2 h-4 w-4" />
                  Push Updates
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* LEFT: THEME PREVIEW & STATS */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="overflow-hidden border-border/50">
                <div className="aspect-[4/3] bg-muted relative">
                  <img
                    src={theme.preview_url}
                    alt={theme.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-base font-bold">
                    Store Presence
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Store className="h-4 w-4" />
                      <span>Active Stores</span>
                    </div>
                    <span className="font-bold">{theme.active_stores}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Settings2 className="h-4 w-4" />
                      <span>Config Fields</span>
                    </div>
                    <span className="font-bold">
                      {Object.keys(theme.config_schema).length || 0}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT: TABS CONTENT */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent flex gap-6">
                  <TabsTrigger
                    value="overview"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-1 pb-3 text-sm font-semibold"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="configuration"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-1 pb-3 text-sm font-semibold"
                  >
                    Configuration
                  </TabsTrigger>
                  <TabsTrigger
                    value="changelog"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-1 pb-3 text-sm font-semibold"
                  >
                    Change Log
                  </TabsTrigger>
                </TabsList>

                {/* OVERVIEW TAB */}
                <TabsContent value="overview" className="space-y-6 pt-2">
                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">Layout Sections</CardTitle>
                      <CardDescription>
                        Available visual components for this theme
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      {theme.layout_sections.length > 0 ? (
                        theme.layout_sections.map((section) => (
                          <div
                            key={section.id}
                            className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                                <Layers className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-bold">
                                  {section.name}
                                </p>
                                <p className="text-[11px] text-muted-foreground uppercase font-semibold">
                                  {section.type}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground p-3 italic">
                          No sections defined yet.
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Default Settings
                      </CardTitle>
                      <CardDescription>
                        Initial configuration values for new storefronts
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                        {Object.entries(theme.default_values).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex flex-col gap-1.5 py-2 border-b border-border/30 last:border-0"
                            >
                              <span className="text-xs text-muted-foreground font-semibold uppercase">
                                {key.replace("_", " ")}
                              </span>
                              <span className="text-sm font-mono flex items-center gap-2">
                                {typeof value === "boolean" ? (
                                  <Badge variant="outline">
                                    {value ? "Enabled" : "Disabled"}
                                  </Badge>
                                ) : (
                                  <span>{String(value)}</span>
                                )}
                                {key.includes("color") && (
                                  <div
                                    className="h-3 w-3 rounded-full border border-border"
                                    style={{ backgroundColor: String(value) }}
                                  />
                                )}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* CONFIGURATION TAB */}
                <TabsContent value="configuration" className="space-y-6 pt-2">
                  <Card className="border-border/50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileCode className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg">
                            Schema Definition
                          </CardTitle>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="font-semibold text-xs border-border/50"
                        >
                          Edit Schema
                        </Button>
                      </div>
                      <CardDescription>
                        Technical JSON structure for theme settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <pre className="text-xs font-mono leading-relaxed text-foreground/80 lowercase">
                          {JSON.stringify(theme.config_schema, null, 4)}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* CHANGELOG TAB */}
                <TabsContent value="changelog" className="space-y-6 pt-2">
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                    {theme.change_log.length > 0 ? (
                      theme.change_log.map((log) => (
                        <div
                          key={log.id}
                          className="relative flex items-start gap-6 group"
                        >
                          <div className="mt-1.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background shadow-sm z-10 transition-colors group-hover:border-primary/30">
                            <History className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <div className="flex flex-col gap-2 pt-1 border border-border/40 p-4 rounded-lg bg-card/50 flex-1 hover:border-primary/20 transition-all">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold">
                                  v{log.version}
                                </span>
                                <Badge
                                  variant="outline"
                                  className="text-[10px] h-4"
                                >
                                  STABLE
                                </Badge>
                              </div>
                              <span className="text-[11px] text-muted-foreground font-mono">
                                {new Date(log.timestamp).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  },
                                )}
                              </span>
                            </div>
                            <p className="text-sm text-foreground/90">
                              {log.action}
                            </p>
                            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mt-1">
                              <User className="h-3 w-3" />
                              <span>
                                Pushed by <strong>{log.admin_name}</strong>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-12">
                        No updates recorded for this theme.
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
