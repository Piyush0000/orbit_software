import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

import { categories } from "@/lib/data"

export default function CategoryExplorer() {
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
                    {categories.map((category) => (
                        <Link key={category.name} href={`/categories/${category.slug}`}>
                            <Card className="group relative overflow-hidden rounded-xl border-none bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
                                <CardContent className="p-0">
                                    <div className="aspect-square relative flex items-center justify-center">
                                        <Image
                                            src={category.image}
                                            alt={category.name}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-110"
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
