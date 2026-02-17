'use client';

import { useParams } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';

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
      <main className="flex-grow">
        <ProductDetail productId={productId} />
      </main>
    </div>
  );
}

