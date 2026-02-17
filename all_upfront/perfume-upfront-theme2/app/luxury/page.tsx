"use client";

import { products } from "@/lib/data";
import CategoryPageTemplate from "@/components/shop/CategoryPageTemplate";

export default function LuxuryCollectionPage() {
    const luxuryProducts = products.filter(p => p.price >= 5000);

    return (
        <CategoryPageTemplate
            title="Luxury Collection"
            description="Indulge in our exquisite selection of premium fragrances curated for the connoisseur."
            products={luxuryProducts}
        />
    );
}
