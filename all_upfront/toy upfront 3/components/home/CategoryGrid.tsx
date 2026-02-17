"use client";

import Link from "next/link";
import { Gamepad2, Blocks, Palette, Car, Baby, Brain, Sparkles, Rocket } from "lucide-react";

const categories = [
    { name: "Educational", icon: Brain, color: "bg-amber-50 text-amber-600", border: "border-amber-200", slug: "educational" },
    { name: "Building Blocks", icon: Blocks, color: "bg-orange-50 text-orange-600", border: "border-orange-200", slug: "blocks" },
    { name: "Arts & Crafts", icon: Palette, color: "bg-teal-50 text-teal-600", border: "border-teal-200", slug: "arts-crafts" },
    { name: "Remote Control", icon: Car, color: "bg-amber-50 text-amber-600", border: "border-amber-200", slug: "remote-control" },
    { name: "Soft Toys", icon: Baby, color: "bg-orange-50 text-orange-600", border: "border-orange-200", slug: "soft-toys" },
    { name: "Board Games", icon: Gamepad2, color: "bg-teal-50 text-teal-600", border: "border-teal-200", slug: "games" },
    { name: "Outdoor Fun", icon: Rocket, color: "bg-amber-50 text-amber-600", border: "border-amber-200", slug: "outdoor" },
    { name: "New Arrivals", icon: Sparkles, color: "bg-orange-50 text-orange-600", border: "border-orange-200", slug: "new" },
];

export default function CategoryGrid() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 font-display tracking-tight">
                        Shop by <span className="text-secondary underline decoration-wavy decoration-primary/50 underline-offset-8">Category</span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Explore our magical collection curated for every little dreamer!
                    </p>
                </div>

                <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-8">
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/category/${cat.slug}`}
                            className="group flex flex-col items-center"
                        >
                            <div className={`w-28 h-28 md:w-32 md:h-32 rounded-full ${cat.color} ${cat.border} border-4 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] transition-all duration-300 relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></div>
                                <cat.icon className="w-12 h-12 md:w-14 md:h-14 transition-transform group-hover:scale-110" />
                            </div>
                            <h3 className="font-bold text-gray-700 text-sm md:text-base text-center group-hover:text-primary transition-colors leading-tight px-1">
                                {cat.name}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
