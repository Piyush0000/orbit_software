"use client";

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { checkPincodeServiceability } from "@/lib/api";
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
import { Badge } from "@/components/ui/badge";
import { IconLoader, IconMapPin, IconCheck, IconX } from "@tabler/icons-react";

export default function PincodeServiceabilityPage() {
  const { user } = useAuth();
  const storeId = user?.stores?.[0]?.id;

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [sourcePincode, setSourcePincode] = useState("");
  const [destPincode, setDestPincode] = useState("");

  const handleCheck = async () => {
    if (!storeId) return toast.error("No store found");
    if (!sourcePincode || !destPincode) return toast.error("Please enter both pincodes");
    if (sourcePincode.length !== 6 || destPincode.length !== 6) return toast.error("Pincodes must be 6 digits");

    setLoading(true);
    setResult(null);
    try {
      const res: any = await checkPincodeServiceability(storeId, sourcePincode, destPincode);
      const data = res?.result || res;
      setResult(data);
      if (data?.status) {
        toast.success("Serviceability data loaded!");
      } else {
        toast.error(data?.response || "Route not serviceable.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to check serviceability");
    } finally {
      setLoading(false);
    }
  };

  const ServiceBadge = ({ value, label }: { value: string; label: string }) => {
    const isYes = value?.toLowerCase() === "yes";
    return (
      <div className="flex flex-col items-center gap-2 p-4 rounded-xl border bg-card hover:bg-muted/30 transition-colors">
        <div className={`size-10 rounded-full flex items-center justify-center ${isYes ? "bg-green-500/10" : "bg-red-500/10"}`}>
          {isYes
            ? <IconCheck className="size-5 text-green-500" />
            : <IconX className="size-5 text-red-500" />
          }
        </div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
        <Badge variant={isYes ? "default" : "destructive"} className={`text-xs ${isYes ? "bg-green-500/10 text-green-600 border-green-200 shadow-none hover:bg-green-500/20" : ""}`}>
          {value || "N/A"}
        </Badge>
      </div>
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-8 p-6 lg:p-10 max-w-3xl mx-auto w-full">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Pincode Serviceability</h1>
        <p className="text-muted-foreground">
          Check if FShip can deliver between two pincodes before creating an order.
        </p>
      </div>

      <Card className="border-primary/10 shadow-sm">
        <CardHeader className="bg-primary/5 border-b border-primary/10 pb-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <IconMapPin className="size-5 text-primary" />
            Check Route
          </CardTitle>
          <CardDescription>Enter the source warehouse pincode and customer delivery pincode.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Source Pincode <span className="text-muted-foreground text-xs">(your warehouse)</span></Label>
              <Input
                placeholder="e.g. 110001"
                value={sourcePincode}
                onChange={(e) => setSourcePincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                maxLength={6}
                className="font-mono text-lg tracking-widest"
              />
            </div>
            <div className="space-y-2">
              <Label>Destination Pincode <span className="text-muted-foreground text-xs">(customer)</span></Label>
              <Input
                placeholder="e.g. 400001"
                value={destPincode}
                onChange={(e) => setDestPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                maxLength={6}
                className="font-mono text-lg tracking-widest"
              />
            </div>
          </div>
          <Button onClick={handleCheck} disabled={loading} size="lg" className="mt-6 w-full sm:w-auto px-10">
            {loading ? <IconLoader className="size-5 animate-spin mr-2" /> : <IconMapPin className="size-5 mr-2" />}
            {loading ? "Checking..." : "Check Serviceability"}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-primary/10 shadow-sm">
          <CardHeader className="pb-4 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle className="text-lg">
                  {result.source} → {result.destination}
                </CardTitle>
                <CardDescription className="font-mono text-xs">
                  {result.source_pincode} → {result.destination_pincode}
                </CardDescription>
              </div>
              {result.zone && (
                <Badge variant="outline" className="w-fit text-sm px-3 py-1 font-semibold capitalize">
                  Zone: {result.zone}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <ServiceBadge value={result.pickup} label="Pickup" />
              <ServiceBadge value={result.delivery || result.prepaid} label="Delivery" />
              <ServiceBadge value={result.cod} label="COD" />
              <ServiceBadge value={result.reverse} label="Reverse" />
            </div>
            {result.response && (
              <p className="mt-4 text-sm text-muted-foreground text-center italic">{result.response}</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
