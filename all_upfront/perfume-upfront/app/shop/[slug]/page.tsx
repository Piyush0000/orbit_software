import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import FragrancePyramid from "@/components/product/FragrancePyramid";
import ProductTabs from "@/components/product/ProductTabs";
import Recommendations from "@/components/product/Recommendations";
import { products } from "@/lib/data";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = products.find((p) => p.slug === slug);

    if (!product) return { title: "Product Not Found" };

    return {
        title: `${product.name} | Perfume Upfront`,
        description: product.description,
    };
}

export default async function ProductPage({ params }: PageProps) {
    const { slug } = await params;
    const product = products.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen pt-24 pb-16">
            <div className="container mx-auto px-4">

                {/* Product Layout */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
                    <ProductGallery images={product.gallery} />
                    <ProductInfo product={product} />
                </div>

                {/* Fragrance Pyramid */}
                <div className="mb-20">
                    <FragrancePyramid
                        topNotes={product.topNotes}
                        middleNotes={product.middleNotes}
                        baseNotes={product.baseNotes}
                    />
                </div>

                {/* Tabs, Reviews, etc. */}
                <ProductTabs product={product} />

                {/* Recommendations */}
                <Recommendations currentProductId={product.id} />

            </div>
        </div>
    );
}
