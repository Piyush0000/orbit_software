"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useStorefront } from "@/context/StorefrontContext";

export function BestSellers() {
    const { products } = useStorefront();
    
    // Fallback or simplified logic for bestsellers
    const displayProducts = products.length > 0 ? products.slice(0, 4) : [];

    if (displayProducts.length === 0) return null;

    return (
        <section id="bestsellers" className="py-20 px-4 bg-secondary/30">
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
                    {displayProducts.map((product) => (
                        <Card key={product.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-card p-0 gap-0">
                            <Link href={`/products/${product.id}`} className="block">
                                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={product.image || (product.images && product.images[0]) || '/placeholder.png'}
                                        alt={product.name}
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {product.badge && (
                                        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground hover:bg-primary/90 uppercase text-[10px] tracking-widest">
                                            {product.badge}
                                        </Badge>
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <Button className="w-full gap-2 shadow-lg" size="lg" onClick={(e) => {
                                            e.preventDefault();
                                            // Handle add to cart here
                                        }}>
                                            <ShoppingBag className="w-4 h-4" /> Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            </Link>
                            <CardContent className="pt-6 pb-6">
                                <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider text-[10px]">{product.category}</p>
                                <Link href={`/products/${product.id}`}>
                                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                        {product.name}
                                    </h3>
                                </Link>
                                <p className="text-xl font-bold text-primary">{product.price}</p>
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
