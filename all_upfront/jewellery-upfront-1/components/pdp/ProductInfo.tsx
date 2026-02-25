"use client";

import React from "react";
import { Star, Truck, ShieldCheck, BadgeCheck } from "lucide-react";

interface ProductInfoProps {
    product: {
        name: string;
        sku: string;
        rating: number;
        reviewCount: number;
        price: number;
        originalPrice?: number;
        description: string;
    };
}

export function ProductInfo({ product }: ProductInfoProps) {
    return (
        <div className="flex flex-col space-y-6">
            {/* Title & Rating */}
            <div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">SKU: {product.sku}</span>
                    <div className="flex items-center text-gold">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-sm font-medium text-foreground">{product.rating}</span>
                        <span className="ml-1 text-xs text-muted-foreground">({product.reviewCount} Reviews)</span>
                    </div>
                </div>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold font-heading text-foreground">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
                {product.originalPrice && (
                    <span className="text-sm text-green-600 font-medium">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-border/50">
                <div className="flex items-center space-x-3">
                    <BadgeCheck className="w-5 h-5 text-gold" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Hallmark Certified</span>
                </div>
                <div className="flex items-center space-x-3">
                    <ShieldCheck className="w-5 h-5 text-gold" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Lifetime Warranty</span>
                </div>
                <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-gold" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Free Insured Shipping</span>
                </div>
                <div className="flex items-center space-x-3">
                    <BadgeCheck className="w-5 h-5 text-gold" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">7-Day Returns</span>
                </div>
            </div>

            {/* EMI Info (Static for now) */}
            <div className="bg-secondary/20 p-3 rounded-md text-xs text-foreground/80">
                <p>EMI starts at <span className="font-bold">₹{(product.price / 12).toFixed(0)}/mo</span>. No Cost EMI available.</p>
            </div>

            {/* Description Excerpt */}
            <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description}
            </p>
        </div>
    );
}
