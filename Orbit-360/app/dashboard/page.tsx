"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LabelList } from "recharts";
import { Download, LayoutGrid, AlertCircle, ShoppingCart, MapPin, SearchX, MousePointerClick, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const trendData = [
  { date: "Mar 2-8", orders: 150, prevOrders: 110, revenue: 150000, prevRevenue: 100000, aov: 1000, prevAov: 900 },
  { date: "Feb 23-1", orders: 130, prevOrders: 105, revenue: 125000, prevRevenue: 95000, aov: 960, prevAov: 904 },
  { date: "Feb 16-22", orders: 120, prevOrders: 115, revenue: 110000, prevRevenue: 105000, aov: 916, prevAov: 913 },
  { date: "Feb 9-15", orders: 115, prevOrders: 125, revenue: 105000, prevRevenue: 120000, aov: 913, prevAov: 960 },
].reverse();

const paymentData = [
  { name: "Cash on Delivery", value: 92, color: "#3b82f6" },
  { name: "Prepaid (Online)", value: 6, color: "#60a5fa" },
  { name: "Partial COD", value: 1, color: "#93c5fd" },
  { name: "Wallet/Other", value: 1, color: "#bfdbfe" },
];

const tierData = [
  { name: "Tier 1", value: 45 },
  { name: "Tier 3", value: 35 },
  { name: "Metro", value: 25 },
  { name: "Tier 2", value: 15 },
];

const stateData = [
  { state: "Maharashtra", value: "26%" },
  { state: "Karnataka", value: "20%" },
  { state: "Delhi", value: "13%" },
  { state: "Uttar Pradesh", value: "7%" },
  { state: "Gujarat", value: "4%" },
];

const cancellationData = [
  { reason: "Ordered By Mistake", customer: 43, seller: 8 },
  { reason: "Delivery Time Too Long", customer: 29, seller: 1 },
  { reason: "Changed Mind", customer: 14, seller: 3 },
  { reason: "Wrong Address/Details", customer: 14, seller: 1 },
  { reason: "Found Better Price", customer: 0, seller: 3 },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 w-full p-4 lg:p-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6">
        <div>
           <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                 <LayoutGrid className="size-5 text-primary" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">Performance Dashboard</h1>
           </div>
           <p className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live Sync • Last updated: Just now
           </p>
        </div>
        
        <div className="flex items-center gap-3">
           <Select defaultValue="week">
             <SelectTrigger className="w-[120px]">
               <SelectValue placeholder="Timeframe" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="today">Today</SelectItem>
               <SelectItem value="week">This Week</SelectItem>
               <SelectItem value="month">This Month</SelectItem>
             </SelectContent>
           </Select>
           <div className="border bg-background px-3 py-2 rounded-md text-sm font-medium">
             09-02-2026 — 08-03-2026
           </div>
           <Select defaultValue="all">
             <SelectTrigger className="w-[140px]">
               <SelectValue placeholder="Payment Mode" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="all">All Modes</SelectItem>
               <SelectItem value="cod">COD Only</SelectItem>
               <SelectItem value="prepaid">Prepaid Only</SelectItem>
             </SelectContent>
           </Select>
        </div>
      </div>

      {/* 1. Velocity & Revenue Trends (Line Charts matching Order:Trend and Revenue:Trend) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm border-muted/60 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b bg-muted/10">
             <div className="flex items-center gap-2">
                <ShoppingCart className="size-4 text-blue-600" />
                <h3 className="font-semibold">Order Volume Trajectory</h3>
             </div>
             <Download className="size-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
          </div>
          <CardContent className="p-6 h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} opacity={0.6}/>
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} opacity={0.6} />
                  <Tooltip cursor={{ strokeDasharray: '3 3', strokeWidth: 1 }} contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="orders" name="Current Period" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="prevOrders" name="Previous Period" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </LineChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-muted/60 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b bg-muted/10">
             <div className="flex items-center gap-2">
                <TrendingUp className="size-4 text-emerald-600" />
                <h3 className="font-semibold">Revenue Trajectory</h3>
             </div>
             <Download className="size-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
          </div>
          <CardContent className="p-6 h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 5, right: 0, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} opacity={0.6}/>
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} opacity={0.6} tickFormatter={(val) => `₹${val/1000}k`} />
                  <Tooltip cursor={{ strokeDasharray: '3 3', strokeWidth: 1 }} formatter={(val) => `₹${val}`} contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)' }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="revenue" name="Current Revenue" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="prevRevenue" name="Previous Revenue" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </LineChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      {/* 2. Order Details / Progression Pipeline */}
      <section className="bg-card rounded-xl shadow-sm border border-muted/60 overflow-hidden">
        <div className="p-6 border-b flex flex-col gap-6 bg-muted/5">
           <h2 className="text-lg font-bold">Progression Pipeline</h2>
           
           <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
             {[
               { title: "Confirmed Total", val: 167, bg: "bg-background border rounded-lg", color: "text-foreground" },
               { title: "Processing Hub", val: 13, sub: "8%", bg: "bg-sky-50 dark:bg-sky-950 border border-sky-100 dark:border-sky-900 rounded-lg", color: "text-sky-600" },
               { title: "In-Transit", val: 34, sub: "20%", bg: "bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 rounded-lg", color: "text-blue-600" },
               { title: "Delivered", val: 86, sub: "51%", bg: "bg-emerald-50 dark:bg-emerald-950 border border-emerald-100 dark:border-emerald-900 rounded-lg", color: "text-emerald-600" },
               { title: "RTO Received", val: 32, sub: "19%", bg: "bg-rose-50 dark:bg-rose-950 border border-rose-100 dark:border-rose-900 rounded-lg", color: "text-rose-600" },
               { title: "Lost/Damaged", val: 2, sub: "1%", bg: "bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg", color: "text-slate-600" },
             ].map((m, i) => (
                <div key={i} className={`p-4 flex flex-col justify-center ${m.bg}`}>
                   <div className="flex items-baseline gap-2 mb-1">
                      <span className={`text-3xl font-black ${m.color}`}>{m.val}</span>
                      {m.sub && <Badge variant="secondary" className="px-1.5 py-0 rounded text-[10px] font-bold">{m.sub}</Badge>}
                   </div>
                   <span className="text-xs font-semibold text-muted-foreground">{m.title}</span>
                </div>
             ))}
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-center">
             <thead>
               <tr className="border-b bg-muted/30">
                 <th className="py-4 px-6 text-left font-semibold text-muted-foreground">Time Period</th>
                 <th className="py-4 px-4 font-semibold text-muted-foreground">Volume</th>
                 <th className="py-4 px-4 font-semibold text-muted-foreground">Voided</th>
                 <th className="py-4 px-4 font-semibold text-foreground">Confirmed</th>
                 <th className="py-4 px-4 font-semibold text-sky-600">Processing</th>
                 <th className="py-4 px-4 font-semibold text-blue-600">Transit</th>
                 <th className="py-4 px-4 font-semibold text-emerald-600">Success</th>
                 <th className="py-4 px-4 font-semibold text-rose-600">Origin Return</th>
                 <th className="py-4 px-4 font-semibold text-slate-600">Loss/Damage</th>
               </tr>
             </thead>
             <tbody className="divide-y">
               {[
                 { p: "Mar 2-8", v: 68, void: 16, voidP: 24, conf: 52, proc: 13, procP: 25, trans: 32, transP: 62, succ: 6, succP: 12, rto: 1, rtoP: 2, loss: 0, lossP: 0 },
                 { p: "Feb 23-1", v: 45, void: 11, voidP: 24, conf: 34, proc: 0, procP: 0, trans: 2, transP: 6, succ: 20, succP: 59, rto: 12, rtoP: 35, loss: 0, lossP: 0 },
                 { p: "Feb 16-22", v: 60, void: 26, voidP: 43, conf: 34, proc: 0, procP: 0, trans: 0, transP: 0, succ: 27, succP: 79, rto: 7, rtoP: 21, loss: 0, lossP: 0 },
                 { p: "Feb 9-15", v: 76, void: 29, voidP: 38, conf: 47, proc: 0, procP: 0, trans: 0, transP: 0, succ: 33, succP: 70, rto: 12, rtoP: 26, loss: 2, lossP: 4 },
               ].map((row, i) => (
                  <tr key={i} className="hover:bg-muted/10 transition-colors">
                     <td className="py-4 px-6 font-medium text-left">{row.p}</td>
                     <td className="py-4 px-4">{row.v}</td>
                     <td className="py-4 px-4"><div className="flex items-center justify-center gap-1.5">{row.void} <span className="text-[10px] text-muted-foreground">{row.voidP}%</span></div></td>
                     <td className="py-4 px-4 font-bold">{row.conf}</td>
                     <td className="py-4 px-4"><div className="flex items-center justify-center gap-1.5">{row.proc} <span className="text-[10px] text-sky-500">{row.procP}%</span></div></td>
                     <td className="py-4 px-4"><div className="flex items-center justify-center gap-1.5">{row.trans} <span className="text-[10px] text-blue-500">{row.transP}%</span></div></td>
                     <td className="py-4 px-4"><div className="flex items-center justify-center gap-1.5">{row.succ} <span className="text-[10px] text-emerald-500">{row.succP}%</span></div></td>
                     <td className="py-4 px-4"><div className="flex items-center justify-center gap-1.5">{row.rto} <span className="text-[10px] text-rose-500">{row.rtoP}%</span></div></td>
                     <td className="py-4 px-4"><div className="flex items-center justify-center gap-1.5">{row.loss} <span className="text-[10px] text-slate-500">{row.lossP}%</span></div></td>
                  </tr>
               ))}
             </tbody>
          </table>
        </div>
      </section>

      {/* 3. Distribution Analytics (Payment, State, Tier) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Payment Mode Donut */}
         <Card className="shadow-sm border-muted/60 overflow-hidden flex flex-col">
           <div className="flex items-center justify-between p-5 border-b bg-muted/10">
              <h3 className="font-semibold text-sm">Checkout Modalities</h3>
              <Download className="size-4 text-muted-foreground" />
           </div>
           <CardContent className="p-0 flex-1 relative flex items-center justify-center min-h-[250px]">
              <ResponsiveContainer width="100%" height={200}>
                 <PieChart>
                    <Pie data={paymentData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                       {paymentData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                 </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-2xl font-black text-blue-600">92%</span>
                 <span className="text-xs font-semibold text-muted-foreground">COD Rate</span>
              </div>
           </CardContent>
           <div className="p-4 bg-muted/5 border-t flex flex-wrap gap-x-4 gap-y-2 justify-center text-xs">
              {paymentData.map(d => (
                 <div key={d.name} className="flex items-center gap-1.5">
                    <div className="size-2 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-muted-foreground">{d.name}</span>
                 </div>
              ))}
           </div>
         </Card>

         {/* Geographic Distribution */}
         <Card className="shadow-sm border-muted/60 flex flex-col">
           <div className="flex items-center justify-between p-5 border-b bg-muted/10">
              <h3 className="font-semibold text-sm">Territory Concentration</h3>
              <Download className="size-4 text-muted-foreground" />
           </div>
           <CardContent className="p-5 flex-1 flex flex-col">
              <div className="flex items-center justify-center flex-1 py-4 opacity-50 relative">
                 <MapPin className="size-16 text-emerald-600 absolute" style={{ top: '20%', left: '30%' }} />
                 <MapPin className="size-10 text-emerald-400 absolute" style={{ top: '40%', right: '30%' }} />
                 <MapPin className="size-12 text-emerald-500 absolute" style={{ bottom: '20%', left: '40%' }} />
                 <div className="absolute inset-0 bg-blue-50 dark:bg-blue-950/20 rounded-md -z-10" />
                 <span className="text-sm font-medium z-10 bg-background/80 px-2 py-1 rounded backdrop-blur-sm shadow-sm ring-1 ring-border">Geospatial heat mapping</span>
              </div>
              <div className="space-y-3 mt-4">
                 {stateData.map((s, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                       <span className="font-medium">{s.state}</span>
                       <span className="text-emerald-600 dark:text-emerald-400 font-bold">{s.value}</span>
                    </div>
                 ))}
              </div>
           </CardContent>
         </Card>

         {/* Tier Distribution Bar */}
         <Card className="shadow-sm border-muted/60 flex flex-col">
           <div className="flex items-center justify-between p-5 border-b bg-muted/10">
              <h3 className="font-semibold text-sm">Demographic Tiers</h3>
              <Download className="size-4 text-muted-foreground" />
           </div>
           <CardContent className="p-5 pt-8 flex-1">
              <ResponsiveContainer width="100%" height={200}>
                 <BarChart data={tierData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: 'currentColor', fontWeight: 500 }} opacity={0.8} />
                    <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px' }} />
                    <Bar dataKey="value" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={28}>
                       <LabelList dataKey="value" position="right" fill="currentColor" fontSize={12} formatter={(v: number) => `${v}%`} />
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                 <Badge variant="outline" className="bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400">Tier 1 leads by +10%</Badge>
              </div>
           </CardContent>
         </Card>
      </section>

      {/* 4. AOV Trajectory */}
      <Card className="shadow-sm border-muted/60 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b bg-muted/10">
           <h3 className="font-semibold">Average Ticket Size Trajectory</h3>
           <Download className="size-4 text-muted-foreground" />
        </div>
        <CardContent className="p-6 h-[250px]">
           <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} opacity={0.6}/>
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'currentColor' }} opacity={0.6} tickFormatter={(val) => `₹${val/1000}k`} domain={['dataMin - 200', 'dataMax + 200']} />
                <Tooltip cursor={{ strokeDasharray: '3 3', strokeWidth: 1 }} formatter={(val) => `₹${val}`} contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: '10px' }} />
                <Line type="monotone" dataKey="aov" name="AOV (Delivered)" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="prevAov" name="AOV (Cart Target)" stroke="#a5b4fc" strokeWidth={2} strokeDasharray="4 4" dot={false} />
              </LineChart>
           </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 5. Cancellation Diagnostics */}
      <section className="bg-card rounded-xl shadow-sm border border-muted/60 overflow-hidden">
        <div className="p-6 border-b bg-muted/5 flex items-center justify-between">
           <h2 className="text-lg font-bold flex items-center gap-2"><SearchX className="size-5 text-rose-500" /> Void & Cancellation Diagnostics</h2>
           <Badge variant="outline" className="text-muted-foreground">Historical Baseline</Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
           {/* Section 1 */}
           <div className="p-0">
              <div className="p-4 bg-muted/20 border-b flex items-center gap-2">
                 <MousePointerClick className="size-4 text-muted-foreground" />
                 <h3 className="font-semibold text-sm">Shopper Intent (Pre-shipment)</h3>
              </div>
              <table className="w-full text-sm">
                 <thead>
                   <tr className="border-b text-muted-foreground bg-muted/5">
                     <th className="py-3 px-6 text-left font-medium">Trigger Reason</th>
                     <th className="py-3 px-6 font-medium text-center">Incidents</th>
                     <th className="py-3 px-6 font-medium text-right">Share %</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y">
                   {cancellationData.map((d, i) => (
                      <tr key={i} className="hover:bg-muted/10">
                         <td className="py-3 px-6 font-medium text-foreground">{d.reason}</td>
                         <td className="py-3 px-6 text-center">{d.customer}</td>
                         <td className="py-3 px-6 text-right font-semibold text-rose-600 dark:text-rose-400">{d.customer > 0 ? d.customer + '%' : '0%'}</td>
                      </tr>
                   ))}
                 </tbody>
              </table>
           </div>

           {/* Section 2 */}
           <div className="p-0">
              <div className="p-4 bg-muted/20 border-b flex items-center gap-2">
                 <AlertCircle className="size-4 text-muted-foreground" />
                 <h3 className="font-semibold text-sm">Fulfillment Friction (Post-shipment)</h3>
              </div>
              <table className="w-full text-sm">
                 <thead>
                   <tr className="border-b text-muted-foreground bg-muted/5">
                     <th className="py-3 px-6 text-left font-medium">Trigger Reason</th>
                     <th className="py-3 px-6 font-medium text-center">Incidents</th>
                     <th className="py-3 px-6 font-medium text-right">Share %</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y">
                   {cancellationData.map((d, i) => (
                      <tr key={i} className="hover:bg-muted/10">
                         <td className="py-3 px-6 font-medium text-foreground">{d.reason}</td>
                         <td className="py-3 px-6 text-center">{d.seller}</td>
                         <td className="py-3 px-6 text-right font-semibold text-rose-600 dark:text-rose-400">{d.seller > 0 ? d.seller + '%' : '0%'}</td>
                      </tr>
                   ))}
                 </tbody>
              </table>
           </div>
        </div>
      </section>

    </div>
  );
}
