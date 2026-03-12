"use client";

import React from "react";
import { 
  IconCreditCard, 
  IconCheck,
  IconExternalLink,
  IconPlus,
  IconLoader,
  IconBrandFacebook,
  IconSpeakerphone,
  IconVideo,
  IconBrandInstagram,
  IconBrandYoutube,
  IconStar,
  IconSparkles,
  IconUsers,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PaymentConfigModal } from "@/components/payment-config-modal";
import { useAuth } from "@/contexts/AuthContext";
import { getStoreSettings, getMetaStatus } from "@/lib/api";
import { toast } from "sonner";

const INTEGRATIONS = [
  {
    category: "Payment Gateways",
    icon: <IconCreditCard className="size-5 text-blue-500" />,
    apps: [
      { id: "payu", name: "PayU", description: "Connect your PayU account to accept payments in India.", logo: "💳", color: "bg-blue-500/10 text-blue-500" },
      { id: "cashfree", name: "Cashfree", description: "Connect your Cashfree account for fast and secure payments.", logo: "💰", color: "bg-green-500/10 text-green-500" },
      { id: "razorpay", name: "Razorpay", description: "Connect your Razorpay account for seamless Indian payments.", logo: "⚡", color: "bg-purple-500/10 text-purple-500" },
      { id: "phonepe", name: "PhonePe", description: "Connect your PhonePe account for UPI-based payments.", logo: "📱", color: "bg-orange-500/10 text-orange-500" }
    ]
  },
  {
    category: "Marketing & Advertising",
    icon: <IconSpeakerphone className="size-5 text-indigo-500" />,
    apps: [
      { id: "meta-ads", name: "Meta Ads Manager", description: "Sync your product catalog and run dynamic Facebook & Instagram ads.", logo: <IconBrandFacebook className="size-6" />, color: "bg-blue-600/10 text-blue-600" }
    ]
  }
];

const CREATORS = [
  {
    id: 1,
    name: "Priya Sharma",
    handle: "@priyacreates",
    avatar: "👩",
    category: "Fashion & Lifestyle",
    platform: "instagram",
    followers: "128K",
    rating: 4.9,
    reviews: 42,
    priceRange: "₹5,000 – ₹15,000",
    tags: ["Reels", "Photoshoots", "Stories"],
    gradient: "from-pink-500/10 to-rose-500/5",
    border: "border-pink-200 dark:border-pink-900",
  },
  {
    id: 2,
    name: "Arjun Mehta",
    handle: "@arjunmakes",
    avatar: "👨",
    category: "Tech & Gadgets",
    platform: "youtube",
    followers: "320K",
    rating: 4.7,
    reviews: 88,
    priceRange: "₹12,000 – ₹40,000",
    tags: ["Unboxing", "Reviews", "Shorts"],
    gradient: "from-red-500/10 to-orange-500/5",
    border: "border-red-200 dark:border-red-900",
  },
  {
    id: 3,
    name: "Sneha Rao",
    handle: "@snehacooks",
    avatar: "🧑",
    category: "Food & Beverage",
    platform: "instagram",
    followers: "72K",
    rating: 4.8,
    reviews: 31,
    priceRange: "₹3,500 – ₹10,000",
    tags: ["Recipe Videos", "Reels", "Hauls"],
    gradient: "from-amber-500/10 to-yellow-500/5",
    border: "border-amber-200 dark:border-amber-900",
  },
  {
    id: 4,
    name: "Rohit Verma",
    handle: "@rofit_",
    avatar: "🧔",
    category: "Fitness & Wellness",
    platform: "youtube",
    followers: "215K",
    rating: 4.6,
    reviews: 67,
    priceRange: "₹8,000 – ₹25,000",
    tags: ["Workouts", "Reviews", "Vlogs"],
    gradient: "from-emerald-500/10 to-green-500/5",
    border: "border-emerald-200 dark:border-emerald-900",
  },
];

const PlatformIcon = ({ platform }: { platform: string }) => {
  if (platform === "youtube") return <IconBrandYoutube className="size-3.5 text-red-500" />;
  return <IconBrandInstagram className="size-3.5 text-pink-500" />;
};

