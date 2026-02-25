"use client";

import React, { useState } from "react";
import { MessageSquare, Phone, Mail, HelpCircle, Truck, Ruler, RefreshCcw, ShieldAlert, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SupportPage() {
    const [serviceType, setServiceType] = useState<string>("");

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-8 max-w-5xl">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">Concierge Support</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Dedicated assistance for your precious investments. From maintenance to returns, we ensure a seamless experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Quick Actions / Categories */}
                    <div className="lg:col-span-1 space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Services</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-2">
                                <Button variant="ghost" className="justify-start h-auto py-3 text-left">
                                    <ShieldAlert className="w-4 h-4 mr-3 text-gold shrink-0" />
                                    <div className="flex flex-col items-start">
                                        <span className="font-medium">Damage Claims</span>
                                        <span className="text-[10px] text-muted-foreground">Report defects or issues</span>
                                    </div>
                                </Button>
                                <Button variant="ghost" className="justify-start h-auto py-3 text-left">
                                    <RefreshCcw className="w-4 h-4 mr-3 text-gold shrink-0" />
                                    <div className="flex flex-col items-start">
                                        <span className="font-medium">Return Pickup</span>
                                        <span className="text-[10px] text-muted-foreground">Schedule a secure pickup</span>
                                    </div>
                                </Button>
                                <Button variant="ghost" className="justify-start h-auto py-3 text-left">
                                    <Ruler className="w-4 h-4 mr-3 text-gold shrink-0" />
                                    <div className="flex flex-col items-start">
                                        <span className="font-medium">Resize Request</span>
                                        <span className="text-[10px] text-muted-foreground">Ring/Bracelet adjustments</span>
                                    </div>
                                </Button>
                                <Button variant="ghost" className="justify-start h-auto py-3 text-left">
                                    <Diamond className="w-4 h-4 mr-3 text-gold shrink-0" />
                                    <div className="flex flex-col items-start">
                                        <span className="font-medium">Plating Renewal</span>
                                        <span className="text-[10px] text-muted-foreground">Restore shine & finish</span>
                                    </div>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-secondary/30 border-none">
                            <CardContent className="pt-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center text-gold">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Priority Line</p>
                                        <p className="text-xs text-muted-foreground">+91 98765 43210</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center text-gold">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Concierge Email</p>
                                        <p className="text-xs text-muted-foreground">concierge@luxejewels.com</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Ticket Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Submit Service Request</CardTitle>
                                <CardDescription>Select the specific service you need. Our experts will assess and guide you.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input id="name" placeholder="Name as per invoice" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" placeholder="registered@email.com" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="orderid">Order / Certificate ID</Label>
                                    <Input id="orderid" placeholder="ORD-XXXX or CERT-XXXX" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="service-type">Service Type</Label>
                                        <Select onValueChange={setServiceType}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Service" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="repair">Damage Claim / Repair</SelectItem>
                                                <SelectItem value="return">Return Pickup & Refund</SelectItem>
                                                <SelectItem value="resize">Ring Resizing Request</SelectItem>
                                                <SelectItem value="plating">Plating Renewal / Polish</SelectItem>
                                                <SelectItem value="other">General Inquiry</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="category">Issue Category</Label>
                                        <Select disabled={!serviceType}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Refine Incident Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="quality">Quality / Workmanship Issue</SelectItem>
                                                <SelectItem value="fit">Fit / Sizing Discrepancy</SelectItem>
                                                <SelectItem value="delivery">Delivery / Packaging Concern</SelectItem>
                                                <SelectItem value="refund">Refund / Payment Question</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {serviceType === "resize" && (
                                    <div className="p-4 bg-secondary/10 rounded-md border border-border">
                                        <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                                            <Ruler className="w-4 h-4 text-gold" /> Resizing Details
                                        </h4>
                                        <p className="text-xs text-muted-foreground">Standard resizing (±1 size) is free within 30 days. For larger adjustments, charges may apply depending on gold weight difference.</p>
                                    </div>
                                )}

                                {serviceType === "plating" && (
                                    <div className="p-4 bg-secondary/10 rounded-md border border-border">
                                        <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                                            <Diamond className="w-4 h-4 text-gold" /> Plating Renewal
                                        </h4>
                                        <p className="text-xs text-muted-foreground">We offer lifetime free plating renewal for Rhodium and Rose Gold finishes. Shipping charges may apply.</p>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="message">Detailed Description</Label>
                                    <Textarea id="message" placeholder="Please describe the issue or request in detail. For damage claims, please upload photos (link) if possible." className="min-h-[150px]" />
                                </div>

                                <Button className="w-full bg-gold hover:bg-gold/90 text-black font-bold h-12">Submit Request</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
