"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useStoreContext } from "@/context/store-context";

// Dummy Data
const staticProducts = [
    { id: 1, name: "Luminous Glow Serum", price: "₹3,599", category: "Skincare", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=500" },
    { id: 2, name: "Velvet Matte Lipstick", price: "₹2,299", category: "Makeup", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=500" },
    { id: 3, name: "Hydrating Rose Mist", price: "₹2,599", category: "Skincare", image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=500" },
    { id: 4, name: "Repairing Night Cream", price: "₹4,299", category: "Skincare", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=500" },
];

export function BestSellers() {
    const { sections, loading: contextLoading } = useStoreContext();
    const [products, setProducts] = useState<any[]>([]);
    const [title, setTitle] = useState("Best Sellers");
    const [subtitle, setSubtitle] = useState("Customer Favorites");

    useEffect(() => {
        if (!contextLoading && sections) {
            const sectionConfig = Object.values(sections).find((s: any) => 
                s.type === 'best_sellers' || 
                s.id?.toLowerCase().includes('best') || 
                s.title?.toLowerCase().includes('best') ||
                s.type === 'featured' ||
                s.id?.toLowerCase().includes('feat') ||
                s.title?.toLowerCase().includes('feat')
            ) as any;

            if (sectionConfig && sectionConfig.products && sectionConfig.products.length > 0) {
                setProducts(sectionConfig.products);
                if (sectionConfig.title) setTitle(sectionConfig.title);
                if (sectionConfig.subtitle) setSubtitle(sectionConfig.subtitle);
            } else {
                setProducts(staticProducts);
            }
        }
    }, [sections, contextLoading]);

    if (contextLoading) return null;

    return (
        <section id="bestsellers" className="py-20 px-4 bg-secondary/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/50 text-primary text-sm uppercase tracking-widest">
                        {subtitle}
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold font-serif text-foreground">
                        {title}
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <Card key={product.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-card p-0 gap-0">
                            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                                <Image
                                    src={product.image || (product.images && product.images[0]) || "https://via.placeholder.com/500"}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground hover:bg-primary/90">
                                    Bestseller
                                </Badge>
                                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <Button className="w-full gap-2 shadow-lg" size="lg">
                                        <ShoppingBag className="w-4 h-4" /> Add to Cart
                                    </Button>
                                </div>
                            </div>
                            <CardContent className="pt-6 pb-6">
                                <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                    {product.name}
                                </h3>
                                <p className="text-xl font-bold text-primary">₹{product.price?.toLocaleString()}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/shop">
                        <Button variant="outline" size="lg" className="min-w-[200px]">
                            View All Products
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
