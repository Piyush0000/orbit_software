"use client";

import CategoryPageTemplate from "@/components/shop/CategoryPageTemplate";
import { useStorefront } from "@/context/StorefrontContext";
import { useMemo } from "react";

export default function SalePage() {
    const { products, loading } = useStorefront();
    
    const saleProducts = useMemo(() => {
        return products.filter(p => 
            p.tags?.some(t => t.toLowerCase() === "sale") || 
            (p.originalPriceNum && p.priceNum < p.originalPriceNum)
        );
    }, [products]);

    return (
        <CategoryPageTemplate
            title="Exclusive Sale"
            description="Don't miss out on these incredible offers on your favorite scents."
            products={saleProducts}
            loading={loading}
        />
    );
}
