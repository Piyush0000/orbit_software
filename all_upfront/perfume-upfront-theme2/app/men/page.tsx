"use client";

import { products } from "@/lib/data";
import CategoryPageTemplate from "@/components/shop/CategoryPageTemplate";

export default function MenPage() {
    const menProducts = products.filter(p => p.gender === "Men" || p.gender === "Unisex");

    return (
        <CategoryPageTemplate
            title="Men's Fragrances"
            description="Discover bold, sophisticated, and masculine scents designed for the modern gentleman."
            products={menProducts}
        />
    );
}
