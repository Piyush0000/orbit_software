"use client";

import CategoryPageTemplate from "@/components/shop/CategoryPageTemplate";
import { useStorefront } from "@/context/StorefrontContext";
import { useMemo } from "react";

export default function WomenPage() {
    const { products, loading } = useStorefront();
    
    const womenProducts = useMemo(() => {
        return products.filter(p => 
            p.category?.toLowerCase() === "women" || 
            p.tags?.some(t => t.toLowerCase() === "women" || t.toLowerCase() === "female")
        );
    }, [products]);

    return (
        <CategoryPageTemplate
            title="Women's Fragrances"
            description="Explore elegant, floral, and enchanting scents that celebrate femininity."
            products={womenProducts}
            loading={loading}
        />
    );
}
