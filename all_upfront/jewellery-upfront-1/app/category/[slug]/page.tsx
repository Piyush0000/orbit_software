import React from "react";
import { PRODUCTS } from "@/lib/data";
import { FilterSidebar } from "@/components/plp/FilterSidebar";
import { SortDropdown } from "@/components/plp/SortDropdown";
import { ProductCard } from "@/components/ProductCard";

export default function CategoryPage({ params }: { params: { slug: string } }) {
    // In a real app, we would fetch products based on params.slug
    // For now, we will just use all PRODUCTS for demo

    return (
        <div className="min-h-screen bg-background pt-20 pb-20">
            <div className="bg-secondary/30 py-12 mb-10">
                <div className="container mx-auto px-4 md:px-8 text-center">
                    <span className="text-gold tracking-[0.2em] font-medium uppercase text-sm animate-in fade-in slide-in-from-bottom-2 duration-500">Collection</span>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-2 capitalize animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                        Luxury Collection
                    </h1>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-light animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                        Explore our curated selection of fine jewellery, handcrafted for clarity, brilliance, and timeless elegance.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <FilterSidebar />

                    {/* Product Grid Area */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                            <p className="text-muted-foreground text-sm font-body">Showing {PRODUCTS.length} results</p>
                            <div className="flex items-center gap-4">
                                <SortDropdown />
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {PRODUCTS.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                            {/* Duplicate for demo density */}
                            {PRODUCTS.map((product) => (
                                <ProductCard key={`${product.id}-dup`} product={{ ...product, id: `${product.id}-dup` }} />
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="mt-16 text-center">
                            <button className="px-8 py-3 border border-border hover:border-gold hover:text-gold transition-colors uppercase tracking-widest text-sm font-medium">
                                Load More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
