"use client";

import { useState } from "react";
import { Star, ShoppingBag, Truck, ShieldCheck, Gift, Check, ArrowRight } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface ProductInfoProps {
    product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            priceNum: product.priceNum,
            image: product.image,
            quantity: quantity,
            size: selectedSize
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="flex flex-col gap-10">
            {/* Header */}
            <div>
                {product.brand && (
                    <p className="text-[10px] text-gold-600 uppercase tracking-[0.4em] mb-4 font-bold opacity-80">{product.brand}</p>
                )}
                <h1 className="text-5xl md:text-6xl font-serif text-gray-900 mb-6 italic font-light">{product.name}</h1>

                <div className="flex items-center gap-6 mb-8">
                    <div className="flex text-gold-400 gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? "fill-current" : "text-gray-200"}`} />
                        ))}
                    </div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                        {product.reviewCount || 0} REVIEWS
                    </span>
                    <div className="h-4 w-[1px] bg-gray-200" />
                    <span className="text-[10px] text-green-600 uppercase tracking-widest font-bold flex items-center gap-2">
                        <Check className="w-3 h-3" /> In Stock
                    </span>
                </div>

                <div className="flex items-baseline gap-6">
                    <span className="text-4xl font-bold text-gray-900 tracking-tighter">{product.price}</span>
                    {product.originalPrice && (
                        <span className="text-xl text-gray-400 line-through opacity-60 italic">{product.originalPrice}</span>
                    )}
                    {product.discount && (
                        <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
                            Save {product.discount}%
                        </span>
                    )}
                </div>
            </div>

            {/* Description Short */}
            <p className="text-gray-500 leading-relaxed font-light text-lg">
                {product.shortDescription || product.description}
            </p>

            {/* Selectors */}
            <div className="space-y-10 border-t border-b border-gray-100 py-10">
                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Select Volume</span>
                            <button className="text-[10px] text-gold-600 font-bold uppercase tracking-widest border-b border-gold-600">Size Guide</button>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {product.sizes.map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={cn(
                                        "px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 border",
                                        selectedSize === size
                                            ? "border-black bg-black text-white shadow-xl scale-105"
                                            : "border-gray-100 text-gray-400 hover:border-black hover:text-black"
                                    )}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-8">
                    <div className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gold-600 shadow-sm">
                            <Truck className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Shipping</span>
                            <span className="text-xs font-bold text-gray-900 uppercase tracking-tighter">Fast & Free</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gold-600 shadow-sm">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Authenticity</span>
                            <span className="text-xs font-bold text-gray-900 uppercase tracking-tighter">100% Genuine</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4">
                <div className="flex gap-6">
                    {/* Quantity */}
                    <div className="flex items-center bg-gray-50 rounded-full p-2 border border-gray-100">
                        <button 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white transition-colors text-gray-400 hover:text-black"
                        >-</button>
                        <span className="w-12 text-center font-bold text-gray-900 text-sm">{quantity}</span>
                        <button 
                            onClick={() => setQuantity(quantity + 1)} 
                            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white transition-colors text-gray-400 hover:text-black"
                        >+</button>
                    </div>

                    {/* Add to Cart */}
                    <button 
                        onClick={handleAddToCart}
                        className={cn(
                            "flex-grow py-5 rounded-full uppercase text-[10px] font-bold tracking-[0.3em] transition-all duration-700 flex items-center justify-center gap-3 shadow-2xl",
                            added ? "bg-green-600 text-white" : "bg-black text-white hover:bg-gold-600"
                        )}
                    >
                        {added ? (
                            <>
                                <Check className="w-4 h-4" /> Added to Bag
                            </>
                        ) : (
                            <>
                                <ShoppingBag className="w-4 h-4" /> Add to Scent Bag
                            </>
                        )}
                    </button>
                </div>
                <button 
                    onClick={handleAddToCart}
                    className="w-full border border-gray-100 text-gray-900 py-5 rounded-full uppercase text-[10px] font-bold tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-500 flex items-center justify-center gap-3"
                >
                    Instant Purchase <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

// Helper utility (inline since it's common)
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
