'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)] flex flex-col lg:flex-row font-sans">

      {/* Text Content - 40% */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-20 lg:py-0 relative z-10 order-2 lg:order-1 bg-[var(--page-bg)]">
        <div className="space-y-8 animate-fade-in-up">
          <div className="w-12 h-[1px] bg-[var(--accent-color)] mb-6"></div>

          <h1 className="text-5xl sm:text-7xl lg:text-7xl font-heading font-semibold leading-[1.1] tracking-tight">
            <span className="block text-[var(--accent-color)]">Elegance</span>
            <span className="block">Redefined</span>
          </h1>

          <p className="text-[var(--text-secondary)] text-lg font-light leading-relaxed max-w-md">
            A curated collection of essentials designed for the modern connoisseur.
            Experience the perfect balance of luxury and restraint.
          </p>

          <div className="pt-8">
            <Link
              href="/products"
              className="inline-block px-10 py-5 border border-[var(--accent-color)] text-[var(--accent-color)] text-xs font-bold uppercase tracking-[0.25em] hover:bg-[var(--accent-color)] hover:text-black transition-all duration-500"
            >
              Shop The Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Image Content - 60% */}
      <div className="w-full lg:w-[60%] h-[70vh] lg:h-screen relative order-1 lg:order-2">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop")', // Fashion editorial
            filter: 'contrast(1.1) brightness(0.8)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent"></div>

        {/* Minimal Overlay Badge */}
        <div className="absolute bottom-12 right-12 hidden lg:block">
          <span className="text-[var(--text-primary)] text-xs font-bold uppercase tracking-[0.2em] [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
            Fall / Winter 2026
          </span>
        </div>
      </div>

    </section>
  );
}
