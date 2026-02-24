import SRCheckoutButton from '@/components/SRCheckoutButton';

"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const router = useRouter();

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate checkout
        setTimeout(() => {
            setLoading(false);
            setOrderPlaced(true);
            clearCart();
        }, 2000);
    };

    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                    <CheckCircle2 className="w-12 h-12" />
                </div>
                <h1 className="text-4xl font-serif font-bold mb-4">Order Placed Successfully!</h1>
                <p className="text-muted-foreground max-w-md mb-8 text-lg">
                    Thank you for your purchase. Your order has been confirmed and will be shipped shortly.
                </p>
                <Link href="/">
                    <Button size="lg" className="px-8 py-6 text-lg rounded-full">
                        Return to Home
                    </Button>
                </Link>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-serif font-bold mb-4">Your bag is empty</h1>
                <Link href="/shop">
                    <Button>Continue Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-20 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Left Column: Form */}
                <div className="space-y-8">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <ChevronLeft className="w-4 h-4" />
                        <Link href="/shop" className="hover:text-primary">Return to Shop</Link>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-2xl font-serif font-bold">Contact Information</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email or mobile phone number</Label>
                                    <Input id="email" type="email" required />
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-6">
                        <h2 className="text-2xl font-serif font-bold">Shipping Address</h2>
                        <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First name</Label>
                                    <Input id="firstName" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input id="lastName" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                                <Input id="apartment" />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state">State</Label>
                                    <Input id="state" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip">PIN Code</Label>
                                    <Input id="zip" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" type="tel" required />
                            </div>

                        </form>
                    </div>

                    <Separator />

                    <div className="space-y-6">
                        <h2 className="text-2xl font-serif font-bold">Payment</h2>
                        <p className="text-sm text-muted-foreground">All transactions are secure and encrypted.</p>
                        <div className="bg-secondary/20 p-4 rounded-lg border border-primary/10 text-center text-sm">
                            Payment gateway will be integrated here.
                        </div>
                    </div>

                    <SRCheckoutButton cartItems={cartItems} totalAmount={total} className="w-full py-6 text-lg" label="{loading ? "Processing..." : `Pay ₹${cartTotal.toLocaleString()}`}" />

                </div>

                {/* Right Column: Order Summary (Sticky on desktop) */}
                <div className="lg:sticky lg:top-24 h-fit bg-secondary/10 p-6 md:p-8 rounded-xl border">
                    <h2 className="text-xl font-serif font-bold mb-6">Order Summary</h2>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        {cartItems.map((item) => (
                            <div key={`${item.productId}-${item.variantId}`} className="flex gap-4">
                                <div className="relative w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0 border">
                                    {item.image ? (
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200" />
                                    )}
                                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {item.quantity}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                                    <p className="text-xs text-muted-foreground">{item.variantName}</p>
                                </div>
                                <p className="font-medium text-sm">₹{(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>₹{cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Shipping</span>
                            <span className="text-green-600 font-medium">Free</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2 mt-2 border-t">
                            <span>Total</span>
                            <span>₹{cartTotal.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-6">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Secure Checkout & Encryption</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
