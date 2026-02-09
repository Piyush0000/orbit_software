"use client";
import { Star, ShoppingBag, Heart, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
    product: Product;
    onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
    const { addToCart } = useCart();
    // Default values for missing properties
    const rating = product.rating || 4.5;
    
    return (
        <div className="group relative bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300 rounded-sm overflow-hidden flex flex-col h-full">
            {/* Badges */}
            <div className="absolute top-2 left-2 z-20 flex flex-col gap-2">
                {product.badge && (
                    <span className="bg-gold-500 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                        {product.badge}
                    </span>
                )}
                {product.discount && (
                    <span className="bg-black/80 text-white text-[10px] font-medium px-2 py-1 uppercase tracking-widest backdrop-blur-sm">
                        {product.discount}% OFF
                    </span>
                )}
            </div>

            {/* Wishlist Button */}
            <button className="absolute top-2 right-2 z-20 p-2 bg-white/80 rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-colors opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0 duration-300 shadow-sm">
                <Heart className="w-4 h-4" />
            </button>

            {/* Image Area */}
            <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden cursor-pointer group">
                <Link href={`/products/${product.id}`} className="block h-full w-full relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={product.image || (product.images && product.images[0]) || '/placeholder.png'}
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                </Link>

                {/* Quick Actions */}
                <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-1 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                        onClick={() => onQuickView?.(product)}
                        className="w-full bg-white/95 text-black py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                        <Eye className="w-3.5 h-3.5" /> Quick View
                    </button>
                    <button
                        onClick={() => addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            priceNum: product.priceNum,
                            image: product.image,
                            quantity: 1
                        })}
                        className="w-full bg-black text-white py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-gold-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                        <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 text-center flex flex-col flex-grow">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{product.brand || 'Luxury Fragrance'}</p>
                <Link href={`/products/${product.id}`}>
                    <h3 className="font-serif text-lg text-gray-900 group-hover:text-gold-600 transition-colors mb-2 line-clamp-1 uppercase">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={cn("w-3 h-3", i < Math.floor(rating) ? "text-gold-400 fill-gold-400" : "text-gray-300")}
                        />
                    ))}
                    <span className="text-[10px] text-gray-400 ml-1">({product.reviewCount || 0})</span>
                </div>

                <div className="mt-auto">
                    {product.originalPriceNum && product.originalPriceNum > product.priceNum ? (
                        <div className="flex items-center justify-center gap-2">
                            <p className="font-bold text-gray-900 tracking-tighter">{product.price}</p>
                            <p className="text-xs text-gray-400 line-through tracking-tighter">{product.originalPrice}</p>
                        </div>
                    ) : (
                        <p className="font-bold text-gray-900 tracking-tighter">{product.price}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
