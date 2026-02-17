import { products } from "@/lib/data"
import { ProductCard } from "@/components/ProductCard"
import LimitedOffer from "@/components/sections/LimitedOffer"
import { Badge } from "@/components/ui/badge"
import { Percent } from "lucide-react"

export default function OffersPage() {
    const discountedProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price)

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Limited Time Offer Section (Reused) */}
            <div className="bg-background">
                <LimitedOffer />
            </div>

            {/* Offers Header */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <Percent className="w-5 h-5" />
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">
                        Top Savings
                    </h2>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {discountedProducts.map(product => (
                        <div key={product.id} className="relative group">
                            {/* Percentage Off Badge */}
                            {product.originalPrice && (
                                <div className="absolute top-4 left-4 z-10">
                                    <Badge className="bg-red-600 text-white border-none uppercase text-[10px] tracking-widest px-2 py-1 shadow-sm">
                                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                    </Badge>
                                </div>
                            )}
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {discountedProducts.length === 0 && (
                    <div className="text-center py-20 text-zinc-400">
                        <p className="text-lg">No additional offers available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
