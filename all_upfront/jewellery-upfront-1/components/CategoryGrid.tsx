"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const CATEGORIES = [
    {
        id: 1,
        name: "Gold Plated",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop",
        slug: "gold-plated",
        size: "large", // spans 2 cols
    },
    {
        id: 2,
        name: "Sterling Silver",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop",
        slug: "silver",
        size: "small",
    },
    {
        id: 3,
        name: "Kundan & Ethnic",
        image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1000&auto=format&fit=crop",
        slug: "ethnic",
        size: "small",
    },
    {
        id: 4,
        name: "Minimalist",
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1000&auto=format&fit=crop",
        slug: "minimalist",
        size: "small",
    },
    {
        id: 5,
        name: "Party Wear",
        image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1000&auto=format&fit=crop",
        slug: "party-wear",
        size: "small",
    },
    {
        id: 6,
        name: "Daily Wear",
        image: "https://images.unsplash.com/photo-1630019852942-f89202989a51?q=80&w=1000&auto=format&fit=crop",
        slug: "daily-wear",
        size: "large", // spans 2 cols
    },
];

export function CategoryGrid() {
    return (
        <section className="section-padding bg-background relative z-10">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 view-transition-name:category-heading">
                    <span className="text-gold tracking-[0.2em] font-medium uppercase text-sm">Collections</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-2 mb-4">Shop By Category</h2>
                    <div className="h-1 w-20 bg-gold mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CATEGORIES.map((category) => (
                        <Link
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className={`group relative overflow-hidden rounded-md cursor-pointer ${category.size === "large" ? "md:col-span-2 row-span-2 aspect-[4/3] md:aspect-auto" : "col-span-1 aspect-[3/4]"
                                }`}
                        >
                            {/* Image */}
                            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-white font-cinzel text-2xl font-bold mb-2 drop-shadow-md">{category.name}</h3>
                                    <div className="flex items-center text-white/0 group-hover:text-white/100 transition-all duration-500 delay-100 opacity-0 group-hover:opacity-100">
                                        <span className="text-sm tracking-widest uppercase font-medium mr-2">Explore</span>
                                        <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
