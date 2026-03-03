"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { calculateRate, getLogisticsCouriers } from "@/lib/api";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { IconLoader, IconCalculator, IconTruckDelivery, IconCash } from "@tabler/icons-react";

export default function RateCalculatorPage() {
  const { user } = useAuth();
  const storeId = user?.stores?.[0]?.id;

  const [loading, setLoading] = useState(false);
  const [rates, setRates] = useState<any[]>([]);

  const [form, setForm] = useState({
    source_Pincode: "",
    destination_Pincode: "",
    payment_Mode: "PREPAID",
    amount: "1000",
    express_Type: "surface",
    shipment_Weight: "1",
    shipment_Length: "20",
    shipment_Width: "15",
    shipment_Height: "10",
  });

  const set = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleCalculate = async () => {
    if (!storeId) return toast.error("No store found");
    if (!form.source_Pincode || !form.destination_Pincode) {
      return toast.error("Please enter source and destination pincodes");
    }
    setLoading(true);
    setRates([]);
    try {
      const L = parseFloat(form.shipment_Length);
      const W = parseFloat(form.shipment_Width);
      const H = parseFloat(form.shipment_Height);
      const res: any = await calculateRate(storeId, {
        ...form,
        amount: parseFloat(form.amount),
        shipment_Weight: parseFloat(form.shipment_Weight),
        shipment_Length: L,
        shipment_Width: W,
        shipment_Height: H,
        volumetric_Weight: parseFloat(((L * W * H) / 5000).toFixed(2)),
      });
      const rateList = res?.rates?.shipment_rates || res?.shipment_rates || [];
      if (rateList.length === 0) {
        toast.info("No rates returned for this route.");
      } else {
        setRates(rateList);
        toast.success(`${rateList.length} rate(s) found!`);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to calculate rates");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-8 p-6 lg:p-10 max-w-5xl mx-auto w-full">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Rate Calculator</h1>
        <p className="text-muted-foreground">
          Get real-time FShip shipping rates before booking an order.
        </p>
      </div>

      <Card className="border-primary/10 shadow-sm">
        <CardHeader className="bg-primary/5 border-b border-primary/10 pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <IconCalculator className="size-5 text-primary" />
            Shipment Details
          </CardTitle>
          <CardDescription>Enter the shipment details to calculate available courier rates.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pincodes */}
            <div className="space-y-2">
              <Label>Source Pincode</Label>
              <Input placeholder="e.g. 110001" value={form.source_Pincode} onChange={(e) => set("source_Pincode", e.target.value)} maxLength={6} />
            </div>
            <div className="space-y-2">
              <Label>Destination Pincode</Label>
              <Input placeholder="e.g. 400001" value={form.destination_Pincode} onChange={(e) => set("destination_Pincode", e.target.value)} maxLength={6} />
            </div>

            {/* Payment + Mode */}
            <div className="space-y-2">
              <Label>Payment Mode</Label>
              <Select value={form.payment_Mode} onValueChange={(v) => set("payment_Mode", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="PREPAID">Prepaid</SelectItem>
                  <SelectItem value="COD">Cash on Delivery (COD)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Shipment Mode</Label>
              <Select value={form.express_Type} onValueChange={(v) => set("express_Type", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="surface">Surface</SelectItem>
                  <SelectItem value="air">Air</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label>Declared Value (₹)</Label>
              <Input type="number" value={form.amount} onChange={(e) => set("amount", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Weight (kg)</Label>
              <Input type="number" value={form.shipment_Weight} onChange={(e) => set("shipment_Weight", e.target.value)} step="0.1" />
            </div>

            {/* Dimensions */}
            <div className="col-span-full space-y-2">
              <Label>Package Dimensions (cm)</Label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Length", key: "shipment_Length" },
                  { label: "Width", key: "shipment_Width" },
                  { label: "Height", key: "shipment_Height" },
                ].map(({ label, key }) => (
                  <div key={key} className="space-y-1">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <Input
                      type="number"
                      value={form[key as keyof typeof form]}
                      onChange={(e) => set(key, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Volumetric weight: <span className="font-mono font-medium">
                  {((parseFloat(form.shipment_Length || "0") * parseFloat(form.shipment_Width || "0") * parseFloat(form.shipment_Height || "0")) / 5000).toFixed(2)} kg
                </span>
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={handleCalculate} disabled={loading} size="lg" className="w-full md:w-auto px-10">
              {loading ? <IconLoader className="size-5 animate-spin mr-2" /> : <IconCalculator className="size-5 mr-2" />}
              {loading ? "Calculating..." : "Calculate Rates"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {rates.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-bold">
            Available Rates
            <Badge variant="secondary" className="ml-2">{rates.length} options</Badge>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rates.map((rate, i) => (
              <Card key={i} className={`border-primary/10 shadow-sm hover:border-primary/40 transition-all ${i === 0 ? 'ring-2 ring-primary/30' : ''}`}>
                <CardContent className="pt-5 space-y-3">
                  {i === 0 && (
                    <Badge className="text-[10px] h-4 px-1.5 bg-primary/10 text-primary border-none">Cheapest</Badge>
                  )}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-sm">{rate.courier_name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{rate.service_mode} · {rate.zone_name || "—"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">₹{rate.shipping_charge}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    <div className="flex justify-between bg-muted/50 rounded px-2 py-1">
                      <span className="text-muted-foreground">COD</span>
                      <span className="font-mono font-medium">₹{rate.cod_charge}</span>
                    </div>
                    <div className="flex justify-between bg-muted/50 rounded px-2 py-1">
                      <span className="text-muted-foreground">RTO</span>
                      <span className="font-mono font-medium">₹{rate.rto_charge}</span>
                    </div>
                  </div>
                  {rate.expectedDeliveryDate && (
                    <p className="text-xs text-muted-foreground">
                      EDD: {new Date(rate.expectedDeliveryDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
