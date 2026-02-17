'use client';

export default function Hero() {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden flex items-center bg-black">
      {/* Background Image / Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-transform duration-700 hover:scale-105 opacity-60"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_100%)]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--page-bg)] to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
        <div className="max-w-3xl animate-fade-in-up">
          <span className="inline-block py-1.5 px-4 rounded-none bg-[var(--accent-green)] text-black text-sm font-bold mb-6 tracking-widest uppercase shadow-[0_0_10px_rgba(0,255,148,0.6)]">
            End Season Sale
          </span>
          <h1 className="text-6xl md:text-8xl font-black leading-tight mb-6 font-heading tracking-tighter">
            FUTURE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] neon-text-blue">
              READY
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-300 font-light max-w-xl">
            Experience the next generation of tech. Get up to <span className="text-[var(--accent-green)] font-bold">70% OFF</span> on selected models.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <a
              href="#products"
              className="px-10 py-4 bg-[var(--accent-blue)] text-black rounded-none skew-x-[-10deg] font-bold hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300 transform"
            >
              <span className="skew-x-[10deg] inline-block">SHOP NOW</span>
            </a>
            <a
              href="#featured"
              className="px-10 py-4 border border-[var(--accent-purple)] text-[var(--accent-purple)] rounded-none skew-x-[-10deg] font-bold hover:bg-[var(--accent-purple)] hover:text-white hover:shadow-[0_0_20px_rgba(189,0,255,0.5)] transition-all duration-300 backdrop-blur-sm"
            >
              <span className="skew-x-[10deg] inline-block">EXPLORE</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
