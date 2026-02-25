import React from "react";
import { PRODUCTS } from "@/lib/data";
import { FilterSidebar } from "@/components/plp/FilterSidebar";
import { SortDropdown } from "@/components/plp/SortDropdown";
import { ProductCard } from "@/components/ProductCard";

export default function NewArrivalsPage() {
    // Filter for new products
    const newProducts = PRODUCTS.filter(p => p.isNew);

    return (
        <div className="min-h-screen bg-background pt-20 pb-20">
            <div className="bg-secondary/30 py-12 mb-10">
                <div className="container mx-auto px-4 md:px-8 text-center">
                    <span className="text-gold tracking-[0.2em] font-medium uppercase text-sm animate-in fade-in slide-in-from-bottom-2 duration-500">Just In</span>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-2 capitalize animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                        New Arrivals
                    </h1>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-light animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                        Be the first to wear our latest masterpieces. Fresh designs, timeless elegance.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar - Reusing existing sidebar for consistency */}
                    <FilterSidebar />

                    {/* Product Grid Area */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                            <p className="text-muted-foreground text-sm font-body">Showing {newProducts.length} results</p>
                            <div className="flex items-center gap-4">
                                <SortDropdown />
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {newProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                            {/* If few products, show some others with duplication for demo visual density if needed, generally avoid in real app */}
                            {newProducts.length < 3 && PRODUCTS.slice(0, 3).map((product) => (
                                <ProductCard key={`dup-${product.id}`} product={{ ...product, id: `dup-${product.id}` }} />
                            ))}
                        </div>

                        {newProducts.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-muted-foreground">No new arrivals at the moment. Check back soon!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
