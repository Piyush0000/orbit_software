import SRCheckoutButton from '@/components/SRCheckoutButton';
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ShieldCheck, Truck, CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export default function CheckoutPage() {
    const [step, setStep] = useState<"shipping" | "payment">("shipping");

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-center">Secure Checkout</h1>

                {/* Progress Steps */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center space-x-4">
                        <div className={`flex items-center space-x-2 ${step === "shipping" ? "text-gold" : "text-muted-foreground"}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border font-bold ${step === "shipping" ? "border-gold bg-gold text-black" : "border-muted-foreground"}`}>1</div>
                            <span className="font-medium">Shipping</span>
                        </div>
                        <div className="w-16 h-px bg-border"></div>
                        <div className={`flex items-center space-x-2 ${step === "payment" ? "text-gold" : "text-muted-foreground"}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border font-bold ${step === "payment" ? "border-gold bg-gold text-black" : "border-muted-foreground"}`}>2</div>
                            <span className="font-medium">Payment</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-2 space-y-8">
                        {step === "shipping" ? (
                            <Card className="animate-in fade-in slide-in-from-left-4 duration-500">
                                <CardHeader>
                                    <CardTitle>Delivery Details</CardTitle>
                                    <CardDescription>Enter your shipping address.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" placeholder="John" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input id="address" placeholder="123 Luxury Lane" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="city">City</Label>
                                            <Input id="city" placeholder="Mumbai" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="postalCode">Pincode</Label>
                                            <Input id="postalCode" placeholder="400001" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Mobile Number</Label>
                                        <Input id="phone" placeholder="+91 98765 43210" />
                                    </div>

                                    <Button className="w-full bg-gold hover:bg-gold/90 text-black font-bold h-12 mt-4" onClick={() => setStep("payment")}>
                                        Continue to Payment
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="animate-in fade-in slide-in-from-right-4 duration-500">
                                <CardHeader>
                                    <CardTitle>Payment Method</CardTitle>
                                    <CardDescription>Select a secure payment option. All transactions are encrypted.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <RadioGroup defaultValue="card">
                                        <div className="flex items-center space-x-2 border p-4 rounded-md hover:border-gold cursor-pointer transition-colors">
                                            <RadioGroupItem value="card" id="card" />
                                            <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center justify-between">
                                                <span className="font-medium">Credit / Debit Card</span>
                                                <div className="flex space-x-2 text-xs">
                                                    <span className="bg-secondary px-1 rounded">VISA</span>
                                                    <span className="bg-secondary px-1 rounded">MC</span>
                                                </div>
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2 border p-4 rounded-md hover:border-gold cursor-pointer transition-colors">
                                            <RadioGroupItem value="upi" id="upi" />
                                            <Label htmlFor="upi" className="flex-1 cursor-pointer">UPI / Net Banking</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 border p-4 rounded-md hover:border-gold cursor-pointer transition-colors">
                                            <RadioGroupItem value="cod" id="cod" />
                                            <Label htmlFor="cod" className="flex-1 cursor-pointer">Cash on Delivery (COD)</Label>
                                        </div>
                                    </RadioGroup>

                                    <div className="bg-secondary/10 p-4 rounded flex items-start space-x-3 text-sm text-muted-foreground">
                                        <Lock className="w-4 h-4 mt-0.5 shrink-0" />
                                        <p>Your payment information is collected securely. We do not store your full card details.</p>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <Button variant="outline" onClick={() => setStep("shipping")} className="flex-1 h-12">
                                            Back
                                        </Button>
                                        <Button className="flex-1 bg-gold hover:bg-gold/90 text-black font-bold h-12">
                                            Pay securely
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Trust Badges */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                            <div className="flex items-center space-x-3 bg-secondary/10 p-4 rounded-lg">
                                <ShieldCheck className="w-8 h-8 text-gold" />
                                <div>
                                    <h4 className="font-bold text-sm">Secure Payment</h4>
                                    <p className="text-xs text-muted-foreground">256-bit SSL Encryption</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 bg-secondary/10 p-4 rounded-lg">
                                <Truck className="w-8 h-8 text-gold" />
                                <div>
                                    <h4 className="font-bold text-sm">Insured Delivery</h4>
                                    <p className="text-xs text-muted-foreground">Safe shipping guarantee</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3 bg-secondary/10 p-4 rounded-lg">
                                <Check className="w-8 h-8 text-gold" />
                                <div>
                                    <h4 className="font-bold text-sm">Official Warranty</h4>
                                    <p className="text-xs text-muted-foreground">Stamped with hallmark</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <CardHeader className="bg-secondary/20 pb-4">
                                <CardTitle className="text-lg">Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                {/* Mock Items - In real app, consume from Context */}
                                <div className="flex gap-3 mb-4">
                                    <div className="w-16 h-16 bg-secondary rounded-md flex-shrink-0 relative overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1605100804763-ebea643341d5?q=80&w=200&auto=format&fit=crop" alt="Ring" className="object-cover w-full h-full" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold line-clamp-1">Ethereal Diamond Solitaire Ring</p>
                                        <p className="text-xs text-muted-foreground">Qty: 1</p>
                                        <p className="text-sm font-medium">₹45,999</p>
                                    </div>
                                </div>
                                <Separator />

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>₹45,999</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Tax (GST 3%)</span>
                                        <span>₹1,380</span>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex justify-between font-heading font-bold text-lg">
                                    <span>Total</span>
                                    <span>₹47,379</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
