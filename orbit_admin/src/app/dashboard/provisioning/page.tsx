"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  createMerchant,
  getCategoryConfigs,
  getMerchantCredentials,
  getPendingMerchants,
  type MerchantCredential,
  type Store,
  type AdminUser,
} from "@/lib/admin-api";
import {
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
  ExternalLink,
  Plus,
  Key,
  Store as StoreIcon,
  Users,
  CreditCard,
} from "lucide-react";

const CATEGORIES = [
  { value: "clothing", label: "Fashion / Clothing" },
  { value: "electronics", label: "Electronics" },
  { value: "toys", label: "Toy Store" },
  { value: "footwear", label: "Footwear" },
  { value: "jewellery", label: "Jewellery" },
  { value: "food", label: "Food & Beverage" },
  { value: "perfume", label: "Perfume & Fragrance" },
  { value: "cosmetics", label: "Cosmetics & Beauty" },
];

const THEMES = [
  // Fashion
  {
    value: "fashion_main",
    label: "Fashion Store - Classic",
    category: "clothing",
  },
  {
    value: "fashion_alt",
    label: "Fashion Store - Modern",
    category: "clothing",
  },

  // Electronics
  {
    value: "electronics_main",
    label: "Electronics Store - Modern Tech",
    category: "electronics",
  },
  {
    value: "electronics_theme2",
    label: "Electronics Store - Pro",
    category: "electronics",
  },

  // Toys
  { value: "toys_main", label: "Toy Store - Main", category: "toys" },
  { value: "toys_alt1", label: "Toy Store - Fun", category: "toys" },
  { value: "toys_alt2", label: "Toy Store - Premium", category: "toys" },

  // Footwear
  {
    value: "footwear_main",
    label: "Footwear Style - Sport",
    category: "footwear",
  },

  // Jewellery
  {
    value: "jewellery_main",
    label: "Jewellery Store - Luxury",
    category: "jewellery",
  },
  {
    value: "jewellery_alt1",
    label: "Jewellery Store - Variant 1",
    category: "jewellery",
  },
  {
    value: "jewellery_alt2",
    label: "Jewellery Store - Variant 2",
    category: "jewellery",
  },
  {
    value: "jewellery_alt3",
    label: "Jewellery Store - Variant 3",
    category: "jewellery",
  },

  // Food
  { value: "food_main", label: "Gourmet Bites - Main", category: "food" },
  { value: "food_theme2", label: "Gourmet Bites - Theme 2", category: "food" },
  { value: "food_theme3", label: "Gourmet Bites - Theme 3", category: "food" },

  // Perfume
  {
    value: "perfume_main",
    label: "Fragrance Elite - Classic",
    category: "perfume",
  },
  {
    value: "perfume_theme2",
    label: "Fragrance Elite - Elegant",
    category: "perfume",
  },
  {
    value: "perfume_theme3",
    label: "Fragrance Elite - Luxury",
    category: "perfume",
  },

  // Cosmetics
  {
    value: "beauty_main",
    label: "Beauty Glow - Upfront",
    category: "cosmetics",
  },
];

