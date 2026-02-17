export default function Newsletter() {
    return (
        <section className="bg-black text-white py-20 relative overflow-hidden">
            {/* Abstract shapes/glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-blue)] rounded-full filter blur-[120px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--accent-purple)] rounded-full filter blur-[120px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    <div className="lg:w-1/2 text-center lg:text-left">
                        <span className="inline-block py-1 px-3 rounded bg-[var(--accent-green)] text-black text-xs font-bold mb-4 tracking-widest uppercase">
                            STAY UPDATED
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black mb-4 font-heading">
                            Get <span className="text-[var(--accent-green)]">10% Off</span> Your First Order
                        </h2>
                        <p className="text-gray-400 text-lg max-w-md mx-auto lg:mx-0">
                            Subscribe to our newsletter to receive exclusive offers, latest news and updates.
                        </p>
                    </div>

                    <div className="lg:w-1/2 w-full max-w-md">
                        <form className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent-blue)] focus:ring-[var(--accent-blue)] focus:ring-1 transition-all"
                            />
                            <button
                                type="button"
                                className="bg-[var(--accent-blue)] text-black font-bold py-4 px-8 rounded-lg hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 transform hover:-translate-y-1"
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
