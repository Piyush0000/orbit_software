"use client";

import CategoryPageTemplate from "@/components/shop/CategoryPageTemplate";
import { useStorefront } from "@/context/StorefrontContext";
import { useMemo } from "react";

export default function UnisexPage() {
    const { products, loading } = useStorefront();
    
    const unisexProducts = useMemo(() => {
        return products.filter(p => 
            p.category?.toLowerCase() === "unisex" || 
            p.tags?.some(t => t.toLowerCase() === "unisex")
        );
    }, [products]);

    return (
        <CategoryPageTemplate
            title="Unisex Fragrances"
            description="Versatile and unique scents crafted to be shared and enjoyed by everyone."
            products={unisexProducts}
            loading={loading}
        />
    );
}
