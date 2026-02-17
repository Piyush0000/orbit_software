"use client";

import { Product, products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Plus } from "lucide-react";

export function Upsell() {
    const { cartItems, addToCart } = useCart();

    // Simple recommendation logic:
    // Suggest Bestsellers that are NOT already in the cart.
    // Limit to 3 items.
    const suggestions = products
        .filter((p) => p.bestseller)
        .filter((p) => !cartItems.some((item) => item.productId === p.id))
        .slice(0, 3);

    if (suggestions.length === 0) return null;

    return (
        <div className="mt-8 space-y-4 border-t pt-6">
            <h3 className="font-serif text-lg font-medium">You may also like</h3>
            <div className="space-y-3">
                {suggestions.map((product) => (
                    <div key={product.id} className="flex gap-3 items-center border rounded-lg p-2 bg-secondary/10">
                        <div className="relative h-16 w-16 min-w-16 overflow-hidden rounded-md bg-white">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium truncate">{product.name}</h4>
                            <p className="text-sm text-muted-foreground">₹{product.price.toLocaleString()}</p>
                        </div>
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-8 w-8 p-0 shrink-0"
                            onClick={() => addToCart(product)}
                        >
                            <Plus className="h-4 w-4" />
                            <span className="sr-only">Add to cart</span>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
