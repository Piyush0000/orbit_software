"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { useStorefront } from "@/context/StorefrontContext";

export default function CategoryPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const [showFilters, setShowFilters] = useState(false);
    const { products, loading, categoryConfig } = useStorefront();
    const enabledFilters = (categoryConfig as { filters?: string[] } | null)?.filters || ["price", "age", "material"];
    const enabledFilterSet = new Set(enabledFilters);
    const ageOptions = Array.from(new Set(products.map((product) => product.age).filter(Boolean))) as string[];
    const materialOptions: string[] = [];

    // Format slug for title
    const title = slug
        ? slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())
        : "All Toys";

    const filteredProducts = useMemo(() => {
        if (!slug || slug === "all") return products;
        return products.filter((product) =>
            (product.category || "").toLowerCase().includes(slug.toLowerCase())
        );
    }, [products, slug]);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header Banner */}
            <div className="bg-white border-b border-gray-200 pt-12 pb-8 px-4">
                <div className="container mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4">{title}</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Home</span> / <span className="text-primary font-medium">{title}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filters - Desktop */}
                    <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-gray-900">Filters</h3>
                                <button className="text-sm text-primary hover:underline">Reset</button>
                            </div>

                            {/* Price Range */}
                            {enabledFilterSet.has("price") && (
                                <div className="mb-8">
                                <h4 className="font-semibold text-sm mb-4">Price Range</h4>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                                        <input type="checkbox" className="rounded text-primary focus:ring-primary cursor-pointer" />
                                        <span className="text-sm text-gray-600">Under ₹500</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                                        <input type="checkbox" className="rounded text-primary focus:ring-primary cursor-pointer" />
                                        <span className="text-sm text-gray-600">₹500 - ₹1000</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                                        <input type="checkbox" className="rounded text-primary focus:ring-primary cursor-pointer" />
                                        <span className="text-sm text-gray-600">₹1000 - ₹2000</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                                        <input type="checkbox" className="rounded text-primary focus:ring-primary cursor-pointer" />
                                        <span className="text-sm text-gray-600">₹2000+</span>
                                    </label>
                                </div>
                                </div>
                            )}

                            {/* Age Group */}
                            {enabledFilterSet.has("age") && (
                                <div className="mb-8">
                                <h4 className="font-semibold text-sm mb-4">Age Group</h4>
                                <div className="space-y-2">
                                    {(ageOptions.length ? ageOptions : ["0-2 Years", "3-5 Years", "6-8 Years", "9-12 Years", "Teens"]).map((age) => (
                                        <label key={age} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                                            <input type="checkbox" className="rounded text-primary focus:ring-primary cursor-pointer" />
                                            <span className="text-sm text-gray-600">{age}</span>
                                        </label>
                                    ))}
                                </div>
                                </div>
                            )}

                            {/* Material */}
                            {enabledFilterSet.has("material") && (
                                <div>
                                <h4 className="font-semibold text-sm mb-4">Material</h4>
                                <div className="space-y-2">
                                    {(materialOptions.length ? materialOptions : ["Wood", "Plastic", "Plush", "Metal", "Eco-friendly"]).map((mat) => (
                                        <label key={mat} className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                                            <input type="checkbox" className="rounded text-primary focus:ring-primary cursor-pointer" />
                                            <span className="text-sm text-gray-600">{mat}</span>
                                        </label>
                                    ))}
                                </div>
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <button
                                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                            </button>

                            <p className="text-sm text-gray-500">Showing 12 results</p>

                            <div className="flex items-center gap-2 ml-auto">
                                <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
                                <div className="relative">
                                    <select className="appearance-none bg-white border border-gray-200 pl-4 pr-8 py-2 rounded-lg text-sm font-medium focus:outline-none focus:border-primary cursor-pointer">
                                        <option>Recommended</option>
                                        <option>Newest</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {loading ? (
                                <div className="col-span-full text-center text-gray-500">Loading products...</div>
                            ) : (
                                filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
