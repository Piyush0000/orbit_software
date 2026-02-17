"use client";

import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

interface RecommendationsProps {
    currentProductId: string;
}

export default function Recommendations({ currentProductId }: RecommendationsProps) {
    // Filter out current product and get first 4 as recommendations
    const recommendedProducts = products.filter(p => p.id !== currentProductId).slice(0, 4);

    return (
        <section className="py-20 border-t border-[#2C2621]/10 mt-20">
            <div className="text-center mb-16">
                <h3 className="font-serif text-3xl md:text-5xl text-[#2C2621] mb-3">You May Also Like</h3>
                <p className="text-xs text-[#8D6E63] uppercase tracking-[0.2em]">Selected for you</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {recommendedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
