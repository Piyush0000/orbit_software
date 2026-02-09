"use client";

import { useEffect, useState, use } from "react";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import Recommendations from "@/components/product/Recommendations";
import { useStorefront } from "@/context/StorefrontContext";
import { Product } from "@/types/product";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: PageProps) {
    const { id } = use(params);
    const { products, loading } = useStorefront();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (!loading && products.length > 0) {
            const found = products.find(p => p.id === id);
            if (found) {
                setProduct(found);
            }
        }
    }, [id, products, loading]);

    if (loading) {
        return (
            <div className="bg-white min-h-screen pt-40 pb-16 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="font-serif text-xl text-gray-400">Loading Scent Details...</p>
                </div>
            </div>
        );
    }

    if (!loading && !product) {
        return notFound();
    }

    if (!product) return null;

    return (
        <div className="bg-white min-h-screen pt-32 pb-24">
            <div className="container mx-auto px-4">

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
                    <ProductGallery images={product.images || [product.image]} />
                    <ProductInfo product={product} />
                </div>

                <div className="mb-32">
                    <ProductTabs product={product} />
                </div>

                <Recommendations currentProductId={product.id} />

            </div>
        </div>
    );
}
