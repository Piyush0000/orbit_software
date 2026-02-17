"use client";

import { useState } from "react";
import { Star, ShoppingBag, Truck, ShieldCheck, Gift } from "lucide-react";
import { Product } from "@/lib/data";
import { useCart } from "@/context/CartContext";

interface ProductInfoProps {
    product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(product.size);
    const { addToCart } = useCart();

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div>
                <h2 className="text-xs text-[#8D6E63] uppercase tracking-[0.2em] mb-3">{product.brand}</h2>
                <h1 className="text-4xl md:text-5xl font-serif text-[#2C2621] mb-4">{product.name}</h1>

                <div className="flex items-center gap-4 mb-6">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-[#BFA070] fill-[#BFA070]" : "text-[#d7ccc8]"}`} />
                        ))}
                    </div>
                    <span className="text-sm text-[#5D554A] underline decoration-[#2C2621]/20 hover:text-[#2C2621] transition-colors cursor-pointer">
                        {product.reviews} Reviews
                    </span>
                </div>

                <div className="flex items-baseline gap-4">
                    <span className="text-3xl font-light text-[#2C2621]">₹{product.price.toLocaleString()}</span>
                    {product.mrp > product.price && (
                        <span className="text-lg text-[#d7ccc8] line-through">₹{product.mrp.toLocaleString()}</span>
                    )}
                    {product.mrp > product.price && (
                        <span className="text-xs font-bold text-[#F5F1E8] uppercase bg-[#2C2621] px-2 py-1 rounded-sm">
                            Save {Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
                        </span>
                    )}
                </div>
            </div>

            {/* Description Short */}
            <p className="text-[#5D554A] leading-relaxed font-light text-lg">
                {product.description}
            </p>

            {/* Selectors */}
            <div className="space-y-8 border-t border-b border-[#2C2621]/10 py-8">

                {/* Size */}
                <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C2621] mb-4 block">Size</span>
                    <div className="flex flex-wrap gap-3">
                        {product.availableSizes.map(size => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-6 py-3 border text-sm transition-all tracking-wider ${selectedSize === size
                                    ? "border-[#2C2621] bg-[#2C2621] text-[#F5F1E8] shadow-lg shadow-[#2C2621]/20"
                                    : "border-[#2C2621]/30 text-[#5D554A] hover:border-[#2C2621] hover:text-[#2C2621]"
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#BFA070]"></div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-[#8D6E63] uppercase tracking-wider">Longevity</span>
                            <span className="text-sm font-medium text-[#2C2621]">{product.longevity}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#BFA070]"></div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-[#8D6E63] uppercase tracking-wider">Sillage</span>
                            <span className="text-sm font-medium text-[#2C2621]">{product.sillage}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4">
                <div className="flex gap-4 h-14">
                    {/* Quantity */}
                    <div className="flex items-center border border-[#2C2621]/20 rounded-sm">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 h-full hover:bg-[#F5F1E8] text-[#2C2621] transition-colors">-</button>
                        <span className="px-4 font-medium text-[#2C2621] min-w-[3rem] text-center">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="px-5 h-full hover:bg-[#F5F1E8] text-[#2C2621] transition-colors">+</button>
                    </div>

                    {/* Add to Cart */}
                    <button
                        onClick={() => addToCart(product)}
                        className="flex-grow bg-[#2C2621] text-[#F5F1E8] uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#4A4238] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#2C2621]/20"
                    >
                        <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </button>
                </div>
                <button className="w-full border border-[#2C2621]/30 text-[#2C2621] py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#2C2621] hover:text-[#F5F1E8] transition-all">
                    Buy Now
                </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4">
                <div className="flex flex-col items-center text-center gap-2 group">
                    <ShieldCheck className="w-5 h-5 text-[#8D6E63] group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] text-[#5D554A] uppercase tracking-wider">Authentic</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2 group">
                    <Truck className="w-5 h-5 text-[#8D6E63] group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] text-[#5D554A] uppercase tracking-wider">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2 group">
                    <Gift className="w-5 h-5 text-[#8D6E63] group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] text-[#5D554A] uppercase tracking-wider">Gift Ready</span>
                </div>
            </div>
        </div>
    );
}
