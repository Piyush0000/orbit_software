"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useStoreContext } from "@/context/store-context";
import ProductCard from "../ui/ProductCard";
import { products as staticProducts } from "@/lib/data";

export default function TrendingToys() {
    const { sections, loading: contextLoading } = useStoreContext();
    const [products, setProducts] = useState<any[]>([]);
    const [title, setTitle] = useState("Trending Toys");
    const [subtitle, setSubtitle] = useState("What everyone is playing with right now!");

    useEffect(() => {
        if (!contextLoading && sections) {
            const sectionConfig = Object.values(sections).find((s: any) => 
                s.type === 'best_sellers' || 
                s.id?.toLowerCase().includes('trending') || 
                s.title?.toLowerCase().includes('trending') ||
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
                setProducts(staticProducts);
            }
        }
    }, [sections, contextLoading]);

    if (contextLoading) return null;

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-2">
                            {title}
                        </h2>
                        <p className="text-gray-500">{subtitle}</p>
                    </div>
                    <Link
                        href="/shop"
                        className="hidden md:block text-primary font-bold hover:underline"
                    >
                        View All →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/shop"
                        className="text-primary font-bold hover:underline"
                    >
                        View All →
                    </Link>
                </div>
            </div>
        </section>
    );
}
