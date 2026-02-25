"use client";

import React from "react";
import { Gem, ShieldCheck, Sparkles, Award } from "lucide-react";

const VALUES = [
    {
        icon: Gem,
        title: "Finest Materials",
        description: "Ethically sourced gold, sterling silver, and authentic gemstones.",
    },
    {
        icon: ShieldCheck,
        title: "Anti-Tarnish",
        description: "Premium coating ensuring your jewellery stays brilliant for years.",
    },
    {
        icon: Award,
        title: "Handorafted Quality",
        description: "Meticulously crafted by skilled artisans with attention to detail.",
    },
    {
        icon: Sparkles,
        title: "Hypoallergenic",
        description: "Safe for sensitive skin, nickel-free and lead-free materials.",
    },
];

export function QualityStory() {
    return (
        <section className="py-24 bg-secondary/30 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {VALUES.map((value, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className="mb-6 p-4 rounded-full bg-background border border-gold/20 shadow-sm group-hover:border-gold/50 group-hover:shadow-md transition-all duration-300">
                                <value.icon className="w-8 h-8 text-gold" />
                            </div>
                            <h3 className="text-xl font-heading font-bold text-foreground mb-3">{value.title}</h3>
                            <p className="text-muted-foreground font-body leading-relaxed">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
