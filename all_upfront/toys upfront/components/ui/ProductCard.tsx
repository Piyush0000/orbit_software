"use client";

import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

interface Product {
    id: number | string;
    name: string;
    price: number;
    rating: number;
    reviews: number;
    image?: string;
    age: string;
    badge?: string | null;
    originalPrice?: number;
}

export default function ProductCard({ product }: { product: Product }) {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <div className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 relative flex flex-col h-full cursor-pointer">
            {/* Image Area */}
            <div className="relative aspect-square rounded-t-2xl overflow-hidden bg-gray-50">
                {product.badge && (
                    <span className="absolute top-3 left-3 bg-accent text-gray-900 text-xs font-bold px-3 py-1 rounded-full z-10">
                        {product.badge}
                    </span>
                )}
                <Link href={`/product/${product.id}`} className="absolute inset-0 flex items-center justify-center text-gray-300">
                    {/* Placeholder/Image */}
                    {product.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-gray-400">[Image]</span>
                    )}
                </Link>

                {/* Hover Actions */}
                <div className="absolute right-3 top-3 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300 pointer-events-auto">
                    <button
                        onClick={handleWishlistClick}
                        className={`p-2 rounded-full shadow-md transition-colors ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:bg-red-50 hover:text-red-500'}`}
                    >
                        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                <div className="text-xs text-gray-400 font-medium mb-1">Age {product.age} Years</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={`/product/${product.id}`}>{product.name}</Link>
                </h3>

                <div className="flex items-center mb-4">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-gray-700 ml-1">{product.rating}</span>
                    <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                </div>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                        {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                        )}
                    </div>
                    <button className="p-2.5 bg-gray-900 text-white rounded-xl hover:bg-primary transition-colors flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
