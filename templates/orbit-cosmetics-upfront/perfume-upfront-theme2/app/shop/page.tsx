"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductFilters from "@/components/shop/ProductFilters";
import FilterSidebar, { SelectedFilters } from "@/components/shop/FilterSidebar";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/shop/QuickViewModal";
import { useStorefront } from "@/context/StorefrontContext";
import { Product } from "@/types/product";
import { Filter, X, RefreshCw } from "lucide-react";

function ShopContent() {
    const { products, loading } = useStorefront();
    const searchParams = useSearchParams();
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    
    // Filter & Sort State
    const [sortBy, setSortBy] = useState("recommended");
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
        genders: [],
        brands: [],
        priceRanges: [],
        concentrations: []
    });

    // Initialize filters from URL
    useEffect(() => {
        const category = searchParams.get("category");
        const tag = searchParams.get("tag");
        const note = searchParams.get("note");
        const sort = searchParams.get("sort");

        if (category) {
            setSelectedFilters(prev => ({ ...prev, genders: [category] }));
        }
        if (tag || note) {
            const filterValue = tag || note;
            if (filterValue) {
                setSelectedFilters(prev => ({ ...prev, concentrations: [filterValue] })); // Use concentrations as a fallback for tags/notes
            }
        }
        if (sort) {
            setSortBy(sort);
        }
    }, [searchParams]);

    const handleQuickView = (product: Product) => {
        setSelectedProduct(product);
        setIsQuickViewOpen(true);
    };

    const handleFilterChange = (type: keyof SelectedFilters, value: string) => {
        setSelectedFilters(prev => {
            const current = prev[type];
            const updated = current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value];
            return { ...prev, [type]: updated };
        });
    };

    const handleClearAll = () => {
        setSelectedFilters({
            genders: [],
            brands: [],
            priceRanges: [],
            concentrations: []
        });
    };

    // Available Options derived from products
    const availableOptions = useMemo(() => {
        const brands = Array.from(new Set(products.map(p => p.brand).filter(Boolean))) as string[];
        const concentrations = Array.from(new Set(products.map(p => p.concentration || (p as any).tag).filter(Boolean))) as string[];
        return { brands: brands.sort(), concentrations: concentrations.sort() };
    }, [products]);

    // Filtering Logic
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // Gender Filter
            if (selectedFilters.genders.length > 0 && !selectedFilters.genders.includes(product.category || '')) {
                // Check if category matches or if it's in tags
                const matchesGender = selectedFilters.genders.some(g => 
                    product.category?.toLowerCase().includes(g.toLowerCase()) || 
                    product.tags?.some(t => t.toLowerCase().includes(g.toLowerCase()))
                );
                if (!matchesGender) return false;
            }

            // Brand Filter
            if (selectedFilters.brands.length > 0 && (!product.brand || !selectedFilters.brands.includes(product.brand))) {
                return false;
            }

            // Concentration Filter (mapping to tags if not explicitly present)
            if (selectedFilters.concentrations.length > 0) {
                const matchesConc = selectedFilters.concentrations.some(c => 
                    (product as any).concentration === c || 
                    product.tags?.includes(c)
                );
                if (!matchesConc) return false;
            }

            // Price Filter
            if (selectedFilters.priceRanges.length > 0) {
                const price = product.priceNum || 0;
                const matchesPrice = selectedFilters.priceRanges.some(range => {
                    if (range === 'under-3000') return price < 3000;
                    if (range === '3000-5000') return price >= 3000 && price <= 5000;
                    if (range === 'over-5000') return price > 5000;
                    return true;
                });
                if (!matchesPrice) return false;
            }

            return true;
        });
    }, [products, selectedFilters]);

    // Sorting Logic
    const sortedProducts = useMemo(() => {
        const sorted = [...filteredProducts];
        switch (sortBy) {
            case 'price-asc':
                return sorted.sort((a, b) => (a.priceNum || 0) - (b.priceNum || 0));
            case 'price-desc':
                return sorted.sort((a, b) => (b.priceNum || 0) - (a.priceNum || 0));
            case 'rating':
                return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            case 'newest':
                return sorted.sort((a, b) => {
                    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return dateB - dateA;
                });
            default:
                return sorted;
        }
    }, [filteredProducts, sortBy]);

    if (loading) {
        return (
            <div className="bg-white min-h-screen pt-40 pb-16 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-16 h-16 border-t-2 border-b-2 border-gold-500 rounded-full animate-spin mb-8" />
                    <p className="font-serif text-2xl text-gray-300 italic tracking-widest">Curating Collection...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-40 pb-32">
            <div className="container mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
                    <div className="max-w-3xl space-y-8">
                        <div className="inline-flex items-center gap-4">
                            <div className="h-[1px] w-12 bg-gold-400" />
                            <span className="text-gold-600 uppercase tracking-[0.4em] text-[10px] font-bold">The Scent Library</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-serif text-gray-900 font-light italic leading-tight">All Fragrances</h1>
                        <p className="text-gray-500 text-xl font-light leading-relaxed max-w-2xl border-l-2 border-gray-50 pl-8">
                            Explore our meticulously curated collection of luxury perfumes, crafted to evoke emotion and define your unique presence.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block">
                        <div className="sticky top-40">
                            <FilterSidebar 
                                selectedFilters={selectedFilters}
                                onFilterChange={handleFilterChange}
                                onClearAll={handleClearAll}
                                availableOptions={availableOptions}
                            />
                        </div>
                    </div>

                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden mb-12">
                        <button
                            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                            className="w-full flex items-center justify-between border border-gray-100 px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] bg-gray-50 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-500"
                        >
                            <span className="flex items-center gap-3"><Filter className="w-4 h-4 text-gold-600" /> Refine Selection</span>
                            {isMobileFiltersOpen ? <X className="w-4 h-4" /> : <RefreshCw className="w-4 h-4 text-gold-400" />}
                        </button>

                        {/* Mobile Sidebar (Collapsible) */}
                        {isMobileFiltersOpen && (
                            <div className="mt-8 p-10 bg-white border border-gray-50 rounded-[2.5rem] shadow-2xl animate-in fade-in slide-in-from-top-4 duration-700">
                                <FilterSidebar 
                                    selectedFilters={selectedFilters}
                                    onFilterChange={handleFilterChange}
                                    onClearAll={handleClearAll}
                                    availableOptions={availableOptions}
                                />
                                <button 
                                    onClick={() => setIsMobileFiltersOpen(false)}
                                    className="w-full mt-10 bg-black text-white py-4 rounded-full text-[10px] uppercase font-bold tracking-widest"
                                >
                                    Show {sortedProducts.length} Results
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Product Grid */}
                    <div className="lg:col-span-3">
                        <ProductFilters 
                            resultsCount={sortedProducts.length}
                            sortBy={sortBy}
                            onSortChange={setSortBy}
                        />

                        {sortedProducts.length === 0 ? (
                            <div className="text-center py-32 border border-dashed border-gray-200 rounded-[3rem] bg-gray-50/30">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                                    <X className="w-8 h-8 text-gray-300" />
                                </div>
                                <h3 className="font-serif text-3xl text-gray-400 italic mb-4">No fragrances found</h3>
                                <p className="text-gray-400 text-sm font-light uppercase tracking-widest mb-10">Adjust your criteria to explore other scents.</p>
                                <button 
                                    onClick={handleClearAll}
                                    className="px-12 py-4 bg-black text-white rounded-full text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-gold-600 transition-all shadow-xl"
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-10">
                                {sortedProducts.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onQuickView={handleQuickView}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Pagination / Load More */}
                        {sortedProducts.length > 0 && (
                            <div className="mt-32 text-center border-t border-gray-50 pt-20">
                                <button className="group relative px-16 py-5 bg-white border border-gray-100 rounded-full text-[10px] uppercase font-bold tracking-[0.4em] text-gray-900 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                                    <span className="relative z-10">Load More Scents</span>
                                    <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-black/5 rounded-full transition-all duration-500" />
                                </button>
                            </div>
                        )}
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

export default function ShopPage() {
    return (
        <Suspense fallback={
            <div className="bg-white min-h-screen pt-40 pb-16 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-16 h-16 border-t-2 border-b-2 border-gold-500 rounded-full animate-spin mb-8" />
                    <p className="font-serif text-2xl text-gray-300 italic tracking-widest">Curating Collection...</p>
                </div>
            </div>
        }>
            <ShopContent />
        </Suspense>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
