"use client";

import { Flower, Sprout, Wind, Droplets, Flame, Sun, Sparkles, Heart } from "lucide-react";

const NOTES = [
    { name: "Floral", icon: Flower, color: "text-[#4A4238]" },
    { name: "Woody", icon: Sprout, color: "text-[#5D554A]" },
    { name: "Citrus", icon: Sun, color: "text-[#BFA070]" },
    { name: "Fresh", icon: Wind, color: "text-[#8D6E63]" },
    { name: "Aqua", icon: Droplets, color: "text-[#795548]" },
    { name: "Spicy", icon: Flame, color: "text-[#3E2723]" },
    { name: "Oriental", icon: Sparkles, color: "text-[#4A4238]" },
    { name: "Sweet", icon: Heart, color: "text-[#5D554A]" },
];

export default function FragranceNotes() {
    return (
        <section className="py-20 bg-[#fffdf9]">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-serif text-center mb-6 text-[#2C2621]">Olfactory Families</h2>
                <p className="text-center text-[#5D554A] mb-16 max-w-2xl mx-auto font-light tracking-wide text-lg">
                    Discover perfumes based on the scent profile that defines your personality.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
                    {NOTES.map((note) => (
                        <div
                            key={note.name}
                            className="flex flex-col items-center justify-center group cursor-pointer"
                        >
                            <div className="w-24 h-24 rounded-full bg-[#F5F1E8] border border-[#EAE5D8] flex items-center justify-center mb-6 group-hover:bg-[#EAE5D8] group-hover:scale-110 transition-all duration-300 shadow-sm">
                                <note.icon className={`w-8 h-8 ${note.color} transition-transform duration-300 group-hover:scale-110`} strokeWidth={1.5} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#5D554A] group-hover:text-[#2C2621] transition-colors">
                                {note.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
