"use client";

import { useRef, useState, useEffect } from 'react';
import { useStoreContext } from '@/contexts/store-context';
import { StorefrontAPI } from '@/lib/api';

const staticProducts = [
  { id: 1, name: 'NovaPhone 15 Ultra', price: 99599, originalPrice: 107899, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop', isFeatured: true },
  { id: 2, name: 'Zenith X1 Gaming Laptop', price: 207499, originalPrice: 248999, image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=600&fit=crop', isFeatured: true },
  { id: 3, name: 'SonicFlow Pro Headphones', price: 29049, originalPrice: 33199, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop', isFeatured: true },
];

export default function FeaturedProducts() {
  const { sections, customization, loading: contextLoading } = useStoreContext();
  const [products, setProducts] = useState<any[]>([]);
  const [title, setTitle] = useState("Featured Products");
  const [subtitle, setSubtitle] = useState("Handpicked favorites from our collection");
  const [loadingProducts, setLoadingProducts] = useState(true);

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'featuredProducts' }, '*');
    }
  };

  useEffect(() => {
    if (contextLoading) return;

    // Update titles from customization immediately (live preview)
    if (customization?.featuredProducts?.title) setTitle(customization.featuredProducts.title);
    if (customization?.featuredProducts?.subtitle) setSubtitle(customization.featuredProducts.subtitle);

    const load = async () => {
      setLoadingProducts(true);
      try {
        // 1️⃣ Fetch real products from Orbit API (primary source)
        const result = await StorefrontAPI.getProducts({ limit: 6 });
        const apiProducts = result?.products || [];
        if (apiProducts.length > 0) {
          setProducts(apiProducts);
          return;
        }
      } catch {
        // API failed — fall through
      }

      // 2️⃣ Try sections context for featured items
      if (sections) {
        const sectionConfig = Object.values(sections).find((s: any) =>
          s.type === 'featured' ||
          s.id?.toLowerCase().includes('selection') ||
          s.id?.toLowerCase().includes('feat') ||
          s.title?.toLowerCase().includes('feat') ||
          s.id?.toLowerCase().includes('best') ||
          s.title?.toLowerCase().includes('best')
        ) as any;

        if (sectionConfig?.products?.length > 0) {
          setProducts(sectionConfig.products);
          if (!customization?.featuredProducts?.title && sectionConfig.title) setTitle(sectionConfig.title);
          if (!customization?.featuredProducts?.subtitle && sectionConfig.subtitle) setSubtitle(sectionConfig.subtitle);
          return;
        }
      }

      // 3️⃣ Static fallback
      setProducts(staticProducts);
    };

    load().finally(() => setLoadingProducts(false));
  }, [sections, customization, contextLoading]);

  const displayTitle = customization?.featuredProducts?.title || title;
  const displaySubtitle = customization?.featuredProducts?.subtitle || subtitle;

  if (contextLoading || loadingProducts) return (
    <section
      id="featured"
      onClick={handleSectionClick}
      className="py-16 transition-colors duration-300 relative overflow-hidden hover:outline hover:outline-2 hover:outline-blue-500/50 cursor-pointer"
      style={{ backgroundColor: 'var(--page-bg)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black mb-4 font-heading tracking-tight uppercase" style={{ color: 'var(--text)' }}>
            {displayTitle}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>{displaySubtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="aspect-square rounded-xl bg-white/5 animate-pulse border border-white/10" />
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <section
      id="featured"
      onClick={handleSectionClick}
      className="py-16 transition-colors duration-300 relative overflow-hidden hover:outline hover:outline-2 hover:outline-blue-500/50 cursor-pointer"
      style={{ backgroundColor: 'var(--page-bg)' }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(0,240,255,0.05),_transparent_40%)]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black mb-4 font-heading tracking-tight uppercase" style={{ color: 'var(--text)' }}>
            {displayTitle}
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            {displaySubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 border group glass"
              style={{ borderColor: 'var(--card-border)' }}
            >
              {product.isFeatured && (
                <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-[var(--accent-purple)] text-white text-xs font-bold rounded shadow-[0_0_10px_rgba(189,0,255,0.5)]">
                  Featured
                </span>
              )}
              <div className="aspect-square bg-black/50 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img
                  src={product.image || (product.images && product.images[0]) || 'https://via.placeholder.com/600'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>{product.name}</h3>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold neon-text-blue" style={{ color: 'var(--text)' }}>
                    ₹{product.price?.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm line-through text-gray-500">₹{product.originalPrice?.toLocaleString()}</span>
                  )}
                </div>
                <button className="w-full px-6 py-3 rounded font-bold transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:scale-[1.02] bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]">
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
