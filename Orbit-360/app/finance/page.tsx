"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark, TrendingUp, ReceiptText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FinancePage() {
  return (
    <div className="flex flex-1 flex-col p-6 lg:p-10 max-w-7xl mx-auto w-full gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Finance Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your earnings, payouts, and overall financial health.
          </p>
        </div>
        <Button className="bg-primary">
          Download Statement
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Remittance</CardTitle>
            <Landmark className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12,450.00</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              Processing to linked bank account
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Profit & Loss</CardTitle>
            <TrendingUp className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+₹8,230.50</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              Net profit margin of 24%
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Billing Invoices</CardTitle>
            <ReceiptText className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 Due</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1 text-red-500">
              ₹4,500 pending payment
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 shadow-sm lg:col-span-4 mt-4">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>A summary of your latest financial activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border p-6 flex items-center justify-center h-48 text-muted-foreground text-sm">
            Transaction history table data will appear here.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
