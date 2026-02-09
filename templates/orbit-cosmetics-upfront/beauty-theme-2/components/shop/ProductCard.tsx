"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/lib/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation to product page
        addToCart(product);
    };

    return (
        <Link href={`/shop/${product.id}`} className="group">
            <Card className="border-none shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden bg-card h-full flex flex-col p-0 gap-0">
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Bestseller/New Badge */}
                    {product.tags.includes("Bestseller") && (
                        <Badge className="absolute top-3 left-3 bg-rose-500 text-white border-none">
                            Bestseller
                        </Badge>
                    )}

                    {/* Quick Action Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="secondary" className="rounded-full h-8 w-8 bg-white/80 hover:bg-white backdrop-blur-sm shadow-sm">
                            <Heart className="w-4 h-4 text-rose-500" />
                        </Button>
                    </div>

                    {/* Skin Type Tag Overlay - Enhances Visual Appeal */}
                    <div className="absolute bottom-3 left-3 flex gap-1 flex-wrap">
                        {product.skinType.slice(0, 2).map((type) => (
                            <Badge key={type} variant="secondary" className="bg-white/80 backdrop-blur-sm text-xs font-normal border-white/50">
                                {type}
                            </Badge>
                        ))}
                    </div>
                </div>

                <CardContent className="pt-4 px-4 pb-2 flex-grow">
                    <div className="flex justify-between items-start mb-1">
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</div>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-medium">
                            <Star className="w-3 h-3 fill-current" />
                            {product.rating} <span className="text-muted-foreground/60">({product.reviews})</span>
                        </div>
                    </div>

                    <h3 className="font-serif text-lg font-medium leading-tight mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>

                    {/* Highlighted Ingredients */}
                    <div className="flex flex-wrap gap-1 mb-2">
                        {product.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[10px] bg-primary/5 text-primary px-1.5 py-0.5 rounded-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                </CardContent>

                <CardFooter className="px-4 pb-4 pt-0 flex justify-between items-center">
                    <span className="font-bold text-lg">₹{product.price.toLocaleString("en-IN")}</span>
                    <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full px-4 hover:bg-primary hover:text-white transition-colors"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
