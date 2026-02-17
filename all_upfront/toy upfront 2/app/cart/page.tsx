"use client";

import Link from "next/link";
import { Trash2, ArrowRight } from "lucide-react";

export default function CartPage() {
    return (
        <div className="bg-background min-h-screen py-16">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-extrabold font-display text-foreground mb-10 tracking-tight">Your Cart 🛒</h1>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Cart Items */}
                    <div className="flex-1 bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-muted/60 overflow-hidden">
                        <div className="p-8 space-y-8">
                            {[1, 2].map((item) => (
                                <div key={item} className="flex gap-6 py-6 border-b border-muted/40 last:border-0 hover:bg-muted/10 transition-colors rounded-xl px-4 -mx-4">
                                    <div className="w-28 h-28 bg-muted/30 rounded-2xl flex-shrink-0 overflow-hidden p-2">
                                        <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={`/images/toy-${item}.png`} alt="Product" className="w-full h-full object-cover rounded-lg" />
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-foreground text-xl mb-1">Smart Robot Builder Kit</h3>
                                                <p className="text-sm text-foreground/50 font-medium">Age: 8+ Years</p>
                                            </div>
                                            <button className="text-red-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center border border-muted rounded-xl bg-white shadow-sm">
                                                <button className="px-4 py-1.5 hover:bg-muted/50 transition-colors text-foreground/70 rounded-l-xl">-</button>
                                                <span className="w-10 text-center text-sm font-bold text-foreground">1</span>
                                                <button className="px-4 py-1.5 hover:bg-muted/50 transition-colors text-foreground/70 rounded-r-xl">+</button>
                                            </div>
                                            <span className="font-bold text-foreground text-xl">₹2,499</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-muted/20 p-8 flex justify-between items-center border-t border-muted/60">
                            <Link href="/category/all" className="text-foreground/70 font-bold hover:text-primary hover:underline flex items-center gap-2 transition-colors">
                                <ArrowRight className="w-4 h-4 rotate-180" /> Continue Shopping
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-[28rem]">
                        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-muted/60 p-8 sticky top-32">
                            <h2 className="font-bold text-foreground text-2xl mb-8 font-display">Order Summary</h2>

                            <div className="space-y-4 text-sm text-foreground/70 mb-8">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-foreground text-lg">₹5,499</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Shipping</span>
                                    <span className="text-primary bg-primary/10 px-3 py-1 rounded-full text-xs font-bold">Free</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span className="font-bold text-foreground">₹450</span>
                                </div>
                                <div className="border-t border-dashed border-muted pt-6 mt-2 flex justify-between items-end">
                                    <span className="font-bold text-lg">Total</span>
                                    <span className="text-3xl font-extrabold text-primary">₹5,949</span>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                className="w-full flex items-center justify-center gap-3 bg-foreground text-white font-bold py-5 rounded-[1.5rem] hover:bg-primary transition-all shadow-lg hover:shadow-primary/30 transform hover:-translate-y-1 mb-6"
                            >
                                Proceed to Checkout
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            <div className="flex flex-col items-center gap-3 text-muted-foreground/60 text-xs font-medium text-center">
                                <span className="flex items-center gap-2">
                                    🔒 Secure Checkout by Stripe
                                </span>
                                <p>Free returns within 30 days. No questions asked.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
