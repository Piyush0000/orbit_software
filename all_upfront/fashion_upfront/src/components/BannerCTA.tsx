'use client';

export default function BannerCTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with abstract graphic */}
      <div className="absolute inset-0 bg-gray-900" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-800 to-transparent opacity-50 transform skew-x-12"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left text-white">
            <span className="inline-block px-4 py-1 mb-6 text-xs font-bold tracking-widest text-black uppercase bg-yellow-400 rounded-full">
              Limited Time Offer
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Get <span className="text-yellow-400">20% Off</span><br />
              On All New Arrivals
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-xl">
              Upgrade your wardrobe with our premium collection. Use code <span className="text-white font-mono bg-white/20 px-2 py-1 rounded">NEW20</span> at checkout.
            </p>

            {/* Countdown / Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#products"
                className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-yellow-400 transition-colors transform hover:-translate-y-1 shadow-lg"
              >
                Shop The Sale
              </a>
              <a
                href="#"
                className="px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                View Details
              </a>
            </div>
          </div>

          {/* Visual Element - Image Grid or Hero Product */}
          <div className="flex-1 w-full max-w-md relative">
            <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
                alt="Fashion Sale"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white text-left">
                <p className="font-bold text-xl">Summer Collection</p>
                <p className="text-sm opacity-80">Starting at ₹999</p>
              </div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center transform animate-bounce duration-[2000ms]">
              <div className="text-center text-black font-bold leading-none">
                <span className="text-xl">20%</span>
                <br />
                <span className="text-xs">OFF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
