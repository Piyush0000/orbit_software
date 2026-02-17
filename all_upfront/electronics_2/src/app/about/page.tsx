export default function AboutPage() {
    return (
        <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--page-bg)' }}>
            {/* Hero Section */}
            {/* Hero Section */}
            <div className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,240,255,0.1),_transparent_50%)]"></div>
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 font-heading tracking-tight text-white">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)]">Upfront</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        We are redefining the way you discover and experience technology. Future-ready gear for the modern pioneer.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-black mb-6 text-white font-heading uppercase tracking-wide">Our Mission</h2>
                        <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                            At Upfront, we believe that technology should be <span className="text-[var(--accent-blue)] font-bold">accessible</span>, <span className="text-[var(--accent-blue)] font-bold">transparent</span>, and <span className="text-[var(--accent-blue)] font-bold">exciting</span>.
                            We curate the best products from around the world to ensure you always stay ahead of the curve.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Quality, integrity, and customer satisfaction are at the core of everything we do. We don't just sell tech; we curate experiences.
                        </p>
                    </div>
                    <div className="bg-white/5 rounded-2xl h-80 flex items-center justify-center border border-white/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-purple)]/20 to-transparent opacity-50"></div>
                        <span className="text-[var(--accent-purple)] font-black text-2xl uppercase tracking-widest relative z-10 neon-text-purple">Future Vision</span>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="py-20 px-4 sm:px-6 lg:px-8 bg-black relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(0,255,148,0.05),_transparent_50%)]"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-white font-heading uppercase tracking-wide">Our Values</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="glass p-8 rounded-xl border border-white/10 hover:border-[var(--accent-blue)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] group">
                            <h3 className="text-xl font-bold mb-4 text-white group-hover:text-[var(--accent-blue)] transition-colors">Transparency</h3>
                            <p className="text-gray-400 leading-relaxed">No hidden fees, no fake reviews. Just honest products and prices. We believe in clear communication.</p>
                        </div>
                        <div className="glass p-8 rounded-xl border border-white/10 hover:border-[var(--accent-purple)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(189,0,255,0.2)] group">
                            <h3 className="text-xl font-bold mb-4 text-white group-hover:text-[var(--accent-purple)] transition-colors">Quality</h3>
                            <p className="text-gray-400 leading-relaxed">Every product is vigorously tested to meet our high standards. Only the best makes it to our store.</p>
                        </div>
                        <div className="glass p-8 rounded-xl border border-white/10 hover:border-[var(--accent-green)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,148,0.2)] group">
                            <h3 className="text-xl font-bold mb-4 text-white group-hover:text-[var(--accent-green)] transition-colors">Community</h3>
                            <p className="text-gray-400 leading-relaxed">We build relationships, not just customer bases. We're in this together, building the future.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
