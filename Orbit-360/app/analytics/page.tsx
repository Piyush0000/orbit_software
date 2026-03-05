"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getStoreAnalytics } from "@/lib/api";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  type ChartConfig
} from "@/components/ui/chart";
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Cell, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import { 
  Loader2, 
  TrendingUp, 
  Truck, 
  Package, 
  Map as MapIcon, 
  DollarSign, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react";
import { toast } from "sonner";

// Colors for Pie/Bar charts
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", "#00C49F", "#FFBB28", "#FF8042"];


export default function AnalyticsPage() {
  const { activeStore } = useAuth();
  const storeId = activeStore?.id;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      if (!storeId) return;
      try {
        setLoading(true);
        const result = await getStoreAnalytics(storeId);
        setData(result);
      } catch (err) {
        toast.error("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, [storeId]);

  if (loading || !data) {
    return (
      <div className="flex flex-1 items-center justify-center p-12">
        <Loader2 className="animate-spin size-8 text-primary" />
      </div>
    );
  }

  // Safe defaults — empty state is shown by each chart if data is absent
  const overview   = data?.overview   || { revenue: 0, orders: 0, customers: 0, revenueGrowth: 0, orderGrowth: 0, avgOrderValue: 0 };
  const salesTrend  = data?.salesTrend  || [];
  const logistics   = data?.logistics   || [];
  const products    = data?.products    || [];
  const marketing   = data?.marketing   || { regions: [], conversionRate: 0, avgCustomerLTV: 0 };

  return (
    <div className="flex flex-1 flex-col gap-8 p-6 lg:p-10 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Business Intelligence</h1>
        <p className="text-muted-foreground">Deep dive into your store's performance across all metrics.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewCard 
          title="Total Revenue" 
          value={`₹${(overview.revenue || 0).toLocaleString()}`} 
          growth={overview.revenueGrowth} 
          icon={<DollarSign className="size-4" />}
        />
        <OverviewCard 
          title="Total Orders" 
          value={overview.orders || 0} 
          growth={overview.orderGrowth} 
          icon={<Package className="size-4" />}
        />
        <OverviewCard 
          title="Avg Order Value" 
          value={`₹${Math.round(overview.avgOrderValue || 0).toLocaleString()}`} 
          icon={<TrendingUp className="size-4" />}
        />
        <OverviewCard 
          title="Total Customers" 
          value={overview.customers} 
          icon={<Users className="size-4" />}
        />
      </div>

      <Tabs defaultValue="sales" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="sales" className="gap-2">
              <TrendingUp className="size-4" />
              Sales Trend
            </TabsTrigger>
            <TabsTrigger value="logistics" className="gap-2">
              <Truck className="size-4" />
              Logistics
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <Package className="size-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="marketing" className="gap-2">
              <MapIcon className="size-4" />
              Regions
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Sales Performance Content */}
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Order Volume</CardTitle>
              <CardDescription>Daily sales performance for the last 30 days.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesTrend}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(val) => new Date(val).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} name="Revenue (₹)" />
                  <Area type="monotone" dataKey="orders" stroke="#10b981" fillOpacity={0} strokeWidth={2} name="Orders" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Logistics Performance Content */}
        <TabsContent value="logistics" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Delivery Status Distribution</CardTitle>
              <CardDescription>Breakdown of orders by fulfillment state.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              {logistics.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={logistics}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="count"
                      nameKey="status"
                    >
                      {logistics.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-muted-foreground text-sm italic">No logistics data available</div>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Shipment Efficiency</CardTitle>
              <CardDescription>Average time to fulfill orders.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <EfficiencyMetric label="Order Processing" value="1.2 days" progress={85} />
                <EfficiencyMetric label="In-Transit Time" value="3.5 days" progress={60} />
                <EfficiencyMetric label="Last Mile Delivery" value="0.8 days" progress={92} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Product Analytics Content */}
        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Products generating most volume (last 30 days).</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={products} layout="vertical" margin={{ left: 100 }}>
                  <XAxis type="number" axisLine={false} tickLine={false} />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    width={100}
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip />
                  <Bar dataKey="sales" radius={[0, 4, 4, 0]}>
                    {products.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Marketing/Regions Content */}
        <TabsContent value="marketing" className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Regional Sales Hotspots</CardTitle>
              <CardDescription>Geographic distribution of revenue.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketing.regions}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} name="Revenue (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Conversion Engine</CardTitle>
              <CardDescription>Funnel & Retention metrics.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 py-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">{marketing.conversionRate}%</div>
                <div className="text-sm text-muted-foreground mt-1">Visit-to-Order Rate</div>
              </div>
              <Separator />
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-500">₹{Math.round(marketing.avgCustomerLTV).toLocaleString()}</div>
                <div className="text-sm text-muted-foreground mt-1">Avg. Customer Life-Time Value</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function OverviewCard({ title, value, growth, icon }: { title: string, value: string | number, growth?: number, icon: React.ReactNode }) {
  const isPositive = growth !== undefined ? growth >= 0 : true;
  return (
    <Card className="relative overflow-hidden group hover:shadow-primary/5 transition-all outline-none border-primary/10">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</CardTitle>
        <div className="p-2 bg-primary/10 rounded-lg text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tabular-nums">{value}</div>
        {growth !== undefined && (
          <div className={`text-xs mt-1 flex items-center gap-1 ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
            {isPositive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
            <span>{Math.abs(growth)}%</span>
            <span className="text-muted-foreground font-normal">than last month</span>
          </div>
        )}
      </CardContent>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </Card>
  );
}

function EfficiencyMetric({ label, value, progress }: { label: string, value: string, progress: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-primary font-mono">{value}</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-1000" 
          style={{ width: `${progress}%` }} 
        />
      </div>
    </div>
  );
}

function Separator() {
  return <div className="h-[1px] w-full bg-border/50" />;
}
