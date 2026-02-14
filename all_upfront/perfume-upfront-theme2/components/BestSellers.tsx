"use client";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useStoreContext } from "@/context/store-context";
import { products as staticProducts } from "@/lib/data";

const DEFAULT_PRODUCTS = staticProducts.slice(0, 4);

export default function BestSellers() {
    const { sections, loading: contextLoading } = useStoreContext();
    const [products, setProducts] = useState<any[]>([]);
    const [title, setTitle] = useState("Best Sellers & Trending");
    const [subtitle, setSubtitle] = useState("Our Collection");

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
                setProducts(DEFAULT_PRODUCTS);
            }
        }
    }, [sections, contextLoading]);

    if (contextLoading) return null;

    return (
        <section className="py-16 px-4 md:px-8 bg-white">
            <div className="container mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-gold-500 uppercase tracking-widest text-xs font-bold font-sans">{subtitle}</span>
                        <h2 className="text-3xl md:text-4xl font-serif mt-2 text-black">{title}</h2>
                    </div>
                    <a href="/shop" className="hidden md:block text-sm uppercase tracking-widest font-bold border-b border-black pb-1 hover:text-gold-600 hover:border-gold-600 transition-colors">
                        View All
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <a href="/shop" className="text-sm uppercase tracking-widest font-bold border-b border-black pb-1">
                        View All
                    </a>
                </div>
            </div>
        </section>
    );
}
