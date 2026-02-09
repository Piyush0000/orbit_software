"use client";

import CategoryPageTemplate from "@/components/shop/CategoryPageTemplate";
import { useStorefront } from "@/context/StorefrontContext";
import { useMemo } from "react";

export default function NewArrivalsPage() {
    const { products, loading } = useStorefront();
    
    const newProducts = useMemo(() => {
        return products.filter(p => 
            p.tags?.some(t => t.toLowerCase() === "new" || t.toLowerCase() === "limited edition")
        );
    }, [products]);

    return (
        <CategoryPageTemplate
            title="New Arrivals"
            description="Be the first to experience our latest olfactory masterpieces and limited editions."
            products={newProducts}
            loading={loading}
        />
    );
}
