'use client';

export default function BannerCTA() {
  return (
    <section className="relative py-32 bg-zinc-950 overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div
          className="absolute inset-0 bg-cover bg-center grayscale"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80")' }}
        ></div>
      </div>

      <div className="relative z-10 max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <span className="inline-block border border-white/30 px-4 py-1 mb-6 text-xs font-bold tracking-[0.2em] text-white uppercase backdrop-blur-sm">
          Limited Time Offer
        </span>

        <h2 className="text-5xl md:text-7xl font-heading font-medium text-white mb-6 uppercase tracking-tight">
          New Season <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">Arrivals</span>
        </h2>

        <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Upgrade your wardrobe with our premium collection. Use code <span className="text-white font-bold decoration-1 underline underline-offset-4">NEW20</span> for 20% off at checkout.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="#products"
            className="px-10 py-4 bg-white text-black font-bold text-sm tracking-[0.15em] hover:bg-zinc-200 transition-colors uppercase min-w-[200px]"
          >
            Shop The Sale
          </a>
          <a
            href="#"
            className="px-10 py-4 border border-white text-white font-bold text-sm tracking-[0.15em] hover:bg-white hover:text-black transition-colors uppercase min-w-[200px]"
          >
            View Details
          </a>
        </div>
      </div>
    </section>
  );
}
