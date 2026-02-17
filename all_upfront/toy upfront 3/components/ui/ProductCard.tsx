"use client";

import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

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

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Confetti explosion from the cursor or center
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            particleCount: 80,
            spread: 60,
            origin: { x, y },
            colors: ['#FFCA28', '#FF7043', '#26C6DA', '#FFFFFF'],
            disableForReducedMotion: true
        });
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group bg-white rounded-[1.5rem] border border-gray-100 hover:border-primary/50 shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] relative flex flex-col h-full cursor-pointer overflow-hidden transition-all duration-300"
        >
            {/* Image Area */}
            <div className="relative aspect-square overflow-hidden bg-gray-50 m-2 rounded-2xl group-hover:bg-primary/5 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />

                {product.badge && (
                    <span className="absolute top-3 left-3 bg-secondary text-white text-[10px] uppercase font-black px-2.5 py-1 rounded-md z-20 shadow-md tracking-wider">
                        {product.badge}
                    </span>
                )}

                <Link href={`/product/${product.id}`} className="absolute inset-0 z-0">
                    {/* Placeholder/Image */}
                    {product.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <span className="font-bold text-4xl opacity-20">🧸</span>
                        </div>
                    )}
                </Link>

                {/* Hover Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300 pointer-events-auto z-20">
                    <button
                        onClick={handleWishlistClick}
                        className={`p-2 rounded-full shadow-md transition-all active:scale-90 hover:scale-110 ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-red-500 hover:bg-white'}`}
                    >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 pt-2 flex-1 flex flex-col">
                <div className="text-[10px] text-primary font-extrabold mb-1 uppercase tracking-wider bg-primary/10 w-fit px-2 py-0.5 rounded-full">Age {product.age} Years</div>
                <h3 className="font-bold text-gray-800 text-base mb-1.5 group-hover:text-secondary transition-colors line-clamp-2 leading-tight">
                    <Link href={`/product/${product.id}`}>{product.name}</Link>
                </h3>

                <div className="flex items-center mb-3 gap-1">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                        ))}
                    </div>
                    <span className="text-xs text-gray-400 font-medium ml-1">({product.reviews})</span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3 border-t border-dashed border-gray-100">
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-lg font-black text-gray-900">₹{product.price}</span>
                            {product.originalPrice && (
                                <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="h-9 px-4 bg-gray-900 text-white rounded-full hover:bg-primary hover:text-gray-900 transition-all duration-300 flex items-center gap-2 text-xs font-bold shadow-sm group-hover:shadow-[0_5px_15px_rgba(255,204,0,0.4)] active:scale-95 z-20 relative"
                    >
                        <span>Add</span>
                        <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
