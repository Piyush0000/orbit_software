"use client";
import Link from "next/link";
import { Briefcase, Heart, Sun, PartyPopper, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const OCCASIONS = [
    { name: "Executive Suite", icon: Briefcase, image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=800&auto=format&fit=crop", href: "/shop?tag=office", description: "Command respect with professional sillage." },
    { name: "Midnight Rendezvous", icon: Heart, image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop", href: "/shop?tag=date", description: "Enchanting notes for unforgettable evenings." },
    { name: "Daylight Radiance", icon: Sun, image: "https://images.unsplash.com/photo-1515377905703-c4788e51af93?q=80&w=800&auto=format&fit=crop", href: "/shop?tag=daily", description: "Fresh, airy scents for your everyday journey." },
    { name: "Grand Celebration", icon: PartyPopper, image: "https://images.unsplash.com/photo-1496024840928-4c417adf211d?q=80&w=800&auto=format&fit=crop", href: "/shop?tag=party", description: "Bold impressions for the center of attention." },
];

export default function Occasions() {
    return (
        <section className="py-32 bg-[#faf9f6] relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                    <div className="max-w-2xl space-y-6">
                         <span className="text-gold-600 uppercase tracking-[0.4em] text-[10px] font-bold">Curated Moments</span>
                         <h2 className="text-5xl md:text-7xl font-serif text-gray-900 font-light italic leading-tight">
                            Shop by <span className="text-gold-600">Occasion</span>
                        </h2>
                    </div>
                    <p className="text-gray-500 text-lg font-light max-w-sm border-l-2 border-gold-200 pl-8">
                        Every moment demands a different presence. Choose your destination.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {OCCASIONS.map((occ, idx) => (
                        <motion.div
                            key={occ.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, duration: 0.8 }}
                        >
                            <Link
                                href={occ.href}
                                className="group relative block h-[600px] overflow-hidden rounded-[3rem] shadow-2xl transition-all duration-700 hover:-translate-y-4"
                            >
                                {/* Background Image */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                    src={occ.image} 
                                    alt={occ.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                                />
                                
                                {/* Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/80 group-hover:via-black/40 transition-all duration-700" />
                                <div className="absolute inset-0 border-[1px] border-white/10 m-6 rounded-[2.5rem] pointer-events-none group-hover:border-gold-400/30 transition-all duration-700" />

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
                                    <div className="mb-8 p-4 w-fit rounded-full border border-white/20 backdrop-blur-md group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-700 group-hover:rotate-[360deg]">
                                        <occ.icon className="w-5 h-5" />
                                    </div>
                                    
                                    <h3 className="text-3xl font-serif italic mb-4 group-hover:text-gold-300 transition-colors duration-500">{occ.name}</h3>
                                    
                                    <p className="text-sm font-light text-gray-300 mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 line-clamp-2">
                                        {occ.description}
                                    </p>
                                    
                                    <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-[0.3em] text-white/60 group-hover:text-gold-400 transition-colors duration-500">
                                        <span>Discover Scents</span>
                                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-2 transition-transform duration-500" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
            
            {/* Background Text */}
            <div className="absolute -bottom-20 -left-20 text-[20vw] font-serif italic text-black/[0.02] pointer-events-none select-none whitespace-nowrap">
                Moments that Matter
            </div>
        </section>
    );
}
