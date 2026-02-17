'use client';

export default function Footer() {
  return (
    <footer className="bg-[var(--page-bg)] text-[var(--text-secondary)] border-t border-[var(--card-border)] overflow-hidden">
      {/* Massive Branding */}
      <div className="w-full overflow-hidden whitespace-nowrap py-12 md:py-24 border-b border-[var(--card-border)] opacity-30 select-none">
        <h1 className="text-[15vw] leading-none font-heading font-black uppercase text-transparent stroke-text tracking-tighter">
          Upfront &bull; Upfront &bull; Upfront
        </h1>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 sm:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">

          {/* Brand/Newsletter - Wide Column */}
          <div className="md:col-span-5 space-y-8">
            <div>
              <h3 className="text-3xl font-heading font-black text-[var(--text-primary)] uppercase tracking-tight mb-4">Join the Movement</h3>
              <p className="max-w-md text-sm leading-relaxed mb-8">
                Sign up for exclusive drops, early access to sales, and limited edition collaborations. Silence the noise.
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
              {['Instagram', 'Twitter', 'TikTok'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 border border-[var(--card-border)] rounded-full flex items-center justify-center hover:bg-[var(--text-primary)] hover:text-[var(--page-bg)] transition-all duration-300">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-current" />
                </a>
              ))}
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
            &copy; {new Date().getFullYear()} Upfront Fashion Inc.
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
