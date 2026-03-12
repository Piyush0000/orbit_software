"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { trackShipment } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search, MapPin, Package, Calendar, Truck } from "lucide-react";
import { toast } from "sonner";

export default function TrackingPage() {
  const { user } = useAuth();
  const [waybill, setWaybill] = useState("");
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] = useState<any>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waybill.trim()) {
      toast.error("Please enter a valid Waybill or AWB number.");
      return;
    }
    if (!user?.stores?.[0]?.id) return;

    setLoading(true);
    try {
      const res: any = await trackShipment(user.stores[0].id, waybill.trim());
      if (res.success && res.tracking) {
        if (res.tracking.error) {
           toast.error(res.tracking.response || "Failed to find tracking data.");
           setTrackingData(null);
        } else {
           setTrackingData(res.tracking);
           toast.success("Tracking data retrieved successfully.");
        }
      } else {
        toast.error("Could not fetch tracking data.");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred while tracking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-8 p-6 lg:p-10 max-w-5xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-500/10 rounded-xl">
            <Search className="size-5 text-sky-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Shipment Tracking</h1>
            <p className="text-sm text-muted-foreground">Track the real-time status of your forward and reverse orders.</p>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden border-none shadow-xl bg-card/50 backdrop-blur-sm ring-1 ring-border mt-2">
        <div className="h-1.5 w-full bg-gradient-to-r from-sky-400 to-blue-600" />
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            Track by AWB
          </CardTitle>
          <CardDescription>
            Enter your FShip Waybill Number to get the complete tracking timeline.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                value={waybill}
                onChange={(e) => setWaybill(e.target.value)}
                placeholder="e.g. 143455210101006"
                className="pl-10 font-mono text-lg py-6 bg-background/50 border-input transition-all focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
            <Button type="submit" size="lg" className="px-8 h-auto font-bold bg-sky-600 hover:bg-sky-700 shadow-lg shadow-sky-600/20 transition-all active:scale-95" disabled={loading}>
              {loading ? <Loader2 className="size-5 animate-spin mr-2" /> : <Truck className="size-5 mr-2" />}
              Track Order
            </Button>
          </form>
        </CardContent>
      </Card>

      {trackingData && trackingData.summary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1 shadow-sm">
            <CardHeader className="pb-4 border-b">
              <CardTitle className="text-lg">Shipment Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-start gap-3">
                <Package className="size-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Waybill</p>
                  <p className="text-sm font-mono text-muted-foreground">{trackingData.summary.waybill}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="size-5 text-indigo-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Fulfilled By</p>
                  <p className="text-sm text-muted-foreground">{trackingData.summary.fulfilledby || "Unknown Courier"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="size-5 text-emerald-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Order Date</p>
                  <p className="text-sm text-muted-foreground">
                    {trackingData.summary.orderedon ? new Date(trackingData.summary.orderedon).toLocaleString() : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t">
                 <div className="rounded-xl bg-primary/10 p-4 text-center">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Current Status</p>
                    <p className="text-xl font-bold">{trackingData.summary.status}</p>
                 </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 shadow-sm">
            <CardHeader className="pb-4 border-b">
              <CardTitle className="text-lg">Tracking History</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {trackingData.trackingdata && trackingData.trackingdata.length > 0 ? (
                <div className="relative border-l-2 border-primary/20 ml-3 space-y-8 pb-4">
                  {trackingData.trackingdata.map((scan: any, i: number) => (
                    <div key={i} className="relative pl-6">
                      <div className={`absolute -left-[9px] top-1.5 size-4 rounded-full border-2 border-background ${i === 0 ? 'bg-primary' : 'bg-muted-foreground'}`}></div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <p className={`font-semibold ${i === 0 ? 'text-primary' : ''}`}>
                            {scan.Status}
                          </p>
                          <p className="text-xs text-muted-foreground font-mono">
                            {new Date(scan.DateandTime).toLocaleString()}
                          </p>
                        </div>
                        <p className="text-sm">{scan.Remark}</p>
                        {scan.Location && (
                          <div className="flex flex-row items-center gap-1 mt-1 text-xs text-muted-foreground">
                            <MapPin className="size-3" />
                            {scan.Location}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-40 flex-col items-center justify-center text-muted-foreground">
                  <Package className="size-10 mb-2 opacity-20" />
                  <p>No tracking history available yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
