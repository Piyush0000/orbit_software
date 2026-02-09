'use client';

export default function BannerCTA() {
  return (
    <section
      className="py-16 text-white transition-colors duration-300"
      style={{ background: 'var(--banner-bg)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 sm:p-12 text-center border border-white/20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Limited Time Offer</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Get 20% off on all products this week. Dont miss out on this amazing deal!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#products"
              className="px-8 py-3 rounded-md font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--btn-primary-bg)', color: 'var(--btn-primary-text)' }}
            >
              Shop Now
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border-2 border-white rounded-md font-semibold transition-opacity hover:opacity-90"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
