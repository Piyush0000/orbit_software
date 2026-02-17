export default function Newsletter() {
    return (
        <section className="bg-[var(--page-bg)] text-[var(--text-primary)] py-24 border-t border-[var(--card-border)]">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

                    <div className="lg:w-1/2 text-center lg:text-left">
                        <span className="text-xs font-bold tracking-[0.2em] text-[var(--text-secondary)] uppercase mb-4 block">
                            Stay Connected
                        </span>
                        <h2 className="text-4xl md:text-5xl font-heading font-medium mb-6 uppercase tracking-tight text-[var(--text-primary)]">
                            Join the <span className="text-[var(--text-secondary)]">Community</span>
                        </h2>
                        <p className="text-[var(--text-muted)] text-lg max-w-md mx-auto lg:mx-0 font-light">
                            Subscribe to receive exclusive access to new drops, events, and a 10% welcome discount.
                        </p>
                    </div>

                    <div className="lg:w-1/2 w-full max-w-lg">
                        <form className="flex flex-col sm:flex-row gap-0 border-b border-[var(--text-secondary)] pb-2 focus-within:border-[var(--text-primary)] transition-colors duration-300">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 bg-transparent px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none text-lg"
                            />
                            <button
                                type="button"
                                className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--text-primary)] hover:text-[var(--text-muted)] transition-colors px-4 py-3 sm:py-0"
                            >
                                Subscribe
                            </button>
                        </form>

                        <p className="text-[var(--text-muted)] text-[10px] mt-4 text-center lg:text-left uppercase tracking-wider">
                            By subscribing you agree to our <a href="#" className="underline hover:text-[var(--text-secondary)]">Privacy Policy</a>
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
