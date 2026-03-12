"use client";

import React, { useState, useEffect } from "react";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Line,
  LineChart,
  Area,
  AreaChart
} from "recharts";
import { 
  IconBrandFacebook, 
  IconChartBar, 
  IconRefresh, 
  IconAlertCircle,
  IconArrowUpRight,
  IconArrowDownRight,
  IconLoader
} from "@tabler/icons-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { getMetaAdAccounts, getMetaInsights, getMetaStatus } from "@/lib/api";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  type ChartConfig 
} from "@/components/ui/chart";

const chartConfig: ChartConfig = {
  spend: { label: "Spend", color: "#2563eb" },
  impressions: { label: "Impressions", color: "#10b981" },
  clicks: { label: "Clicks", color: "#f59e0b" },
};

export default function MarketingPerformancePage() {
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [metaConnected, setMetaConnected] = useState(false);
  const [adAccounts, setAdAccounts] = useState<any[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [insights, setInsights] = useState<any[]>([]);
  const [summary, setSummary] = useState({
    totalSpend: 0,
    totalImpressions: 0,
    totalClicks: 0,
    avgCtr: 0,
    avgCpc: 0
  });

  const fetchMetaStatus = async () => {
    try {
      const status = await getMetaStatus();
      setMetaConnected(status.connected);
      if (status.connected) {
        const accounts = await getMetaAdAccounts();
        setAdAccounts(accounts.adAccounts || []);
        if (accounts.adAccounts?.length > 0) {
          const firstAccount = accounts.adAccounts[0].id;
          setSelectedAccountId(firstAccount);
          fetchInsights(firstAccount);
        }
      }
    } catch (err: any) {
      console.error("Failed to fetch meta status:", err);
      // If fetching accounts fails (e.g., token expired on Meta's end), reset connection state
      setMetaConnected(false);
      if (err.message && err.message.includes('validating access token')) {
        toast.error("Meta session expired. Please reconnect your account.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchInsights = async (accountId: string) => {
    setLoading(true);
    try {
      const res = await getMetaInsights(accountId, 'last_30d');
      const data = res.insights || [];
      setInsights(data);
      
      // Calculate summary
      let spend = 0, impressions = 0, clicks = 0;
      data.forEach((day: any) => {
        spend += parseFloat(day.spend || 0);
        impressions += parseInt(day.impressions || 0);
        clicks += parseInt(day.clicks || 0);
      });

      setSummary({
        totalSpend: spend,
        totalImpressions: impressions,
        totalClicks: clicks,
        avgCtr: impressions > 0 ? (clicks / impressions) * 100 : 0,
        avgCpc: clicks > 0 ? spend / clicks : 0
      });
    } catch (err: any) {
      console.error("Failed to fetch Meta insights", err);
      toast.error("Failed to fetch Meta insights");
      if (err.message && err.message.includes('validating access token')) {
        setMetaConnected(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetaStatus();
  }, []);

  const handleConnectMeta = () => {
    const token = localStorage.getItem('auth_token');
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    window.location.href = `${API_URL}/api/auth/meta/login?token=${token}`;
  };

  if (!metaConnected && !loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <Card className="max-w-md w-full text-center p-8 space-y-6">
          <div className="size-20 bg-blue-600/10 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <IconBrandFacebook className="size-10" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">Connect Meta Ads</CardTitle>
            <CardDescription>
              Connect your Meta Ads account to see performance insights, campaign data, and ROI analytics directly in Orbit.
            </CardDescription>
          </div>
          <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleConnectMeta}>
            Connect Meta Ads
          </Button>
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            <IconAlertCircle className="size-3" />
            Meta Advertising access is required for this dashboard.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Marketing Performance</h1>
          <p className="text-muted-foreground">
            Track your advertising spend and performance across Meta platforms.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select 
            value={selectedAccountId} 
            onValueChange={(val) => {
              setSelectedAccountId(val);
              fetchInsights(val);
            }}
          >
            <SelectTrigger className="w-[200px] border-2">
              <SelectValue placeholder="Select Ad Account" />
            </SelectTrigger>
            <SelectContent>
              {adAccounts.map(acc => (
                <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={() => fetchInsights(selectedAccountId)}>
            <IconRefresh className={`size-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Spend", value: `₹${summary.totalSpend.toLocaleString()}`, icon: <IconChartBar />, color: "text-blue-600" },
          { label: "Impressions", value: summary.totalImpressions.toLocaleString(), icon: <IconChartBar />, color: "text-green-600" },
          { label: "CTR", value: `${summary.avgCtr.toFixed(2)}%`, icon: <IconChartBar />, color: "text-orange-600" },
          { label: "CPC", value: `₹${summary.avgCpc.toFixed(2)}`, icon: <IconChartBar />, color: "text-purple-600" },
        ].map((card) => (
          <Card key={card.label} className="border-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.label}</CardTitle>
              <div className={`${card.color} opacity-80`}>{card.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <IconArrowUpRight className="size-3 text-green-500" />
                <span>+12.5% from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-2">
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
            <CardDescription>Visualizing spend and clicks for the last 30 days.</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <IconLoader className="size-8 animate-spin text-primary" />
              </div>
            ) : insights.length === 0 ? (
               <div className="h-full flex items-center justify-center text-muted-foreground">
                 No performance data available for this range.
               </div>
            ) : (
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={insights}>
                    <defs>
                      <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date_start" 
                      tickFormatter={(val) => new Date(val).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area 
                      type="monotone" 
                      dataKey="spend" 
                      stroke="#2563eb" 
                      fillOpacity={1} 
                      fill="url(#colorSpend)" 
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="clicks" 
                      stroke="#f59e0b" 
                      fillOpacity={0} 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Marketing ROAS</CardTitle>
            <CardDescription>Return on Ad Spend analysis.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10 gap-6">
             <div className="relative size-48">
               <svg className="size-full" viewBox="0 0 100 100">
                 <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/20" />
                 <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-primary" strokeDasharray="210 283" strokeLinecap="round" />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <div className="text-4xl font-bold">3.2x</div>
                 <div className="text-sm text-muted-foreground font-medium">Avg ROAS</div>
               </div>
             </div>
             <div className="grid grid-cols-2 gap-4 w-full text-center">
               <div className="space-y-1">
                 <div className="text-xs text-muted-foreground uppercase font-bold">Revenue</div>
                 <div className="text-lg font-semibold text-green-600">₹4.2L</div>
               </div>
               <div className="space-y-1">
                 <div className="text-xs text-muted-foreground uppercase font-bold">Purchases</div>
                 <div className="text-lg font-semibold text-blue-600">842</div>
               </div>
             </div>
          </CardContent>
          <CardFooter className="bg-muted/30 pt-4 flex justify-between border-t border-dashed">
             <span className="text-sm text-muted-foreground">Target ROAS</span>
             <Badge variant="outline" className="font-bold">4.0x</Badge>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
