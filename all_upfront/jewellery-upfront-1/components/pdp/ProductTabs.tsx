"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProductTabs({ product }: { product: any }) {
    return (
        <div className="mt-16">
            <Tabs defaultValue="details" className="w-full">
                <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
                    <TabsList className="bg-transparent h-auto p-0 flex space-x-8 min-w-max">
                        <TabsTrigger
                            value="details"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-gold py-4 text-sm md:text-base uppercase tracking-wider"
                        >
                            Product Details
                        </TabsTrigger>
                        <TabsTrigger
                            value="care"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-gold py-4 text-sm md:text-base uppercase tracking-wider"
                        >
                            Care Guide
                        </TabsTrigger>
                        <TabsTrigger
                            value="shipping"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-gold py-4 text-sm md:text-base uppercase tracking-wider"
                        >
                            Shipping
                        </TabsTrigger>
                        <TabsTrigger
                            value="reviews"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-gold py-4 text-sm md:text-base uppercase tracking-wider"
                        >
                            Reviews ({product.reviewCount})
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="details" className="py-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <h3 className="text-lg font-bold mb-4">Product Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                        <div className="flex justify-between border-b border-border/30 pb-2">
                            <span className="text-muted-foreground">Material</span>
                            <span className="font-medium text-foreground">{product.attributes.material}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/30 pb-2">
                            <span className="text-muted-foreground">Metals</span>
                            <span className="font-medium text-foreground">{product.attributes.metalColor.join(", ")}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/30 pb-2">
                            <span className="text-muted-foreground">Stone</span>
                            <span className="font-medium text-foreground">{product.attributes.stoneType}</span>
                        </div>
                        <div className="flex justify-between border-b border-border/30 pb-2">
                            <span className="text-muted-foreground">Weight</span>
                            <span className="font-medium text-foreground">{product.attributes.weight}</span>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="care" className="py-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                        <li>Store in the provided luxury box to avoid scratches.</li>
                        <li>Avoid direct contact with perfumes and sprays.</li>
                        <li>Wipe with a soft cloth after use.</li>
                    </ul>
                </TabsContent>

                <TabsContent value="shipping" className="py-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <p className="text-sm text-muted-foreground">
                        We offer free insured shipping on all orders above ₹5000.
                        Orders are typically dispatched within 24 hours.
                        Returns are accepted within 7 days of delivery if the tag is intact.
                    </p>
                </TabsContent>

                <TabsContent value="reviews" className="py-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="bg-secondary/20 p-8 text-center rounded-lg">
                        <p className="text-muted-foreground">Reviews coming soon...</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
