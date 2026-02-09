"use client"
import { ProductCard } from "@/components/ProductCard"
import { useStorefront } from "@/context/StorefrontContext"

export default function BestSellers() {
    const { products } = useStorefront()
    // Simplified logic: just take first 4, or filter by badge if available
    const bestSellers = products.length > 0 ? products.slice(0, 4) : [];

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-zinc-900 uppercase">Best Sellers</h2>
                        <p className="max-w-[700px] text-zinc-500 md:text-xl">
                            Our community's most loved snacks and beverages.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {bestSellers.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}
