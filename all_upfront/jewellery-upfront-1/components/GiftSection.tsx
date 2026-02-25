"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const GIFTS = [
    {
        title: "Gifts for Her",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop",
        link: "/gifts/her",
        colSpan: "md:col-span-2",
    },
    {
        title: "Anniversary",
        image: "https://images.unsplash.com/photo-1549495808-013ac5d5f14e?q=80&w=600&auto=format&fit=crop", // Rings
        link: "/gifts/anniversary",
        colSpan: "md:col-span-1",
    },
    {
        title: "Under ₹2999",
        image: "https://images.unsplash.com/photo-1635767798638-3e2523422369?q=80&w=600&auto=format&fit=crop", // Small packaging/gift
        link: "/gifts/budget",
        colSpan: "md:col-span-1",
    },
    {
        title: "Wedding Gifts",
        image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1000&auto=format&fit=crop", // Ethnic heavy
        link: "/gifts/wedding",
        colSpan: "md:col-span-2",
    },
];

export function GiftSection() {
    return (
        <section className="section-padding bg-background">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-16">
                    <span className="text-gold tracking-[0.2em] font-medium uppercase text-sm">The Art of Gifting</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-2 mb-4">Find the Perfect Gift</h2>
                    <div className="h-1 w-20 bg-gold mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                    {GIFTS.map((gift, index) => (
                        <Link
                            key={index}
                            href={gift.link}
                            className={`group relative overflow-hidden rounded-lg ${gift.colSpan} bg-gray-900 border border-white/5`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-60"
                                style={{ backgroundImage: `url(${gift.image})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <h3 className="text-2xl font-cinzel font-bold text-white mb-2">{gift.title}</h3>
                                <div className="flex items-center text-gold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    <span className="text-sm tracking-widest uppercase font-medium mr-2">Shop Now</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
