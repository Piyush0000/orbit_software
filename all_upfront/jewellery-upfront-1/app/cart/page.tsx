"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShieldCheck, Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Mock Data for Cart Items
const MOCK_CART_ITEMS = [
    {
        id: "1",
        name: "Ethereal Diamond Solitaire Ring",
        sku: "RNG-001-GLD",
        price: 45999,
        image: "https://images.unsplash.com/photo-1605100804763-ebea643341d5?q=80&w=200&auto=format&fit=crop",
        quantity: 1,
        size: "7",
    },
    {
        id: "3",
        name: "Minimalist Pearl Drop Earrings",
        sku: "EAR-003-PRL",
        price: 2499,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=200&auto=format&fit=crop",
        quantity: 2,
        size: null,
    },
];

export default function CartPage() {
    const [items, setItems] = useState(MOCK_CART_ITEMS);
    const [giftWrap, setGiftWrap] = useState(false);
    const [insurance, setInsurance] = useState(false);
    const [note, setNote] = useState("");

    const updateQuantity = (id: string, delta: number) => {
        setItems(items.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    // Calculations
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 5000 ? 0 : 500;
    const giftWrapCost = giftWrap ? 299 : 0;
    const insuranceCost = insurance ? Math.round(subtotal * 0.02) : 0; // 2% of value
    const total = subtotal + shipping + giftWrapCost + insuranceCost;

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-8">
                <h1 className="text-3xl md:text-4xl font-heading font-bold mb-8">Shopping Bag ({items.length})</h1>

                {items.length === 0 ? (
                    <div className="text-center py-20 bg-secondary/20 rounded-lg">
                        <p className="text-muted-foreground mb-6">Your bag is empty.</p>
                        <Link href="/category/all">
                            <Button variant="gold">Continue Shopping</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Left Column: Cart Items & Options */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Items List */}
                            <div className="space-y-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg bg-card hover:shadow-sm transition-shadow">
                                        <div className="relative w-24 h-24 flex-shrink-0 bg-secondary/20 rounded-md overflow-hidden">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-heading font-bold text-lg text-foreground line-clamp-1">{item.name}</h3>
                                                    <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                                                    {item.size && <p className="text-sm text-muted-foreground mt-1">Size: {item.size}</p>}
                                                </div>
                                                <p className="font-bold text-lg font-heading">₹{item.price.toLocaleString()}</p>
                                            </div>

                                            <div className="flex justify-between items-center mt-4">
                                                <div className="flex items-center space-x-3 border rounded-md p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="p-1 hover:bg-secondary rounded-sm transition-colors"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="p-1 hover:bg-secondary rounded-sm transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-muted-foreground hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Additional Options */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Gift Wrap */}
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-start space-x-3">
                                            <Checkbox
                                                id="gift-wrap"
                                                checked={giftWrap}
                                                onCheckedChange={(checked) => setGiftWrap(checked === true)}
                                            />
                                            <div className="grid gap-1.5 leading-none">
                                                <Label htmlFor="gift-wrap" className="font-bold flex items-center">
                                                    <Gift className="w-4 h-4 mr-2" />
                                                    Add Gift Wrapping (₹299)
                                                </Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Includes premium box, ribbon, and personalized card.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Insurance */}
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="flex items-start space-x-3">
                                            <Checkbox
                                                id="insurance"
                                                checked={insurance}
                                                onCheckedChange={(checked) => setInsurance(checked === true)}
                                            />
                                            <div className="grid gap-1.5 leading-none">
                                                <Label htmlFor="insurance" className="font-bold flex items-center">
                                                    <ShieldCheck className="w-4 h-4 mr-2" />
                                                    Add Shipping Insurance (₹{Math.round(subtotal * 0.02).toLocaleString()})
                                                </Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Protect against damage or loss during transit.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Custom Note */}
                            <div className="space-y-4">
                                <Label htmlFor="note">Add a Note (Optional)</Label>
                                <Textarea
                                    id="note"
                                    placeholder="Special instructions or gift message..."
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="resize-none"
                                />
                            </div>
                        </div>

                        {/* Right Column: Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-card border rounded-lg p-6 sticky top-24">
                                <h3 className="font-heading font-bold text-xl mb-6">Order Summary</h3>

                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="font-medium">{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                                    </div>
                                    {giftWrap && (
                                        <div className="flex justify-between animate-in fade-in slide-in-from-top-1">
                                            <span className="text-muted-foreground">Gift Wrapping</span>
                                            <span className="font-medium">₹299</span>
                                        </div>
                                    )}
                                    {insurance && (
                                        <div className="flex justify-between animate-in fade-in slide-in-from-top-1">
                                            <span className="text-muted-foreground">Insurance (2%)</span>
                                            <span className="font-medium">₹{insuranceCost.toLocaleString()}</span>
                                        </div>
                                    )}

                                    <Separator />

                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>₹{total.toLocaleString()}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes</p>
                                </div>

                                <Link href="/checkout" className="block mt-8">
                                    <Button className="w-full h-12 bg-gold hover:bg-gold/90 text-black font-bold uppercase tracking-widest">
                                        Proceed to Checkout <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>

                                <div className="mt-6 flex items-center justify-center gap-4 text-muted-foreground opacity-70">
                                    {/* Placeholder icons for payment methods */}
                                    <div className="h-6 w-10 bg-current rounded" />
                                    <div className="h-6 w-10 bg-current rounded" />
                                    <div className="h-6 w-10 bg-current rounded" />
                                    <div className="h-6 w-10 bg-current rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
