"use client";
import { Flower, Sprout, Wind, Droplets, Flame, Sun, Sparkles, Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const NOTES = [
    { name: "Floral", icon: Flower, color: "text-pink-400", bg: "bg-pink-50/30", href: "/shop?note=floral" },
    { name: "Woody", icon: Sprout, color: "text-amber-800", bg: "bg-amber-50/30", href: "/shop?note=woody" },
    { name: "Citrus", icon: Sun, color: "text-yellow-500", bg: "bg-yellow-50/30", href: "/shop?note=citrus" },
    { name: "Fresh", icon: Wind, color: "text-blue-300", bg: "bg-blue-50/30", href: "/shop?note=fresh" },
    { name: "Aqua", icon: Droplets, color: "text-cyan-500", bg: "bg-cyan-50/30", href: "/shop?note=aqua" },
    { name: "Spicy", icon: Flame, color: "text-red-500", bg: "bg-red-50/30", href: "/shop?note=spicy" },
    { name: "Oriental", icon: Sparkles, color: "text-purple-500", bg: "bg-purple-50/30", href: "/shop?note=oriental" },
    { name: "Sweet", icon: Heart, color: "text-rose-400", bg: "bg-rose-50/30", href: "/shop?note=sweet" },
];

export default function FragranceNotes() {
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50/50 -skew-x-12 transform translate-x-1/2" />
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-24 space-y-8">
                    <div className="inline-flex items-center gap-4">
                        <div className="h-[1px] w-12 bg-gold-400" />
                        <span className="text-gold-600 uppercase tracking-[0.4em] text-[10px] font-bold">The Art of Extraction</span>
                        <div className="h-[1px] w-12 bg-gold-400" />
                    </div>
                    <h2 className="text-5xl md:text-7xl font-serif text-gray-900 font-light italic leading-tight">
                        Shop by <span className="text-gold-600">Essence</span>
                    </h2>
                    <p className="text-gray-500 text-xl font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
                        The foundation of every masterpiece. Select an olfactory family to discover fragrances that resonate with your inner soul.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {NOTES.map((note, idx) => (
                        <motion.div
                            key={note.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Link
                                href={note.href}
                                className="group block relative p-10 bg-white border border-gray-100 rounded-[3rem] hover:border-gold-300 hover:shadow-2xl transition-all duration-700 h-full text-center overflow-hidden"
                            >
                                {/* Decorative background */}
                                <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700", note.bg)} />
                                
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center mb-8 group-hover:bg-white group-hover:shadow-xl transition-all duration-700 border border-gray-50 group-hover:scale-110">
                                        <note.icon className={cn("w-10 h-10 transition-all duration-700", note.color)} />
                                    </div>
                                    <h3 className="font-serif text-2xl text-gray-900 group-hover:text-gold-600 transition-colors mb-4 font-light italic">{note.name}</h3>
                                    <div className="h-[1px] w-8 bg-gray-200 group-hover:w-16 group-hover:bg-gold-400 transition-all duration-700 mb-6" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 group-hover:text-gray-900 transition-colors">
                                        Explore Scents
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
