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
    
    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            priceNum: product.priceNum,
            image: product.image,
            quantity: 1
        });
    };

    return (
        <div className="group relative bg-white border-none hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden flex flex-col h-full transform hover:-translate-y-2">
            {/* Badges */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                {product.badge && (
                    <span className="bg-gold-500 text-white text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                        {product.badge}
                    </span>
                )}
                {product.discount && (
                    <span className="bg-black text-white text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                        {product.discount}% OFF
                    </span>
                )}
            </div>

            {/* Wishlist Button */}
            <button className="absolute top-4 right-4 z-20 p-2.5 bg-white rounded-full text-gray-400 hover:text-red-500 hover:shadow-xl transition-all duration-300 shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0">
                <Heart className="w-4 h-4" />
            </button>

            {/* Image Area */}
            <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden cursor-pointer">
                <Link href={`/products/${product.id}`} className="block h-full w-full relative">
                    {/* Main Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={product.image || "/placeholder.jpg"}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    
                    {/* Hover Image Overlay - If exists */}
                    {(product.images && product.images.length > 1) && (
                         /* eslint-disable-next-line @next/next/no-img-element */
                         <img
                            src={product.images[1]}
                            alt={`${product.name} alternate view`}
                            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                        />
                    )}
                    
                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                </Link>

                {/* Quick Actions - Floating Pill */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-3 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onQuickView?.(product);
                        }}
                        className="flex-1 bg-white/95 text-black py-3 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-black hover:text-white transition-all shadow-xl flex items-center justify-center gap-2"
                    >
                        <Eye className="w-3.5 h-3.5" /> View
                    </button>
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-gold-500 text-white py-3 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-gold-600 transition-all shadow-xl flex items-center justify-center gap-2"
                    >
                        <ShoppingBag className="w-3.5 h-3.5" /> Add
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 text-center flex flex-col flex-grow bg-white relative z-10">
                {product.brand && (
                    <p className="text-[10px] text-gold-600 uppercase tracking-[0.3em] mb-2 font-bold opacity-80">{product.brand}</p>
                )}
                <Link href={`/products/${product.id}`}>
                    <h3 className="font-serif text-xl text-gray-900 group-hover:text-gold-500 transition-colors mb-3 line-clamp-1 italic font-light">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center justify-center gap-1.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={cn("w-3 h-3 transition-colors duration-300", i < Math.floor(product.rating || 0) ? "text-gold-400 fill-gold-400" : "text-gray-200")}
                        />
                    ))}
                    {product.reviewCount && (
                        <span className="text-[10px] text-gray-400 ml-1.5 font-bold tracking-widest uppercase">({product.reviewCount})</span>
                    )}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-50/50 flex flex-col items-center">
                    {product.originalPrice ? (
                        <div className="flex items-center justify-center gap-3">
                            <p className="font-bold text-gray-900 text-lg tracking-tight">{product.price}</p>
                            <p className="text-xs text-gray-400 line-through opacity-60 font-light">{product.originalPrice}</p>
                        </div>
                    ) : (
                        <p className="font-bold text-gray-900 text-lg tracking-tight">{product.price}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
