import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-sky-50 pt-16 pb-20 lg:pt-24 lg:pb-32">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Hero Image - ON LEFT with Organic Shape */}
                    <div className="flex-1 relative w-full max-w-lg lg:max-w-xl order-first">
                        <div className="relative aspect-[4/3] md:aspect-square lg:aspect-[4/3]">
                            {/* Decorative background blob with pattern */}
                            <div className="absolute inset-0 bg-blue-200 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] transform -rotate-6 scale-105 opacity-50 animate-pulse-slow"></div>
                            <div className="absolute inset-0 bg-sky-300/20 rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] transform rotate-3 scale-105"></div>

                            {/* Polka dot pattern overlay */}
                            <div className="absolute -inset-4 opacity-20" style={{ backgroundImage: 'radial-gradient(#5FA8D3 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>

                            {/* Main Image with Fun Shape */}
                            <div className="relative h-full w-full rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] overflow-hidden shadow-2xl border-[6px] border-white transform hover:rotate-1 transition-transform duration-700">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/hero-image.jpg"
                                    alt="Happy kids playing with toys"
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                                />
                            </div>

                            {/* Floating Elements - Removed */}

                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-sky-100 animate-bounce duration-[3000ms]">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="flex text-yellow-400">★★★★★</span>
                                </div>
                                <p className="text-gray-900 font-bold text-sm">Top Rated by Parents</p>
                            </div>
                        </div>
                    </div>

                    {/* Text Content - ON RIGHT */}
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white border border-blue-200 text-primary font-bold text-sm shadow-sm">
                            New Collection Available
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6 font-display leading-[1.1] tracking-tight">
                            Spark Joy in <br />
                            <span className="text-primary relative inline-block">
                                Every Moment
                                {/* Underline decoration */}
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                </svg>
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            From educational wonders to outdoor adventures, find the perfect
                            toys that help your little ones learn, grow, and have a blast.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                href="/category/all"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-primary rounded-full hover:bg-blue-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Explore Toys
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <Link
                                href="/category/educational"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-700 bg-white border-2 border-gray-100 rounded-full hover:border-primary/30 hover:bg-sky-50 transition-all"
                            >
                                Educational
                            </Link>
                        </div>

                        <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-gray-400 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                Free Shipping
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                                30-Day Returns
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
