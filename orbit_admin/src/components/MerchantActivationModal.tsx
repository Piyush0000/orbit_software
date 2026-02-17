"use client"

import * as React from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Rocket, Loader2, CheckCircle2, Globe, Palette, CreditCard } from "lucide-react"
import { getThemes, getPlans, provisionBrand } from "@/lib/admin-api"

interface MerchantActivationModalProps {
    brandId: string
    brandName: string
    onSuccess?: () => void
}

export function MerchantActivationModal({ brandId, brandName, onSuccess }: MerchantActivationModalProps) {
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [provisioning, setProvisioning] = React.useState(false)
    const [step, setStep] = React.useState<"config" | "progress" | "success">("config")
    const [themes, setThemes] = React.useState<any[]>([])
    const [categories, setCategories] = React.useState<any[]>([])
    const [selectedCategory, setSelectedCategory] = React.useState<string>("")
    const [plans, setPlans] = React.useState<any[]>([])
    
    const [config, setConfig] = React.useState({
        themeId: "",
        planId: "",
        subdomain: brandName.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        category: "E-COMMERCE",
        domain: ""
    })

    const [progress, setProgress] = React.useState(0)
    const [statusText, setStatusText] = React.useState("Initializing...")

    React.useEffect(() => {
        if (open) {
            loadMetadata()
        }
    }, [open])

    async function loadMetadata() {
        setLoading(true)
        try {
            const [tRes, pRes] = await Promise.all([getThemes(), getPlans()])
            setThemes(tRes.themes)
            setPlans(pRes.plans)
            
            // Define categories locally for now
            const tempCategories = [
              { id: 'electronics', name: 'Electronics' },
              { id: 'fashion', name: 'Fashion' },
              { id: 'beauty', name: 'Beauty' },
              { id: 'food-beverage', name: 'Food & Beverage' },
              { id: 'home-garden', name: 'Home & Garden' },
              { id: 'others', name: 'Others' }
            ];
            setCategories(tempCategories);
            
            if (tRes.themes.length > 0) setConfig(prev => ({ ...prev, themeId: tRes.themes[0].id }))
            if (pRes.plans.length > 0) setConfig(prev => ({ ...prev, planId: pRes.plans[0].id }))
            
            // Set first category if available
            if (tempCategories.length > 0) setSelectedCategory(tempCategories[0].id)
        } catch (err) {
            console.error("Failed to load metadata", err)
        } finally {
            setLoading(false)
        }
    }

    async function handleActivate() {
        setProvisioning(true)
        setStep("progress")
        setProgress(10)
        setStatusText("Configuring store resources...")
        
        try {
            // Simulate progress for UI feel
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(interval)
                        return 90
                    }
                    return prev + 10
                })
            }, 1500)

            const result = await provisionBrand(brandId, config)
            
            clearInterval(interval)
            setProgress(100)
            setStatusText("Ready to go live!")
            setStep("success")
            
            if (onSuccess) onSuccess()
        } catch (err) {
            console.error("Provisioning failed", err)
            setStatusText("Failed to provision brand. Please check logs.")
            setProvisioning(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
                    <Rocket className="h-4 w-4" />
                    Activate Orbit Store
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                {step === "config" && (
                    <>
                        <DialogHeader>
                            <DialogTitle>Activate Orbit for {brandName}</DialogTitle>
                            <DialogDescription>
                                Configure the store deployment settings below to provision the merchant's workspace.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="theme" className="text-right">
                                    <Palette className="h-4 w-4 inline mr-2" />
                                    Theme
                                </Label>
                                <div className="col-span-3">
                                    <Select value={selectedCategory} onValueChange={(v) => {
                                      setSelectedCategory(v);
                                      // Reset theme when category changes
                                      const categoryThemes = themes.filter(t => t.category === v);
                                      if (categoryThemes.length > 0) {
                                        setConfig(prev => ({ ...prev, themeId: categoryThemes[0].id }));
                                      }
                                    }}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(c => (
                                                <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <div className="mt-2">
                                      <Select 
                                        value={config.themeId} 
                                        onValueChange={(v) => setConfig({ ...config, themeId: v })}
                                      >
                                          <SelectTrigger>
                                              <SelectValue placeholder="Select theme" />
                                          </SelectTrigger>
                                          <SelectContent>
                                              {themes
                                                .filter(t => !selectedCategory || t.category === selectedCategory)
                                                .map(t => (
                                                  <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                                                ))}
                                          </SelectContent>
                                      </Select>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="plan" className="text-right">
                                    <CreditCard className="h-4 w-4 inline mr-2" />
                                    Plan
                                </Label>
                                <div className="col-span-3">
                                    <Select value={config.planId} onValueChange={(v) => setConfig({ ...config, planId: v })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select plan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {plans.map(p => (
                                                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="subdomain" className="text-right">
                                    <Globe className="h-4 w-4 inline mr-2" />
                                    Subdomain
                                </Label>
                                <div className="col-span-3 flex items-center gap-2">
                                    <Input 
                                        id="subdomain" 
                                        value={config.subdomain} 
                                        onChange={(e) => setConfig({ ...config, subdomain: e.target.value })}
                                        className="font-mono text-sm"
                                    />
                                    <span className="text-muted-foreground text-xs">.orbit360.shop</span>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                            <Button onClick={handleActivate} disabled={loading || !config.themeId || !config.planId}>
                                Provision Store Front
                            </Button>
                        </DialogFooter>
                    </>
                )}

                {step === "progress" && (
                    <div className="py-10 text-center space-y-6">
                        <div className="relative mx-auto w-24 h-24">
                            <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
                            <div 
                                className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"
                                style={{ 
                                    animationDuration: '2s'
                                }}
                            ></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Rocket className="h-8 w-8 text-primary animate-pulse" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-bold">Provisioning in Progress...</h3>
                            <p className="text-sm text-muted-foreground">{statusText}</p>
                            <div className="w-full bg-muted rounded-full h-2 mt-4">
                                <div 
                                    className="bg-primary h-full rounded-full transition-all duration-500" 
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}

                {step === "success" && (
                    <div className="py-10 text-center space-y-6">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="h-10 w-10 text-green-600" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-green-700">All Systems GO!</h3>
                            <p className="text-sm text-muted-foreground">
                                The merchant has been successfully onboarded to the new Orbit platform.
                                Credentials and store details have been sent via email.
                            </p>
                        </div>
                        <div className="pt-4 flex gap-3">
                            <Button className="flex-1" variant="outline" onClick={() => setOpen(false)}>Close</Button>
                            <Button className="flex-1" onClick={() => setOpen(false)}>Done</Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
