'use client';

import { useStoreContext } from '@/contexts/store-context';

export default function Hero() {
  const { customization } = useStoreContext();

  const headline = customization?.heroSection?.title || customization?.heroSection?.headline || "Smartphones";
  const subheadline = customization?.heroSection?.subtitle || customization?.heroSection?.subheadline || "Get up to 70% OFF on selected models. Upgrade your tech game today.";
  const bgImage = customization?.heroSection?.backgroundImage || "https://images.unsplash.com/photo-1556656793-02f1ba1849e7?q=80&w=2000&auto=format&fit=crop";
  const ctaText = customization?.heroSection?.ctaText || customization?.heroSection?.buttonText || "Shop Collection";

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'heroSection' }, '*');
    }
  };

  return (
    <section 
      onClick={handleSectionClick}
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden flex items-center hover:outline hover:outline-2 hover:outline-blue-500/50 cursor-pointer"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-transform duration-700 hover:scale-105"
        style={{ backgroundImage: `url("${bgImage}")` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
        <div className="max-w-2xl animate-fade-in-up">
          <span className="inline-block py-1 px-3 rounded-full bg-[#E7F874] text-black text-sm font-bold mb-6 tracking-wide">
            END SEASON SALE
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            {headline.split(' ').map((word: string, i: number) => {
               // Give some flair to the last word
               if (i === headline.split(' ').length - 1 && headline.split(' ').length > 1) {
                  return (
                    <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                      {' ' + word}
                    </span>
                  );
               }
               return i === 0 ? word : ' ' + word;
            })}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            {subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#products"
              className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-[#E7F874] transition-colors duration-300 shadow-lg text-center"
            >
              {ctaText}
            </a>
            <a
              href="#featured"
              className="px-8 py-4 border border-white/30 text-white rounded-full font-bold hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm text-center"
            >
              Explore Features
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
