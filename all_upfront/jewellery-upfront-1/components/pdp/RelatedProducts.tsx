"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

interface RelatedProductsProps {
    currentProduct: Product;
    allProducts: Product[];
}

export function RelatedProducts({ currentProduct, allProducts }: RelatedProductsProps) {
    // Simple logic: same category, excluding current product
    // In real app: more complex recommendation engine
    const related = allProducts
        .filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);

    // If not enough related products, just show some new arrivals
    if (related.length < 2) {
        const newArrivals = allProducts
            .filter(p => p.isNew && p.id !== currentProduct.id)
            .slice(0, 4 - related.length);
        related.push(...newArrivals);
    }

    if (related.length === 0) return null;

    return (
        <section className="mt-24">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-heading font-bold">You May Also Like</h2>
                <Link href={`/category/${currentProduct.category}`}>
                    <Button variant="link" className="text-gold hover:text-gold/80">View All</Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
