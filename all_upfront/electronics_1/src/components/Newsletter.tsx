'use client';

import { useState, useEffect } from 'react';

export default function Newsletter() {
  const [customization, setCustomization] = useState<any>({});

  // Listen from iFrame parent messages
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'ORBIT_CUSTOMIZATION_UPDATE') {
        setCustomization(e.data.data);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const heading = customization?.newsletter?.heading || "Get 10% Off Your First Order";
  const subtext = customization?.newsletter?.subtext || "Subscribe to our newsletter to receive exclusive offers, latest news and updates.";

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'newsletter' }, '*');
    }
  };

  return (
    <section 
      onClick={handleSectionClick}
      className="bg-black text-white py-20 relative overflow-hidden hover:outline hover:outline-2 hover:outline-blue-500/50 cursor-pointer"
    >
      {/* Abstract shapes/glow just for visual interest */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E7F874] rounded-full filter blur-[100px] opacity-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px] opacity-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          <div className="lg:w-1/2 text-center lg:text-left">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-[#E7F874] text-sm font-bold mb-4">
              STAY UPDATED
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {heading}
            </h2>
            <p className="text-gray-400 text-lg max-w-md mx-auto lg:mx-0">
              {subtext}
            </p>
                    </div>

                    <div className="lg:w-1/2 w-full max-w-md">
                        <form className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#E7F874] transition-colors"
                            />
                            <button
                                type="button"
                                className="bg-[#E7F874] text-black font-bold py-4 px-8 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                        <p className="text-gray-500 text-xs mt-4 text-center lg:text-left">
                            By subscribing you agree to our <a href="#" className="underline hover:text-white">Privacy Policy</a>
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
