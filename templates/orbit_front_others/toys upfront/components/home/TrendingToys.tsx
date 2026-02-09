"use client";

import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import ProductCard from "../ui/ProductCard";

import { useStorefront } from "@/context/StorefrontContext";

export default function TrendingToys() {
    const { products, loading } = useStorefront();
    return (
        <section className="py-20 bg-sky-50/30">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-2">
                            Trending Toys
                        </h2>
                        <p className="text-gray-500">What everyone is playing with right now!</p>
                    </div>
                    <Link
                        href="/category/trending"
                        className="hidden md:block text-primary font-bold hover:underline"
                    >
                        View All →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {loading ? (
                        <div className="col-span-full text-center text-gray-500">Loading products...</div>
                    ) : (
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    )}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/category/trending"
                        className="text-primary font-bold hover:underline"
                    >
                        View All Trending Toys →
                    </Link>
                </div>
            </div>
        </section>
    );
}
