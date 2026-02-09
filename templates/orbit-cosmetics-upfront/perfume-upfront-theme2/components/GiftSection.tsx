"use client";
import Link from "next/link";
import { Gift, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function GiftSection() {
    return (
        <section className="py-40 relative bg-black text-white overflow-hidden">
            {/* Background Image / Decoration */}
            <motion.div 
                initial={{ scale: 1.1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
                className="absolute inset-0 z-0"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                    src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2000&auto=format&fit=crop" 
                    alt="Gift Background"
                    className="w-full h-full object-cover"
                />
            </motion.div>
            
            {/* Multi-layered Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-1" />
            <div className="absolute inset-0 bg-black/40 z-1" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="space-y-12"
                    >
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-4">
                                <Sparkles className="w-5 h-5 text-gold-400" />
                                <span className="text-gold-400 uppercase tracking-[0.5em] text-[10px] font-bold">The Art of Generosity</span>
                            </div>
                            <h2 className="text-6xl md:text-8xl font-serif font-light italic leading-tight">
                                Timeless <br />
                                <span className="text-gold-500">Treasures</span>
                            </h2>
                            <p className="max-w-xl text-gray-300 text-xl font-light leading-relaxed">
                                Beyond the scent, it's the sentiment. Our masterfully curated gift collections are housed in hand-finished artisanal packaging, ready to be unveiled.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link
                                href="/gift-sets"
                                className="group relative px-12 py-5 bg-gold-500 text-white text-[10px] uppercase tracking-[0.4em] font-bold overflow-hidden transition-all duration-500 shadow-2xl flex items-center justify-center gap-3"
                            >
                                <span className="relative z-10">Gifts for Him</span>
                                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:translate-x-2" />
                                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 opacity-20" />
                            </Link>
                            <Link
                                href="/gift-sets"
                                className="group relative px-12 py-5 border border-white/20 text-white text-[10px] uppercase tracking-[0.4em] font-bold backdrop-blur-md overflow-hidden transition-all duration-500 flex items-center justify-center gap-3"
                            >
                                <span className="relative z-10">Gifts for Her</span>
                                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:translate-x-2 text-gold-400" />
                                <div className="absolute inset-0 bg-white transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-10" />
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        className="hidden lg:block relative"
                    >
                        {/* Decorative floating elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 border border-gold-500/20 rounded-full animate-pulse" />
                        <div className="absolute bottom-20 -left-10 w-24 h-24 border border-gold-500/10 rounded-full animate-bounce duration-[3s]" />
                        
                        <div className="relative aspect-square max-w-md mx-auto">
                            <div className="absolute inset-0 border-[2px] border-gold-500/20 m-12 rotate-12 transition-transform duration-[3s] group-hover:rotate-0" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1000&auto=format&fit=crop"
                                alt="Signature Box"
                                className="w-full h-full object-cover rounded-3xl shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-1000"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
            
            {/* Background Lettering */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-serif italic text-white/[0.03] pointer-events-none select-none whitespace-nowrap z-0">
                L'Offre
            </div>
        </section>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
