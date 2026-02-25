"use client";

import React, { useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import { ProductGallery } from "@/components/pdp/ProductGallery";
import { ProductInfo } from "@/components/pdp/ProductInfo";
import { VariantSelector } from "@/components/pdp/VariantSelector";
import { ProductTabs } from "@/components/pdp/ProductTabs";
import { RelatedProducts } from "@/components/pdp/RelatedProducts";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    // In a real app we'd fetch or use the slug properly.
    // For demo, we just pick the first product or find one matching.
    const resolvedParams = React.use(params);
    const product = PRODUCTS.find((p) => p.slug === resolvedParams.slug) || PRODUCTS[0];
    const [selectedSize, setSelectedSize] = useState<string>("7");
    const [selectedColor, setSelectedColor] = useState<string>("Yellow Gold");
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const router = useRouter();

    if (!product) {
        return notFound();
    }

    const isWishlisted = isInWishlist(product.id.toString());

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-8">
                {/* Breadcrumb - Simple Custom Implementation for now */}
                <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
                    <a href="/" className="hover:text-gold transition-colors">Home</a>
                    <span>/</span>
                    <a href={`/category/${product.category}`} className="hover:text-gold transition-colors capitalize">{product.category}</a>
                    <span>/</span>
                    <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Left Col: Gallery */}
                    <div className="w-full">
                        <ProductGallery images={product.images} />
                    </div>

                    {/* Right Col: Info & Actions */}
                    <div className="flex flex-col h-full">
                        <div className="flex-1 space-y-8">
                            {product.isNew && <Badge variant="gold" className="mb-2">New Arrival</Badge>}

                            <ProductInfo product={product} />

                            <div className="h-px bg-border/50 w-full" />

                            <VariantSelector />

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                <Button
                                    className="flex-1 bg-gold hover:bg-gold/90 text-black font-heading font-bold uppercase tracking-wider h-14 text-sm"
                                    size="lg"
                                    onClick={() => addToCart(product, 1, selectedColor, selectedSize)}
                                >
                                    <ShoppingBag className="w-5 h-5 mr-2" />
                                    Add to Bag
                                </Button>
                                <Button
                                    variant="outline"
                                    className={cn("h-14 w-14 border-border hover:border-gold hover:text-gold hover:bg-transparent", isWishlisted && "text-red-500 border-red-500 hover:border-red-600 hover:text-red-600")}
                                    size="icon"
                                    onClick={() => {
                                        toggleWishlist(product);
                                        router.push("/wishlist");
                                    }}
                                >
                                    <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Tabs */}
                <ProductTabs product={product} />

                {/* Related Products */}
                <div className="mt-16 border-t border-border/50 pt-16">
                    <RelatedProducts currentProduct={product} allProducts={PRODUCTS} />
                </div>

            </div>
        </div>
    );
}
