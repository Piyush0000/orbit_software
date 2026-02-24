'use client';

import Link from 'next/link';
import { useStoreContext } from '@/contexts/store-context';

export default function Hero() {
  const { customization } = useStoreContext();

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
    }
  };

  const headline = customization?.heroSection?.title || customization?.heroSection?.headline || "Elegance Redefined";
  const subheadline = customization?.heroSection?.subtitle || customization?.heroSection?.subheadline || "Fall / Winter 2026";
  const description = customization?.heroSection?.description || "A curated collection of essentials designed for the modern connoisseur. Experience the perfect balance of luxury and restraint.";
  const ctaText = customization?.heroSection?.ctaText || customization?.heroSection?.buttonText || "Shop The Collection";
  const bgImage = customization?.heroSection?.backgroundImage || "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop";

  return (
    <section 
      onClick={handleSectionClick}
      className="relative w-full min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)] flex flex-col lg:flex-row font-sans hover:outline hover:outline-2 hover:outline-blue-500/50 cursor-pointer"
    >
      {/* Text Content - 40% */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-20 lg:py-0 relative z-10 order-2 lg:order-1 bg-[var(--page-bg)]">
        <div className="space-y-8 animate-fade-in-up">
          <div className="w-12 h-[1px] bg-[var(--accent-color)] mb-6"></div>

          <h1 className="text-5xl sm:text-7xl lg:text-7xl font-heading font-semibold leading-[1.1] tracking-tight">
            <span className="block text-[var(--accent-color)]">{headline.split(' ')[0]}</span>
            <span className="block">{headline.split(' ').slice(1).join(' ')}</span>
          </h1>

          <p className="text-[var(--text-secondary)] text-lg font-light leading-relaxed max-w-md">
            {description}
          </p>

          <div className="pt-8">
            <Link
              href="/products"
              className="inline-block px-10 py-5 border border-[var(--accent-color)] text-[var(--accent-color)] text-xs font-bold uppercase tracking-[0.25em] hover:bg-[var(--accent-color)] hover:text-black transition-all duration-500"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </div>

      {/* Image Content - 60% */}
      <div className="w-full lg:w-[60%] h-[70vh] lg:h-screen relative order-1 lg:order-2">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${bgImage}")`,
            filter: 'contrast(1.1) brightness(0.8)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent"></div>

        {/* Minimal Overlay Badge */}
        <div className="absolute bottom-12 right-12 hidden lg:block">
          <span className="text-[var(--text-primary)] text-xs font-bold uppercase tracking-[0.2em] [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
            {subheadline}
          </span>
        </div>
      </div>
    </section>
  );
}
