"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";
import { getProducts, type Product } from "@/lib/products-api";

export function BestSellers() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts();
                setProducts(data.filter(p => p.isFeatured && p.isActive).slice(0, 4));
            } catch (error) {
                console.error('Failed to load products:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    if (loading) {
        return (
            <section className="py-20 px-4 bg-secondary/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Loading products...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <section className="py-20 px-4 bg-secondary/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/50 text-primary text-sm uppercase tracking-widest">
                        Customer Favorites
                    </Badge>
                    <h2 className="text-3xl md:text-5xl font-bold font-serif text-foreground">
                        Best Sellers
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <Card key={product.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-card p-0 gap-0">
                            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                                <Image
                                    src={product.images[0] || '/placeholder.jpg'}
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
                                <p className="text-sm text-muted-foreground mb-2">{product.category || 'Beauty'}</p>
                                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                    {product.name}
                                </h3>
                                <p className="text-xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button variant="outline" size="lg" className="min-w-[200px]">
                        View All Products
                    </Button>
                </div>
            </div>
        </section>
    );
}
