"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Circle, 
  XCircle, 
  Loader2, 
  RefreshCw,
  ExternalLink,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

interface ProvisioningStatusProps {
  storeId: string;
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
}

interface ProvisioningData {
  id: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED" | "ROLLBACK";
  workspaceCreated: boolean;
  dashboardCreated: boolean;
  websiteDeployed: boolean;
  dataInitialized: boolean;
  credentialsSent: boolean;
  currentStep: string;
  completionPercent: number;
  errorLog?: any;
  retryCount: number;
  startedAt?: string;
  completedAt?: string;
  store?: {
    name: string;
    subdomain: string;
    theme?: {
      name: string;
      slug: string;
    };
    plan?: {
      name: string;
      price: string;
    };
    deployment?: {
      merchantId: string;
      dashboardUrl: string;
      websiteUrl: string;
    };
  };
}

export function ProvisioningStatus({
  storeId,
  autoRefresh = true,
  refreshInterval = 3000,
}: ProvisioningStatusProps) {
  const [data, setData] = useState<ProvisioningData | null>(null);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    fetchStatus();

    if (autoRefresh) {
      const interval = setInterval(() => {
        if (data?.status === "IN_PROGRESS" || data?.status === "PENDING") {
          fetchStatus();
        }
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [storeId, autoRefresh, refreshInterval, data?.status]);

  const fetchStatus = async () => {
    try {
      const response = await fetch(`/api/provisioning/merchants/${storeId}/provisioning-status`);
      
      if (response.ok) {
        const result = await response.json();
        setData(result.data);
      } else if (response.status === 404) {
        setData(null);
      }
    } catch (error) {
      console.error("Error fetching provisioning status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async () => {
    setRetrying(true);
    try {
      const response = await fetch(`/api/provisioning/merchants/${storeId}/retry-provisioning`, {
        method: "POST",
      });

      if (response.ok) {
        toast.success("Provisioning retry initiated");
        fetchStatus();
      } else {
        const error = await response.json();
        toast.error("Retry failed", {
          description: error.message,
        });
      }
    } catch (error) {
      console.error("Error retrying provisioning:", error);
      toast.error("Failed to retry provisioning");
    } finally {
      setRetrying(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500";
      case "IN_PROGRESS":
        return "bg-blue-500";
      case "FAILED":
        return "bg-red-500";
      case "PENDING":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "IN_PROGRESS":
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case "FAILED":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "PENDING":
        return <Circle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-500" />;
    }
  };

  const steps = [
    { key: "workspaceCreated", label: "Workspace Created", percent: 25 },
    { key: "dashboardCreated", label: "Dashboard Created", percent: 40 },
    { key: "websiteDeployed", label: "Website Deployed", percent: 60 },
    { key: "dataInitialized", label: "Data Initialized", percent: 80 },
    { key: "credentialsSent", label: "Credentials Sent", percent: 95 },
  ];

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No provisioning data available</p>
          <p className="text-sm text-muted-foreground mt-2">
            This merchant has not been activated yet
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                Provisioning Status
                {getStatusIcon(data.status)}
              </CardTitle>
              <CardDescription>
                {data.store?.name} - {data.currentStep}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(data.status)}>{data.status}</Badge>
              {data.status === "FAILED" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleRetry}
                  disabled={retrying}
                >
                  {retrying ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  Retry
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-medium">{data.completionPercent}%</span>
            </div>
            <Progress value={data.completionPercent} className="h-2" />
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {steps.map((step) => {
              const isComplete = data[step.key as keyof ProvisioningData] as boolean;
              return (
                <div key={step.key} className="flex items-center gap-3">
                  {isComplete ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-300 flex-shrink-0" />
                  )}
                  <span className={isComplete ? "text-foreground" : "text-muted-foreground"}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Error Log */}
          {data.errorLog && (
            <div className="rounded-lg bg-red-50 dark:bg-red-950 p-4 border border-red-200 dark:border-red-800">
              <div className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-red-900 dark:text-red-100 mb-1">
                    Provisioning Error
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    {data.errorLog.message || "An unknown error occurred"}
                  </p>
                  {data.retryCount > 0 && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                      Retry attempts: {data.retryCount}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Deployment Info */}
          {data.status === "COMPLETED" && data.store?.deployment && (
            <div className="rounded-lg bg-green-50 dark:bg-green-950 p-4 border border-green-200 dark:border-green-800 space-y-3">
              <div className="flex items-center gap-2 text-green-900 dark:text-green-100">
                <CheckCircle2 className="h-5 w-5" />
                <h4 className="font-medium">Provisioning Completed</h4>
              </div>
              
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-green-700 dark:text-green-300 font-medium">
                    Merchant ID:
                  </span>{" "}
                  <code className="text-green-900 dark:text-green-100">
                    {data.store.deployment.merchantId}
                  </code>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-green-700 dark:text-green-300 font-medium">
                    Dashboard:
                  </span>
                  <a
                    href={data.store.deployment.dashboardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-900 dark:text-green-100 hover:underline flex items-center gap-1"
                  >
                    {data.store.deployment.dashboardUrl}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-green-700 dark:text-green-300 font-medium">
                    Website:
                  </span>
                  <a
                    href={`https://${data.store.deployment.websiteUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-900 dark:text-green-100 hover:underline flex items-center gap-1"
                  >
                    {data.store.deployment.websiteUrl}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {data.store.theme && (
                  <div>
                    <span className="text-green-700 dark:text-green-300 font-medium">
                      Theme:
                    </span>{" "}
                    <span className="text-green-900 dark:text-green-100">
                      {data.store.theme.name}
                    </span>
                  </div>
                )}

                {data.store.plan && (
                  <div>
                    <span className="text-green-700 dark:text-green-300 font-medium">
                      Plan:
                    </span>{" "}
                    <span className="text-green-900 dark:text-green-100">
                      {data.store.plan.name} (${data.store.plan.price}/mo)
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t">
            {data.startedAt && (
              <div>
                Started: {new Date(data.startedAt).toLocaleString()}
              </div>
            )}
            {data.completedAt && (
              <div>
                Completed: {new Date(data.completedAt).toLocaleString()}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
