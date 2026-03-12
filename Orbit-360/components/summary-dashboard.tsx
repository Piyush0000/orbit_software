"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
import { AlertTriangle, Box, AlertOctagon, Clock, CheckCircle, ShieldAlert, TrendingUp, RotateCcw, Award } from "lucide-react";

const MetaIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.934 11.454c.25.433.805.58 1.238.33.432-.25.58-.805.33-1.237l-.92-1.593c-.47-.812-1.196-1.543-2.072-2.008C10.635 6.48 9.588 6.25 8.5 6.25 5.59 6.25 3.25 8.75 3.25 12s2.34 5.75 5.25 5.75c1.088 0 2.135-.231 3.01-.696.877-.465 1.603-1.196 2.073-2.008l.92-1.593c.25-.432.102-.987-.33-1.237-.433-.25-.988-.103-1.238.33l-.001.002-.922 1.594c-.266.46-.664.846-1.135 1.096-.47.25-.96.388-1.597.388-2.002 0-3.75-1.782-3.75-4.25S7.498 7.75 9.5 7.75c.636 0 1.127.138 1.597.388.47.25.869.636 1.135 1.096l.922 1.594-.22.374zm11.23 2.12c-2.002 0-3.75-1.782-3.75-4.25S22.162 5.074 24.164 5.074c.637 0 1.127.138 1.597.388.47.25.869.636 1.135 1.096l.922 1.594c.25.432.805.58 1.238.33.432-.25.58-.805.33-1.237l-.92-1.593c-.47-.812-1.196-1.543-2.073-2.008-1.464-.775-3.23-1.07-5.029-.714-1.798.356-3.4 1.344-4.545 2.802-.452.576-.842 1.205-1.157 1.884l-.922 1.594-.922-1.594c-.315-.679-.705-1.308-1.157-1.884-1.146-1.458-2.747-2.446-4.545-2.802-1.8-.356-3.565-.061-5.029.714C3.411 1.71 2 3.12 2 5.075S3.411 8.44 5.286 9.215c1.464.775 3.23 1.07 5.029.714 1.798-.356 3.4-1.344 4.545-2.802.452-.576.842-1.205 1.157-1.884l.922-1.594.922 1.594c.315.679.705 1.308 1.157 1.884C19.782 8.528 20.8 9.073 21.847 9.387c1.047.315 2.14.372 3.167.163l.92 1.593z" />
  </svg>
);

const GoogleIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
  </svg>
);

// Updated Mock Data
const trendData = [
  { date: "Mar 3", volume: 12, approved: 9, gross: 12000, net: 9000 },
  { date: "Mar 4", volume: 10, approved: 8, gross: 10000, net: 8000 },
  { date: "Mar 5", volume: 8, approved: 6, gross: 8000, net: 6000 },
  { date: "Mar 6", volume: 11, approved: 9, gross: 11000, net: 9000 },
  { date: "Mar 7", volume: 8, approved: 6, gross: 8000, net: 6000 },
  { date: "Mar 8", volume: 6, approved: 4, gross: 6000, net: 4000 },
  { date: "Mar 9", volume: 4, approved: 2, gross: 4000, net: 2000 },
];

const trendReportData = [
  { metric: "Total Volume", w1: 68, w2: 45, w3: 60, w4: 76 },
  { metric: "Voided Orders", w1: 16, w2: 11, w3: 26, w4: 29 },
  { metric: "Origin Returns (RTO)", w1: "48.08%", w2: "41.13%", w3: "20.59%", w4: "29.79%" },
  { metric: "Successful Deliveries", w1: 27, w2: 20, w3: 27, w4: 33 },
  { metric: "Gross Sales", w1: "₹25,349", w2: "₹20,830", w3: "₹26,552", w4: "₹31,115", positive: true },
  { metric: "Freight Costs", w1: "₹3,402", w2: "₹2,752", w3: "₹3,016", w4: "₹4,083", negative: true },
  { metric: "Ad Expenditures", w1: "₹12,666", w2: "₹9,150", w3: "₹20,132", w4: "₹24,045", negative: true },
];