export default function ProvisioningPage() {
  const [activeTab, setActiveTab] = useState("create");
  const [credentials, setCredentials] = useState<MerchantCredential[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {},
  );
  const [copiedField, setCopiedField] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [createdMerchant, setCreatedMerchant] = useState<any>(null);
  const [pendingMerchants, setPendingMerchants] = useState<any[]>([]);
  const [selectedPendingId, setSelectedPendingId] = useState<string>("");
  const [categoryConfigs, setCategoryConfigs] = useState<Record<string, any>>(
    {},
  );
  const [categoryConfigText, setCategoryConfigText] = useState<string>("");
  const [categoryConfigError, setCategoryConfigError] = useState<string>("");

  // Form state
  const [formData, setFormData] = useState({
    merchantName: "",
    email: "",
    password: "",
    category: "",
    theme: "",
    subdomain: "",
    customDomain: "",
  });

  const [filteredThemes, setFilteredThemes] = useState(THEMES);

  useEffect(() => {
    if (formData.category) {
      setFilteredThemes(THEMES.filter((t) => t.category === formData.category));
      // Reset theme if it doesn't match the new category
      if (
        formData.theme &&
        !THEMES.find(
          (t) => t.value === formData.theme && t.category === formData.category,
        )
      ) {
        setFormData((prev) => ({ ...prev, theme: "" }));
      }
    } else {
      setFilteredThemes(THEMES);
    }
  }, [formData.category, formData.theme]);

  useEffect(() => {
    loadPendingMerchants();
    loadCredentials(); // Load initially for the count cards
    loadCategoryConfigs();
  }, []);

  useEffect(() => {
    if (activeTab === "credentials") {
      loadCredentials();
    }
    loadPendingMerchants();
  }, [activeTab]);

  useEffect(() => {
    if (!formData.category) {
      setCategoryConfigText("");
      setCategoryConfigError("");
      return;
    }
    const config = categoryConfigs[formData.category];
    if (config) {
      setCategoryConfigText(JSON.stringify(config, null, 2));
      setCategoryConfigError("");
    }
  }, [formData.category, categoryConfigs]);

  const loadPendingMerchants = async () => {
    try {
      const data = await getPendingMerchants();
      if (data.success) {
        setPendingMerchants(data.merchants);
      }
    } catch (err) {
      console.error("Failed to load pending merchants", err);
    }
  };

  const loadCredentials = async () => {
    try {
      setLoading(true);
      const data = await getMerchantCredentials();
      setCredentials(data.credentials);
    } catch (err: any) {
      setError(err.message || "Failed to load credentials");
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryConfigs = async () => {
    try {
      const data = await getCategoryConfigs();
      if (data.success) {
        const mapped: Record<string, any> = {};
        data.configs.forEach((config: any) => {
          if (config.category && typeof config.category === "string") {
            mapped[config.category] = config;
          }
        });
        setCategoryConfigs(mapped);
      }
    } catch (err) {
      console.error("Failed to load category configs", err);
    }
  };

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, password }));
  };

  const generateSubdomain = () => {
    const name = formData.merchantName.toLowerCase().replace(/[^a-z0-9]/g, "");
    const random = Math.floor(Math.random() * 1000);
    setFormData((prev) => ({ ...prev, subdomain: `${name}${random}` }));
  };

  const handleSelectPending = (id: string) => {
    setSelectedPendingId(id);
    if (id === "manual") {
      setFormData({
        merchantName: "",
        email: "",
        password: "",
        category: "",
        theme: "",
        subdomain: "",
        customDomain: "",
      });
      setCategoryConfigText("");
      setCategoryConfigError("");
      setCategoryConfigText("");
      setCategoryConfigError("");
      return;
    }

    const merchant = pendingMerchants.find((m) => m.id === id);
    if (merchant) {
      const cleanSubdomain = merchant.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
      const random = Math.floor(Math.random() * 1000);

      setFormData((prev) => ({
        ...prev,
        merchantName: merchant.name,
        email: merchant.user?.email || "",
        subdomain: `${cleanSubdomain}${random}`,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      let parsedConfig: Record<string, unknown> | undefined;
      if (categoryConfigText.trim()) {
        try {
          parsedConfig = JSON.parse(categoryConfigText);
          setCategoryConfigError("");
        } catch (parseError) {
          setCategoryConfigError("Category config must be valid JSON.");
          setLoading(false);
          return;
        }
      }

      const result = await createMerchant({
        ...formData,
        categoryConfig: parsedConfig,
      });
      setCreatedMerchant(result.merchant);
      setShowSuccessDialog(true);

      // Reset form
      setFormData({
        merchantName: "",
        email: "",
        password: "",
        category: "",
        theme: "",
        subdomain: "",
        customDomain: "",
      });

      // Reload credentials and pending to update counts
      loadCredentials();
      loadPendingMerchants();
    } catch (err: any) {
      setError(err.message || "Failed to create merchant");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  return (
    <SidebarProvider suppressHydrationWarning>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col" suppressHydrationWarning>
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="p-6 space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Merchant Provisioning</h1>
                <p className="text-muted-foreground mt-2">
                  Create new merchants and manage their credentials
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-100">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <CardDescription className="text-xs font-medium text-blue-600">
                        Total Provisioned
                      </CardDescription>
                      <StoreIcon className="w-4 h-4 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold">
                      {credentials.length}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-100">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <CardDescription className="text-xs font-medium text-amber-600">
                        Pending Onboarding
                      </CardDescription>
                      <Users className="w-4 h-4 text-amber-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold">
                      {pendingMerchants.length}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger
                    value="create"
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Create Merchant
                  </TabsTrigger>
                  <TabsTrigger
                    value="credentials"
                    className="flex items-center gap-2"
                  >
                    <Key className="w-4 h-4" />
                    View Credentials
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="create" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create New Merchant</CardTitle>
                      <CardDescription>
                        Set up a new merchant with Orbit-360 dashboard and
                        storefront
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                          <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        )}

                        <div className="bg-muted/50 p-4 rounded-lg border border-dashed border-muted-foreground/20 mb-6">
                          <Label
                            htmlFor="pendingSelector"
                            className="mb-2 block"
                          >
                            Quick Select: Onboard Registered Merchant
                          </Label>
                          <Select
                            value={selectedPendingId}
                            onValueChange={handleSelectPending}
                          >
                            <SelectTrigger id="pendingSelector">
                              <SelectValue placeholder="Select a pending merchant to onboard" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="manual">
                                -- Manual Entry (Fresh Merchant) --
                              </SelectItem>
                              {pendingMerchants.map((m) => (
                                <SelectItem key={m.id} value={m.id}>
                                  {m.name} ({m.user?.email})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground mt-2">
                            Selecting an existing merchant will pre-fill their
                            name and email address.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Row 1: Merchant Name & Email */}
                          <div className="space-y-2">
                            <Label htmlFor="merchantName">
                              Merchant Name *
                            </Label>
                            <Input
                              id="merchantName"
                              value={formData.merchantName}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  merchantName: e.target.value,
                                }))
                              }
                              placeholder="e.g., Fashion Store"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }))
                              }
                              placeholder="merchant@example.com"
                              required
                            />
                          </div>

                          {/* Row 2: Category & Theme */}
                          <div className="space-y-2">
                            <Label htmlFor="category">Store Category *</Label>
                            <Select
                              value={formData.category}
                              onValueChange={(value) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  category: value,
                                }))
                              }
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {CATEGORIES.map((cat) => (
                                  <SelectItem key={cat.value} value={cat.value}>
                                    {cat.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="theme">Website Theme *</Label>
                            <Select
                              value={formData.theme}
                              onValueChange={(value) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  theme: value,
                                }))
                              }
                              required
                              disabled={!formData.category}
                            >
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={
                                    formData.category
                                      ? "Select theme"
                                      : "Select category first"
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {filteredThemes.map((theme) => (
                                  <SelectItem
                                    key={theme.value}
                                    value={theme.value}
                                  >
                                    {theme.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="categoryConfig">
                              Category Config (JSON)
                            </Label>
                            <textarea
                              id="categoryConfig"
                              value={categoryConfigText}
                              onChange={(e) =>
                                setCategoryConfigText(e.target.value)
                              }
                              placeholder="Category config JSON"
                              className="w-full min-h-[180px] rounded-md border bg-background px-3 py-2 text-sm font-mono"
                              disabled={!formData.category}
                            />
                            {categoryConfigError ? (
                              <p className="text-sm text-red-500">
                                {categoryConfigError}
                              </p>
                            ) : (
                              <p className="text-xs text-muted-foreground">
                                Default config loads when category is selected.
                                Edit to customize filters, variants, and
                                attributes.
                              </p>
                            )}
                          </div>

                          {/* Row 3: Password & Subdomain */}
                          <div className="space-y-2">
                            <Label htmlFor="password">Login Password *</Label>
                            <div className="flex gap-2">
                              <Input
                                id="password"
                                type="text"
                                value={formData.password}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    password: e.target.value,
                                  }))
                                }
                                placeholder="Minimum 6 characters"
                                required
                                minLength={6}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={generatePassword}
                              >
                                Generate
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="subdomain">Store Subdomain *</Label>
                            <div className="flex gap-2">
                              <Input
                                id="subdomain"
                                value={formData.subdomain}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    subdomain: e.target.value
                                      .toLowerCase()
                                      .replace(/[^a-z0-9-]/g, ""),
                                  }))
                                }
                                placeholder="mystore"
                                required
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={generateSubdomain}
                                disabled={!formData.merchantName}
                              >
                                Generate
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Public URL: {formData.subdomain || "subdomain"}
                              .orbit360.com
                            </p>
                          </div>

                          {/* Row 4: Custom Domain */}
                          <div className="space-y-2">
                            <Label htmlFor="customDomain">
                              Custom Domain (Optional)
                            </Label>
                            <Input
                              id="customDomain"
                              value={formData.customDomain}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  customDomain: e.target.value,
                                }))
                              }
                              placeholder="www.example.com"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setFormData({
                                merchantName: "",
                                email: "",
                                password: "",
                                category: "",
                                theme: "",
                                subdomain: "",
                                customDomain: "",
                              });
                              setCategoryConfigText("");
                              setCategoryConfigError("");
                            }}
                          >
                            Reset
                          </Button>
                          <Button type="submit" disabled={loading}>
                            {loading ? "Creating..." : "Create Merchant"}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="credentials" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Merchant Credentials</CardTitle>
                      <CardDescription>
                        View and manage all merchant login credentials
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {loading && (
                        <p className="text-center py-8">
                          Loading credentials...
                        </p>
                      )}

                      {!loading && credentials.length === 0 && (
                        <p className="text-center py-8 text-muted-foreground">
                          No merchants created yet
                        </p>
                      )}

                      {!loading && credentials.length > 0 && (
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-12">#</TableHead>
                                <TableHead>Merchant ID</TableHead>
                                <TableHead>Merchant</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Password</TableHead>
                                <TableHead>Store</TableHead>
                                <TableHead>Theme</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Links</TableHead>
                                <TableHead>Created</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {credentials.map((cred, index) => (
                                <TableRow key={cred.id}>
                                  <TableCell className="text-muted-foreground font-mono">
                                    {(index + 1).toString().padStart(2, "0")}
                                  </TableCell>
                                  <TableCell className="text-[10px] font-mono whitespace-nowrap overflow-hidden text-ellipsis max-w-[100px]">
                                    {cred.id}
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {cred.merchantName}
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm">
                                        {cred.email}
                                      </span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          copyToClipboard(
                                            cred.email,
                                            `email-${cred.id}`,
                                          )
                                        }
                                      >
                                        {copiedField === `email-${cred.id}` ? (
                                          <CheckCircle className="w-4 h-4 text-green-500" />
                                        ) : (
                                          <Copy className="w-4 h-4" />
                                        )}
                                      </Button>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <code className="text-sm">
                                        {showPasswords[cred.id]
                                          ? cred.password
                                          : "••••••••"}
                                      </code>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          togglePasswordVisibility(cred.id)
                                        }
                                      >
                                        {showPasswords[cred.id] ? (
                                          <EyeOff className="w-4 h-4" />
                                        ) : (
                                          <Eye className="w-4 h-4" />
                                        )}
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          copyToClipboard(
                                            cred.password,
                                            `password-${cred.id}`,
                                          )
                                        }
                                      >
                                        {copiedField ===
                                        `password-${cred.id}` ? (
                                          <CheckCircle className="w-4 h-4 text-green-500" />
                                        ) : (
                                          <Copy className="w-4 h-4" />
                                        )}
                                      </Button>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div>
                                      <div className="font-medium text-sm">
                                        {cred.storeName}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        {cred.subdomain}
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant="outline">
                                      {cred.theme}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      variant={
                                        cred.isActive ? "default" : "secondary"
                                      }
                                    >
                                      {cred.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex gap-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          window.open(
                                            cred.dashboardUrl,
                                            "_blank",
                                          )
                                        }
                                      >
                                        <StoreIcon className="w-4 h-4 mr-1" />
                                        Dashboard
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          window.open(
                                            cred.upfrontTemplateUrl ||
                                              cred.storefrontUrl,
                                            "_blank",
                                          )
                                        }
                                      >
                                        <ExternalLink className="w-4 h-4 mr-1" />
                                        Category Template
                                      </Button>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-sm text-muted-foreground">
                                    {new Date(
                                      cred.createdAt,
                                    ).toLocaleDateString()}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Success Dialog */}
              <Dialog
                open={showSuccessDialog}
                onOpenChange={setShowSuccessDialog}
              >
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      Merchant Created Successfully!
                    </DialogTitle>
                    <DialogDescription>
                      The merchant account has been provisioned with Orbit-360
                      dashboard and storefront.
                    </DialogDescription>
                  </DialogHeader>

                  {createdMerchant && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                        <div>
                          <Label className="text-xs text-muted-foreground">
                            Merchant Name
                          </Label>
                          <p className="font-medium">{createdMerchant.name}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">
                            Email
                          </Label>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">
                              {createdMerchant.email}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                copyToClipboard(
                                  createdMerchant.email,
                                  "dialog-email",
                                )
                              }
                            >
                              {copiedField === "dialog-email" ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">
                            Password
                          </Label>
                          <div className="flex items-center gap-2">
                            <code className="font-medium">
                              {createdMerchant.password}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                copyToClipboard(
                                  createdMerchant.password,
                                  "dialog-password",
                                )
                              }
                            >
                              {copiedField === "dialog-password" ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">
                            Subdomain
                          </Label>
                          <p className="font-medium">
                            {createdMerchant.subdomain}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Dashboard URL</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            value={createdMerchant.dashboardUrl}
                            readOnly
                          />
                          <Button
                            variant="outline"
                            onClick={() =>
                              window.open(
                                createdMerchant.dashboardUrl,
                                "_blank",
                              )
                            }
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Storefront URL</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            value={createdMerchant.storefrontUrl}
                            readOnly
                          />
                          <Button
                            variant="outline"
                            onClick={() =>
                              window.open(
                                createdMerchant.storefrontUrl,
                                "_blank",
                              )
                            }
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Category Template Preview</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            value={createdMerchant.upfrontTemplateUrl}
                            readOnly
                          />
                          <Button
                            variant="outline"
                            onClick={() =>
                              window.open(
                                createdMerchant.upfrontTemplateUrl,
                                "_blank",
                              )
                            }
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Preview the template design for{" "}
                          {createdMerchant.category} category
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Category Template Preview</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            value={createdMerchant.upfrontTemplateUrl}
                            readOnly
                          />
                          <Button
                            variant="outline"
                            onClick={() =>
                              window.open(
                                createdMerchant.upfrontTemplateUrl,
                                "_blank",
                              )
                            }
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Preview the template design for{" "}
                          {createdMerchant.category} category
                        </p>
                      </div>

                      <Alert>
                        <AlertDescription>
                          The merchant can now log in to Orbit-360 using the
                          email and password above. The credentials are also
                          saved in the "View Credentials" tab.
                        </AlertDescription>
                      </Alert>

                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setActiveTab("credentials")}
                        >
                          View All Credentials
                        </Button>
                        <Button onClick={() => setShowSuccessDialog(false)}>
                          Done
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
