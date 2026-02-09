import { ProductCard } from "@/components/ProductCard"
import { products } from "@/lib/data"

export default function BestSellers() {
    const bestSellers = products.filter(p => p.badge === "Bestseller").slice(0, 4)

    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground uppercase">Best Sellers</h2>
                        <p className="max-w-[700px] text-muted-foreground md:text-xl">
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
