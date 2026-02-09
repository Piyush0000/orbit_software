"use client"
import Link from "next/link"
import Image from "next/image" // Keeping for next/image usage if we have valid urls, or fallback
import { Card, CardContent } from "@/components/ui/card"
import { useStorefront } from "@/context/StorefrontContext"

export default function CategoryExplorer() {
    const { categories, products } = useStorefront();

    // Helper to get an image for a category
    const getCategoryImage = (catName: string) => {
        const product = products.find(p => p.category === catName);
        return product?.image || product?.images?.[0] || '/placeholder.png'; // Fallback
    };

    // Filter out duplicate categories and map to object
    const distinctCategories = categories.map(cat => ({
        name: cat,
        slug: cat.toLowerCase().replace(/ /g, '-'),
        image: getCategoryImage(cat)
    })).slice(0, 5); // Limit to 5 for layout

    return (
        <section className="bg-zinc-50 py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-zinc-900 uppercase">Explore Categories</h2>
                        <p className="max-w-[700px] text-zinc-500 md:text-xl">
                            Discover our wide range of premium food and beverage selections.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                    {distinctCategories.map((category) => (
                        <Link key={category.name} href={`/categories/${category.slug}`}>
                            <Card className="group relative overflow-hidden rounded-xl border-none bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
                                <CardContent className="p-0">
                                    <div className="aspect-square relative flex items-center justify-center bg-zinc-100">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex items-end justify-center h-1/3">
                                            <span className="text-white font-semibold text-lg uppercase tracking-wider">{category.name}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
