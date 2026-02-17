"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle } from "lucide-react";
import { Product } from "@/lib/data";

interface ProductTabsProps {
    product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'reviews'>('description');

    return (
        <div className="mt-20">
            {/* Tabs Header */}
            <div className="flex justify-center border-b border-[#2C2621]/10 mb-12 overflow-x-auto">
                {['description', 'ingredients', 'reviews'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] relative transition-colors whitespace-nowrap ${activeTab === tab ? "text-[#2C2621]" : "text-[#5D554A]/60 hover:text-[#2C2621]"
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2C2621]"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                    {activeTab === 'description' && (
                        <motion.div
                            key="desc"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-8 text-[#5D554A] leading-relaxed font-light text-lg"
                        >
                            <p>
                                {product.description}
                                <br /><br />
                                Immerse yourself in the world of luxury with {product.name}. Created by master perfumers,
                                this fragrance is designed to leave a lasting impression. The bottle itself is a work of art,
                                reflecting the elegance and sophistication of the scent inside.
                            </p>
                            <div className="grid md:grid-cols-2 gap-8 mt-8">
                                <div className="bg-[#EAE5D8] p-8 rounded-sm">
                                    <h4 className="font-serif text-xl text-[#2C2621] mb-4">Occasion</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {product.occasion.map(occ => (
                                            <span key={occ} className="px-4 py-1.5 bg-[#F5F1E8] border border-[#d7ccc8] text-xs shadow-sm text-[#5D554A] rounded-full">{occ}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-[#EAE5D8] p-8 rounded-sm">
                                    <h4 className="font-serif text-xl text-[#2C2621] mb-4">Season</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {product.season.map(seas => (
                                            <span key={seas} className="px-4 py-1.5 bg-[#F5F1E8] border border-[#d7ccc8] text-xs shadow-sm text-[#5D554A] rounded-full">{seas}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'ingredients' && (
                        <motion.div
                            key="ing"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-[#5D554A] leading-relaxed text-center font-light text-lg"
                        >
                            <p className="italic mb-8 text-[#8D6E63]">"Transparency in every drop."</p>
                            <p className="max-w-2xl mx-auto">
                                Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Citronellol,
                                Geraniol, Coumarin, Citral, Farnesol, Eugenol.
                            </p>
                            <p className="text-xs text-[#8D6E63]/60 mt-10 tracking-wide uppercase">
                                Please be aware that ingredient lists may change or vary from time to time.
                                Please refer to the ingredient list on the product package you receive for the most up to date list of ingredients.
                            </p>
                        </motion.div>
                    )}

                    {activeTab === 'reviews' && (
                        <motion.div
                            key="rev"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <div className="flex flex-col gap-8">
                                {product.reviewData && product.reviewData.length > 0 ? (
                                    product.reviewData.map(review => (
                                        <div key={review.id} className="border-b border-[#2C2621]/10 pb-8 last:border-0">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-[#2C2621] tracking-wide">{review.author}</span>
                                                    {review.verified && <CheckCircle className="w-4 h-4 text-[#8D6E63]" />}
                                                </div>
                                                <span className="text-xs text-[#5D554A]/60 uppercase tracking-widest">{review.date}</span>
                                            </div>
                                            <div className="flex text-[#BFA070] mb-3">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-current" : "text-[#d7ccc8]"}`} />
                                                ))}
                                            </div>
                                            <h4 className="font-bold text-sm text-[#2C2621] mb-2">{review.title}</h4>
                                            <p className="text-[#5D554A] text-sm leading-relaxed font-light">{review.content}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <p className="text-[#5D554A]/40 italic">No reviews yet. Be the first to review!</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
