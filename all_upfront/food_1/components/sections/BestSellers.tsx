"use client";

import { useState, useEffect } from 'react';
import { ProductCard } from "@/components/ProductCard"
import { products as staticAllProducts } from "@/lib/data"
import { useStoreContext } from "@/context/store-context"

export default function BestSellers() {
    const { sections, loading: contextLoading } = useStoreContext();
    const [products, setProducts] = useState<any[]>([]);
    const [title, setTitle] = useState("Best Sellers");
    const [subtitle, setSubtitle] = useState("Our community's most loved snacks and beverages.");

    const staticBestSellers = staticAllProducts.filter(p => p.badge === "Bestseller").slice(0, 4)

    useEffect(() => {
        if (!contextLoading && sections) {
            const sectionConfig = Object.values(sections).find((s: any) => 
                s.type === 'best_sellers' || 
                s.id?.toLowerCase().includes('best') || 
                s.title?.toLowerCase().includes('best') ||
                s.type === 'featured' ||
                s.id?.toLowerCase().includes('feat') ||
                s.title?.toLowerCase().includes('feat')
            ) as any;

            if (sectionConfig && sectionConfig.products && sectionConfig.products.length > 0) {
                setProducts(sectionConfig.products);
                if (sectionConfig.title) setTitle(sectionConfig.title);
                if (sectionConfig.subtitle) setSubtitle(sectionConfig.subtitle);
            } else {
                setProducts(staticBestSellers);
            }
        }
    }, [sections, contextLoading]);

    if (contextLoading) return null;

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-zinc-900 uppercase">
                            {title}
                        </h2>
                        <p className="max-w-[700px] text-zinc-500 md:text-xl">
                            {subtitle}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}
