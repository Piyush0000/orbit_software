"use client";

import React, { useEffect, useState } from "react";
import { 
  getMetaStatus, 
  getMetaAdAccounts, 
  getMetaCampaigns, 
  getMetaInsights 
} from "@/lib/admin-api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  LineChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { 
  Facebook, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  MousePointer2, 
  Eye, 
  DollarSign,
  Loader2,
  RefreshCw,
  ExternalLink
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function MetaAdsDashboard() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [adAccounts, setAdAccounts] = useState<any[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    setLoading(true);
    try {
      const data = await getMetaStatus();
      setStatus(data);
      if (data.connected) {
        const accData = await getMetaAdAccounts();
        setAdAccounts(accData.adAccounts);
        if (accData.adAccounts.length > 0) {
          const firstId = accData.adAccounts[0].id;
          setSelectedAccount(firstId);
          loadAccountDetails(firstId);
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to load Meta status");
    } finally {
      setLoading(false);
    }
  };

  const loadAccountDetails = async (accountId: string) => {
    setLoadingDetails(true);
    try {
      const [campData, insData] = await Promise.all([
        getMetaCampaigns(accountId),
        getMetaInsights(accountId, { datePreset: "last_30d", timeIncrement: "1" })
      ]);
      setCampaigns(campData.campaigns);
      setInsights(insData.insights);
    } catch (err: any) {
      console.error("Failed to load details", err);
    } finally {
      setLoadingDetails(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
        <p className="text-muted-foreground animate-pulse font-medium">Synchronizing with Meta Graph API...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!status?.connected) {
    return (
      <Card className="border-dashed border-2 bg-slate-50/50">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Facebook className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Connect Meta Business Account</CardTitle>
          <CardDescription className="max-w-md mx-auto">
            Authorize Orbit to manage your Facebook and Instagram ad campaigns, track conversions, and sync your product catalog.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pb-12">
          <Button 
            size="lg" 
            className="bg-[#1877F2] hover:bg-[#166fe5] text-white px-8 h-12 rounded-full font-semibold shadow-xl shadow-blue-500/20"
            onClick={() => {
              const token = sessionStorage.getItem('orbit_admin_token');
              window.open(`http://localhost:5000/auth/meta/login?token=${token}`, '_blank');
            }}
          >
            <Facebook className="mr-2 h-5 w-5 fill-current" />
            Continue with Facebook
          </Button>
        </CardContent>
      </Card>
    );
  }

  const totals = insights.reduce((acc, curr) => ({
    spend: acc.spend + parseFloat(curr.spend || 0),
    impressions: acc.impressions + parseInt(curr.impressions || 0),
    clicks: acc.clicks + parseInt(curr.clicks || 0),
  }), { spend: 0, impressions: 0, clicks: 0 });

  const avgCtr = totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0;
  const avgCpc = totals.clicks > 0 ? totals.spend / totals.clicks : 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">Meta Ads Center</h2>
          <p className="text-muted-foreground">Manage your Facebook & Instagram marketing performance.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select 
            value={selectedAccount || ""} 
            onValueChange={(val) => {
              setSelectedAccount(val);
              loadAccountDetails(val);
            }}
          >
            <SelectTrigger className="w-[280px] bg-white shadow-sm border-slate-200">
              <SelectValue placeholder="Select Ad Account" />
            </SelectTrigger>
            <SelectContent>
              {adAccounts.map(acc => (
                <SelectItem key={acc.id} value={acc.id}>
                  {acc.name} ({acc.id})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => selectedAccount && loadAccountDetails(selectedAccount)}
            disabled={loadingDetails}
            className="rounded-full h-10 w-10 hover:bg-slate-50 border-slate-200"
          >
            <RefreshCw className={`h-4 w-4 ${loadingDetails ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard 
          title="Total Spend" 
          value={`$${totals.spend.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          icon={<DollarSign className="h-4 w-4 text-emerald-600" />}
          trend="+12.5% from last month"
          trendUp={true}
        />
        <MetricCard 
          title="Impressions" 
          value={totals.impressions.toLocaleString()}
          icon={<Eye className="h-4 w-4 text-blue-600" />}
          trend="+5.2% from last month"
          trendUp={true}
        />
        <MetricCard 
          title="Total Clicks" 
          value={totals.clicks.toLocaleString()}
          icon={<MousePointer2 className="h-4 w-4 text-purple-600" />}
          trend="-2.1% from last month"
          trendUp={false}
        />
        <MetricCard 
          title="Avg. CTR" 
          value={`${avgCtr.toFixed(2)}%`}
          icon={<TrendingUp className="h-4 w-4 text-indigo-600" />}
          trend="+0.3% from last month"
          trendUp={true}
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-slate-100/80 p-1 border border-slate-200 rounded-xl overflow-hidden">
          <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-6">Overview</TabsTrigger>
          <TabsTrigger value="campaigns" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-6">Campaigns</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-lg">Performance Timeline</CardTitle>
              <CardDescription>Daily spend and click activity for the last 30 days.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={insights}>
                    <defs>
                      <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date_start" 
                      tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                      stroke="#94a3b8"
                      fontSize={12}
                    />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', border: 'none' }}
                    />
                    <Legend />
                    <Bar name="Daily Spend ($)" dataKey="spend" fill="url(#colorSpend)" radius={[4, 4, 0, 0]} />
                    <Line name="Clicks" type="monotone" dataKey="clicks" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Active Campaigns</CardTitle>
                <CardDescription>List of all campaigns in this ad account.</CardDescription>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Create Campaign
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto rounded-lg border border-slate-100">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-medium">
                    <tr>
                      <th className="px-4 py-3 border-b border-slate-100">Campaign Name</th>
                      <th className="px-4 py-3 border-b border-slate-100">Status</th>
                      <th className="px-4 py-3 border-b border-slate-100">Objective</th>
                      <th className="px-4 py-3 border-b border-slate-100">Daily Budget</th>
                      <th className="px-4 py-3 border-b border-slate-100">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {campaigns.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">No active campaigns found.</td>
                      </tr>
                    ) : (
                      campaigns.map(camp => (
                        <tr key={camp.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-4 py-4 font-medium text-slate-900">{camp.name}</td>
                          <td className="px-4 py-4">
                            <Badge variant={camp.status === "ACTIVE" ? "default" : "secondary"} className={camp.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : ""}>
                              {camp.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 text-slate-600 uppercase text-[10px] font-bold tracking-wider">{camp.objective}</td>
                          <td className="px-4 py-4 text-slate-600">
                            {camp.daily_budget ? `$${(parseFloat(camp.daily_budget)/100).toFixed(2)}` : "Set by Set"}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-col">
                              <span className="text-slate-900 font-semibold">{camp.insights?.data?.[0]?.clicks || 0} clicks</span>
                              <span className="text-[10px] text-muted-foreground">from {camp.insights?.data?.[0]?.spend || 0} spend</span>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MetricCard({ title, value, icon, trend, trendUp }: any) {
  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</CardTitle>
        <div className="p-2 bg-slate-50 rounded-lg group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        <p className={`text-xs mt-1 font-medium ${trendUp ? "text-emerald-600" : "text-rose-500"}`}>
          {trend}
        </p>
      </CardContent>
    </Card>
  );
}
