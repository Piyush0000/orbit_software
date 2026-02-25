"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle, ShieldCheck, Download, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function OrderConfirmationPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                {/* Success Message */}
                <div className="text-center mb-12 animate-in zoom-in duration-500">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">Order Confirmed!</h1>
                    <p className="text-muted-foreground text-lg">Thank you for your purchase. Your order <span className="text-foreground font-bold">#ORD-9928-XA</span> has been placed successfully.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Order Details */}
                    <div className="md:col-span-2 space-y-8">
                        <Card>
                            <CardHeader className="bg-secondary/20">
                                <CardTitle>Order Details</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-20 h-20 bg-muted rounded-md overflow-hidden relative">
                                        <img src="https://images.unsplash.com/photo-1605100804763-ebea643341d5?q=80&w=200&auto=format&fit=crop" alt="Ring" className="object-cover w-full h-full" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground">Ethereal Diamond Solitaire Ring</h3>
                                        <p className="text-sm text-muted-foreground">SKU: RNG-001-GLD | Size: 7</p>
                                        <p className="font-medium mt-1">₹45,999</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground mb-1">Shipping Address</p>
                                        <p className="font-medium">Priya Sharma</p>
                                        <p>123 Luxury Lane, Andheri West</p>
                                        <p>Mumbai, 400053</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground mb-1">Payment Method</p>
                                        <p className="font-medium">Credit Card (**** 4242)</p>
                                        <p className="text-green-600 font-medium text-xs mt-1">PAID</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total Paid</span>
                                    <span>₹47,379</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Post Purchase Value */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-gold/10 p-6 rounded-lg border border-gold/20 flex flex-col items-center text-center space-y-3">
                                <ShieldCheck className="w-8 h-8 text-gold" />
                                <h3 className="font-bold">Warranty Activated</h3>
                                <p className="text-sm text-muted-foreground">Your lifetime plating warranty and authenticity certificate have been linked to your account.</p>
                                <Button variant="link" className="text-gold p-0 h-auto">View Certificate</Button>
                            </div>
                            <div className="bg-secondary/20 p-6 rounded-lg border border-border flex flex-col items-center text-center space-y-3">
                                <Sparkles className="w-8 h-8 text-foreground" />
                                <h3 className="font-bold">Jewellery Care</h3>
                                <p className="text-sm text-muted-foreground">Keep your jewellery shining. Read our guide on how to store and clean your diamond ring.</p>
                                <Button variant="link" className="text-foreground p-0 h-auto">Read Guide</Button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Actions */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">What's Next?</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-sm space-y-3">
                                    <div className="flex items-start gap-3">
                                        <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                                        <div>
                                            <p className="font-medium">Order Placed</p>
                                            <p className="text-xs text-muted-foreground">Feb 06, 2026</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="w-6 h-6 rounded-full bg-secondary text-muted-foreground flex items-center justify-center text-xs font-bold shrink-0">2</span>
                                        <div>
                                            <p className="font-medium">Processing</p>
                                            <p className="text-xs text-muted-foreground">Expected: Feb 07</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 opacity-50">
                                        <span className="w-6 h-6 rounded-full bg-secondary text-muted-foreground flex items-center justify-center text-xs font-bold shrink-0">3</span>
                                        <div>
                                            <p className="font-medium">Shipped</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 opacity-50">
                                        <span className="w-6 h-6 rounded-full bg-secondary text-muted-foreground flex items-center justify-center text-xs font-bold shrink-0">4</span>
                                        <div>
                                            <p className="font-medium">Delivered</p>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full justify-start">
                                    <Download className="w-4 h-4 mr-2" /> Download Invoice
                                </Button>
                            </CardContent>
                        </Card>

                        <div className="text-center">
                            <p className="text-muted-foreground text-sm mb-4">Need help with your order?</p>
                            <Button variant="ghost" className="mb-6">Contact Support</Button>

                            <Link href="/">
                                <Button className="w-full bg-gold text-black font-bold uppercase tracking-wider h-12">
                                    Continue Shopping <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
