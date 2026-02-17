"use client";

import { products } from "@/lib/data";
import CategoryPageTemplate from "@/components/shop/CategoryPageTemplate";

export default function WomenPage() {
    const womenProducts = products.filter(p => p.gender === "Women" || p.gender === "Unisex");

    return (
        <CategoryPageTemplate
            title="Women's Fragrances"
            description="Explore elegant, floral, and enchanting scents that celebrate femininity."
            products={womenProducts}
        />
    );
}
