"use client";

import { products } from "@/lib/data";
import CategoryPageTemplate from "@/components/shop/CategoryPageTemplate";

export default function UnisexPage() {
    const unisexProducts = products.filter(p => p.gender === "Unisex");

    return (
        <CategoryPageTemplate
            title="Unisex Fragrances"
            description="Versatile and unique scents crafted to be shared and enjoyed by everyone."
            products={unisexProducts}
        />
    );
}
