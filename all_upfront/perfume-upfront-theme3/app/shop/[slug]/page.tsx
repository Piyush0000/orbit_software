import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import FragrancePyramid from "@/components/product/FragrancePyramid";
import ProductTabs from "@/components/product/ProductTabs";
import Recommendations from "@/components/product/Recommendations";
import { products } from "@/lib/data";
import { Metadata } from "next";
import Header from "@/components/Header";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = products.find((p) => p.slug === slug);

    if (!product) return { title: "Product Not Found" };

    return {
        title: `${product.name} | Scentaris`,
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
        <div className="bg-[#F5F1E8] min-h-screen">
            <Header />
            <div className="container mx-auto px-4 pt-32 lg:pt-64 pb-20">

                {/* Product Layout */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-24 animate-fade-in">
                    <ProductGallery images={product.gallery} />
                    <ProductInfo product={product} />
                </div>

                {/* Fragrance Pyramid */}
                <div className="mb-24">
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
