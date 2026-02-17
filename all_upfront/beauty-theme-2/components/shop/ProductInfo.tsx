"use client";

import { Star, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/products";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";

interface ProductInfoProps {
    product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
    const { addToCart } = useCart();

    return (
        <div className="flex flex-col gap-6">
            <div>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        {product.category}
                    </span>
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                        <span className="font-medium text-sm">{product.rating}</span>
                        <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                    {product.name}
                </h1>

                <p className="text-2xl font-bold text-primary mb-6">
                    ₹{product.price.toLocaleString("en-IN")}
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                    {product.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2 mb-6">
                    {product.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-foreground/80">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                            {benefit}
                        </div>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <Button
                        size="lg"
                        className="flex-1 text-lg py-6 rounded-full shadow-md hover:shadow-lg transition-all"
                        onClick={() => addToCart(product)}
                    >
                        Add to Cart - ₹{product.price.toLocaleString("en-IN")}
                    </Button>
                    <Button size="icon" variant="outline" className="h-14 w-14 rounded-full border-primary/20 text-primary hover:bg-primary/5">
                        <Heart className="w-6 h-6" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-14 w-14 rounded-full text-muted-foreground hover:text-foreground">
                        <Share2 className="w-5 h-5" />
                    </Button>
                </div>
                <p className="text-xs text-center text-muted-foreground">
                    Free shipping on orders over $50 • 30-day return policy
                </p>
            </div>
        </div>
    );
}
