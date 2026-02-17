import ProductGrid from '@/components/ProductGrid';


export default function ProductsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold mb-6">All Products</h1>
                    <ProductGrid />
                </div>
            </main>
        </div>
    );
}
