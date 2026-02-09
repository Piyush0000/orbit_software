'use client';

import { useStorefront } from '@/contexts/StorefrontContext';
import { StoreInfo, WebsiteCustomization } from '@/lib/storefront-api';

export default function Footer() {
  const { store, customization } = useStorefront();

  const shopName = store?.name || 'Upfront';
  const description = store?.description || 'Redefining urban fashion with premium essentials.';
  const footerText = customization?.footer?.text || `© ${new Date().getFullYear()} ${shopName} Fashion Inc.`;
  const socialLinks = customization?.footer?.socialLinks || [];

  // Helper to get icon path based on platform
  const getSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('instagram')) return <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>;
    if (p.includes('twitter') || p.includes('x')) return <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>;
    if (p.includes('facebook')) return <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.651-2.797 4.166v3.241h2.724l-1.48 5.666h-1.244v5.667z"/>;
    return <path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/>;
  };

  return (
    <footer className="bg-[var(--page-bg)] text-[var(--text-secondary)] border-t border-[var(--card-border)] overflow-hidden">
      {/* Massive Branding */}
      <div className="w-full overflow-hidden whitespace-nowrap py-12 md:py-24 border-b border-[var(--card-border)] opacity-30 select-none">
        <h1 className="text-[15vw] leading-none font-heading font-black uppercase text-transparent stroke-text tracking-tighter">
          {shopName} &bull; {shopName} &bull; {shopName}
        </h1>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 sm:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">

          {/* Brand/Newsletter - Wide Column */}
          <div className="md:col-span-5 space-y-8">
            <div>
              <h3 className="text-3xl font-heading font-black text-[var(--text-primary)] uppercase tracking-tight mb-4">Join the Movement</h3>
              <p className="max-w-md text-sm leading-relaxed mb-8">
                {description}
              </p>
              <div className="flex border-b border-[var(--text-primary)] max-w-md focus-within:border-[var(--accent-color)] transition-colors duration-300">
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  className="flex-grow bg-transparent py-4 text-sm font-bold uppercase tracking-widest text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none"
                />
                <button className="text-[var(--text-primary)] font-bold uppercase tracking-widest text-xs hover:text-[var(--accent-color)] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              {socialLinks.length > 0 ? socialLinks.map((link) => (
                <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-[var(--card-border)] rounded-full flex items-center justify-center hover:bg-[var(--text-primary)] hover:text-[var(--page-bg)] transition-all duration-300">
                  <span className="sr-only">{link.platform}</span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    {getSocialIcon(link.platform)}
                  </svg>
                </a>
              )) : (
                // Fallback social links if none provided
                ['Instagram', 'Twitter', 'TikTok'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 border border-[var(--card-border)] rounded-full flex items-center justify-center hover:bg-[var(--text-primary)] hover:text-[var(--page-bg)] transition-all duration-300">
                     <span className="sr-only">{social}</span>
                     <div className="w-4 h-4 bg-current" />
                  </a>
                ))
              )}
            </div>
          </div>

          {/* Links - Asymmetrical Columns */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            {[
              {
                title: "Shop",
                links: ["New Arrivals", "Best Sellers", "Men", "Women", "Accessories"]
              },
              {
                title: "Brand",
                links: ["Our Story", "Sustainability", "Careers", "Press"]
              },
              {
                title: "Help",
                links: ["FAQ", "Shipping", "Returns", "Contact"]
              }
            ].map((column) => (
              <div key={column.title} className="space-y-6">
                <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-[0.2em]">{column.title}</h4>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm font-medium hover:text-[var(--text-primary)] hover:translate-x-2 transition-all duration-300 inline-block">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-20 flex flex-col md:flex-row justify-between items-end gap-6">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">
            {footerText}
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Use', 'Sitemap'].map((item) => (
              <a key={item} href="#" className="text-[10px] font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
