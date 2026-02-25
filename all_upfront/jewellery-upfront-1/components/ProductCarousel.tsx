"use client";

import React, { useRef, useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StorefrontAPI } from "@/lib/api";
import { useStoreContext } from "@/context/store-context";

const SAMPLE_PRODUCTS = [
    { id: 1, name: "Diamond Solitaire Ring", price: 14999, originalPrice: 18999, image: "https://images.unsplash.com/photo-1605100804763-ebea643341d5?q=80&w=800&auto=format&fit=crop", isNew: true },
    { id: 2, name: "Gold Layered Necklace", price: 2999, image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=800&auto=format&fit=crop", isNew: true },
    { id: 3, name: "Pearl Drop Earrings", price: 1299, originalPrice: 1999, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop", isNew: true },
    { id: 4, name: "Rose Gold Bracelet", price: 3499, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop", isNew: true },
    { id: 5, name: "Emerald Studs", price: 8999, originalPrice: 12999, image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=800&auto=format&fit=crop", isNew: true },
    { id: 6, name: "Kundan Choker Set", price: 24999, image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800&auto=format&fit=crop", isNew: true },
];

interface ProductCarouselProps {
    title: string;
    subtitle?: string;
    products?: any[];
}

export function ProductCarousel({ title, subtitle, products: initialProducts }: ProductCarouselProps) {
    const { sections, loading: contextLoading } = useStoreContext();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [products, setProducts] = useState<any[]>(initialProducts || []);
    const [displayTitle, setDisplayTitle] = useState(title);
    const [displaySubtitle, setDisplaySubtitle] = useState(subtitle || "Shop The Latest");

    useEffect(() => {
        if (!initialProducts && !contextLoading && sections) {
            // Try to find a section that matches the intended content
            const sectionConfig = Object.values(sections).find((s: any) => 
                s.type === 'new_arrivals' || 
                s.type === 'featured' ||
                s.title?.toLowerCase().includes(title.toLowerCase()) ||
                s.id?.toLowerCase().includes(title.toLowerCase())
            ) as any;

            if (sectionConfig && sectionConfig.products && sectionConfig.products.length > 0) {
                setProducts(sectionConfig.products);
                if (sectionConfig.title) setDisplayTitle(sectionConfig.title);
                if (sectionConfig.subtitle) setDisplaySubtitle(sectionConfig.subtitle);
            } else if (products.length === 0) {
                setProducts(SAMPLE_PRODUCTS);
            }
        }
    }, [initialProducts, title, sections, contextLoading]);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="py-16 md:py-24 bg-background/50 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-end justify-between mb-12">
                    <div className="animate-in fade-in slide-in-from-left-8 duration-700">
                        <span className="text-amber-500 tracking-[0.2em] font-medium uppercase text-sm block mb-2">{displaySubtitle}</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">{displayTitle}</h2>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => scroll("left")} className="p-2 border border-foreground/20 rounded-full hover:bg-foreground hover:text-background transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={() => scroll("right")} className="p-2 border border-foreground/20 rounded-full hover:bg-foreground hover:text-background transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {contextLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <p className="text-foreground/50 animate-pulse">Discovering elegance...</p>
                    </div>
                ) : (
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
                        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                    >
                        {products.map((product) => (
                            <div key={product.id} className="min-w-[260px] md:min-w-[300px] snap-start">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
