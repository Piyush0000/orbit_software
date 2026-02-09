"use client";

import CategoryPageTemplate from "@/components/shop/CategoryPageTemplate";
import { useStorefront } from "@/context/StorefrontContext";
import { useMemo } from "react";

export default function MenPage() {
    const { products, loading } = useStorefront();
    
    const menProducts = useMemo(() => {
        return products.filter(p => 
            p.category?.toLowerCase() === "men" || 
            p.tags?.some(t => t.toLowerCase() === "men" || t.toLowerCase() === "male")
        );
    }, [products]);

    return (
        <CategoryPageTemplate
            title="Men's Fragrances"
            description="Discover bold, sophisticated, and masculine scents designed for the modern gentleman."
            products={menProducts}
            loading={loading}
        />
    );
}
