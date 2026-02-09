"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface QuickViewModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
    const { addToCart } = useCart();
    if (!product) return null;

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            priceNum: product.priceNum,
            image: product.image,
            quantity: 1
        });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative border border-gray-100"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 z-20 p-3 bg-white/90 hover:bg-black hover:text-white rounded-full transition-all duration-300 shadow-xl"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="grid md:grid-cols-2 h-full overflow-y-auto custom-scrollbar">
                                {/* Image Section */}
                                <div className="relative aspect-[4/5] md:aspect-auto bg-gray-50 overflow-hidden group">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={product.image || "/placeholder.jpg"}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                                    />
                                    {product.badge && (
                                        <div className="absolute top-8 left-8 flex flex-col gap-2">
                                            <span className="bg-gold-500 text-white text-[10px] uppercase font-bold px-4 py-2 rounded-full tracking-widest shadow-2xl">
                                                {product.badge}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content Section */}
                                <div className="p-10 md:p-14 flex flex-col justify-center bg-white">
                                    <div className="mb-10">
                                        {product.brand && (
                                            <p className="text-[10px] text-gold-600 uppercase tracking-[0.4em] mb-4 font-bold opacity-80">{product.brand}</p>
                                        )}
                                        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6 italic font-light">{product.name}</h2>
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="flex text-gold-400 gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? "fill-current" : "text-gray-200"}`} />
                                                ))}
                                            </div>
                                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">({product.reviewCount || 0} REVIEWS)</span>
                                        </div>
                                        <div className="flex items-baseline gap-4">
                                            <p className="text-3xl font-bold text-gray-900 tracking-tighter">{product.price}</p>
                                            {product.originalPrice && (
                                                <p className="text-sm text-gray-400 line-through opacity-60 italic">{product.originalPrice}</p>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-gray-500 leading-relaxed mb-10 font-light text-lg">
                                        {product.shortDescription || product.description}
                                    </p>

                                    {product.tags && product.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-10">
                                            {product.tags.slice(0, 4).map(tag => (
                                                <span key={tag} className="px-5 py-2 bg-gray-50 text-[10px] text-gray-500 rounded-full border border-gray-100 uppercase tracking-widest font-bold">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-4">
                                        <button
                                            onClick={handleAddToCart}
                                            className="w-full bg-black text-white py-5 rounded-full uppercase text-[10px] font-bold tracking-[0.3em] hover:bg-gold-600 transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl"
                                        >
                                            <ShoppingBag className="w-4 h-4" /> Add to Scent Collection
                                        </button>
                                        <Link
                                            href={`/products/${product.id}`}
                                            className="w-full border border-gray-100 text-gray-900 py-5 rounded-full uppercase text-[10px] font-bold tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-500 flex items-center justify-center gap-3"
                                        >
                                            View Full details <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
