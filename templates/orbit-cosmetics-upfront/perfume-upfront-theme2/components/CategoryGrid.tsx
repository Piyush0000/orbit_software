"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useStorefront } from "@/context/StorefrontContext";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const DEFAULT_CATEGORIES = [
    { name: "Scent for Him", sub: "Sophisticated & Bold", image: "https://images.unsplash.com/photo-1595166667117-9c9be2897e93?q=80&w=700&auto=format&fit=crop", href: "/men", size: "lg:col-span-2 lg:row-span-2" },
    { name: "Scent for Her", sub: "Elegant & Enchanting", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=700&auto=format&fit=crop", href: "/women", size: "lg:col-span-2 lg:row-span-1" },
    { name: "Fluidity", sub: "The Unisex Essential", image: "https://images.unsplash.com/photo-1615160359300-47401c107ae7?q=80&w=700&auto=format&fit=crop", href: "/unisex", size: "lg:col-span-1 lg:row-span-1" },
    { name: "The Vault", sub: "Premium & Limited", image: "https://images.unsplash.com/photo-1605307373307-e075c324c4c2?q=80&w=700&auto=format&fit=crop", href: "/luxury", size: "lg:col-span-1 lg:row-span-1" },
];

export default function CategoryGrid() {
    const { customization } = useStorefront();
    const categories = DEFAULT_CATEGORIES;

    return (
        <section className="py-32 px-6 lg:px-12 bg-white overflow-hidden">
            <div className="container mx-auto">
                <div className="max-w-4xl mb-24 space-y-8">
                    <div className="inline-flex items-center gap-4">
                        <div className="h-[1px] w-12 bg-gold-400" />
                        <span className="text-gold-600 uppercase tracking-[0.4em] text-[10px] font-bold">Olfactory Families</span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-serif text-gray-900 font-light italic leading-tight">
                        Curated <br />
                        <span className="text-gold-500">Categories</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 auto-rows-[400px]">
                    {categories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 1 }}
                            className={cn("relative", category.size)}
                        >
                            <Link
                                href={category.href}
                                className="group block relative h-full w-full overflow-hidden rounded-[3.5rem] bg-gray-900 shadow-2xl transition-all duration-700 hover:-translate-y-2"
                            >
                                {/* Background Image */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img 
                                    src={category.image} 
                                    alt={category.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110 opacity-70 group-hover:opacity-90 grayscale group-hover:grayscale-0 transition-opacity"
                                />

                                {/* Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                                <div className="absolute inset-0 border border-white/10 m-8 rounded-[2.5rem] group-hover:border-gold-400/30 transition-all duration-700 pointer-events-none" />

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-12">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gold-400 text-[10px] uppercase tracking-[0.4em] font-bold group-hover:text-white transition-colors">
                                                {category.sub}
                                            </span>
                                            <ArrowUpRight className="w-6 h-6 text-white/0 group-hover:text-gold-400 transition-all duration-500 group-hover:rotate-0 rotate-45" />
                                        </div>
                                        <h3 className="text-4xl md:text-5xl font-serif text-white italic font-light leading-none group-hover:text-gold-300 transition-colors">
                                            {category.name}
                                        </h3>
                                    </div>
                                    
                                    <div className="mt-8 h-[1px] w-0 bg-gold-500 group-hover:w-full transition-all duration-700" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
            
            {/* Background Accent */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold-50 rounded-full blur-[100px] opacity-30 select-none pointer-events-none" />
        </section>
    );
}
