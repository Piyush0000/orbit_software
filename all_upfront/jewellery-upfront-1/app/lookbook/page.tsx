"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const LOOKBOOKS = [
    {
        id: 1,
        title: "The Royal Wedding Edit",
        description: "Curated Kundan and Polki sets for the modern bride.",
        image: "https://images.unsplash.com/photo-1628144078709-6617154580b0?q=80&w=1200&auto=format&fit=crop",
        products: [
            { name: "Maharani Kundan Necklace", price: 125000 },
            { name: "Jhumka Earrings", price: 45000 },
            { name: "Mathapatti Headgear", price: 32000 }
        ],
        totalPrice: 202000
    },
    {
        id: 2,
        title: "Workwear Elegance",
        description: "Minimalist gold and diamond pieces for everyday luxury.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop",
        products: [
            { name: "Sleek Gold Chain", price: 25000 },
            { name: "Diamond Studs", price: 15000 },
        ],
        totalPrice: 40000
    },
    {
        id: 3,
        title: "Cocktail Hour",
        description: "Statement pieces that steal the spotlight.",
        image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop",
        products: [
            { name: "Emerald Drop Earrings", price: 55000 },
            { name: "Cocktail Ring", price: 35000 },
            { name: "Tennis Bracelet", price: 85000 }
        ],
        totalPrice: 175000
    }
];

export default function LookbookPage() {
    return (
        <div className="min-h-screen bg-background pt-20">
            {/* Header */}
            <div className="bg-secondary/30 py-16 text-center">
                <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 tracking-tight">The Style Guide</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                    Discover curated looks handpicked by our stylists. Shop the complete ensemble or mix and match your favorites.
                </p>
            </div>

            <div className="container mx-auto px-4 md:px-8 py-16">
                <div className="space-y-24">
                    {LOOKBOOKS.map((look, index) => (
                        <div key={look.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                            {/* Image Section */}
                            <div className="w-full lg:w-3/5 relative aspect-[4/3] group overflow-hidden rounded-lg">
                                <Image
                                    src={look.image}
                                    alt={look.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                            </div>

                            {/* Content Section */}
                            <div className="w-full lg:w-2/5 space-y-8">
                                <div>
                                    <span className="text-gold tracking-[0.2em] text-sm uppercase font-bold">Look {index + 1}</span>
                                    <h2 className="text-4xl font-heading font-bold mt-2 mb-4">{look.title}</h2>
                                    <p className="text-muted-foreground leading-relaxed">{look.description}</p>
                                </div>

                                <div className="bg-card border border-border/50 p-6 rounded-lg space-y-4">
                                    <h3 className="font-bold border-b border-border/50 pb-2">In this look</h3>
                                    <ul className="space-y-3">
                                        {look.products.map((prod, i) => (
                                            <li key={i} className="flex justify-between text-sm">
                                                <span className="text-foreground/80">{prod.name}</span>
                                                <span className="font-medium">₹{prod.price.toLocaleString()}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="pt-4 border-t border-border/50 flex justify-between items-center">
                                        <span className="font-heading font-bold text-lg">Total Look</span>
                                        <span className="font-heading font-bold text-lg">₹{look.totalPrice.toLocaleString()}</span>
                                    </div>

                                    <Button className="w-full bg-gold hover:bg-gold/90 text-black font-bold uppercase tracking-widest mt-4">
                                        <ShoppingBag className="w-4 h-4 mr-2" /> Shop Complete Look
                                    </Button>
                                </div>

                                <Link href="/category/all" className="inline-flex items-center text-gold font-medium hover:underline">
                                    View individual pieces <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
