'use client';

import { useStorefront } from '@/contexts/StorefrontContext';

export default function Newsletter() {
    const { store, customization } = useStorefront();
    const newsletter = (customization?.newsletter || {}) as Record<string, string>;
    const title = newsletter.title || `Get 10% Off Your First Order`;
    const highlight = newsletter.highlight || '10% Off';
    const [titleBefore, titleAfter] = title.includes(highlight)
        ? title.split(highlight)
        : [title, ''];
    const subtitle = newsletter.subtitle || 'Subscribe to our newsletter to receive exclusive offers, latest news and updates.';
    const badge = newsletter.badge || 'STAY UPDATED';
    const buttonText = newsletter.buttonText || 'Subscribe';
    const terms = newsletter.terms || `By subscribing you agree to our Privacy Policy`;

    return (
        <section className="bg-black text-white py-20 relative overflow-hidden">
            {/* Abstract shapes/glow just for visual interest */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E7F874] rounded-full filter blur-[100px] opacity-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px] opacity-10 -translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    <div className="lg:w-1/2 text-center lg:text-left">
                        <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-[#E7F874] text-sm font-bold mb-4">
                            {badge}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {titleBefore}
                            <span className="text-[#E7F874]">{highlight}</span>
                            {titleAfter}
                        </h2>
                        <p className="text-gray-400 text-lg max-w-md mx-auto lg:mx-0">
                            {subtitle}
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
                                {buttonText}
                            </button>
                        </form>
                        <p className="text-gray-500 text-xs mt-4 text-center lg:text-left">
                            {terms.replace('Privacy Policy', '')}
                            <a href="#" className="underline hover:text-white">Privacy Policy</a>
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
