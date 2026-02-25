'use client';

import { useParams } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductPage() {
  const params = useParams();

  // Derive productId directly from params
  const rawId = params?.id ? parseInt(params.id as string) : 1;
  const productId = (!isNaN(rawId) && rawId > 0) ? rawId : 1;

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

