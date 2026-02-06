"use client";

import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import ProductCard from "../ui/ProductCard";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/products-api";
import { mapApiProducts, type ToyProduct } from "@/lib/product-adapter";

export default function TrendingToys() {
    const [products, setProducts] = useState<ToyProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const apiProducts = await getProducts();
                setProducts(mapApiProducts(apiProducts));
            } catch (error) {
                console.error("Failed to load products:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    return (
        <section className="py-12 bg-white">
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
                        className="hidden md:block text-secondary font-bold hover:underline"
                    >
                        View All →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {loading ? (
                        <p className="col-span-full text-center text-gray-500">Loading products...</p>
                    ) : products.length === 0 ? (
                        <p className="col-span-full text-center text-gray-500">No products available.</p>
                    ) : (
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    )}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/category/trending"
                        className="text-secondary font-bold hover:underline"
                    >
                        View All Trending Toys →
                    </Link>
                </div>
            </div>
        </section>
    );
}
