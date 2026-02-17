"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Dummy Data
const concerns = [
    "Dry Skin", "Oily Skin", "Acne Care", "Anti-Aging", "Sensitive Skin"
];

const allProducts = [
    { id: 1, name: "Hydra-Boost Gel", concern: "Dry Skin", image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=400" },
    { id: 2, name: "Oil Control Toner", concern: "Oily Skin", image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=400" },
    { id: 3, name: "Clear Skin Spot Treatment", concern: "Acne Care", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400" },
    { id: 4, name: "Youthful Glow Serum", concern: "Anti-Aging", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=400" },
    { id: 5, name: "Calming Chamomile Cream", concern: "Sensitive Skin", image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&q=80&w=400" },
];

export function SkinTypeFilter() {
    const [activeConcern, setActiveConcern] = useState(concerns[0]);

    const filteredProducts = allProducts.filter(p => p.concern === activeConcern);

    return (
        <section className="py-20 px-4 bg-background">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 font-serif text-foreground">
                    Shop by Concern
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Whatever your skin needs, we have a solution crafted just for you.
                </p>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {concerns.map((concern) => (
                        <Button
                            key={concern}
                            variant={activeConcern === concern ? "default" : "outline"}
                            onClick={() => setActiveConcern(concern)}
                            className={`rounded-full px-6 transition-all ${activeConcern === concern
                                ? "shadow-md scale-105"
                                : "hover:bg-secondary border-none bg-secondary/30"
                                }`}
                        >
                            {concern}
                        </Button>
                    ))}
                </div>

                {/* Product Display Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                    {/* Featured Large Card for the Concern */}
                    <div className="lg:col-span-1 h-full min-h-[300px] bg-primary/5 rounded-2xl p-8 flex flex-col justify-center items-start">
                        <h3 className="text-2xl font-bold mb-4">{activeConcern}</h3>
                        <p className="text-muted-foreground mb-6">
                            Targeted solutions to help you achieve balance and radiance.
                        </p>
                        <Button variant="link" className="p-0 text-primary font-semibold">
                            Browse all {activeConcern} products &rarr;
                        </Button>
                    </div>

                    {/* Filtered Products */}
                    {filteredProducts.map((product) => (
                        <Card key={product.id} className="border-none shadow-sm hover:shadow-md transition-shadow p-0 gap-0">
                            <div className="aspect-square bg-muted rounded-t-xl overflow-hidden relative">
                                <Image src={product.image} alt={product.name} fill className="object-cover" />
                            </div>
                            <CardContent className="p-4">
                                <h4 className="font-semibold">{product.name}</h4>
                                <p className="text-sm text-muted-foreground">Perfect for {product.concern}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
