"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useStorefront } from "@/context/StorefrontContext";

export function BestSellers() {
    const { products } = useStorefront();
    const displayProducts = products.length > 0 ? products.slice(0, 4) : [];

    if (displayProducts.length === 0) return null;

    return (
        <section id="bestsellers" className="py-24 px-4 bg-background border-t border-border/40">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-3 block">
                        Customer Favorites
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif text-foreground uppercase">
                        Best Sellers
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {displayProducts.map((product) => (
                        <Card key={product.id} className="group overflow-hidden border-none shadow-none bg-transparent rounded-none">
                            <Link href={`/products/${product.id}`} className="block">
                                <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4 rounded-sm">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={product.image || (product.images && product.images[0]) || '/placeholder.png'}
                                        alt={product.name}
                                        className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                    {product.badge && (
                                        <Badge className="absolute top-3 left-3 bg-white/90 text-black hover:bg-white backdrop-blur-sm rounded-none px-3 font-normal tracking-wide text-[10px] uppercase shadow-sm">
                                            {product.badge}
                                        </Badge>
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                                        <Button className="w-full gap-2 shadow-lg rounded-none bg-white/90 text-black hover:bg-white border-none backdrop-blur-md uppercase text-[10px] tracking-widest" size="lg" onClick={(e) => {
                                            e.preventDefault();
                                        }}>
                                            <ShoppingBag className="w-4 h-4" /> Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            </Link>
                            <CardContent className="p-0 text-center">
                                <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">{product.category}</p>
                                <Link href={`/products/${product.id}`}>
                                    <h3 className="text-lg font-medium mb-1 group-hover:text-primary transition-colors line-clamp-1 font-serif uppercase">
                                        {product.name}
                                    </h3>
                                </Link>
                                <p className="text-lg text-primary font-bold">{product.price}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link href="/shop">
                        <Button variant="outline" size="lg" className="min-w-[200px] rounded-full border-primary/20 text-foreground hover:bg-primary/5 hover:text-primary hover:border-primary/50 transition-all uppercase tracking-widest text-[10px] h-12">
                            View All Products
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
