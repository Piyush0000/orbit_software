"use client";

import { Product } from "@/lib/products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Droplets, Sparkles, ScrollText, CheckCircle2, Star } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

interface ProductDetailsProps {
    product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
    return (
        <div className="mt-16">
            <Tabs defaultValue="ingredients" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-8">
                    <TabsTrigger
                        value="ingredients"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-0 py-3 text-lg"
                    >
                        Ingredients
                    </TabsTrigger>
                    <TabsTrigger
                        value="usage"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-0 py-3 text-lg"
                    >
                        How to Use
                    </TabsTrigger>
                    <TabsTrigger
                        value="skinType"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-0 py-3 text-lg"
                    >
                        Skin Suitability
                    </TabsTrigger>
                </TabsList>

                <div className="mt-8">
                    {/* Ingredients Tab */}
                    <TabsContent value="ingredients" className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-primary" /> Key Actives
                                </h3>
                                <div className="space-y-6">
                                    {product.ingredients.filter(i => i.featured).map((ingredient) => (
                                        <div key={ingredient.name} className="flex gap-4">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-xs">
                                                {ingredient.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-foreground">{ingredient.name}</h4>
                                                <p className="text-muted-foreground text-sm leading-relaxed">{ingredient.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {product.warnings && (
                                <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-xl border border-amber-100 dark:border-amber-900/20 h-fit">
                                    <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5" /> Important
                                    </h3>
                                    <p className="text-amber-700 dark:text-amber-300 text-sm">
                                        {product.warnings}
                                    </p>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    {/* Usage Tab */}
                    <TabsContent value="usage">
                        <div className="bg-secondary/20 p-8 rounded-2xl max-w-3xl">
                            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <ScrollText className="w-5 h-5 text-primary" /> Ritual
                            </h3>
                            <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-primary/20">
                                {product.usage.map((step, index) => (
                                    <div key={index} className="relative flex gap-6 items-start">
                                        <div className="h-10 w-10 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center flex-shrink-0 text-primary font-bold z-10 shadow-sm">
                                            {index + 1}
                                        </div>
                                        <div className="pt-2">
                                            <p className="text-foreground leading-relaxed">{step}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    {/* Skin Type Tab */}
                    <TabsContent value="skinType" className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="p-6 rounded-xl border bg-card">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Best For
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {product.skinType.map((type) => (
                                        <Badge key={type} variant="secondary">
                                            {type}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 rounded-xl border bg-card">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <Droplets className="w-4 h-4 text-blue-500" /> Concerns
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {product.concern.map((c) => (
                                        <Badge key={c} variant="outline" className="border-blue-200 text-blue-700 dark:text-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
                                            {c}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
