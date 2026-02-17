"use client";

import Link from "next/link";
import { Briefcase, GlassWater, Heart, Sun, PartyPopper, Plane } from "lucide-react";

const OCCASIONS = [
    { name: "Office Wear", icon: Briefcase, image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=800&auto=format&fit=crop", href: "/occasion/office" },
    { name: "Date Night", icon: Heart, image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop", href: "/occasion/date" },
    { name: "Daily Wear", icon: Sun, image: "https://images.unsplash.com/photo-1515377905703-c4788e51af93?q=80&w=800&auto=format&fit=crop", href: "/occasion/daily" },
    { name: "Party", icon: PartyPopper, image: "https://images.unsplash.com/photo-1496024840928-4c417adf211d?q=80&w=800&auto=format&fit=crop", href: "/occasion/party" },
];

export default function Occasions() {
    return (
        <section className="py-20 bg-[#F5F1E8]">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-serif text-center mb-16 text-[#2C2621]">Shop by Occasion</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {OCCASIONS.map((occ, idx) => (
                        <Link
                            key={idx}
                            href={occ.href}
                            className="group relative h-80 overflow-hidden rounded-sm cursor-pointer border border-[#EAE5D8]"
                        >
                            {/* Background */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-90"
                                style={{ backgroundImage: `url(${occ.image})` }}
                            />
                            {/* Overlay - Lighter/Warmer for new theme, or dark for contrast with white text if keeping images */}
                            {/* Let's go with a warm dark overlay for elegance */}
                            <div className="absolute inset-0 bg-[#2C2621]/20 group-hover:bg-[#2C2621]/40 transition-colors duration-500 mix-blend-multiply" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-[#F5F1E8] p-6 text-center z-10 transition-all duration-500">
                                <div className="p-4 rounded-full bg-[#fffdf9]/20 backdrop-blur-sm mb-6 group-hover:bg-[#F5F1E8] group-hover:text-[#4A4238] text-[#F5F1E8] transition-all duration-500 scale-100 group-hover:scale-110 border border-[#F5F1E8]/30">
                                    <occ.icon className="w-6 h-6" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-serif tracking-wide mb-2 pointer-events-none drop-shadow-md">{occ.name}</h3>
                                <div className="h-[1px] w-12 bg-[#F5F1E8]/60 mb-4 group-hover:w-24 transition-all duration-500" />
                                <span className="text-[10px] uppercase tracking-[0.3em] opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100 font-bold text-[#F5F1E8]">Explore Collection</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
