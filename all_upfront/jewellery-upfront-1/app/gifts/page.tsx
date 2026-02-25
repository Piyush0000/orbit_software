import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Gift, Heart, Gem, Crown } from "lucide-react";

export default function GiftStorePage() {
    // Curated collections (mock logic)
    const giftsForHer = PRODUCTS.filter(p => p.category === 'rings' || p.category === 'necklaces').slice(0, 4);
    const budgetBuys = PRODUCTS.filter(p => p.price < 20000).slice(0, 4);

    const categories = [
        { name: "For Her", icon: Heart, desc: "Timeless pieces she'll adore", href: "/category/necklaces" },
        { name: "Anniversary", icon: Gem, desc: "Celebrate your milestones", href: "/category/rings" },
        { name: "Wedding", icon: Crown, desc: "Grandeur for the big day", href: "/category/sets" },
        { name: "Luxury Gifts", icon: Gift, desc: "Unmatched opulence", href: "/category/bracelets" },
    ];

    return (
        <div className="min-h-screen bg-background pt-20 pb-20">
            {/* Hero Section for Gifts */}
            <div className="relative bg-secondary/20 py-20 mb-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="container mx-auto px-4 md:px-8 text-center relative z-10">
                    <span className="text-gold tracking-[0.2em] font-medium uppercase text-sm">The Gifting Suite</span>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mt-4 mb-6">
                        Wrap It With Love
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto text-lg mb-8">
                        Find the perfect expression of your affection. From small tokens to grand gestures, discover gifts that sparkle.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button className="bg-gold hover:bg-gold/90 text-black px-8">Shop All Gifts</Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 space-y-20">
                {/* Shop by Occasion Grid */}
                <section>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-10">Shop by Occasion</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {categories.map((cat, idx) => (
                            <Link key={idx} href={cat.href} className="group cursor-pointer">
                                <div className="bg-secondary/30 p-8 rounded-lg border border-white/5 hover:border-gold/30 transition-all duration-300 h-full text-center flex flex-col items-center justify-center hover:-translate-y-1">
                                    <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <cat.icon className="w-8 h-8 text-gold" />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2 group-hover:text-gold transition-colors">{cat.name}</h3>
                                    <p className="text-sm text-muted-foreground">{cat.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Featured Collection: For Her */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold">Gifts for Her</h2>
                            <p className="text-muted-foreground mt-1">Classics that never fail to impress.</p>
                        </div>
                        <Button variant="link" className="text-gold">View More</Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {giftsForHer.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>

                {/* Banner */}
                <section className="bg-gold/10 rounded-2xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 border border-gold/20">
                    <div>
                        <h3 className="text-2xl font-heading font-bold mb-2 text-gold">Complimentary Gift Packaging</h3>
                        <p className="text-muted-foreground max-w-md">Every order arrives in our signature luxe box, ready for gifting. Add a personalized note at checkout.</p>
                    </div>
                    <Gift className="w-24 h-24 text-gold/20 hidden md:block" />
                    <Button variant="outline" className="border-gold text-gold hover:bg-transparent hover:text-gold">Learn More</Button>
                </section>

                {/* Featured Collection: Budget/Under 20k */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-heading font-bold">Little Luxuries</h2>
                            <p className="text-muted-foreground mt-1">Exquisite gifts under ₹20,000.</p>
                        </div>
                        <Button variant="link" className="text-gold">View More</Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {budgetBuys.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
