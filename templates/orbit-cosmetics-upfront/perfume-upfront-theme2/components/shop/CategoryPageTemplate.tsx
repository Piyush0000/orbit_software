"use client";

import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";
import { useState } from "react";
import QuickViewModal from "@/components/shop/QuickViewModal";
import { motion } from "framer-motion";

interface CategoryPageTemplateProps {
    title: string;
    description?: string;
    products: Product[];
    loading?: boolean;
}

export default function CategoryPageTemplate({ title, description, products, loading }: CategoryPageTemplateProps) {
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

    if (loading) {
        return (
            <div className="bg-white min-h-screen pt-40 pb-16 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-16 h-16 border-t-2 border-b-2 border-gold-500 rounded-full animate-spin mb-8" />
                    <p className="font-serif text-2xl text-gray-300 italic tracking-widest">Opening Collection...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white pt-40 pb-32">
            <div className="container mx-auto px-6 lg:px-12">
                {/* Dynamic Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-4xl mb-24 space-y-8"
                >
                    <div className="inline-flex items-center gap-4">
                        <div className="h-[1px] w-12 bg-gold-400" />
                        <span className="text-gold-600 uppercase tracking-[0.4em] text-[10px] font-bold">Curated Selection</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-serif text-gray-900 font-light italic leading-tight">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-gray-500 text-xl font-light leading-relaxed max-w-2xl border-l-2 border-gray-50 pl-8">
                            {description}
                        </p>
                    )}
                </motion.div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-24">
                        {products.map((product, index) => (
                            <motion.div 
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.8 }}
                            >
                                <ProductCard
                                    product={product}
                                    onQuickView={setQuickViewProduct}
                                />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 border border-dashed border-gray-100 rounded-[3.5rem] bg-gray-50/30">
                        <h3 className="font-serif text-3xl text-gray-300 italic mb-4">No fragrances found</h3>
                        <p className="text-gray-400 text-sm font-light uppercase tracking-widest">Discover our other collections meanwhile.</p>
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
