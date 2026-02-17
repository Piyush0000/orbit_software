"use client";

import { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface Theme {
  id: string;
  name: string;
  slug: string;
  description: string;
  thumbnail?: string;
  previewUrl?: string;
}

interface Plan {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  features: any;
  isPopular: boolean;
}

interface MerchantActivationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  storeId: string;
  storeName: string;
  onSuccess?: () => void;
}

export function MerchantActivationModal({
  open,
  onOpenChange,
  storeId,
  storeName,
  onSuccess,
}: MerchantActivationModalProps) {
  const [loading, setLoading] = useState(false);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const [formData, setFormData] = useState({
    themeId: "",
    planId: "",
    subdomain: "",
    customDomain: "",
    category: "",
    integrations: {
      meta: false,
      stripe: false,
      payu: false,
      cashfree: false,
      razorpay: false,
      phonepe: false,
      analytics: false,
    },
  });

  // Fetch themes and plans
  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open]);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const [themesRes, plansRes] = await Promise.all([
        fetch("/api/provisioning/themes?activeOnly=true"),
        fetch("/api/provisioning/plans?activeOnly=true"),
      ]);

      if (themesRes.ok && plansRes.ok) {
        const themesData = await themesRes.json();
        const plansData = await plansRes.json();
        setThemes(themesData.data || []);
        setPlans(plansData.data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load themes and plans");
    } finally {
      setLoadingData(false);
    }
  };

  const handleActivate = async () => {
    // Validation
    if (!formData.themeId) {
      toast.error("Please select a theme");
      return;
    }

    if (!formData.planId) {
      toast.error("Please select a plan");
      return;
    }

    if (!formData.subdomain && !formData.customDomain) {
      toast.error("Please provide either a subdomain or custom domain");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/provisioning/merchants/${storeId}/activate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          themeId: formData.themeId,
          planId: formData.planId,
          subdomain: formData.subdomain || undefined,
          domain: formData.customDomain || undefined,
          category: formData.category || undefined,
          integrations: formData.integrations,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Merchant activated successfully!", {
          description: "Provisioning is in progress. This may take up to 30 seconds.",
        });
        onOpenChange(false);
        if (onSuccess) onSuccess();
      } else {
        toast.error("Activation failed", {
          description: data.message || "Please try again",
        });
      }
    } catch (error) {
      console.error("Error activating merchant:", error);
      toast.error("Failed to activate merchant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Activate Merchant</DialogTitle>
          <DialogDescription>
            Configure and activate {storeName}. This will provision a dashboard, website, and
            workspace.
          </DialogDescription>
        </DialogHeader>

        {loadingData ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* Theme Selection */}
            <div className="space-y-2">
              <Label htmlFor="theme">Website Theme *</Label>
              <Select
                value={formData.themeId}
                onValueChange={(value) => setFormData({ ...formData, themeId: value })}
              >
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme.id} value={theme.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{theme.name}</span>
                        <span className="text-xs text-muted-foreground">{theme.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Plan Selection */}
            <div className="space-y-2">
              <Label htmlFor="plan">Subscription Plan *</Label>
              <Select
                value={formData.planId}
                onValueChange={(value) => setFormData({ ...formData, planId: value })}
              >
                <SelectTrigger id="plan">
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  {plans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col">
                          <span className="font-medium">{plan.name}</span>
                          <span className="text-xs text-muted-foreground">{plan.description}</span>
                        </div>
                        <span className="ml-4 font-semibold">${plan.price}/mo</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Domain Configuration */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subdomain">Subdomain</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="subdomain"
                    placeholder="my-store"
                    value={formData.subdomain}
                    onChange={(e) => setFormData({ ...formData, subdomain: e.target.value })}
                  />
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    .orbit360.shop
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customDomain">Custom Domain</Label>
                <Input
                  id="customDomain"
                  placeholder="mystore.com"
                  value={formData.customDomain}
                  onChange={(e) => setFormData({ ...formData, customDomain: e.target.value })}
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Business Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Fashion">Fashion & Apparel</SelectItem>
                  <SelectItem value="Home">Home & Garden</SelectItem>
                  <SelectItem value="Beauty">Beauty & Personal Care</SelectItem>
                  <SelectItem value="Sports">Sports & Outdoors</SelectItem>
                  <SelectItem value="Books">Books & Media</SelectItem>
                  <SelectItem value="Toys">Toys & Games</SelectItem>
                  <SelectItem value="Food">Food & Beverages</SelectItem>
                  <SelectItem value="Health">Health & Wellness</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Integrations */}
            <div className="space-y-3">
              <Label>Integrations</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="meta"
                    checked={formData.integrations.meta}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        integrations: { ...formData.integrations, meta: checked as boolean },
                      })
                    }
                  />
                  <label
                    htmlFor="meta"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Meta Ads
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="stripe"
                    checked={formData.integrations.stripe}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        integrations: { ...formData.integrations, stripe: checked as boolean },
                      })
                    }
                  />
                  <label
                    htmlFor="stripe"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Stripe Payments
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="payu"
                    checked={formData.integrations.payu}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        integrations: { ...formData.integrations, payu: checked as boolean },
                      })
                    }
                  />
                  <label
                    htmlFor="payu"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    PayU
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cashfree"
                    checked={formData.integrations.cashfree}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        integrations: { ...formData.integrations, cashfree: checked as boolean },
                      })
                    }
                  />
                  <label
                    htmlFor="cashfree"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Cashfree
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="razorpay"
                    checked={formData.integrations.razorpay}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        integrations: { ...formData.integrations, razorpay: checked as boolean },
                      })
                    }
                  />
                  <label
                    htmlFor="razorpay"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Razorpay
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="phonepe"
                    checked={formData.integrations.phonepe}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        integrations: { ...formData.integrations, phonepe: checked as boolean },
                      })
                    }
                  />
                  <label
                    htmlFor="phonepe"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    PhonePe
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="analytics"
                    checked={formData.integrations.analytics}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        integrations: { ...formData.integrations, analytics: checked as boolean },
                      })
                    }
                  />
                  <label
                    htmlFor="analytics"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Google Analytics
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleActivate} disabled={loading || loadingData}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Activate Merchant
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
