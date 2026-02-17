"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/data";
import { ShoppingBag, Eye } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
    product: Product;
    onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <div className="group relative">
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[#fffdf9] mb-6 transition-all duration-500">
                <Link href={`/shop/${product.slug}`}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#2C2621]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>

                {/* Quick Actions - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex gap-2">
                    <button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-[#2C2621] text-white py-3 text-[10px] uppercase font-bold tracking-widest hover:bg-[#4A4238] transition-colors"
                    >
                        Add to Cart
                    </button>
                    {onQuickView && (
                        <button
                            onClick={() => onQuickView(product)}
                            className="bg-white border border-[#2C2621] text-[#2C2621] p-3 hover:bg-[#F5F1E8] transition-colors"
                            aria-label="Quick View"
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="text-center group-hover:-translate-y-1 transition-transform duration-300">
                <h3 className="font-serif text-2xl text-[#2C2621] mb-1">
                    <Link href={`/shop/${product.slug}`}>{product.name}</Link>
                </h3>
                <p className="text-[10px] uppercase tracking-widest text-[#8D6E63] mb-3">{product.brand}</p>
                <div className="flex items-center justify-center gap-3">
                    <span className="text-sm font-medium text-[#5D554A]">₹{product.price.toLocaleString()}</span>
                    {product.mrp > product.price && (
                        <span className="text-xs text-[#d7ccc8] line-through">₹{product.mrp.toLocaleString()}</span>
                    )}
                </div>
            </div>
        </div>
    );
}
