import React from 'react';
import { useStoreContext } from '@/contexts/store-context';

export default function Hero() {
  const { customization } = useStoreContext();

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
    }
  };

  const headline = customization?.heroSection?.title || customization?.heroSection?.headline || "Next-Gen Electronics";
  const subheadline = customization?.heroSection?.subtitle || customization?.heroSection?.subheadline || "Experience the future of technology. Premium laptops, smartphones, and accessories engineered for performance.";
  const bgImage = customization?.heroSection?.backgroundImage || "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2000&auto=format&fit=crop";
  const ctaText = customization?.heroSection?.ctaText || customization?.heroSection?.buttonText || "Explore Products";

  return (
    <section 
      onClick={handleSectionClick}
      className="relative w-full h-[600px] md:h-[700px] overflow-hidden flex items-center hover:outline hover:outline-2 hover:outline-blue-500/50 cursor-pointer" 
      style={{ background: 'var(--hero-bg)' }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, var(--accent-cyan) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Main Hero Image */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center bg-no-repeat z-0 transition-transform duration-700 hover:scale-105 hidden md:block"
        style={{
          backgroundImage: `url("${bgImage}")`,
          maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl animate-fade-in-up">
          <span className="inline-block py-2 px-4 rounded-full text-sm font-bold mb-6 tracking-wide tech-border" style={{
            background: 'rgba(102, 252, 241, 0.1)',
            color: 'var(--accent-cyan)',
            border: '1px solid var(--accent-cyan)'
          }}>
            ⚡ NEW ARRIVALS
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 uppercase" style={{ color: 'var(--text-highlight)' }}>
            {headline}
          </h1>
          <p className="text-lg md:text-xl mb-8" style={{ color: 'var(--text-muted)' }}>
            {subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#products"
              className="px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-lg text-center hover:shadow-2xl hover:scale-105"
              style={{
                background: 'var(--btn-primary-bg)',
                color: 'var(--btn-primary-text)'
              }}
            >
              <span className="uppercase">{ctaText}</span>
            </a>
            <a
              href="#featured"
              className="px-8 py-4 rounded-full font-bold transition-all duration-300 text-center glass-panel hover:bg-white/10"
              style={{ color: 'var(--accent-cyan)' }}
            >
              View Deals
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
