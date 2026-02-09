"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle, Quote } from "lucide-react";
import { Product } from "@/types/product";

interface ProductTabsProps {
    product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState<'essence' | 'details' | 'reviews'>('essence');

    const tabs = [
        { id: 'essence', label: 'The Essence' },
        { id: 'details', label: 'Fragrance Details' },
        { id: 'reviews', label: 'Client Reviews' }
    ];

    return (
        <div className="mt-32">
            {/* Tabs Header */}
            <div className="flex justify-center mb-16 overflow-x-auto custom-scrollbar pb-4">
                <div className="flex bg-gray-50/50 p-2 rounded-full border border-gray-100">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] relative transition-all duration-500 whitespace-nowrap",
                                activeTab === tab.id 
                                    ? "text-white shadow-lg" 
                                    : "text-gray-400 hover:text-gray-900"
                            )}
                        >
                            <span className="relative z-10">{tab.label}</span>
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="activeTabBackground"
                                    className="absolute inset-0 bg-black rounded-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto">
                <AnimatePresence mode="wait">
                    {activeTab === 'essence' && (
                        <motion.div
                            key="essence"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid md:grid-cols-2 gap-16 items-center"
                        >
                            <div className="space-y-8">
                                <Quote className="w-12 h-12 text-gold-200" />
                                <h3 className="text-4xl font-serif text-gray-900 italic font-light italic">Signature Presence</h3>
                                <p className="text-gray-500 leading-relaxed text-lg font-light">
                                    {product.description}
                                </p>
                                <p className="text-gray-500 leading-relaxed text-lg font-light">
                                    Crafted with the finest ingredients sourced from across the globe, {product.name} is a testament to olfactory artistry. 
                                    Each note is carefully balanced to create a narrative that lingers long after you've left the room.
                                </p>
                            </div>
                            <div className="bg-[#faf9f6] p-12 rounded-[3rem] border border-gray-100 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-50 rounded-full -mr-16 -mt-16 blur-3xl" />
                                <h4 className="text-[10px] font-bold text-gold-600 uppercase tracking-[0.4em] mb-10">Sensory Profile</h4>
                                <div className="space-y-8">
                                    {[
                                        { label: 'Longevity', value: '8-10 Hours' },
                                        { label: 'Projection', value: 'Moderate to Strong' },
                                        { label: 'Ideal For', value: product.tags?.join(', ') || 'Evening wear' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex flex-col gap-2">
                                            <span className="text-[10px] text-gray-400 uppercase tracking-widest">{item.label}</span>
                                            <span className="text-sm font-bold text-gray-900 uppercase tracking-tighter">{item.value}</span>
                                            <div className="h-[1px] bg-gray-200/50 w-full" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'details' && (
                        <motion.div
                            key="details"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center space-y-12"
                        >
                            <div className="max-w-2xl mx-auto space-y-6">
                                <h3 className="text-3xl font-serif text-gray-900 italic">Composition & Ethics</h3>
                                <p className="text-gray-500 italic font-light text-lg">"Transparency in every spray, luxury in every drop."</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { title: 'Cruelty Free', desc: 'No animal testing involved.' },
                                    { title: 'Sustainably Sourced', desc: 'Ethically harvested ingredients.' },
                                    { title: 'Paraben Free', desc: 'Pure fragrance formulations.' }
                                ].map((item, i) => (
                                    <div key={i} className="p-8 border border-gray-100 rounded-3xl bg-white hover:shadow-xl transition-shadow duration-500">
                                        <CheckCircle className="w-8 h-8 text-gold-500 mx-auto mb-4" />
                                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-2">{item.title}</h4>
                                        <p className="text-xs text-gray-400 leading-relaxed font-bold">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] max-w-xl mx-auto pt-8 border-t border-gray-50">
                                Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Citronellol,
                                Geraniol, Coumarin, Citral, Farnesol, Eugenol.
                            </p>
                        </motion.div>
                    )}

                    {activeTab === 'reviews' && (
                        <motion.div
                            key="reviews"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            {product.reviews && product.reviews.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {product.reviews.map((review, i) => (
                                        <div key={i} className="p-10 bg-gray-50/30 border border-gray-100 rounded-[2rem] hover:bg-white transition-colors duration-500 hover:shadow-xl group">
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center text-gold-700 font-bold font-serif text-lg">
                                                        {review.user[0]}
                                                    </div>
                                                    <div>
                                                        <span className="block font-bold text-sm text-gray-900 uppercase tracking-tighter">{review.user}</span>
                                                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Verified Client</span>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] text-gray-400 font-bold">{review.date}</span>
                                            </div>
                                            <div className="flex text-gold-400 mb-6 gap-1 group-hover:text-gold-500 transition-colors">
                                                {[...Array(5)].map((_, j) => (
                                                    <Star key={j} className={`w-3 h-3 ${j < review.rating ? "fill-current" : "text-gray-200"}`} />
                                                ))}
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed italic font-light italic">"{review.comment}"</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 border border-dashed border-gray-200 rounded-[3rem]">
                                    <h3 className="font-serif text-2xl text-gray-400 italic mb-4">No reviews yet</h3>
                                    <p className="text-gray-400 text-sm font-light uppercase tracking-widest">Be the first to share your olfactory journey.</p>
                                    <button className="mt-8 px-12 py-4 bg-black text-white rounded-full text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-gold-600 transition-colors shadow-lg">
                                        Write a Review
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
