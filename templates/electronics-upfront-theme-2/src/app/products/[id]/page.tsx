'use client';

import { useParams } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';

export default function ProductPage() {
  const params = useParams();

  const productId = params?.id ? String(params.id) : '';

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ backgroundColor: 'var(--page-bg, #f8fafc)' }}
    >
      <main className="flex-grow">
        <ProductDetail productId={productId} />
      </main>
    </div>
  );
}

