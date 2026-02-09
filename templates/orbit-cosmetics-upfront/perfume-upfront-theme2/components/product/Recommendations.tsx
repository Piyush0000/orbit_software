"use client";

import ProductCard from "@/components/ProductCard";
import { useStorefront } from "@/context/StorefrontContext";

interface RecommendationsProps {
    currentProductId: string;
}

export default function Recommendations({ currentProductId }: RecommendationsProps) {
    const { products, loading } = useStorefront();

    if (loading) return null;

    // Filter out current product and get first 4 as recommendations
    const recommendedProducts = products.filter(p => p.id !== currentProductId).slice(0, 4);

    if (recommendedProducts.length === 0) return null;

    return (
        <section className="py-32 border-t border-gray-100">
            <div className="text-center mb-20 space-y-4">
                <span className="text-gold-500 uppercase tracking-[0.4em] text-[10px] font-bold">Curated Selection</span>
                <h3 className="font-serif text-5xl text-gray-900 font-light italic">Recommended Scents</h3>
                <p className="text-gray-400 max-w-lg mx-auto font-light text-sm tracking-widest uppercase">Handpicked alternatives to expand your sensory collection.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
                {recommendedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
