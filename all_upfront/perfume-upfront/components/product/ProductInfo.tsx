"use client";

import { useState } from "react";
import { Star, ShoppingBag, Truck, ShieldCheck, Gift } from "lucide-react";
import { Product } from "@/lib/data";

interface ProductInfoProps {
    product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(product.size);

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div>
                <h2 className="text-sm text-gray-500 uppercase tracking-widest mb-2">{product.brand}</h2>
                <h1 className="text-4xl font-serif text-gray-900 mb-2">{product.name}</h1>

                <div className="flex items-center gap-4 mb-4">
                    <div className="flex text-gold-500">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-300"}`} />
                        ))}
                    </div>
                    <span className="text-sm text-gray-500 underline decoration-gray-300 hover:text-black transition-colors cursor-pointer">
                        {product.reviews} Reviews
                    </span>
                </div>

                <div className="flex items-baseline gap-4">
                    <span className="text-3xl font-medium text-gray-900">₹{product.price.toLocaleString()}</span>
                    {product.mrp > product.price && (
                        <span className="text-lg text-gray-400 line-through">₹{product.mrp.toLocaleString()}</span>
                    )}
                    {product.mrp > product.price && (
                        <span className="text-xs font-bold text-red-600 uppercase">Save {Math.round(((product.mrp - product.price) / product.mrp) * 100)}%</span>
                    )}
                </div>
            </div>

            {/* Description Short */}
            <p className="text-gray-600 leading-relaxed font-light">
                {product.description}
            </p>

            {/* Selectors */}
            <div className="space-y-6 border-t border-b border-gray-100 py-6">

                {/* Size */}
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-3 block">Size</span>
                    <div className="flex flex-wrap gap-3">
                        {product.availableSizes.map(size => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-6 py-2 border text-sm transition-all ${selectedSize === size
                                    ? "border-black bg-black text-white"
                                    : "border-gray-200 text-gray-600 hover:border-black"
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-gold-500"></div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase">Longevity</span>
                            <span className="text-sm font-medium text-gray-900">{product.longevity}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-gold-500"></div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-500 uppercase">Sillage</span>
                            <span className="text-sm font-medium text-gray-900">{product.sillage}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
                <div className="flex gap-4">
                    {/* Quantity */}
                    <div className="flex items-center border border-gray-200">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-gray-50">-</button>
                        <span className="px-4 font-medium text-gray-900">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-gray-50">+</button>
                    </div>

                    {/* Add to Cart */}
                    <button className="flex-grow bg-black text-white uppercase text-xs font-bold tracking-widest hover:bg-gold-600 transition-colors flex items-center justify-center gap-2">
                        <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </button>
                </div>
                <button className="w-full border border-black text-black py-3 uppercase text-xs font-bold tracking-widest hover:bg-black hover:text-white transition-colors">
                    Buy Now
                </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4">
                <div className="flex flex-col items-center text-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-gray-400" />
                    <span className="text-[10px] text-gray-500 uppercase">Authentic</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                    <Truck className="w-5 h-5 text-gray-400" />
                    <span className="text-[10px] text-gray-500 uppercase">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                    <Gift className="w-5 h-5 text-gray-400" />
                    <span className="text-[10px] text-gray-500 uppercase">Gift Ready</span>
                </div>
            </div>
        </div>
    );
}
