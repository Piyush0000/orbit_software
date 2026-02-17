"use client";

import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";

export default function WishlistPage() {
    const { wishlist, clearWishlist } = useWishlist();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">My Wishlist</h1>
                {wishlist.length > 0 && (
                    <button
                        onClick={clearWishlist}
                        className="text-sm text-red-500 hover:text-red-700 font-medium hover:underline"
                    >
                        Clear Wishlist
                    </button>
                )}
            </div>

            {wishlist.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
                    <p className="text-gray-500 mb-8">Start adding some fun toys to your wishlist!</p>
                    <Link href="/" className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors">
                        Browse Toys
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {wishlist.map((product) => (
                        <ProductCard key={String(product.id)} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
