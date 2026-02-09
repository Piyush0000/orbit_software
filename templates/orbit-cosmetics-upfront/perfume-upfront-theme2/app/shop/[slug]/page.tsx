"use client";
import { useEffect, useState, use } from "react";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import FragrancePyramid from "@/components/product/FragrancePyramid";
import ProductTabs from "@/components/product/ProductTabs";
import Recommendations from "@/components/product/Recommendations";
import { useStorefront } from "@/context/StorefrontContext";
import { Product } from "@/types/product";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: PageProps) {
    const { slug } = use(params);
    const { products, loading } = useStorefront();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (!loading && products.length > 0) {
            // Find by slug or ID
            const found = products.find(p => (p as any).slug === slug || p.id === slug);
            if (found) {
                setProduct(found);
            }
        }
    }, [slug, products, loading]);

    if (loading) {
        return (
            <div className="bg-white min-h-screen pt-40 pb-16 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-16 h-16 border-t-2 border-b-2 border-gold-500 rounded-full animate-spin mb-8" />
                    <p className="font-serif text-2xl text-gray-300 italic tracking-widest">Unveiling Scent...</p>
                </div>
            </div>
        );
    }

    if (!loading && !product) {
        notFound();
    }

    if (!product) return null;

    return (
        <div className="bg-white min-h-screen pt-40 pb-32">
            <div className="container mx-auto px-6 lg:px-12">

                {/* Product Layout */}
                <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 mb-32">
                    <ProductGallery images={product.images && product.images.length > 0 ? product.images : [product.image]} />
                    <ProductInfo product={product} />
                </div>

                {/* Fragrance Pyramid - Only if data exists */}
                {((product as any).topNotes || (product as any).middleNotes || (product as any).baseNotes) && (
                    <div className="mb-32">
                        <FragrancePyramid
                            topNotes={(product as any).topNotes}
                            middleNotes={(product as any).middleNotes}
                            baseNotes={(product as any).baseNotes}
                        />
                    </div>
                )}

                {/* Tabs, Reviews, etc. */}
                <div className="mb-32">
                    <ProductTabs product={product} />
                </div>

                {/* Recommendations */}
                <Recommendations currentProductId={product.id} />

            </div>
        </div>
    );
}
