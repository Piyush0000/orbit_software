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
        <section className="py-20 border-t border-gray-100">
            <div className="text-center mb-12">
                <h3 className="font-serif text-3xl text-gray-900 mb-2">You May Also Like</h3>
                <p className="text-sm text-gray-500 uppercase tracking-widest">Selected for you</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
