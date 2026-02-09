"use client";

import CategoryPageTemplate from "@/components/shop/CategoryPageTemplate";
import { useStorefront } from "@/context/StorefrontContext";
import { useMemo } from "react";

export default function LuxuryCollectionPage() {
    const { products, loading } = useStorefront();
    
    const luxuryProducts = useMemo(() => {
        return products.filter(p => 
            p.tags?.some(t => t.toLowerCase() === "luxury") || 
            (p.priceNum && p.priceNum >= 5000)
        );
    }, [products]);

    return (
        <CategoryPageTemplate
            title="Luxury Collection"
            description="Indulge in our exquisite selection of premium fragrances curated for the connoisseur."
            products={luxuryProducts}
            loading={loading}
        />
    );
}
