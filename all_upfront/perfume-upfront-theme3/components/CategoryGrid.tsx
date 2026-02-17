"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const CATEGORIES = [
    { name: "Men's Perfumes", image: "https://images.unsplash.com/photo-1595166667117-9c9be2897e93?q=80&w=700&auto=format&fit=crop", href: "/men", size: "col-span-1 md:col-span-2 row-span-2" },
    { name: "Women's Perfumes", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=700&auto=format&fit=crop", href: "/women", size: "col-span-1 md:col-span-2 row-span-2" },
    { name: "Unisex", image: "https://images.unsplash.com/photo-1615160359300-47401c107ae7?q=80&w=700&auto=format&fit=crop", href: "/unisex" },
    { name: "Gift Sets", image: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?q=80&w=700&auto=format&fit=crop", href: "/gift-sets" },
    { name: "Travel Size", image: "https://images.unsplash.com/photo-1594035910387-fea4779426e9?q=80&w=700&auto=format&fit=crop", href: "/travel" },
    { name: "Premium Collection", image: "https://images.unsplash.com/photo-1605307373307-e075c324c4c2?q=80&w=700&auto=format&fit=crop", href: "/premium" },
];

export default function CategoryGrid() {
    return (
        <section className="py-20 px-4 md:px-8 bg-[#F5F1E8]">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-5xl font-serif text-center mb-16 text-[#2C2621]">Shop by Category</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px]">
                    {CATEGORIES.map((category, idx) => (
                        <Link
                            key={idx}
                            href={category.href}
                            className={cn(
                                "group relative overflow-hidden rounded-sm cursor-pointer border border-[#EAE5D8]",
                                category.size || "col-span-1"
                            )}
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-90"
                                style={{ backgroundImage: `url(${category.image})` }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-[#2C2621]/20 group-hover:bg-[#2C2621]/40 transition-colors duration-500" />

                            {/* Content */}
                            <div className="absolute inset-0 flex items-center justify-center p-6 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]">
                                <div className="text-center transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                                    <span className="block text-[#fffdf9] text-2xl md:text-3xl font-serif tracking-wide mb-3 drop-shadow-md">
                                        {category.name}
                                    </span>
                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#fffdf9] bg-[#2C2621] px-4 py-2 opacity-90">
                                            View Collection
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Default Label (Visible when not hovered) */}
                            <div className="absolute bottom-6 left-6 group-hover:opacity-0 transition-opacity duration-300">
                                <span className="text-white font-serif text-xl tracking-wide drop-shadow-md">{category.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
