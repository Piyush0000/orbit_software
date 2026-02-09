'use client';

import { useParams } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductPage() {
  const params = useParams();
  const { id } = params;
  const productId = Array.isArray(id) ? id[0] : id;

  if (!productId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
            <div>Invalid Product ID</div>
        </main>
        <Footer />
      </div>
    );
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
