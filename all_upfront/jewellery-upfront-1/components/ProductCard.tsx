"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

// Make interface loose enough to accept both old and new data shapes if needed, or strictly match the new one
interface Product {
    id: string | number;
    name: string;
    slug?: string;
    price: number;
    originalPrice?: number;
    // Support both new structure (via 'images.main') and legacy simple string 'image'
    image?: string;
    images?: {
        main: string;
        hover?: string;
    };
    isNew?: boolean;
}

export function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const router = useRouter();

    // Robustly resolve the main image. 
    // Priorities: product.images.main > product.image > Fallback Placeholder
    const mainImage = product.images?.main || product.image || "/images/placeholder-jewellery.jpg"; // You might want a real placeholder path
    const hoverImage = product.images?.hover || product.image || mainImage;

    // Guard against empty strings just in case data is malformed
    const safeMainImage = mainImage && mainImage.trim() !== "" ? mainImage : "/images/placeholder-jewellery.jpg";
    const safeHoverImage = hoverImage && hoverImage.trim() !== "" ? hoverImage : safeMainImage;

    const isWishlisted = isInWishlist(product.id.toString());

    return (
        <div className="group relative bg-card rounded-lg overflow-hidden border border-border/50 hover:shadow-lg hover:border-gold/30 transition-all duration-300">
            {/* Badge */}
            {product.isNew && (
                <span className="absolute top-2 left-2 z-20 bg-gold text-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider shadow-sm">
                    New Arrival
                </span>
            )}

            {/* Image Container */}
            <Link href={`/product/${product.slug || product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-gray-900">
                {/* Main Image */}
                <Image
                    src={safeMainImage}
                    alt={product.name}
                    fill
                    className={cn(
                        "object-cover transition-opacity duration-700 ease-in-out z-10",
                        safeHoverImage !== safeMainImage ? "group-hover:opacity-0" : "group-hover:scale-105"
                    )}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Back Image (Hover) */}
                {safeHoverImage !== safeMainImage && (
                    <Image
                        src={safeHoverImage}
                        alt={`${product.name} Hover`}
                        fill
                        className="object-cover absolute inset-0 z-0 scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                )}

                {/* Overlay Actions */}
                <div className="absolute inset-0 z-20 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 pointer-events-none group-hover:pointer-events-auto">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product as any);
                        }}
                        className="p-3 bg-white text-black rounded-full hover:bg-gold hover:text-black transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 shadow-lg flex items-center justify-center cursor-pointer"
                    >
                        <ShoppingBag className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white text-black rounded-full hover:bg-gold hover:text-black transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-100 shadow-lg flex items-center justify-center cursor-pointer">
                        <Eye className="w-5 h-5" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(product as any);
                        }}
                        className={cn(
                            "p-3 bg-white rounded-full hover:bg-gold hover:text-black transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-150 shadow-lg flex items-center justify-center cursor-pointer",
                            isWishlisted ? "text-red-500 fill-current" : "text-black"
                        )}
                    >
                        <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
                    </button>
                </div>
            </Link>

            {/* Content */}
            <div className="p-4 text-center">
                <Link href={`/product/${product.slug || product.id}`}>
                    <h3 className="text-foreground font-body font-medium text-sm mb-2 line-clamp-1 group-hover:text-gold transition-colors block">
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-center justify-center gap-2">
                    <span className="text-foreground font-bold font-heading">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                        <span className="text-muted-foreground text-xs line-through">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                </div>

                {/* Mobile Quick Add (Visible on desktop too if desired, or handle differently) */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        addToCart(product as any);
                    }}
                    className="w-full mt-3 py-2 text-xs uppercase tracking-widest font-bold border border-foreground/10 hover:bg-black hover:text-gold hover:border-gold transition-colors md:hidden cursor-pointer"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
