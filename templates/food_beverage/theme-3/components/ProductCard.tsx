"use client"

import { Product } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, ShoppingCart, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Card
            className="group relative flex flex-col border-border shadow-sm transition-all hover:shadow-md overflow-hidden bg-card rounded-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={`/products/${product.id}`} className="block">
                <CardHeader className="p-0">
                    <div className="aspect-square relative overflow-hidden bg-muted">
                        <Image
                            src={product.image[0]}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Status Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.badge && (
                                <Badge className="bg-primary text-white uppercase text-[10px] tracking-widest px-2 py-0.5 border-none">
                                    {product.badge}
                                </Badge>
                            )}
                            {product.spiceLevel !== "None" && (
                                <Badge variant="secondary" className="bg-orange-100 text-orange-700 uppercase text-[10px] tracking-widest px-2 py-0.5 border-none">
                                    {product.spiceLevel}
                                </Badge>
                            )}
                        </div>

                        {/* Veg/Non-Veg Indicator */}
                        <div className="absolute top-3 right-3">
                            <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center ${product.veg ? 'border-green-600' : 'border-red-600'}`}>
                                <div className={`w-2 h-2 rounded-full ${product.veg ? 'bg-green-600' : 'bg-red-600'}`} />
                            </div>
                        </div>

                        {/* Quick Add Overlay */}
                        <div className={`absolute inset-0 bg-black/5 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                            <Button
                                size="sm"
                                className="bg-card text-foreground hover:bg-primary hover:text-primary-foreground shadow-xl translate-y-4 group-hover:translate-y-0 transition-all duration-300 rounded-full px-6 font-bold"
                                onClick={(e) => {
                                    e.preventDefault()
                                    alert(`${product.name} added to cart!`)
                                }}
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Quick Add
                            </Button>
                        </div>
                    </div>
                </CardHeader>
            </Link>

            <CardContent className="p-4 flex-1 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating} ({product.reviewCount})</span>
                    </div>
                </div>

                <Link href={`/products/${product.id}`}>
                    <CardTitle className="text-lg font-bold text-foreground transition-colors hover:text-primary leading-tight">
                        {product.name}
                    </CardTitle>
                </Link>

                <p className="text-sm text-muted-foreground line-clamp-1">
                    {product.shortDescription}
                </p>

                <div className="mt-auto pt-2">
                    <span className="text-xl font-bold text-primary">₹{product.price}</span>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button
                    className="w-full font-semibold uppercase tracking-wider h-11 rounded-xl transition-all active:scale-95"
                    onClick={() => alert(`${product.name} added to cart!`)}
                >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    )
}
