"use client";

import Image from "next/image";
import { Star, ShoppingBag, Heart, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/data";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
    product: Product;
    onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
    const { addToCart } = useCart();
    return (
        <div className="group relative bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300 rounded-sm overflow-hidden flex flex-col h-full">
            {/* Badges */}
            <div className="absolute top-2 left-2 z-20 flex flex-col gap-2">
                {product.tag && (
                    <span className="bg-gold-500 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                        {product.tag}
                    </span>
                )}
                <span className="bg-black/80 text-white text-[10px] font-medium px-2 py-1 uppercase tracking-widest backdrop-blur-sm">
                    {product.longevity}
                </span>
            </div>

            {/* Wishlist Button */}
            <button className="absolute top-2 right-2 z-20 p-2 bg-white/80 rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-colors opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0 duration-300 shadow-sm">
                <Heart className="w-4 h-4" />
            </button>

            {/* Image Area */}
            <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden cursor-pointer group">
                <Link href={`/shop/${product.slug}`} className="block h-full w-full relative">
                    {/* Main Image */}
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Hover Image */}
                    <Image
                        src={product.imageHover || product.image}
                        alt={`${product.name} Hover`}
                        fill
                        className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 scale-105 group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                        onClick={() => addToCart(product)}
                        className="w-full bg-black text-white py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-gold-600 transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                        <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 text-center flex flex-col flex-grow">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{product.brand}</p>
                <Link href={`/shop/${product.slug}`}>
                    <h3 className="font-serif text-lg text-gray-900 group-hover:text-gold-600 transition-colors mb-2 line-clamp-1">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={cn("w-3 h-3", i < Math.floor(product.rating) ? "text-gold-400 fill-gold-400" : "text-gray-300")}
                        />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">({product.rating})</span>
                </div>

                <div className="mt-auto">
                    {product.mrp > product.price ? (
                        <div className="flex items-center justify-center gap-2">
                            <p className="font-medium text-gray-900">₹{product.price.toLocaleString()}</p>
                            <p className="text-xs text-gray-400 line-through">₹{product.mrp.toLocaleString()}</p>
                        </div>
                    ) : (
                        <p className="font-medium text-gray-900">₹{product.price.toLocaleString()}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
