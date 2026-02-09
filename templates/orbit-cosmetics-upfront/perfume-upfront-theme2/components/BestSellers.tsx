"use client";
import ProductCard from "./ProductCard";
import { useStorefront } from "@/context/StorefrontContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function BestSellers() {
    const { products, loading } = useStorefront();
    // Prioritize products with high ratings or specific tags/categories if needed
    const bestSellers = products.slice(0, 4);

    if (loading) {
        return (
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-t-2 border-gold-500 rounded-full animate-spin mb-6" />
                        <p className="font-serif text-2xl text-gray-300 italic">Curating Favorites...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (bestSellers.length === 0) return null;

    return (
        <section className="py-32 bg-white relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-50 -z-0" />
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-4">
                            <div className="h-[1px] w-8 bg-gold-400" />
                            <span className="text-gold-600 uppercase tracking-[0.4em] text-[10px] font-bold">The Signature Selection</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-serif text-gray-900 font-light italic leading-tight">Best <span className="text-gold-600">Sellers</span></h2>
                    </div>
                    
                    <Link 
                        href="/shop" 
                        className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold text-gray-900 hover:text-gold-600 transition-colors"
                    >
                        <span>View All Scents</span>
                        <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-gold-300 group-hover:bg-gold-50 transition-all duration-500">
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-24">
                    {bestSellers.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
                
                {/* Mobile View All */}
                <div className="mt-20 text-center md:hidden">
                    <Link 
                        href="/shop" 
                        className="inline-flex items-center gap-4 px-10 py-5 bg-black text-white rounded-full text-[10px] uppercase tracking-[0.3em] font-bold"
                    >
                        Explore More <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
