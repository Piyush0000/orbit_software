'use client';

export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] overflow-hidden flex items-end pb-20 md:pb-32">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-transform duration-[2000ms] hover:scale-105"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2670&auto=format&fit=crop")', // Urban fashion editorial
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl animate-fade-in-up">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[1px] w-12 bg-white"></span>
            <span className="text-white text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
              New Collection 2026
            </span>
          </div>

          <h1 className="text-6xl md:text-9xl font-heading font-medium leading-[0.9] text-white mb-8 uppercase tracking-tighter">
            Urban <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">Momentum</span>
          </h1>

          <p className="text-lg md:text-2xl text-zinc-300 font-light tracking-wide max-w-xl mb-10 leading-relaxed">
            Redefining streetwear with premium cuts and sustainable fabrics.
            Designed for those who move forward.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <a
              href="#products"
              className="px-12 py-4 bg-white text-black font-bold text-sm tracking-[0.15em] hover:bg-zinc-200 transition-colors uppercase text-center min-w-[200px]"
            >
              Shop Look
            </a>
            <a
              href="#featured"
              className="px-12 py-4 border border-white text-white font-bold text-sm tracking-[0.15em] hover:bg-white hover:text-black transition-all duration-300 uppercase text-center min-w-[200px]"
            >
              View Lookbook
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