export default function IntegrationsPage() {
  const { user } = useAuth();
  const [paymentModalOpen, setPaymentModalOpen] = React.useState(false);
  const [selectedGateway, setSelectedGateway] = React.useState<{id: string, name: string, logo: string} | null>(null);
  const [configuredGateways, setConfiguredGateways] = React.useState<Record<string, boolean>>({});
  const [loading, setLoading] = React.useState(true);
  const [hireForm, setHireForm] = React.useState<{ open: boolean; creator: (typeof CREATORS)[0] | null }>({ open: false, creator: null });
  const [formData, setFormData] = React.useState({ name: "", phone: "", brief: "" });
  const [submitting, setSubmitting] = React.useState(false);

  const fetchStatuses = async () => {
    if (!user?.stores?.[0]?.id) { setLoading(false); return; }
    try {
      const [res, metaRes] = await Promise.allSettled([getStoreSettings(user.stores[0].id), getMetaStatus()]);
      const statusMap: Record<string, boolean> = {};
      if (res.status === 'fulfilled') {
        const settings = res.value?.data?.paymentMethods || res.value?.paymentMethods || {};
        Object.keys(settings).forEach(key => { statusMap[key] = settings[key]?.enabled === true; });
      }
      if (metaRes.status === 'fulfilled') { statusMap['meta-ads'] = metaRes.value?.connected === true; }
      setConfiguredGateways(statusMap);
    } catch (err: any) {
      console.error("Failed to fetch integration statuses:", err);
      if (err.message === "Unauthorized") toast.error("Your session has expired. Please login again.");
    } finally { setLoading(false); }
  };

  React.useEffect(() => { fetchStatuses(); }, [user]);

  const handleConnect = (app: any) => {
    if (["payu", "cashfree", "razorpay", "phonepe"].includes(app.id)) {
      setSelectedGateway({ id: app.id, name: app.name, logo: app.logo });
      setPaymentModalOpen(true);
    } else if (app.id === "meta-ads") {
      const token = localStorage.getItem('auth_token');
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      window.open(`${API_URL}/auth/meta/login?token=${encodeURIComponent(token || "")}`, '_blank');
    } else {
      toast.info(`Integration with ${app.name} is coming soon!`);
    }
  };

  const handleHireSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success(`Request sent to ${hireForm.creator?.name}! We'll connect you within 24 hours.`);
    setHireForm({ open: false, creator: null });
    setFormData({ name: "", phone: "", brief: "" });
    setSubmitting(false);
  };

  const isConnected = (appId: string) => configuredGateways[appId] || false;

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center p-20">
        <IconLoader className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-10 p-6 lg:p-10 max-w-7xl mx-auto w-full">
      {selectedGateway && (
        <PaymentConfigModal
          open={paymentModalOpen}
          onOpenChange={setPaymentModalOpen}
          gateway={selectedGateway}
          onSuccess={fetchStatuses}
        />
      )}

      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground">Connect Orbit with your favorite tools to automate your business.</p>
      </div>

      {INTEGRATIONS.map((section) => (
        <div key={section.category} className="space-y-4">
          <div className="flex items-center gap-2 font-semibold text-lg border-b pb-2">
            {section.icon}
            {section.category}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.apps.map((app) => (
              <Card key={app.id} className="relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className={`size-12 rounded-xl flex items-center justify-center text-2xl ${app.color}`}>
                    {app.logo}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{app.name}</CardTitle>
                    <Badge variant={isConnected(app.id) ? "default" : "secondary"} className="mt-1">
                      {isConnected(app.id) && <IconCheck className="size-3 mr-1" />}
                      {isConnected(app.id) ? "Connected" : "Setup Required"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed min-h-[40px]">{app.description}</CardDescription>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant={isConnected(app.id) ? "outline" : "default"} className="w-full group" onClick={() => handleConnect(app)}>
                    {isConnected(app.id) ? "Manage" : "Connect"}
                    <IconPlus className="size-4 ml-2 group-hover:rotate-90 transition-transform" />
                  </Button>
                </CardFooter>
                {isConnected(app.id) && (
                  <div className="absolute top-0 right-0 p-2">
                    <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* ── Hire a Creator ─────────────────────────────────────────────── */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 font-semibold text-lg border-b pb-2">
          <IconVideo className="size-5 text-violet-500" />
          Hire a Creator
        </div>

        {/* Hero banner */}
        <div className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 text-white shadow-lg">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-xl">
              <IconSparkles className="size-5" />
              Orbit Creator Network
            </div>
            <p className="text-violet-100 text-sm max-w-lg leading-relaxed">
              Find verified creators, influencers, and UGC specialists to promote your products. From Instagram reels to YouTube reviews — handpicked for your niche.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            {[["500+", "Creators"], ["50+", "Niches"], ["48hr", "Delivery"]].map(([val, label]) => (
              <React.Fragment key={label}>
                <div className="text-center">
                  <div className="text-2xl font-black">{val}</div>
                  <div className="text-[11px] text-violet-200 uppercase tracking-wider">{label}</div>
                </div>
                {label !== "Delivery" && <div className="w-px h-10 bg-white/20" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Creator Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CREATORS.map((creator) => (
            <Card key={creator.id} className={`relative overflow-hidden hover:shadow-md transition-all duration-300 bg-gradient-to-br ${creator.gradient} ${creator.border}`}>
              <CardContent className="p-5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-full bg-background border-2 border-border flex items-center justify-center text-2xl shadow-sm">
                    {creator.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-sm leading-tight">{creator.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <PlatformIcon platform={creator.platform} />
                      {creator.handle}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 font-semibold">
                    <IconUsers className="size-3 text-muted-foreground" />
                    {creator.followers}
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-amber-500">
                    <IconStar className="size-3 fill-amber-400 stroke-amber-400" />
                    {creator.rating}
                    <span className="text-muted-foreground font-normal">({creator.reviews})</span>
                  </div>
                </div>

                <Badge variant="secondary" className="text-[10px] font-medium w-fit">{creator.category}</Badge>

                <div className="flex flex-wrap gap-1">
                  {creator.tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 bg-background/70 rounded-full border text-muted-foreground">{t}</span>
                  ))}
                </div>

                <div className="border-t pt-3 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Starting at</div>
                    <div className="text-sm font-bold leading-tight">{creator.priceRange}</div>
                  </div>
                  <Button
                    size="sm"
                    className="shrink-0 bg-violet-600 hover:bg-violet-700 text-white"
                    onClick={() => setHireForm({ open: true, creator })}
                  >
                    Hire
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Inline request form */}
        {hireForm.open && hireForm.creator && (
          <Card className="border-violet-300 dark:border-violet-800 bg-violet-50/40 dark:bg-violet-950/20 shadow-sm">
            <CardHeader className="pb-2 flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <IconSparkles className="size-4 text-violet-500" />
                  Collaborate with {hireForm.creator.name}
                </CardTitle>
                <CardDescription>We'll connect you within 24 hours after receiving your brief.</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setHireForm({ open: false, creator: null })} className="text-muted-foreground">✕</Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleHireSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="hire-name">Your Name / Brand</Label>
                  <Input id="hire-name" placeholder="e.g. Piyush – My Store" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="hire-phone">Phone / WhatsApp</Label>
                  <Input id="hire-phone" placeholder="+91 98765 43210" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="hire-brief">Campaign Brief</Label>
                  <Textarea id="hire-brief" placeholder="Describe your product and what you need..." value={formData.brief} onChange={e => setFormData(p => ({ ...p, brief: e.target.value }))} className="resize-none" rows={2} required />
                </div>
                <div className="md:col-span-3 flex justify-end">
                  <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white" disabled={submitting}>
                    {submitting ? <IconLoader className="size-4 animate-spin mr-2" /> : <IconSparkles className="size-4 mr-2" />}
                    {submitting ? "Sending..." : "Send Request"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <p className="text-xs text-muted-foreground text-center">
          Creator rates are indicative. Final pricing is agreed between you and the creator. Orbit facilitates the connection.
        </p>
      </div>
      {/* ── /Hire a Creator ─────────────────────────────────────────────── */}

      <Card className="bg-primary/5 border-dashed border-primary/20">
        <CardContent className="flex flex-col items-center justify-center py-10 text-center gap-4">
          <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <IconExternalLink className="size-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-xl">Request an Integration</h3>
            <p className="text-muted-foreground max-w-md">
              Don't see the tool you use? Let us know and we'll work on adding it to Orbit.
            </p>
          </div>
          <Button variant="secondary">Contact Support</Button>
        </CardContent>
      </Card>
    </div>
  );
}
