"use client";

import { useState } from "react";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductFilters from "@/components/shop/ProductFilters";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/shop/QuickViewModal";
import { products, Product } from "@/lib/data";
import { Filter } from "lucide-react";

export default function ShopPage() {
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const handleQuickView = (product: Product) => {
        setSelectedProduct(product);
        setIsQuickViewOpen(true);
    };

    return (
        <div className="bg-white min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <p className="text-gold-500 uppercase tracking-widest text-sm font-medium">Discover Your Scent</p>
                    <h1 className="text-4xl md:text-5xl font-serif text-gray-900">All Fragrances</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto font-light">
                        Explore our curated collection of luxury perfumes, crafted to evoke emotion and memory. Find your signature scent today.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block">
                        <FilterSidebar />
                    </div>

                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden mb-6">
                        <button
                            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                            className="w-full flex items-center justify-between border border-black px-4 py-3 text-sm font-bold uppercase tracking-widest"
                        >
                            <span>Filters</span>
                            <Filter className="w-4 h-4" />
                        </button>

                        {/* Mobile Sidebar (Collapsible) */}
                        {isMobileFiltersOpen && (
                            <div className="mt-4 p-4 border border-gray-100 rounded-sm">
                                <FilterSidebar />
                            </div>
                        )}
                    </div>

                    {/* Product Grid */}
                    <div className="lg:col-span-3">
                        <ProductFilters />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6">
                            {products.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onQuickView={handleQuickView}
                                />
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="mt-16 text-center">
                            <button className="border-b-2 border-black text-black pb-1 uppercase text-sm font-bold tracking-widest hover:text-gold-600 hover:border-gold-600 transition-colors">
                                Load More Products
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick View Modal */}
            <QuickViewModal
                product={selectedProduct}
                isOpen={isQuickViewOpen}
                onClose={() => setIsQuickViewOpen(false)}
            />
        </div>
    );
}
