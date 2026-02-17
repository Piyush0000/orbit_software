import { Suspense } from 'react';
import ProductGrid from '@/components/ProductGrid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold mb-6">All Products</h1>
                    <Suspense fallback={<div className="flex justify-center py-20">Loading products...</div>}>
                        <ProductGrid />
                    </Suspense>
                </div>
            </main>
            <Footer />
        </div>
    );
}
