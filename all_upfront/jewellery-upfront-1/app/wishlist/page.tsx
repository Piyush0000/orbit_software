"use client";

import React from "react";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function WishlistPage() {
    const { wishlistItems } = useWishlist();

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col items-center text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">Your Wishlist</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Keep track of the pieces you love.
                    </p>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 bg-secondary/30 rounded-full flex items-center justify-center mb-6">
                            <Heart className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h2 className="text-2xl font-heading font-bold mb-2">Your wishlist is empty</h2>
                        <p className="text-muted-foreground mb-8">Start saving your favourite pieces to build your collection.</p>
                        <Link href="/category/necklaces">
                            <Button className="bg-gold text-black hover:bg-gold/90 px-8 py-6 text-lg">
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {wishlistItems.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
