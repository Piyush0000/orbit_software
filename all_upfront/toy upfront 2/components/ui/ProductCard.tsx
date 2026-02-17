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
            colors: ['#88D498', '#F4A261', '#E0C3FC', '#FFF9F5'],
            disableForReducedMotion: true
        });
    };

    return (
        <motion.div
            whileHover={{ y: -8, rotateX: 2, rotateY: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group bg-white rounded-[2rem] border border-muted/60 hover:border-primary/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] relative flex flex-col h-full cursor-pointer overflow-hidden transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
        >
            {/* Image Area */}
            <div className="relative aspect-square overflow-hidden bg-muted/30 p-2">
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />

                {product.badge && (
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-primary text-xs font-bold px-3 py-1.5 rounded-full z-20 shadow-sm border border-primary/10">
                        {product.badge}
                    </span>
                )}

                <Link href={`/product/${product.id}`} className="absolute inset-2 rounded-[1.5rem] overflow-hidden flex items-center justify-center bg-white z-0">
                    {/* Placeholder/Image */}
                    {product.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                        <span className="text-muted-foreground/40 font-bold tracking-wider">[Image]</span>
                    )}
                </Link>

                {/* Hover Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300 pointer-events-auto z-20">
                    <button
                        onClick={handleWishlistClick}
                        className={`p-2.5 rounded-full shadow-lg transition-all active:scale-95 ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-red-500 hover:bg-white'}`}
                    >
                        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
                <div className="text-xs text-primary font-bold mb-2 uppercase tracking-wide">Age {product.age} Years</div>
                <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2 font-display">
                    <Link href={`/product/${product.id}`}>{product.name}</Link>
                </h3>

                <div className="flex items-center mb-4 gap-1">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                        ))}
                    </div>
                    <span className="text-xs text-muted-foreground font-medium ml-2">({product.reviews})</span>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-muted/40">
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-extrabold text-foreground">₹{product.price}</span>
                        {product.originalPrice && (
                            <span className="text-sm text-muted-foreground/60 line-through">₹{product.originalPrice}</span>
                        )}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="h-10 w-10 bg-primary text-white rounded-full hover:bg-secondary transition-all duration-300 flex items-center justify-center shadow-md group-hover:shadow-lg hover:scale-105 active:scale-95 z-20 relative"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
