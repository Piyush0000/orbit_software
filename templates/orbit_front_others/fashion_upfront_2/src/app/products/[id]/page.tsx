'use client';

import { useParams } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductPage() {
  const params = useParams();

  // Derive productId directly from params
  const { id } = params;
  const productId = Array.isArray(id) ? id[0] : id; // Handle potential array from catch-all routes, though typically string here.

  if (!productId) {
    return <div>Invalid Product ID</div>;
  }

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ backgroundColor: 'var(--page-bg, #f8fafc)' }}
    >
      <Header />
      <main className="flex-grow">
        <ProductDetail productId={productId} />
      </main>
      <Footer />
    </div>
  );
}

