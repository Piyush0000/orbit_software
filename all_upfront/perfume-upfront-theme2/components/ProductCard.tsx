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
        <div className="group relative bg-white border-none hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden flex flex-col h-full transform hover:-translate-y-2">
            {/* Badges */}
            <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                {product.tag && (
                    <span className="bg-gold-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                        {product.tag}
                    </span>
                )}
                <span className="bg-white/90 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-md shadow-sm">
                    {product.longevity}
                </span>
            </div>

            {/* Wishlist Button */}
            <button className="absolute top-3 right-3 z-20 p-2.5 bg-white rounded-full text-gray-400 hover:text-red-500 hover:shadow-md transition-all duration-300 shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0">
                <Heart className="w-4 h-4" />
            </button>

            {/* Image Area */}
            <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden cursor-pointer">
                <Link href={`/shop/${product.slug}`} className="block h-full w-full relative">
                    {/* Main Image */}
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Hover Image */}
                    <Image
                        src={product.imageHover || product.image}
                        alt={`${product.name} Hover`}
                        fill
                        className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </Link>

                {/* Quick Actions - Floating Pill */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                    <button
                        onClick={() => onQuickView?.(product)}
                        className="flex-1 bg-white/95 text-black py-2.5 rounded-full text-[10px] uppercase font-bold tracking-widest hover:bg-black hover:text-white transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        <Eye className="w-3.5 h-3.5" /> View
                    </button>
                    <button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-gold-500 text-white py-2.5 rounded-full text-[10px] uppercase font-bold tracking-widest hover:bg-gold-600 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        <ShoppingBag className="w-3.5 h-3.5" /> Add
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 text-center flex flex-col flex-grow bg-white relative z-10">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1.5 font-bold">{product.brand}</p>
                <Link href={`/shop/${product.slug}`}>
                    <h3 className="font-serif text-lg text-gray-900 group-hover:text-gold-500 transition-colors mb-2 line-clamp-1">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={cn("w-3 h-3", i < Math.floor(product.rating) ? "text-gold-400 fill-gold-400" : "text-gray-200")}
                        />
                    ))}
                    <span className="text-xs text-gray-400 ml-1 font-medium">({product.rating})</span>
                </div>

                <div className="mt-auto pt-2 border-t border-gray-50">
                    {product.mrp > product.price ? (
                        <div className="flex items-center justify-center gap-2">
                            <p className="font-bold text-gray-900 text-base">₹{product.price.toLocaleString()}</p>
                            <p className="text-xs text-gray-400 line-through">₹{product.mrp.toLocaleString()}</p>
                        </div>
                    ) : (
                        <p className="font-bold text-gray-900 text-base">₹{product.price.toLocaleString()}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
