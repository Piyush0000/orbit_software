"use client";

import { products } from "@/lib/data";
import CategoryPageTemplate from "@/components/shop/CategoryPageTemplate";

export default function GiftSetsPage() {
    const giftSets = products.filter(p => p.tag === "Gift Set");

    return (
        <CategoryPageTemplate
            title="Gift Sets"
            description="Perfectly packaged presents for your loved ones, or a special treat for yourself."
            products={giftSets}
        />
    );
}
