"use client";

import { useRef, useState, useEffect } from 'react';
import { useStoreContext } from '@/contexts/store-context';
import { StorefrontAPI } from '@/lib/api';

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
        // 1️⃣ Priority: Products from sections context (if configured in editor)
        if (sections) {
          const sectionConfig = Object.values(sections).find((s: any) =>
            s.id?.toLowerCase().includes('featured') ||
            s.type === 'featured' ||
            s.id?.toLowerCase().includes('selection')
          ) as any;

          if (sectionConfig?.products?.length > 0) {
            setProducts(sectionConfig.products);
            setLoadingProducts(false);
            return;
          }
        }

        // 2️⃣ Secondary: Fetch from API and filter for featured items
        const result = await StorefrontAPI.getProducts({ limit: 12 });
        const allApiProducts = result?.products || [];
        const featured = allApiProducts.filter((p: any) => p.isFeatured);
        
        if (featured.length > 0) {
          setProducts(featured.slice(0, 6));
        } else {
          // No fallback to latest products - only show what's marked featured
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    load().finally(() => setLoadingProducts(false));
  }, [sections, customization, contextLoading]);

  const isEditor = typeof window !== 'undefined' && window.parent !== window;

  const handleImageClick = (e: React.MouseEvent, productId: any) => {
    if (isEditor) {
      e.preventDefault();
      e.stopPropagation();
      window.parent.postMessage({ type: 'ORBIT_PRODUCT_IMAGE_CLICK', productId }, '*');
    }
  };

  const handleAddProduct = () => {
    if (isEditor) {
      window.parent.postMessage({ type: 'ORBIT_ADD_PRODUCT_CLICK', sectionId: 'featuredProducts' }, '*');
    }
  };

  const displayTitle = customization?.featuredProducts?.title || title;
  const displaySubtitle = customization?.featuredProducts?.subtitle || subtitle;

  // Header part...
  const renderHeader = () => (
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl font-black mb-4 font-heading tracking-tight uppercase" style={{ color: 'var(--text)' }}>
        {displayTitle}
      </h2>
      <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
        {displaySubtitle}
      </p>
    </div>
  );

  if (contextLoading || loadingProducts) return (
    <section id="featured" onClick={handleSectionClick} className="py-16 bg-[var(--page-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderHeader()}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="aspect-square rounded-xl bg-white/5 animate-pulse border border-white/10" />
          ))}
        </div>
      </div>
    </section>
  );

  // If no products and not in editor, hide the section
  if (products.length === 0 && !isEditor) return null;

  return (
    <section
      id="featured"
      onClick={handleSectionClick}
      className="py-16 transition-colors duration-300 relative overflow-hidden hover:outline hover:outline-2 hover:outline-blue-500/50 cursor-pointer"
      style={{ backgroundColor: 'var(--page-bg)' }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(0,240,255,0.05),_transparent_40%)]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderHeader()}

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
              <div className="aspect-square bg-black/50 overflow-hidden relative" onClick={(e) => isEditor && handleImageClick(e, product.id)}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {isEditor && (
                   <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-[var(--accent-blue)] text-black px-4 py-2 text-xs font-bold rounded uppercase tracking-tighter">
                         Change Image
                      </button>
                   </div>
                )}

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

          {/* Add Product Card (Editor Only) */}
          {isEditor && (
            <div 
              onClick={handleAddProduct}
              className="flex flex-col items-center justify-center aspect-square rounded-xl border-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10 transition-all group cursor-pointer"
            >
               <div className="w-12 h-12 rounded-full border-2 border-dashed border-white/40 flex items-center justify-center mb-4 group-hover:border-[var(--accent-blue)] group-hover:scale-110 transition-all">
                  <span className="text-3xl text-white/40 group-hover:text-[var(--accent-blue)] transition-colors">+</span>
               </div>
               <span className="text-sm font-bold tracking-widest uppercase text-white/40 group-hover:text-white transition-colors">Add Featured Product</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
