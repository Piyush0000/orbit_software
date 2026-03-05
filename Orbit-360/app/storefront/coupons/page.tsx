"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  Plus, Tag, Trash2, Copy, CheckCircle2, Clock, XCircle,
  Percent, DollarSign, Gift, Loader2, Search
} from "lucide-react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader,
  DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Coupon {
  id: string;
  code: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  minOrderValue?: number;
  maxUses?: number;
  usedCount: number;
  expiresAt?: string;
  isActive: boolean;
  createdAt: string;
}

// ─── API helpers ──────────────────────────────────────────────────────────────
const getBaseUrl = () => {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  return url.endsWith("/api") ? url : `${url}/api`;
};

const authFetch = async (path: string, options: any = {}) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  const res = await fetch(`${getBaseUrl()}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(err.message || "Request failed");
  }
  return res.json();
};

// ─── Utility ──────────────────────────────────────────────────────────────────
function generateCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function statusBadge(coupon: Coupon) {
  const expired = coupon.expiresAt && new Date(coupon.expiresAt) < new Date();
  const maxed = coupon.maxUses && coupon.usedCount >= coupon.maxUses;

  if (!coupon.isActive)
    return <Badge variant="secondary" className="gap-1"><XCircle className="size-3" /> Disabled</Badge>;
  if (expired)
    return <Badge variant="destructive" className="gap-1"><Clock className="size-3" /> Expired</Badge>;
  if (maxed)
    return <Badge variant="outline" className="gap-1 text-amber-500 border-amber-500"><CheckCircle2 className="size-3" /> Maxed</Badge>;
  return <Badge className="gap-1 bg-emerald-500/10 text-emerald-600 border-emerald-500/20"><CheckCircle2 className="size-3" /> Active</Badge>;
}

// ─── Create Coupon Dialog ─────────────────────────────────────────────────────
interface CreateDialogProps {
  storeId: string;
  onCreated: (c: Coupon) => void;
}

function CreateCouponDialog({ storeId, onCreated }: CreateDialogProps) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    code: generateCode(),
    type: "PERCENTAGE" as "PERCENTAGE" | "FIXED",
    value: "",
    minOrderValue: "",
    maxUses: "",
    expiresAt: "",
  });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.code || !form.value) return toast.error("Code and value are required");
    try {
      setSaving(true);
      const body: any = {
        code: form.code.toUpperCase().trim(),
        type: form.type,
        value: Number(form.value),
        storeId,
      };
      if (form.minOrderValue) body.minOrderValue = Number(form.minOrderValue);
      if (form.maxUses) body.maxUses = Number(form.maxUses);
      if (form.expiresAt) body.expiresAt = new Date(form.expiresAt).toISOString();

      const coupon = await authFetch(`/coupons`, { method: "POST", body: JSON.stringify(body) });
      onCreated(coupon);
      toast.success(`Coupon "${coupon.code}" created!`);
      setOpen(false);
      setForm({ code: generateCode(), type: "PERCENTAGE", value: "", minOrderValue: "", maxUses: "", expiresAt: "" });
    } catch (err: any) {
      toast.error(err.message || "Failed to create coupon");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2"><Plus className="size-4" /> Create Coupon</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Coupon</DialogTitle>
          <DialogDescription>Set up a discount code for your customers.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Code */}
          <div className="space-y-1.5">
            <Label>Coupon Code</Label>
            <div className="flex gap-2">
              <Input
                value={form.code}
                onChange={(e) => set("code", e.target.value.toUpperCase())}
                placeholder="e.g. SUMMER20"
                className="font-mono tracking-widest"
                required
              />
              <Button type="button" variant="outline" size="icon" onClick={() => set("code", generateCode())} title="Regenerate">
                <Gift className="size-4" />
              </Button>
            </div>
          </div>

          {/* Type + Value */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Discount Type</Label>
              <Select value={form.type} onValueChange={(v) => set("type", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="PERCENTAGE"><span className="flex items-center gap-2"><Percent className="size-3" /> Percentage</span></SelectItem>
                  <SelectItem value="FIXED"><span className="flex items-center gap-2"><DollarSign className="size-3" /> Fixed (₹)</span></SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>{form.type === "PERCENTAGE" ? "Discount (%)" : "Discount (₹)"}</Label>
              <Input
                type="number"
                min={1}
                max={form.type === "PERCENTAGE" ? 100 : undefined}
                value={form.value}
                onChange={(e) => set("value", e.target.value)}
                placeholder={form.type === "PERCENTAGE" ? "20" : "500"}
                required
              />
            </div>
          </div>

          {/* Min Order */}
          <div className="space-y-1.5">
            <Label>Minimum Order Value (₹) <span className="text-muted-foreground text-xs">— optional</span></Label>
            <Input
              type="number" min={0}
              value={form.minOrderValue}
              onChange={(e) => set("minOrderValue", e.target.value)}
              placeholder="e.g. 999"
            />
          </div>

          {/* Max Uses + Expiry */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Max Uses <span className="text-muted-foreground text-xs">— optional</span></Label>
              <Input
                type="number" min={1}
                value={form.maxUses}
                onChange={(e) => set("maxUses", e.target.value)}
                placeholder="100"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Expiry Date <span className="text-muted-foreground text-xs">— optional</span></Label>
              <Input
                type="date"
                value={form.expiresAt}
                onChange={(e) => set("expiresAt", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          <Separator />

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={saving}>
              {saving ? <Loader2 className="size-4 animate-spin mr-2" /> : <Plus className="size-4 mr-2" />}
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Coupon Card ──────────────────────────────────────────────────────────────
function CouponCard({ coupon, onDelete, onToggle }: { coupon: Coupon; onDelete: (id: string) => void; onToggle: (id: string, active: boolean) => void }) {
  const [copied, setCopied] = useState(false);

  function copyCode() {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const pct = coupon.maxUses ? Math.round((coupon.usedCount / coupon.maxUses) * 100) : null;

  return (
    <Card className="relative overflow-hidden group hover:border-primary/30 transition-all">
      <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-primary to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="p-2 bg-primary/10 rounded-lg shrink-0">
              <Tag className="size-4 text-primary" />
            </div>
            <div className="min-w-0">
              <button
                onClick={copyCode}
                className="font-mono font-bold text-base tracking-widest hover:text-primary transition-colors flex items-center gap-2"
                title="Click to copy"
              >
                {coupon.code}
                {copied ? <CheckCircle2 className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100" />}
              </button>
              <p className="text-xs text-muted-foreground mt-0.5">
                {coupon.type === "PERCENTAGE" ? `${coupon.value}% off` : `₹${coupon.value} off`}
                {coupon.minOrderValue ? ` • Min ₹${coupon.minOrderValue}` : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {statusBadge(coupon)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {/* Usage bar */}
        {coupon.maxUses ? (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Usage</span>
              <span>{coupon.usedCount} / {coupon.maxUses}</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${pct! >= 90 ? "bg-rose-500" : pct! >= 60 ? "bg-amber-500" : "bg-emerald-500"}`}
                style={{ width: `${Math.min(pct!, 100)}%` }}
              />
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            Used <span className="font-semibold text-foreground">{coupon.usedCount}</span> times · No limit
          </p>
        )}

        {coupon.expiresAt && (
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="size-3" />
            Expires {new Date(coupon.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
          </p>
        )}

        <div className="flex gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => onToggle(coupon.id, !coupon.isActive)}
          >
            {coupon.isActive ? "Disable" : "Enable"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
            onClick={() => onDelete(coupon.id)}
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CouponsPage() {
  const { activeStore } = useAuth();
  const storeId = activeStore?.id;

  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!storeId) return;
    setLoading(true);
    authFetch(`/coupons?storeId=${storeId}`)
      .then((data) => setCoupons(Array.isArray(data) ? data : data.coupons || []))
      .catch(() => toast.error("Failed to load coupons"))
      .finally(() => setLoading(false));
  }, [storeId]);

  function handleCreated(c: Coupon) {
    setCoupons((prev) => [c, ...prev]);
  }

  async function handleDelete(id: string) {
    try {
      await authFetch(`/coupons/${id}`, { method: "DELETE" });
      setCoupons((prev) => prev.filter((c) => c.id !== id));
      toast.success("Coupon deleted");
    } catch {
      toast.error("Failed to delete coupon");
    }
  }

  async function handleToggle(id: string, active: boolean) {
    try {
      const updated = await authFetch(`/coupons/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isActive: active }),
      });
      setCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, isActive: updated.isActive } : c)));
      toast.success(active ? "Coupon enabled" : "Coupon disabled");
    } catch {
      toast.error("Failed to update coupon");
    }
  }

  const filtered = coupons.filter((c) =>
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = coupons.filter((c) => c.isActive).length;
  const totalUses = coupons.reduce((s, c) => s + c.usedCount, 0);

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Coupons & Discounts</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Create and manage discount codes for your storefront.
          </p>
        </div>
        {storeId && <CreateCouponDialog storeId={storeId} onCreated={handleCreated} />}
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Coupons", value: coupons.length, icon: <Tag className="size-4" />, color: "text-primary" },
          { label: "Active", value: activeCount, icon: <CheckCircle2 className="size-4" />, color: "text-emerald-500" },
          { label: "Inactive", value: coupons.length - activeCount, icon: <XCircle className="size-4" />, color: "text-rose-500" },
          { label: "Total Uses", value: totalUses, icon: <Percent className="size-4" />, color: "text-amber-500" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-4 flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-muted ${s.color}`}>{s.icon}</div>
            <div>
              <p className="text-xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search coupon code…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex flex-1 items-center justify-center py-24">
          <Loader2 className="animate-spin size-8 text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed py-24 text-center">
          <div className="p-4 rounded-full bg-primary/10">
            <Tag className="size-8 text-primary" />
          </div>
          <div>
            <p className="font-semibold">No coupons yet</p>
            <p className="text-sm text-muted-foreground mt-1">Create your first coupon to offer discounts to your customers.</p>
          </div>
          {storeId && <CreateCouponDialog storeId={storeId} onCreated={handleCreated} />}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((c) => (
            <CouponCard key={c.id} coupon={c} onDelete={handleDelete} onToggle={handleToggle} />
          ))}
        </div>
      )}
    </div>
  );
}
