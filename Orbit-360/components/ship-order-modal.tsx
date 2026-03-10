"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  getLogisticsCouriers,
  createShipment,
  registerPickup,
  getShippingLabel,
  cancelShipment,
} from "@/lib/api";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  IconLoader,
  IconTruckDelivery,
  IconPackage,
  IconCheck,
  IconX,
  IconClipboard,
  IconTag,
} from "@tabler/icons-react";

interface ShipOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: any;
  onSuccess?: () => void;
}

export function ShipOrderModal({ open, onOpenChange, order, onSuccess }: ShipOrderModalProps) {
  const { user } = useAuth();
  const storeId = user?.stores?.[0]?.id;

  const [couriers, setCouriers] = useState<any[]>([]);
  const [loadingCouriers, setLoadingCouriers] = useState(false);
  const [shipping, setShipping] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Form fields
  const [courierId, setCourierId] = useState("");
  const [expressType, setExpressType] = useState("surface");
  const [weight, setWeight] = useState("0.5");
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("15");
  const [height, setHeight] = useState("10");
  const [pickAddressId, setPickAddressId] = useState("12414"); // default from add warehouse test

  useEffect(() => {
    if (open && storeId && couriers.length === 0) {
      setLoadingCouriers(true);
      getLogisticsCouriers(storeId)
        .then((res: any) => {
          const list = res?.couriers?.courier || res?.couriers || [];
          setCouriers(list);
          if (list.length > 0) setCourierId(String(list[0].courierId));
        })
        .catch(() => toast.error("Could not load couriers"))
        .finally(() => setLoadingCouriers(false));
    }
    if (!open) {
      setResult(null);
    }
  }, [open, storeId]);

  const handleShip = async () => {
    if (!storeId || !order) return;
    if (!courierId) return toast.error("Please select a courier");

    setShipping(true);
    try {
      const total = parseFloat(order.total?.toString() || "0");
      const isPrepaid = order.paymentStatus === "PAID";

      const payload = {
        customer_Name: order.customerName,
        customer_Mobile: order.customerPhone || "9999999999",
        customer_Emailid: order.customerEmail || "",
        customer_Address: order.shippingAddress?.line1 || order.customerAddress || "Address not available",
        landMark: order.shippingAddress?.landmark || "",
        customer_Address_Type: "Home",
        customer_PinCode: order.shippingAddress?.pincode || order.customerPincode || "110001",
        customer_City: order.shippingAddress?.city || order.customerCity || "Delhi",
        orderId: order.orderNumber,
        invoice_Number: order.orderNumber,
        payment_Mode: isPrepaid ? 2 : 1, // 2=PREPAID, 1=COD
        express_Type: expressType,
        is_Ndd: 0,
        order_Amount: total,
        tax_Amount: 0,
        extra_Charges: 0,
        total_Amount: total,
        cod_Amount: isPrepaid ? 0 : total,
        shipment_Weight: parseFloat(weight),
        shipment_Length: parseFloat(length),
        shipment_Width: parseFloat(width),
        shipment_Height: parseFloat(height),
        volumetric_Weight: parseFloat(((parseFloat(length) * parseFloat(width) * parseFloat(height)) / 5000).toFixed(2)),
        pick_Address_ID: parseInt(pickAddressId),
        products: (order.items || []).map((item: any) => ({
          productId: item.productId || item.id || "SKU",
          productName: item.name || "Product",
          unitPrice: parseFloat(item.price?.toString() || "0"),
          quantity: item.quantity || 1,
          productCategory: "General",
        })),
        courierId: parseInt(courierId),
      };

      const res: any = await createShipment(storeId, payload);
      const shipment = res?.shipment || res;
      setResult(shipment);

      if (shipment?.waybill) {
        toast.success(`Shipment created! AWB: ${shipment.waybill}`);
        onSuccess?.();
      } else {
        toast.warning("Order placed but no AWB returned. Check FShip dashboard.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to create shipment");
    } finally {
      setShipping(false);
    }
  };

  const handleRegisterPickup = async () => {
    if (!storeId || !result?.waybill) return;
    try {
      await registerPickup(storeId, [result.waybill]);
      toast.success("Pickup registered successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to register pickup");
    }
  };

  const handleGetLabel = async () => {
    if (!storeId || !result?.waybill) return;
    try {
      const res: any = await getShippingLabel(storeId, result.waybill);
      const details = res?.label?.resultDetails?.[result.waybill];
      if (details) {
        toast.success("Label data fetched! Check console for full details.");
        console.log("[Shipping Label]", details);
      } else {
        toast.info("Label requested. Check your FShip dashboard to download.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to get shipping label");
    }
  };

  const handleCancel = async () => {
    if (!storeId || !result?.waybill) return;
    try {
      await cancelShipment(storeId, result.waybill, "Cancelled by merchant");
      toast.success("Shipment cancelled.");
      setResult(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to cancel shipment");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <IconTruckDelivery className="size-5 text-primary" />
            Ship Order #{order?.orderNumber}
          </DialogTitle>
          <DialogDescription>
            Create a forward shipment via FShip for this order.
          </DialogDescription>
        </DialogHeader>

        {!result ? (
          <div className="space-y-4 py-2">
            {/* Order Summary */}
            <div className="rounded-lg bg-muted/50 p-3 space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Customer</span>
                <span className="font-medium">{order?.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment</span>
                <Badge variant={order?.paymentStatus === "PAID" ? "default" : "outline"} className="h-5 text-xs capitalize">
                  {order?.paymentStatus?.toLowerCase()}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-semibold">
                  {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(parseFloat(order?.total?.toString() || "0"))}
                </span>
              </div>
            </div>

            <Separator />

            {/* Courier */}
            <div className="space-y-2">
              <Label>Courier</Label>
              {loadingCouriers ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <IconLoader className="size-4 animate-spin" /> Loading couriers...
                </div>
              ) : (
                <Select value={courierId} onValueChange={setCourierId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select courier" />
                  </SelectTrigger>
                  <SelectContent>
                    {couriers.map((c) => (
                      <SelectItem key={c.courierId} value={String(c.courierId)}>
                        {c.courierName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Express Type */}
            <div className="space-y-2">
              <Label>Mode</Label>
              <Select value={expressType} onValueChange={setExpressType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="surface">Surface</SelectItem>
                  <SelectItem value="air">Air</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dimensions */}
            <div className="space-y-2">
              <Label>Package Dimensions</Label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "Weight (kg)", value: weight, set: setWeight },
                  { label: "L (cm)", value: length, set: setLength },
                  { label: "W (cm)", value: width, set: setWidth },
                  { label: "H (cm)", value: height, set: setHeight },
                ].map(({ label, value, set }) => (
                  <div key={label} className="space-y-1">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <Input
                      type="number"
                      value={value}
                      onChange={(e) => set(e.target.value)}
                      className="text-sm h-8"
                      min="0"
                      step="0.1"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Pickup Address ID */}
            <div className="space-y-2">
              <Label>Pickup Address ID <span className="text-muted-foreground text-xs">(from FShip Dashboard → Warehouses)</span></Label>
              <Input
                value={pickAddressId}
                onChange={(e) => setPickAddressId(e.target.value)}
                placeholder="e.g. 12414"
                className="font-mono"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button onClick={handleShip} disabled={shipping || loadingCouriers}>
                {shipping ? <IconLoader className="size-4 animate-spin mr-2" /> : <IconPackage className="size-4 mr-2" />}
                {shipping ? "Creating Shipment..." : "Create Shipment"}
              </Button>
            </DialogFooter>
          </div>
        ) : (
          /* Success State */
          <div className="space-y-4 py-2">
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-5 text-center space-y-2">
              <div className="size-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <IconCheck className="size-6 text-green-500" />
              </div>
              <p className="text-lg font-bold">Shipment Created!</p>
              {result.waybill ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-sm bg-background border rounded px-3 py-1.5 tracking-wider">
                    {result.waybill}
                  </span>
                  <Button size="icon" variant="ghost" className="size-7" onClick={() => { navigator.clipboard.writeText(result.waybill); toast.success("AWB copied!"); }}>
                    <IconClipboard className="size-3.5" />
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">AWB pending — check FShip dashboard</p>
              )}
              {result.apiorderid > 0 && (
                <p className="text-xs text-muted-foreground">FShip Order ID: {result.apiorderid}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" className="w-full" onClick={handleRegisterPickup} disabled={!result.waybill}>
                <IconTruckDelivery className="size-4 mr-1.5" />
                Pickup
              </Button>
              <Button variant="outline" size="sm" className="w-full" onClick={handleGetLabel} disabled={!result.waybill}>
                <IconTag className="size-4 mr-1.5" />
                Label
              </Button>
              <Button variant="outline" size="sm" className="w-full text-red-500 hover:text-red-600" onClick={handleCancel} disabled={!result.waybill}>
                <IconX className="size-4 mr-1.5" />
                Cancel
              </Button>
            </div>

            <DialogFooter>
              <Button onClick={() => onOpenChange(false)} className="w-full">Done</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
