"use client";

import { useState, useEffect } from 'react';
import { useStoreContext } from '@/contexts/store-context';

interface FeaturedProduct {
  id: number;
  name: string;
  price: any;
  originalPrice?: any;
  image: string;
  badge?: string;
}

// Convert USD to INR (approximate rate: 1 USD = 83 INR)
const usdToInr = (usd: number) => Math.round(usd * 83);
const formatINR = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

const staticProducts: FeaturedProduct[] = [
  { id: 1, name: 'NovaPhone 15 Ultra', price: formatINR(usdToInr(1199.99)), originalPrice: formatINR(usdToInr(1299.99)), image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop', badge: 'Best Seller' },
  { id: 2, name: 'Zenith X1 Gaming Laptop', price: formatINR(usdToInr(2499.99)), originalPrice: formatINR(usdToInr(2999.99)), image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=600&fit=crop', badge: 'New' },
  { id: 3, name: 'SonicFlow Pro Headphones', price: formatINR(usdToInr(349.99)), originalPrice: formatINR(usdToInr(399.99)), image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop', badge: 'Sale' },
];

export default function FeaturedProducts() {
  const { sections, loading: contextLoading } = useStoreContext();
  const [products, setProducts] = useState<any[]>([]);
  const [title, setTitle] = useState("Featured Products");
  const [subtitle, setSubtitle] = useState("Handpicked favorites from our collection");

  useEffect(() => {
    if (!contextLoading && sections) {
        const sectionConfig = Object.values(sections).find((s: any) => 
            s.type === 'featured' || 
            s.id?.toLowerCase().includes('feat') || 
            s.title?.toLowerCase().includes('feat') ||
            s.id?.toLowerCase().includes('best') || 
            s.title?.toLowerCase().includes('best')
        ) as any;

        if (sectionConfig && sectionConfig.products && sectionConfig.products.length > 0) {
            setProducts(sectionConfig.products);
            if (sectionConfig.title) setTitle(sectionConfig.title);
            if (sectionConfig.subtitle) setSubtitle(sectionConfig.subtitle);
        } else {
            setProducts(staticProducts);
        }
    }
  }, [sections, contextLoading]);

  if (contextLoading) return null;

  return (
    <section
      id="featured"
      className="py-16 transition-colors duration-300"
      style={{ backgroundColor: 'var(--card-bg)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            {title}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative rounded-lg overflow-hidden hover:shadow-xl transition-shadow border group"
              style={{ backgroundColor: 'var(--section-alt)', borderColor: 'var(--card-border)' }}
            >
              {(product.badge || product.isFeatured) && (
                <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                  {product.badge || 'Featured'}
                </span>
              )}
              <div className="aspect-square bg-gray-200 overflow-hidden">
                <img src={product.image || (product.images && product.images[0]) || 'https://via.placeholder.com/600'} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>{product.name}</h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold" style={{ color: 'var(--text)' }}>₹{product.price?.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-lg line-through" style={{ color: 'var(--text-muted)' }}>₹{product.originalPrice?.toLocaleString()}</span>
                  )}
                </div>
                <button
                  className="w-full px-6 py-3 rounded-md font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: 'var(--header-text)', color: 'var(--header-bg)' }}
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
