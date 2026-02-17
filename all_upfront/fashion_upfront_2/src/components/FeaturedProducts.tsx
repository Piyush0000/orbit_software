"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useStoreContext } from '@/contexts/store-context';

interface FeaturedProduct {
  id: number;
  name: string;
  price: any;
  originalPrice?: any;
  image: string;
  badge?: string;
}

const staticProducts: FeaturedProduct[] = [
  { id: 101, name: 'Floral Summer Dress', price: '₹4,149', originalPrice: '₹6,639', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop', badge: 'Best Seller' },
  { id: 102, name: 'Designer Denim Jacket', price: '₹7,469', originalPrice: '₹10,789', image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&h=800&fit=crop', badge: 'New' },
  { id: 103, name: 'Classic Leather Boots', price: '₹12,449', originalPrice: '₹16,599', image: 'https://images.unsplash.com/photo-1542280756-74b2f55e73ab?w=600&h=800&fit=crop', badge: 'Sale' },
];

export default function FeaturedProducts() {
  const { sections, loading: contextLoading } = useStoreContext();
  const [products, setProducts] = useState<any[]>([]);
  const [title, setTitle] = useState("Featured Edits");
  const [subtitle, setSubtitle] = useState("Curated Selection");

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
    <section id="featured" className="py-20 bg-zinc-50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3">{subtitle}</span>
          <h2 className="text-4xl md:text-5xl font-heading font-medium text-black uppercase tracking-tight mb-4">
            {title}
          </h2>
          <div className="h-[1px] w-20 bg-black"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-200 mb-6">
                <Image
                  src={product.image || (product.images && product.images[0]) || 'https://via.placeholder.com/600'}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {(product.badge || product.isFeatured) && (
                  <span className="absolute top-4 left-4 bg-white text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10">
                    {product.badge || 'Featured'}
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center pb-8 bg-gradient-to-t from-black/50 to-transparent">
                  <button className="bg-white text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-heading uppercase text-black mb-1">{product.name}</h3>
                <div className="flex justify-center items-center gap-3 text-sm">
                  <span className="font-bold text-black">₹{product.price?.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-zinc-500 line-through decoration-zinc-400">₹{product.originalPrice?.toLocaleString()}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
