"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getBrandActivity, getBrandOnboardingDetails } from "@/lib/admin-api";

type BrandDetail = {
  id: string;
  name: string;
  store_url: string;
  status: "active" | "inactive";
  created_at: string;
  description: string;
  location: string;
  onboarding: Array<{
    name: string;
    completed: boolean;
    completed_at?: string | null;
  }>;
  activity: Array<{ id: string; action: string; timestamp: string }>;
  owner: {
    name: string;
    email: string;
    phone: string;
    role: string;
  };
};

export default function BrandDetailPage() {
  const router = useRouter();
  const params = useParams();
  const brandId = params?.brandId as string;
  const [brandDetail, setBrandDetail] = React.useState<BrandDetail | null>(
    null,
  );
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    const load = async () => {
      if (!brandId) return;
      setLoading(true);
      setError(null);
      try {
        const [detail, activity] = await Promise.all([
          getBrandOnboardingDetails(brandId),
          getBrandActivity(brandId),
        ]);
        if (!isMounted) return;
        const store = detail.store;
        const onboardingSteps =
          detail.store.onboardingSteps?.map((step) => ({
            name: step.stepKey,
            completed: step.status === "COMPLETED",
            completed_at: step.completedAt || null,
          })) || [];
        setBrandDetail({
          id: store.id,
          name: store.name,
          store_url: store.customDomain || store.subdomain,
          status: store.isActive ? "active" : "inactive",
          created_at: store.createdAt,
          description: store.description || "No description provided.",
          location: "Not provided",
          onboarding: onboardingSteps,
          activity: activity.logs.map((log, index) => ({
            id: `${log.createdAt}-${index}`,
            action: log.action,
            timestamp: log.createdAt,
          })),
          owner: {
            name: store.user?.fullName || "Owner",
            email: store.user?.email || "Not provided",
            phone: "Not provided",
            role: "Owner",
          },
        });
      } catch (err) {
        if (!isMounted) return;
        setError(
          err instanceof Error ? err.message : "Unable to load brand details",
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [brandId]);

  if (loading && !brandDetail) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading brand details...</p>
      </div>
    );
  }

  if (!brandDetail) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">{error || "Brand not found."}</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col p-4 md:p-8 pt-6">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => router.back()}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Brand Details
              </h2>
              <p className="text-muted-foreground text-sm">
                View and manage brand information
              </p>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="onboarding">Onboarding Progress</TabsTrigger>
              <TabsTrigger value="activity">Activity Timeline</TabsTrigger>
              <TabsTrigger value="owner">Owner Info</TabsTrigger>
            </TabsList>

            {/* SECTION A: OVERVIEW */}
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Brand Overview</CardTitle>
                  <CardDescription>
                    Key details about the brand entity.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium">
                        {brandDetail.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>{brandDetail.id}</span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        brandDetail.status === "active"
                          ? "default"
                          : "secondary"
                      }
                      className="px-3 py-1 capitalize"
                    >
                      {brandDetail.status}
                    </Badge>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <span className="text-sm font-medium text-muted-foreground">
                          Store URL
                        </span>
                        <div className="flex items-center gap-2">
                          <a
                            href={brandDetail.store_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            {brandDetail.store_url}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-sm font-medium text-muted-foreground">
                          Created Date
                        </span>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(
                              brandDetail.created_at,
                            ).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <span className="text-sm font-medium text-muted-foreground">
                          Location
                        </span>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{brandDetail.location}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-sm font-medium text-muted-foreground">
                          Description
                        </span>
                        <p className="text-sm">{brandDetail.description}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SECTION B: ONBOARDING */}
            <TabsContent value="onboarding" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Onboarding Progress</CardTitle>
                  <CardDescription>
                    Track the brand's setup progress steps.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {brandDetail.onboarding.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-0.5">
                          {step.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <p
                            className={`text-sm font-medium ${step.completed ? "" : "text-muted-foreground"}`}
                          >
                            {step.name}
                          </p>
                          {step.completed && step.completed_at && (
                            <p className="text-xs text-muted-foreground">
                              Completed on{" "}
                              {new Date(step.completed_at).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SECTION C: ACTIVITY */}
            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Timeline</CardTitle>
                  <CardDescription>
                    Recent events and actions related to this brand.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative pl-6 border-l space-y-8">
                    {brandDetail.activity.map((event) => (
                      <div key={event.id} className="relative">
                        <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {event.action}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(event.timestamp).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SECTION D: OWNER INFO */}
            <TabsContent value="owner" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Owner Information</CardTitle>
                  <CardDescription>
                    Contact details for the brand owner.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                      <User className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">
                        {brandDetail.owner.name}
                      </h3>
                      <Badge variant="outline" className="mt-1">
                        {brandDetail.owner.role}
                      </Badge>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">
                        Email Address
                      </span>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`mailto:${brandDetail.owner.email}`}
                          className="text-primary hover:underline"
                        >
                          {brandDetail.owner.email}
                        </a>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">
                        Phone Number
                      </span>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`tel:${brandDetail.owner.phone}`}
                          className="text-primary hover:underline"
                        >
                          {brandDetail.owner.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
