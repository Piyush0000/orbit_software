"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { CartItem } from "./CartItem";
import { EmptyCart } from "./EmptyCart";
import { Upsell } from "./Upsell";
import { ShieldCheck } from "lucide-react";

export function CartDrawer() {
    const { isCartOpen, setIsCartOpen, cartItems, cartTotal } = useCart();

    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background p-0">
                <SheetHeader className="p-6 pb-2 border-b">
                    <SheetTitle className="font-serif text-2xl">Your Bag ({cartItems.length})</SheetTitle>
                </SheetHeader>

                {cartItems.length === 0 ? (
                    <EmptyCart onStartShopping={() => setIsCartOpen(false)} />
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            <div className="space-y-1">
                                {cartItems.map((item) => (
                                    <CartItem key={`${item.productId}-${item.variantId}`} item={item} />
                                ))}
                            </div>
                            <Upsell />
                        </div>

                        <div className="mt-auto p-6 flex flex-col gap-4 border-t bg-muted/10">
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>₹{cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between font-medium text-lg pt-2">
                                    <span>Total</span>
                                    <span>₹{cartTotal.toLocaleString()}</span>
                                </div>
                            </div>

                            <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="w-full">
                                <Button className="w-full" size="lg">
                                    Checkout
                                </Button>
                            </Link>

                            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-muted py-2 rounded-md">
                                <ShieldCheck className="w-3 h-3" />
                                <span>Secure Checkout & Encryption</span>
                            </div>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
