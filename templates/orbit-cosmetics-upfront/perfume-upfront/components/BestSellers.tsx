"use client"
import { useStorefront } from "@/context/StorefrontContext";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default function BestSellers() {
    const { products } = useStorefront();
    const displayProducts = products.length > 0 ? products.slice(0, 4) : [];

    if (displayProducts.length === 0) return null;

    return (
        <section className="py-16 px-4 md:px-8 bg-white">
            <div className="container mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-gold-500 uppercase tracking-widest text-xs font-bold font-sans">Our Collection</span>
                        <h2 className="text-3xl md:text-4xl font-serif mt-2 text-black uppercase tracking-tighter">Best Sellers & Trending</h2>
                    </div>
                    <Link href="/shop" className="hidden md:block text-xs uppercase tracking-widest font-bold border-b border-black pb-1 hover:text-gold-600 hover:border-gold-600 transition-colors">
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link href="/shop" className="text-xs uppercase tracking-widest font-bold border-b border-black pb-1">
                        View All
                    </Link>
                </div>
            </div>
        </section>
    );
}
