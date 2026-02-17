
"use client";

import { useState, useMemo } from "react";
import { ProductFilters } from "@/components/shop/ProductFilters";
import { ProductCard } from "@/components/shop/ProductCard";
import { products, filters } from "@/lib/products"; // Import filters to access price ranges
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function ShopPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
    const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            // Category Filter
            if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
                return false;
            }

            // Skin Type Filter (Product must match AT LEAST ONE selected skin type)
            // If selectedSkinTypes is empty, don't filter.
            if (selectedSkinTypes.length > 0) {
                const hasMatch = product.skinType.some(type => selectedCategories.includes(type) || selectedSkinTypes.includes(type));
                // Wait, product.skinType is string[]. We check if any of selectedSkinTypes is in product.skinType
                const match = product.skinType.some(type => selectedSkinTypes.includes(type));
                if (!match) return false;
            }

            // Product Type Filter
            if (selectedProductTypes.length > 0 && !selectedProductTypes.includes(product.productType)) {
                return false;
            }

            // Price Filter
            if (selectedPriceRanges.length > 0) {
                const matchesPrice = selectedPriceRanges.some((rangeIdx) => {
                    const range = filters.priceRanges[rangeIdx];
                    return product.price >= range.min && product.price <= range.max;
                });
                if (!matchesPrice) return false;
            }

            return true;
        });
    }, [selectedCategories, selectedSkinTypes, selectedProductTypes, selectedPriceRanges]);

    return (
        <div className="bg-background min-h-screen pb-20">
            {/* Header / Breadcrumb Area */}
            <div className="bg-secondary/30 py-12 px-4 mb-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Shop All</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Discover clean, effective beauty essentials designed to enhance your natural radiance.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Desktop Sidebar Filters */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <ProductFilters
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                            selectedSkinTypes={selectedSkinTypes}
                            setSelectedSkinTypes={setSelectedSkinTypes}
                            selectedProductTypes={selectedProductTypes}
                            setSelectedProductTypes={setSelectedProductTypes}
                            selectedPriceRanges={selectedPriceRanges}
                            setSelectedPriceRanges={setSelectedPriceRanges}
                        />
                    </aside>

                    {/* Mobile Filters Trigger */}
                    <div className="lg:hidden flex justify-between items-center mb-6">
                        <span className="font-medium text-sm text-muted-foreground">{filteredProducts.length} Products</span>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2">
                                    <SlidersHorizontal className="w-4 h-4" /> Filters
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] overflow-y-auto">
                                <div className="py-6 px-6">
                                    <ProductFilters
                                        selectedCategories={selectedCategories}
                                        setSelectedCategories={setSelectedCategories}
                                        selectedSkinTypes={selectedSkinTypes}
                                        setSelectedSkinTypes={setSelectedSkinTypes}
                                        selectedProductTypes={selectedProductTypes}
                                        setSelectedProductTypes={setSelectedProductTypes}
                                        selectedPriceRanges={selectedPriceRanges}
                                        setSelectedPriceRanges={setSelectedPriceRanges}
                                    />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Product Grid */}
                    <main className="flex-1">
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-20">
                                <h3 className="text-lg font-medium text-muted-foreground">No products found matching your filters.</h3>
                                <Button
                                    variant="link"
                                    onClick={() => {
                                        setSelectedCategories([]);
                                        setSelectedSkinTypes([]);
                                        setSelectedProductTypes([]);
                                        setSelectedPriceRanges([]);
                                    }}
                                    className="mt-2 text-primary"
                                >
                                    Clear all filters
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
