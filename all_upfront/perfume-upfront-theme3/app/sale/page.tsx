"use client";

import { products } from "@/lib/data";
import CategoryPageTemplate from "@/components/shop/CategoryPageTemplate";

export default function SalePage() {
    const saleProducts = products.filter(p => p.tag === "Sale" || p.price < p.mrp);

    return (
        <CategoryPageTemplate
            title="Exclusive Sale"
            description="Don't miss out on these incredible offers on your favorite scents."
            products={saleProducts}
        />
    );
}
