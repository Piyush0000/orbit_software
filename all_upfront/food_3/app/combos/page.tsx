import { products } from "@/lib/data"
import { ProductCard } from "@/components/ProductCard"
import { Badge } from "@/components/ui/badge"

export default function CombosPage() {
    const combos = products.filter(p => p.category === 'combos')

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header Section */}
            <div className="bg-card text-card-foreground py-16 md:py-24">
                <div className="container mx-auto px-4 text-center space-y-4">
                    <Badge className="bg-primary hover:bg-primary text-white border-none uppercase tracking-widest mb-4">
                        Curated Bundles
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                        Combos & Packs
                    </h1>
                    <p className="max-w-xl mx-auto text-muted-foreground text-lg">
                        Get more for less with our specially curated bundles designed for every occasion.
                    </p>
                </div>
            </div>

            {/* Product Grid */}
            <div className="container mx-auto px-4 -mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                    {combos.map(product => (
                        <div key={product.id} className="relative group">
                            {/* Savings Badge for Combo Page */}
                            {product.originalPrice && (
                                <div className="absolute -top-3 -right-3 z-10">
                                    <Badge className="h-12 w-12 rounded-full bg-orange-500 hover:bg-orange-600 border-none flex items-center justify-center shadow-lg">
                                        <div className="flex flex-col items-center leading-none text-white">
                                            <span className="text-[10px] uppercase font-bold">Save</span>
                                            <span className="text-xs font-black">₹{product.originalPrice - product.price}</span>
                                        </div>
                                    </Badge>
                                </div>
                            )}
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
