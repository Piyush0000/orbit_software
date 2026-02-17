"use client";

import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/data";
import { useState } from "react";
import QuickViewModal from "@/components/shop/QuickViewModal";

interface CategoryPageTemplateProps {
    title: string;
    description?: string;
    products: Product[];
}

export default function CategoryPageTemplate({ title, description, products }: CategoryPageTemplateProps) {
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

    return (
        <main className="min-h-screen bg-[#F5F1E8]">
            <Header />

            {/* Added pt-44 to account for fixed header and prevent overlap */}
            <div className="bg-[#EAE5D8] pt-48 lg:pt-64 pb-16 border-b border-[#2C2621]/5">
                <div className="container mx-auto px-4 lg:px-8 text-center animate-fade-in">
                    <p className="text-[#8D6E63] uppercase tracking-widest text-xs font-medium mb-3">Collection</p>
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal mb-6 text-[#2C2621]">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-[#5D554A] max-w-2xl mx-auto tracking-wide text-sm md:text-base font-light leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-12 md:py-20">
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {products.map((product, index) => (
                            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                                <ProductCard
                                    product={product}
                                    onQuickView={setQuickViewProduct}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/50 border border-[#EAE5D8] rounded-sm">
                        <h3 className="text-xl font-serif text-[#2C2621] mb-2">No products found</h3>
                        <p className="text-[#5D554A]">We couldn't find any products in this category matching your criteria.</p>
                    </div>
                )}
            </div>

            {quickViewProduct && (
                <QuickViewModal
                    product={quickViewProduct}
                    isOpen={!!quickViewProduct}
                    onClose={() => setQuickViewProduct(null)}
                />
            )}
        </main>
    );
}
