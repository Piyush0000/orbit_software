"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { addWarehouse, updateWarehouse } from "@/lib/api";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Building2, MapPin, Phone, Mail, MoreVertical, Pencil, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Warehouse {
  warehouseId: number;
  warehouseName: string;
  contactName: string;
  addressLine1: string;
  addressLine2?: string;
  pincode: string;
  city: string;
  state?: string;
  phoneNumber: string;
  email: string;
  isDefault?: boolean;
}

const emptyForm: Omit<Warehouse, "warehouseId"> = {
  warehouseName: "",
  contactName: "",
  addressLine1: "",
  addressLine2: "",
  pincode: "",
  city: "",
  phoneNumber: "",
  email: "",
};

export default function WarehousesPage() {
  const { user } = useAuth();
  const storeId = user?.stores?.[0]?.id;

  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Warehouse | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = warehouses.filter((w) =>
    `${w.warehouseName} ${w.city} ${w.pincode}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (wh: Warehouse) => {
    setEditing(wh);
    setForm({
      warehouseName: wh.warehouseName,
      contactName: wh.contactName,
      addressLine1: wh.addressLine1,
      addressLine2: wh.addressLine2 || "",
      pincode: wh.pincode,
      city: wh.city,
      phoneNumber: wh.phoneNumber,
      email: wh.email,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!storeId) return toast.error("No store found");
    if (!form.warehouseName || !form.contactName || !form.addressLine1 || !form.pincode || !form.city || !form.phoneNumber) {
      return toast.error("Please fill all required fields");
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        warehouseId: editing?.warehouseId ?? 0,
        stateId: 1,
        countryId: 1,
      };

      let result: any;
      if (editing) {
        result = await updateWarehouse(storeId, payload);
        toast.success("Warehouse updated successfully!");
        setWarehouses((prev) =>
          prev.map((w) =>
            w.warehouseId === editing.warehouseId
              ? { ...w, ...form }
              : w
          )
        );
      } else {
        result = await addWarehouse(storeId, payload);
        const newId = result?.result?.warehouseId;
        toast.success("Warehouse added successfully!");
        setWarehouses((prev) => [
          ...prev,
          { ...form, warehouseId: newId ?? Date.now() },
        ]);
      }
      setModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to save warehouse");
    } finally {
      setSaving(false);
    }
  };

  const set = (key: keyof typeof emptyForm, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  return (
    <div className="flex flex-1 flex-col gap-8 p-6 lg:p-10 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Pickup Locations</h1>
          <p className="text-muted-foreground">
            Manage warehouses and dispatch centers. FShip uses these for pickup registration.
          </p>
        </div>
        <Button onClick={openAdd} className="shrink-0 gap-2 shadow-sm font-semibold px-6">
          <Plus className="size-5" />
          Add Warehouse
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Input
          placeholder="Search by name, city, or pincode..."
          className="pl-4 bg-background py-5"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((wh) => (
          <Card key={wh.warehouseId} className="flex flex-col border-primary/10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/80" />
            <CardHeader className="flex flex-row items-start justify-between pb-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-xl leading-none">{wh.warehouseName}</h3>
                  {wh.isDefault && (
                    <Badge variant="default" className="text-[10px] h-5 px-1.5 bg-green-500/10 text-green-600 hover:bg-green-500/20 shadow-none border-green-200">
                      Default
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground font-mono">ID: WH-{wh.warehouseId}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="-mr-2 -mt-2 opacity-50 hover:opacity-100">
                    <MoreVertical className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => openEdit(wh)}>
                    <Pencil className="size-3.5 mr-2" /> Edit Location
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-4 pt-4 flex-1">
              <div className="flex items-start gap-3">
                <MapPin className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed text-foreground/80">
                  {wh.addressLine1}{wh.addressLine2 ? `, ${wh.addressLine2}` : ""}<br />
                  {wh.city} — {wh.pincode}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="size-4 text-muted-foreground shrink-0" />
                <p className="text-sm text-foreground/80 font-medium">{wh.contactName}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 text-muted-foreground shrink-0" />
                <p className="text-sm text-foreground/80 font-mono">{wh.phoneNumber}</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-4 text-muted-foreground shrink-0" />
                <p className="text-sm text-foreground/80 font-mono">{wh.email}</p>
              </div>
            </CardContent>
            <CardFooter className="bg-secondary/20 pt-4 flex justify-between border-t border-border/50">
              <Button variant="outline" size="sm" className="w-full" onClick={() => openEdit(wh)}>
                Edit Location
              </Button>
            </CardFooter>
          </Card>
        ))}

        {/* Add New Card */}
        <div
          onClick={openAdd}
          className="flex h-full min-h-[300px] flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-xl bg-muted/20 hover:bg-muted/50 transition-colors cursor-pointer group"
        >
          <div className="size-16 bg-background border shadow-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Plus className="size-8 text-primary/60 group-hover:text-primary" />
          </div>
          <p className="text-lg font-medium text-foreground/70 group-hover:text-foreground">Add New Warehouse</p>
          <p className="text-sm text-muted-foreground text-center mt-2 max-w-[200px]">
            Register a pickup center with FShip to start dispatching orders.
          </p>
        </div>
      </div>

      {warehouses.length === 0 && !searchQuery && (
        <div className="text-center py-6 text-muted-foreground text-sm">
          No warehouses added yet. Click "Add Warehouse" to register your first pickup location with FShip.
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Warehouse" : "Add Warehouse"}</DialogTitle>
            <DialogDescription>
              {editing
                ? "Update the pickup location details in FShip."
                : "Register a new pickup center with FShip. The warehouse ID will be used when creating shipments."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="col-span-2 space-y-1.5">
              <Label>Warehouse Name <span className="text-red-500">*</span></Label>
              <Input value={form.warehouseName} onChange={(e) => set("warehouseName", e.target.value)} placeholder="e.g. Primary Hub - Delhi" disabled={!!editing} />
              {editing && <p className="text-xs text-muted-foreground">Warehouse name cannot be changed after creation.</p>}
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Contact Name <span className="text-red-500">*</span></Label>
              <Input value={form.contactName} onChange={(e) => set("contactName", e.target.value)} placeholder="Manager name" />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Address Line 1 <span className="text-red-500">*</span></Label>
              <Input value={form.addressLine1} onChange={(e) => set("addressLine1", e.target.value)} placeholder="Street, area, sector" />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label>Address Line 2</Label>
              <Input value={form.addressLine2} onChange={(e) => set("addressLine2", e.target.value)} placeholder="Landmark, building" />
            </div>
            <div className="space-y-1.5">
              <Label>Pincode <span className="text-red-500">*</span></Label>
              <Input value={form.pincode} onChange={(e) => set("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="110001" maxLength={6} className="font-mono" />
            </div>
            <div className="space-y-1.5">
              <Label>City <span className="text-red-500">*</span></Label>
              <Input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Delhi" />
            </div>
            <div className="space-y-1.5">
              <Label>Phone <span className="text-red-500">*</span></Label>
              <Input value={form.phoneNumber} onChange={(e) => set("phoneNumber", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="9876543210" className="font-mono" />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="warehouse@store.com" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              {saving ? "Saving..." : editing ? "Update Warehouse" : "Add Warehouse"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
