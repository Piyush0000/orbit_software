'use client';

import React, { useEffect, useState } from 'react';

export default function BannerCTA() {
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

  const headline = customization?.aboutSection?.title || customization?.aboutSection?.headline || "Limited Time Offer";
  const content = customization?.aboutSection?.content || "Get 20% off on all products this week. Dont miss out on this amazing deal!";
  const bgImage = customization?.aboutSection?.image || customization?.aboutSection?.imageUrl;

  const handleSectionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId: 'aboutSection' }, '*');
    }
  };

  return (
    <section
      onClick={handleSectionClick}
      className="py-16 text-white transition-colors duration-300 hover:outline hover:outline-2 hover:outline-blue-500/50 cursor-pointer"
      style={{ 
        background: bgImage ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("${bgImage}") center/cover` : 'var(--banner-bg)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 sm:p-12 text-center border border-white/20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{headline}</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            {content}
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
