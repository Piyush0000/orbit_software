"use client";

import { products } from "@/lib/data";
import CategoryPageTemplate from "@/components/shop/CategoryPageTemplate";

export default function NewArrivalsPage() {
    const newProducts = products.filter(p => p.tag === "New" || p.tag === "Limited Edition");

    return (
        <CategoryPageTemplate
            title="New Arrivals"
            description="Be the first to experience our latest olfactory masterpieces and limited editions."
            products={newProducts}
        />
    );
}
