"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface QuickViewModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
    const { addToCart } = useCart();
    if (!product) return null;

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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#F5F1E8] rounded-sm shadow-2xl shadow-black/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar relative border border-[#EAE5D8]"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-[#5D554A] rounded-full transition-colors shadow-sm"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="grid md:grid-cols-2">
                                {/* Image Section */}
                                <div className="relative h-64 sm:h-80 md:h-full bg-[#EAE5D8]">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                    />
                                    {product.tag && (
                                        <span className="absolute top-4 left-4 bg-[#2C2621] text-[#F5F1E8] text-[10px] uppercase font-bold px-3 py-1 tracking-widest">
                                            {product.tag}
                                        </span>
                                    )}
                                </div>

                                {/* Content Section */}
                                <div className="p-6 md:p-8 flex flex-col justify-center">
                                    <div className="mb-6">
                                        <p className="text-xs text-[#8D6E63] uppercase tracking-[0.2em] mb-2">{product.brand}</p>
                                        <h2 className="text-3xl font-serif text-[#2C2621] mb-2">{product.name}</h2>
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={cn("w-3.5 h-3.5", i < Math.floor(product.rating) ? "text-[#BFA070] fill-[#BFA070]" : "text-[#d7ccc8]")}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-xs text-[#5D554A]/60">({product.reviews} Reviews)</span>
                                        </div>
                                        <p className="text-2xl font-light text-[#4A4238]">₹{product.price.toLocaleString()}</p>
                                    </div>

                                    <p className="text-[#5D554A] leading-relaxed mb-6 line-clamp-3 font-light">
                                        {product.description}
                                    </p>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex flex-wrap gap-2">
                                            {product.topNotes.slice(0, 3).map(note => (
                                                <span key={note} className="px-3 py-1 bg-[#EAE5D8] text-xs text-[#5D554A] rounded-full border border-[#d7ccc8]/50">
                                                    {note}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={() => {
                                                addToCart(product);
                                                onClose();
                                            }}
                                            className="w-full bg-[#2C2621] text-white py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#4A4238] transition-colors flex items-center justify-center gap-2"
                                        >
                                            <ShoppingBag className="w-4 h-4" /> Add to Cart
                                        </button>
                                        <Link
                                            href={`/shop/${product.slug}`}
                                            className="w-full border border-[#2C2621]/20 text-[#2C2621] py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-[#EAE5D8] hover:border-[#2C2621]/40 transition-all flex items-center justify-center gap-2"
                                        >
                                            View Full Details <ArrowRight className="w-4 h-4" />
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
