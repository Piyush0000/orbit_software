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
        <div className="bg-[#F5F1E8] min-h-screen pt-48 lg:pt-64 pb-16">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <p className="text-[#8D6E63] uppercase tracking-widest text-xs font-medium">Discover Your Scent</p>
                    <h1 className="text-4xl md:text-5xl font-serif text-[#2C2621]">All Fragrances</h1>
                    <p className="text-[#5D554A] max-w-2xl mx-auto font-light leading-relaxed">
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
                            className="w-full flex items-center justify-between border border-[#2C2621]/10 px-4 py-3 text-sm font-bold uppercase tracking-widest text-[#2C2621] bg-white"
                        >
                            <span>Filters</span>
                            <Filter className="w-4 h-4" />
                        </button>

                        {/* Mobile Sidebar (Collapsible) */}
                        {isMobileFiltersOpen && (
                            <div className="mt-4 p-4 border border-[#2C2621]/10 rounded-sm bg-white">
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
                            <button className="border-b-2 border-[#2C2621]/20 text-[#5D554A] pb-1 uppercase text-xs font-bold tracking-[0.2em] hover:text-[#2C2621] hover:border-[#2C2621] transition-colors">
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
