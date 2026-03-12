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
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 rounded-xl">
            <Building2 className="size-5 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Pickup Locations</h1>
            <p className="text-sm text-muted-foreground">Manage warehouses and dispatch centers for FShip pickups.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs font-semibold">{warehouses.length} Location{warehouses.length !== 1 ? "s" : ""}</Badge>
          <Button onClick={openAdd} className="shrink-0 gap-2 font-semibold">
            <Plus className="size-4" /> Add Warehouse
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Input
          placeholder="Search by name, city or pincode..."
          className="bg-background pl-4 py-5"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((wh) => (
          <Card key={wh.warehouseId} className="flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 p-0">
            <div className="h-1.5 w-full bg-gradient-to-r from-indigo-400 to-violet-500" />
            <CardHeader className="flex flex-row items-start justify-between pb-2 pt-4 px-5">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base leading-tight">{wh.warehouseName}</h3>
                  {wh.isDefault && (
                    <Badge className="text-[10px] h-4 px-1.5 bg-emerald-500/10 text-emerald-600 border-emerald-200 shadow-none">
                      Default
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground font-mono">WH-{wh.warehouseId}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="-mr-1 -mt-1 size-8 opacity-50 hover:opacity-100">
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

            <CardContent className="space-y-3 px-5 pb-4 flex-1">
              <div className="rounded-lg bg-muted/40 p-3 space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <MapPin className="size-3.5 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed text-foreground/80">
                    {wh.addressLine1}{wh.addressLine2 ? `, ${wh.addressLine2}` : ""}, {wh.city} — {wh.pincode}
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Building2 className="size-3.5 text-muted-foreground shrink-0" />
                  <p className="text-xs text-foreground/80 font-medium">{wh.contactName}</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="size-3.5 text-muted-foreground shrink-0" />
                  <p className="text-xs text-foreground/80 font-mono">{wh.phoneNumber}</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="size-3.5 text-muted-foreground shrink-0" />
                  <p className="text-xs text-foreground/80 font-mono truncate">{wh.email}</p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="px-5 pb-4 pt-0">
              <Button variant="outline" size="sm" className="w-full" onClick={() => openEdit(wh)}>
                <Pencil className="size-3.5 mr-2" /> Edit Location
              </Button>
            </CardFooter>
          </Card>
        ))}

        {/* Add New Card */}
        <div
          onClick={openAdd}
          className="flex h-full min-h-[280px] flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-xl hover:bg-muted/40 hover:border-indigo-300 transition-all cursor-pointer group"
        >
          <div className="size-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Plus className="size-7 text-indigo-500" />
          </div>
          <p className="text-base font-semibold text-foreground/70 group-hover:text-foreground">Add New Location</p>
          <p className="text-xs text-muted-foreground text-center mt-1.5 max-w-[180px]">
            Register a pickup center with FShip for dispatch.
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
