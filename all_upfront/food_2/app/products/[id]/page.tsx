"use client"

import { useParams } from "next/navigation"
import { products, Product } from "@/lib/data"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import {
    Star,
    ShoppingCart,
    Minus,
    Plus,
    ChevronLeft,
    ChevronRight,
    ArrowRight
} from "lucide-react"
import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"

import { VegNonVegBadge, SpiceLevelTag, TrustBadge } from "@/components/ui/custom-badges"
import { QuantitySelector, NutritionTable } from "@/components/ui/product-utils"
import { useCart } from "@/context/CartContext"

export default function ProductDetailPage() {
    const params = useParams()
    const { addToCart } = useCart()
    const id = parseInt(params.id as string)

    const product = products.find(p => p.id === id)
    const [quantity, setQuantity] = useState(1)
    const [activeImage, setActiveImage] = useState(0)

    const relatedProducts = useMemo(() => {
        if (!product) return []
        return products.filter(p => p.category === product.category && p.id !== product.id)
    }, [product])

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-black uppercase tracking-tighter">Product not found</h1>
                    <Link href="/categories/all">
                        <Button variant="link" className="mt-4 font-black uppercase tracking-widest px-0">Back to Shop</Button>
                    </Link>
                </div>
            </div>
        )
    }

    const allergens = ["nuts", "cashews", "milk", "soy", "wheat", "peanuts", "egg"]
    const formatIngredients = (ingredients: string[]) => {
        return ingredients.map((item, index) => {
            const hasAllergen = allergens.some(allergen => item.toLowerCase().includes(allergen))
            return (
                <li key={index} className="text-zinc-600 mb-1 text-sm">
                    {hasAllergen ? <strong className="text-zinc-900">{item}</strong> : item}
                </li>
            )
        })
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 md:px-6 py-12">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-10 overflow-x-auto whitespace-nowrap">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href="/categories/all" className="hover:text-primary transition-colors">Shop</Link>
                    <ChevronRight className="w-3 h-3" />
                    <Link href={`/categories/${product.category}`} className="hover:text-primary transition-colors">{product.category}</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-foreground truncate">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    {/* Left: Image Gallery */}
                    <div className="space-y-6">
                        <div className="aspect-square relative rounded-none overflow-hidden bg-muted border border-border shadow-[20px_20px_0px_0px_rgba(244,244,245,1)]">
                            <Image
                                src={product.image[activeImage]}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-105"
                                priority
                            />
                            {product.badge && (
                                <div className="absolute top-6 left-6 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 shadow-xl">
                                    {product.badge}
                                </div>
                            )}
                        </div>
                        {product.image.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                                {product.image.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative w-24 aspect-square rounded-none overflow-hidden border-2 transition-all shrink-0 ${activeImage === idx ? 'border-primary' : 'border-transparent hover:border-border'}`}
                                    >
                                        <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <VegNonVegBadge veg={product.veg} />
                                <div className="h-4 w-px bg-zinc-200" />
                                <SpiceLevelTag level={product.spiceLevel} />
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase leading-[0.9]">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5 bg-zinc-900 text-white px-3 py-1 text-xs font-black">
                                    <Star className="w-3 h-3 fill-primary text-primary" />
                                    <span>{product.rating}</span>
                                </div>
                                <span className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em]">{product.reviewCount} Verified Reviews</span>
                            </div>
                        </div>

                        <div className="text-5xl font-black text-primary tracking-tighter">
                            ₹{product.price}
                        </div>

                        <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-xl">
                            {product.shortDescription}
                        </p>

                        <div className="flex flex-col gap-4 pt-4">
                            <div className="flex items-center gap-4">
                                <QuantitySelector
                                    quantity={quantity}
                                    onIncrement={() => setQuantity(quantity + 1)}
                                    onDecrement={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="h-14"
                                />
                                <Button
                                    className="flex-1 h-14 rounded-none text-sm font-black uppercase tracking-[0.2em] group"
                                    onClick={() => {
                                        for (let i = 0; i < quantity; i++) addToCart(product)
                                        // alert(`${product.name} (${quantity}) added to cart!`)
                                    }}
                                >
                                    <ShoppingCart className="w-5 h-5 mr-3" />
                                    Add to Bag
                                </Button>
                            </div>
                            <Link href="/checkout" className="flex-1">
                                <Button
                                    variant="outline"
                                    className="w-full h-14 rounded-none text-sm font-black uppercase tracking-[0.2em] border-border hover:bg-muted transition-all"
                                >
                                    Fast Checkout
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap gap-3 pt-8 border-t border-border">
                            <TrustBadge icon="shield" text="Certified Pure" />
                            <TrustBadge icon="truck" text="Fast Delivery" />
                            <TrustBadge icon="refresh" text="Easy Returns" />
                        </div>
                    </div>
                </div>

                {/* Bottom: Tabs Section */}
                <div className="mb-24">
                    <Tabs defaultValue="description" className="w-full">
                        <TabsList className="w-full justify-start border-b border-zinc-200 bg-transparent rounded-none h-auto p-0 mb-10 overflow-x-auto overflow-y-hidden no-scrollbar">
                            <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 data-[state=active]:text-primary transition-all">Description</TabsTrigger>
                            <TabsTrigger value="ingredients" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 data-[state=active]:text-primary transition-all">Ingredients</TabsTrigger>
                            <TabsTrigger value="nutrition" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 data-[state=active]:text-primary transition-all">Nutrition</TabsTrigger>
                            <TabsTrigger value="storage" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 data-[state=active]:text-primary transition-all">Storage & Tips</TabsTrigger>
                        </TabsList>

                        <TabsContent value="description" className="mt-0 outline-none">
                            <div className="max-w-3xl">
                                <p className="text-zinc-600 leading-loose text-lg font-medium italic mb-6">"Something special in every bite."</p>
                                <p className="text-zinc-500 leading-relaxed text-lg whitespace-pre-wrap">
                                    {product.fullDescription}
                                </p>
                            </div>
                        </TabsContent>

                        <TabsContent value="ingredients" className="mt-0 outline-none">
                            <div className="max-w-2xl bg-muted/30 p-10 border border-border">
                                <h3 className="text-xs font-black text-foreground mb-6 uppercase tracking-[0.3em]">Curated Components</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 list-none">
                                    {formatIngredients(product.ingredients)}
                                </ul>
                                <div className="mt-10 p-4 border-l-4 border-primary bg-card shadow-sm">
                                    <p className="text-xs text-muted-foreground italic font-medium leading-relaxed">
                                        * Bold items represent premium focus or potential allergens. We maintain the highest standards of purity in our sourcing.
                                    </p>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="nutrition" className="mt-0 outline-none">
                            <div className="max-w-md">
                                <NutritionTable nutrition={product.nutrition} />
                            </div>
                        </TabsContent>

                        <TabsContent value="storage" className="mt-0 outline-none">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4 bg-zinc-900 text-white p-10">
                                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Storage Instructions</h3>
                                    <p className="text-zinc-300 leading-relaxed font-medium">{product.storage.instructions}</p>
                                </div>
                                <div className="space-y-4 border border-zinc-200 p-10">
                                    <h3 className="text-xs font-black text-zinc-400 uppercase tracking-[0.3em]">Freshness Guarantee</h3>
                                    <p className="text-zinc-900 leading-relaxed font-black text-4xl tracking-tighter uppercase">{product.storage.bestBefore}</p>
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{product.storage.disclaimer}</p>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="border-t border-zinc-100 pt-20">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h2 className="text-3xl font-black tracking-tighter text-zinc-900 uppercase">You may also like</h2>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mt-1">Carefully paired for you</p>
                            </div>
                            <Link href={`/categories/${product.category}`} className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] bg-primary/5 px-6 py-3 hover:bg-primary hover:text-white transition-all">
                                View Full Series <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="flex gap-8 overflow-x-auto pb-12 no-scrollbar -mx-4 px-4">
                            {relatedProducts.map(p => (
                                <div key={p.id} className="min-w-[300px] w-[300px] md:min-w-[350px] md:w-[350px]">
                                    <ProductCard product={p} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