export function SummaryDashboard({ analytics }: { analytics: any }) {

  return (
    <div className="flex flex-col gap-8 w-full pb-12 p-2">
      
      {/* 1. Requires Attention - completely different visual approach */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-destructive/10 p-2 rounded-md">
              <AlertTriangle className="size-5 text-destructive" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Requires Attention</h2>
              <p className="text-sm text-muted-foreground hidden sm:block">Action items that need your immediate review.</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="col-span-2 flex gap-4">
            <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-4 rounded-r-lg flex-1 flex flex-col justify-center">
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">Inventory Health</span>
              <div className="flex items-center gap-2 font-medium">
                 <CheckCircle className="size-4 text-emerald-500" />
                 Stable
              </div>
            </div>
          </div>
          
          <Card className="shadow-none border-l-4 border-l-orange-500 bg-orange-500/5 dark:bg-orange-500/10">
            <CardContent className="p-4">
              <div className="text-2xl font-black text-orange-600 dark:text-orange-400 mb-1">1</div>
              <div className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><Clock className="size-3" /> Overdue Shipments</div>
            </CardContent>
          </Card>
          
          <Card className="shadow-none border-l-4 border-l-amber-500 bg-amber-500/5 dark:bg-amber-500/10">
            <CardContent className="p-4">
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mb-1">33</div>
              <div className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><ShieldAlert className="size-3" /> Lapsed Waybills</div>
            </CardContent>
          </Card>

          <Card className="shadow-none border-l-4 border-l-rose-500 bg-rose-500/5 dark:bg-rose-500/10">
            <CardContent className="p-4">
              <div className="text-2xl font-black text-rose-600 dark:text-rose-400 mb-1">8</div>
              <div className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><AlertOctagon className="size-3" /> Delivery Exceptions</div>
            </CardContent>
          </Card>

          <Card className="shadow-none border-l-4 border-l-violet-500 bg-violet-500/5 dark:bg-violet-500/10">
            <CardContent className="p-4">
              <div className="text-2xl font-black text-violet-600 dark:text-violet-400 mb-1">26</div>
              <div className="text-xs font-medium text-muted-foreground flex items-center gap-1.5"><RotateCcw className="size-3" /> Open Returns</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 2. KPI Overview */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Daily Performance Block */}
        <div className="lg:col-span-2 bg-card rounded-xl border shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Daily Pulse</h2>
            <Badge variant="secondary" className="font-normal">Real-time Tracker</Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pb-6 border-b">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">New Orders</div>
              <div className="text-4xl font-black tracking-tighter">2</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Approved</div>
              <div className="text-4xl font-black tracking-tighter text-blue-600 dark:text-blue-400">1</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Estimated Gross</div>
              <div className="text-4xl font-black tracking-tighter text-emerald-600 dark:text-emerald-400">₹2,598</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-md">
                     <MetaIcon className="text-blue-600 dark:text-blue-400 size-4" />
                  </div>
                  <span className="font-semibold">Facebook & IG</span>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="pl-4 border-l-2">
                     <div className="text-sm text-muted-foreground">Ad Expenditure</div>
                     <div className="text-lg font-bold">₹896</div>
                  </div>
                  <div className="pl-4 border-l-2 border-l-muted">
                     <div className="text-sm text-muted-foreground">CAC</div>
                     <div className="text-lg font-bold">₹448 <span className="text-xs font-normal text-muted-foreground">/ order</span></div>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-red-100 dark:bg-red-900/40 rounded-md">
                     <GoogleIcon className="text-red-500 size-4" />
                  </div>
                  <span className="font-semibold">Google Network</span>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="pl-4 border-l-2">
                     <div className="text-sm text-muted-foreground">Ad Expenditure</div>
                     <div className="text-lg font-bold">₹0</div>
                  </div>
                  <div className="pl-4 border-l-2 border-l-muted">
                     <div className="text-sm text-muted-foreground">CAC</div>
                     <div className="text-lg font-bold">₹0 <span className="text-xs font-normal text-muted-foreground">/ order</span></div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Retention & Satisfaction */}
        <div className="flex flex-col gap-6">
          <Card className="shadow-sm flex-1 dark:bg-indigo-950/20">
            <CardContent className="p-6 flex flex-col justify-center h-full">
              <div className="flex items-center justify-between mb-4">
                 <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                    <TrendingUp className="size-5 text-indigo-600 dark:text-indigo-400" />
                 </div>
                 <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Retention</span>
              </div>
              <div className="flex items-end gap-2">
                 <span className="text-4xl font-black">1.21x</span>
              </div>
              <p className="text-sm font-medium text-muted-foreground mt-2">Average purchase frequency</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm flex-1 dark:bg-amber-950/20">
            <CardContent className="p-6 flex flex-col justify-center h-full">
              <div className="flex items-center justify-between mb-4">
                 <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
                    <Award className="size-5 text-amber-600 dark:text-amber-400" />
                 </div>
                 <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Satisfaction</span>
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-4xl font-black">3.4</span>
                 <div className="flex text-amber-500">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                 </div>
              </div>
              <p className="text-sm font-medium text-muted-foreground mt-2">Overall shopper rating</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. Fulfillment Funnel */}
      <section className="bg-card rounded-xl border p-6 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">Fulfillment Funnel</h2>
            <p className="text-sm text-muted-foreground">Lifecycle breakdown of approved transactions.</p>
          </div>
          <Select defaultValue="week">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Trailing 7 Days</SelectItem>
              <SelectItem value="month">Trailing 30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { label: "Approved", value: "45", color: "text-foreground", bg: "bg-muted" },
            { label: "Processing", value: "0", color: "text-sky-600", bg: "bg-sky-50 dark:bg-sky-950", sub: "0%" },
            { label: "Ready", value: "0", color: "text-sky-600", bg: "bg-sky-50 dark:bg-sky-950", sub: "0%" },
            { label: "In Transit", value: "1", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950", sub: "2%" },
            { label: "Delivered", value: "33", color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950", sub: "73%" },
            { label: "RTO", value: "11", color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-950", sub: "24%" },
            { label: "Returns", value: "0", color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950", sub: "0%" },
            { label: "Lost", value: "0", color: "text-slate-600", bg: "bg-slate-50 dark:bg-slate-900", sub: "0%" },
          ].map((stat, i) => (
            <div key={i} className={`rounded-xl p-4 flex flex-col justify-between ${stat.bg}`}>
              <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis mb-2">{stat.label}</span>
              <div className="flex items-end justify-between">
                 <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
                 {stat.sub && <span className="text-[10px] font-bold opacity-60 mb-1">{stat.sub}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Trajectories */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Order Velocity</CardTitle>
            <CardDescription>Volume and approval rates over time</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} opacity={0.6}/>
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} opacity={0.6} />
                  <RechartsTooltip cursor={{ fill: 'currentColor', opacity: 0.1 }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: '10px' }} />
                  <Bar dataKey="volume" name="Total Volume" fill="currentColor" className="fill-blue-200 dark:fill-blue-900" radius={[4, 4, 0, 0]} barSize={24} />
                  <Bar dataKey="approved" name="Approved" fill="currentColor" className="fill-blue-600 dark:fill-blue-500" radius={[4, 4, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Financial Trajectory</CardTitle>
            <CardDescription>Gross vs Net revenue accumulation</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} opacity={0.6} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} opacity={0.6} tickFormatter={(val) => `₹${val/1000}k`} />
                  <RechartsTooltip cursor={{ stroke: 'currentColor', strokeWidth: 1, strokeDasharray: '4 4' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} formatter={(val) => `₹${val}`} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="gross" name="Gross Revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorGross)" strokeWidth={2} />
                  <Area type="monotone" dataKey="net" name="Net Revenue" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorNet)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      {/* 5. Aggregate History (Lifetime Data) */}
      <section className="bg-gradient-to-r from-card to-muted/30 rounded-xl border p-6 lg:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between shadow-sm">
        <div className="flex flex-col max-w-sm">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">Aggregate History</h2>
          <p className="text-sm text-muted-foreground mt-1">Your cumulative business impact across all connected sales channels since inception.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 w-full md:w-auto">
           <div className="flex flex-col relative top-0 sm:items-end">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">Lifetime Volume Handle</span>
              <div className="flex items-baseline gap-2">
                 <span className="text-4xl lg:text-5xl font-black text-foreground">1,428</span>
                 <span className="text-sm font-bold text-emerald-500">+12 this wk</span>
              </div>
           </div>
           
           <div className="hidden sm:block w-px h-16 bg-border self-center" />
           <div className="w-full h-px sm:hidden bg-border" />
           
           <div className="flex flex-col sm:items-start">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1">Cumulative Financial Output</span>
              <div className="flex items-baseline gap-2">
                 <span className="text-4xl lg:text-5xl font-black text-primary">₹2.4M</span>
                 <span className="text-sm font-bold text-emerald-500">+₹85k this wk</span>
              </div>
           </div>
        </div>
      </section>

      {/* 6. Matrix Table */}
      <section className="bg-card rounded-xl border shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">Weekly Performance Matrix</h2>
            <p className="text-sm text-muted-foreground">Rolling chronological breakdown of core KPIs.</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="platform">
               <SelectTrigger className="w-[140px]">
                 <SelectValue placeholder="All Channels" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="platform">All Channels</SelectItem>
                 <SelectItem value="meta">Meta Ads</SelectItem>
                 <SelectItem value="google">Google Ads</SelectItem>
               </SelectContent>
            </Select>
            <div className="flex rounded-md border text-sm font-medium">
               <div className="px-4 py-2 bg-primary text-primary-foreground">Include GST</div>
               <div className="px-4 py-2 text-muted-foreground hover:bg-muted cursor-pointer transition-colors">Exclude GST</div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-center">
            <thead>
              <tr className="bg-muted/50 text-muted-foreground">
                <th className="text-left py-4 px-6 font-semibold min-w-[200px]">KPI Metric</th>
                <th className="py-4 px-6 font-semibold">Current (Mar 2-8)</th>
                <th className="py-4 px-6 font-semibold">1W Ago (Feb 23-1)</th>
                <th className="py-4 px-6 font-semibold">2W Ago (Feb 16-22)</th>
                <th className="py-4 px-6 font-semibold">3W Ago (Feb 9-15)</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {trendReportData.map((row, i) => (
                <tr key={i} className="hover:bg-muted/20 transition-colors">
                  <td className="text-left py-4 px-6 font-medium text-foreground">
                    {row.metric}
                  </td>
                  <td className="py-4 px-6">
                    <div className={`font-bold text-base ${row.positive ? 'text-emerald-600 dark:text-emerald-400' : ''} ${row.negative ? 'text-rose-600 dark:text-rose-400' : ''}`}>{row.w1}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`font-semibold ${row.positive ? 'text-emerald-600 dark:text-emerald-400' : ''} ${row.negative ? 'text-rose-600 dark:text-rose-400' : ''}`}>{row.w2}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`font-semibold ${row.positive ? 'text-emerald-600 dark:text-emerald-400' : ''} ${row.negative ? 'text-rose-600 dark:text-rose-400' : ''}`}>{row.w3}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className={`font-semibold ${row.positive ? 'text-emerald-600 dark:text-emerald-400' : ''} ${row.negative ? 'text-rose-600 dark:text-rose-400' : ''}`}>{row.w4}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
