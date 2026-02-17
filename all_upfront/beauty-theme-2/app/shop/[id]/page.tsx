import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductInfo } from "@/components/shop/ProductInfo";
import { ProductDetails } from "@/components/shop/ProductDetails";
import { ProductReviews } from "@/components/shop/ProductReviews";
import { ProductFAQ } from "@/components/shop/ProductFAQ";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

export default async function ProductPage(props: ProductPageProps) {
    const params = await props.params;
    const product = products.find((p) => p.id === params.id);

    if (!product) {
        notFound();
    }

    return (
        <div className="bg-background min-h-screen py-10 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <div className="mb-8">
                    <Link href="/shop">
                        <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent hover:text-primary">
                            <ArrowLeft className="w-4 h-4" /> Back to Shop
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left Column: Gallery */}
                    <div>
                        <ProductGallery images={product.images} productName={product.name} />
                    </div>

                    {/* Right Column: Info */}
                    <div>
                        <ProductInfo product={product} />
                    </div>
                </div>

                {/* Full Width Details Section */}
                <ProductDetails product={product} />

                {/* Reviews Section */}
                <div className="mt-24 border-t pt-16">
                    <ProductReviews product={product} />
                </div>

                {/* FAQ Section */}
                <div className="mt-24 border-t pt-16">
                    <ProductFAQ product={product} />
                </div>
            </div>
        </div>
    );
}
