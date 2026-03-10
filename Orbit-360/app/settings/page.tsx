"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  getStoreSettings, 
  updateStoreSettings
} from "@/lib/api";
import { toast } from "sonner";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Loader2, 
  Store,
  Save,
  Building2,
  Mail,
  Phone,
  Tag,
  Settings
} from "lucide-react";

export default function SettingsPage() {
  const { activeStore, setActiveStore } = useAuth();
  const storeId = activeStore?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    industry: "",
    description: ""
  });

  useEffect(() => {
    async function init() {
      if (!storeId) return;
      try {
        setLoading(true);
        const storeData = await getStoreSettings(storeId);

        if (storeData) {
          setForm({
            name: storeData.name || "",
            email: storeData.email || storeData.contactEmail || "",
            phone: storeData.phone || storeData.contactPhone || "",
            category: storeData.category || "",
            industry: storeData.industry || storeData.category || "",
            description: storeData.description || ""
          });
        }
      } catch (err: any) {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [storeId]);

  const handleSave = async () => {
    if (!storeId) return;
    setSaving(true);
    try {
      await updateStoreSettings(storeId, form);
      toast.success("Store settings updated successfully");
      // Update global active store context
      if (setActiveStore) {
        setActiveStore({ ...activeStore, ...form });
      }
    } catch (err: any) {
      toast.error(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-12">
        <Loader2 className="animate-spin size-8 text-primary shadow-indigo-500/20" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-6 lg:p-10 max-w-4xl mx-auto w-full animate-in fade-in duration-500">
      {/* Header Area */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Store className="size-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Store Settings</h1>
        </div>
        <p className="text-muted-foreground ml-11">
          Manage your store's core identity, contact details, and business profile.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="border-primary/10 shadow-lg overflow-hidden transition-all hover:shadow-primary/5">
          <CardHeader className="bg-muted/30 pb-6 border-b">
            <div className="flex items-center gap-2">
              <Building2 className="size-5 text-primary" />
              <CardTitle>Business Profile</CardTitle>
            </div>
            <CardDescription>Public information that identifies your brand to Orbit 360 and customers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Identity Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold flex items-center gap-2">
                  Store Name
                </Label>
                <Input 
                  id="name" 
                  placeholder="Acme Corp"
                  className="focus-visible:ring-primary/30"
                  value={form.name} 
                  onChange={e => setForm(f => ({...f, name: e.target.value}))} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subdomain" className="text-sm font-semibold">Subdomain</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="subdomain" 
                    value={activeStore?.subdomain || ""} 
                    disabled 
                    className="bg-muted/50 font-mono text-xs cursor-not-allowed opacity-70" 
                  />
                  <span className="text-xs text-muted-foreground font-medium bg-muted px-2 py-1.5 rounded border border-border/50">.orbit360.shop</span>
                </div>
              </div>
            </div>

            <Separator className="bg-primary/5" />

            {/* Contact Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
                  <Mail className="size-3.5 text-muted-foreground" />
                  Contact Email
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="hello@store.com"
                  value={form.email} 
                  onChange={e => setForm(f => ({...f, email: e.target.value}))} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold flex items-center gap-2">
                  <Phone className="size-3.5 text-muted-foreground" />
                  Phone Number
                </Label>
                <Input 
                  id="phone" 
                  placeholder="+91 00000 00000"
                  value={form.phone} 
                  onChange={e => setForm(f => ({...f, phone: e.target.value}))} 
                />
              </div>
            </div>

            <Separator className="bg-primary/5" />

            {/* Classification Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-semibold flex items-center gap-2">
                  <Tag className="size-3.5 text-muted-foreground" />
                  Store Category
                </Label>
                <Input 
                  id="category" 
                  placeholder="Electronics, Fashion, etc."
                  value={form.category} 
                  onChange={e => setForm(f => ({...f, category: e.target.value}))} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-sm font-semibold">Industry</Label>
                <Input 
                  id="industry" 
                  placeholder="E-commerce Retail"
                  value={form.industry} 
                  onChange={e => setForm(f => ({...f, industry: e.target.value}))} 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold">Store Description</Label>
              <textarea 
                id="description" 
                rows={3}
                placeholder="Briefly describe your store..."
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50"
                value={form.description}
                onChange={e => setForm(f => ({...f, description: e.target.value}))}
              />
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 border-t py-4 items-center justify-between">
            <div className="flex items-center gap-2 px-2 py-1 bg-background rounded border text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              Store ID: {storeId || "N/A"}
            </div>
            <Button onClick={handleSave} disabled={saving} className="shadow-md shadow-primary/10 gap-2">
              {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              Save Settings
            </Button>
          </CardFooter>
        </Card>

        {/* Tip Card */}
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex gap-4 items-start">
          <div className="mt-1 p-2 bg-primary/10 rounded-lg">
             <Settings className="size-4 text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-semibold">Pro Tip</h4>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Verify your subdomain and contact email to ensure smooth delivery of order notifications. 
              Subdomains are locked after registration for security purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
