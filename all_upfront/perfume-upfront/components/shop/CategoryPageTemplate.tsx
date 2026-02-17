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
        <main className="min-h-screen bg-white">
            <Header />

            <div className="bg-gray-50 py-12 md:py-16">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4 animate-fade-in text-gray-900">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-gray-500 max-w-2xl mx-auto uppercase tracking-wide text-xs md:text-sm animate-fade-in delay-100">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16">
                {products.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
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
                    <div className="text-center py-20">
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                        <p className="text-gray-500">We couldn't find any products in this category matching your criteria.</p>
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
