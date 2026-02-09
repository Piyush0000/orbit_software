"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, X, Plus, Minus, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet"
import { useCart } from "@/context/CartContext"
import { QuantitySelector } from "@/components/ui/product-utils"

interface CartDrawerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
    const { cart, removeFromCart, updateQuantity, subtotal, totalItems } = useCart()

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md p-0 flex flex-col border-l border-border shadow-2xl bg-background">
                <SheetHeader className="p-6 border-b border-border flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-none">
                            <ShoppingBag className="w-5 h-5 text-primary" />
                        </div>
                        <SheetTitle className="text-xl font-black uppercase tracking-tighter">Your Bag ({totalItems})</SheetTitle>
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                            <div className="bg-muted p-6 rounded-none border border-dashed border-border">
                                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-lg font-black uppercase tracking-tight text-foreground">Your bag is empty</p>
                                <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">Looks like you haven't added any snacks or beverages yet.</p>
                            </div>
                            <Button
                                onClick={() => onOpenChange(false)}
                                className="font-black uppercase tracking-widest rounded-none mt-4"
                            >
                                Start Shopping
                            </Button>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className="relative w-24 h-24 bg-muted overflow-hidden border border-border shrink-0">
                                    <Image
                                        src={item.image[0]}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform group-hover:scale-110"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between min-w-0">
                                    <div>
                                        <div className="flex justify-between items-start gap-2">
                                            <h4 className="font-black uppercase tracking-tighter text-foreground truncate pr-4">{item.name}</h4>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-muted-foreground hover:text-destructive transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-sm font-black text-primary tracking-tighter mt-1">₹{item.price}</p>
                                    </div>

                                    <QuantitySelector
                                        quantity={item.quantity}
                                        onIncrement={() => updateQuantity(item.id, item.quantity + 1)}
                                        onDecrement={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="h-8 scale-90 -ml-2 origin-left"
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <SheetFooter className="p-6 border-t border-border flex-col sm:flex-col gap-4 bg-muted/50">
                        <div className="space-y-1 w-full">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Subtotal</span>
                                <span className="font-black text-foreground">₹{subtotal}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">Delivery</span>
                                <span className="text-green-500 font-black uppercase tracking-widest text-[10px]">Free</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-base font-black uppercase tracking-tighter text-foreground">Total</span>
                                <span className="text-xl font-black text-primary tracking-tighter">₹{subtotal}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 w-full pt-2">
                            <Link href="/cart" onClick={() => onOpenChange(false)} className="w-full">
                                <Button variant="outline" className="w-full h-12 font-black uppercase tracking-widest border-border rounded-none bg-card hover:bg-muted">
                                    View Full Bag
                                </Button>
                            </Link>
                            <Link href="/checkout" onClick={() => onOpenChange(false)} className="w-full">
                                <Button className="w-full h-14 font-black uppercase tracking-widest group rounded-none">
                                    Checkout NOW
                                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    )
}
