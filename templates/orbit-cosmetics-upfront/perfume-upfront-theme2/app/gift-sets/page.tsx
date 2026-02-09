"use client";

import CategoryPageTemplate from "@/components/shop/CategoryPageTemplate";
import { useStorefront } from "@/context/StorefrontContext";
import { useMemo } from "react";

export default function GiftSetsPage() {
    const { products, loading } = useStorefront();
    
    const giftSets = useMemo(() => {
        return products.filter(p => 
            p.category?.toLowerCase().includes("gift") || 
            p.tags?.some(t => t.toLowerCase().includes("gift"))
        );
    }, [products]);

    return (
        <CategoryPageTemplate
            title="Gift Sets"
            description="Perfectly packaged presents for your loved ones, or a special treat for yourself."
            products={giftSets}
            loading={loading}
        />
    );
}
