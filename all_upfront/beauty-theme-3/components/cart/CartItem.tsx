"use client";

import { CartItem as CartItemType, useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
    item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <div className="flex gap-4 py-4 border-b group">
            <div className="relative aspect-square h-20 w-20 min-w-20 overflow-hidden rounded-lg bg-secondary/20">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm line-clamp-2 md:text-base">
                            {item.name}
                        </h4>
                        <button
                            onClick={() => removeFromCart(item.productId, item.variantId)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                        </button>
                    </div>
                    {item.variantName && (
                        <p className="text-xs text-muted-foreground mt-1">
                            Size: {item.variantName}
                        </p>
                    )}
                </div>

                <div className="flex justify-between items-end mt-2">
                    <div className="flex items-center border rounded-md h-8">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none rounded-l-md"
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none rounded-r-md"
                            onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                        >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase quantity</span>
                        </Button>
                    </div>
                    <div className="font-medium">
                        ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    );
}
