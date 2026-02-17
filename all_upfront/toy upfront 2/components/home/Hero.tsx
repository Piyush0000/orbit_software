import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF9F5] via-[#FFF0E5] to-[#E0C3FC]/20 pt-12 pb-24 lg:pt-24 lg:pb-40">
            {/* Soft decorative blob */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-2.5 mb-6 lg:mb-8 rounded-full bg-white/60 backdrop-blur-md border border-orange-100 text-secondary font-bold text-xs lg:text-sm shadow-[0_4px_10px_rgba(0,0,0,0.03)] animate-fade-in-up">
                            <span className="text-xl">✨</span>
                            <span className="tracking-wide">Making childhood magical</span>
                        </div>
                        <h1 className="text-4xl lg:text-7xl font-extrabold text-foreground mb-6 lg:mb-8 font-display leading-[1.1] tracking-tight">
                            Play, Learn, & <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Grow Together</span>
                        </h1>
                        <p className="text-base lg:text-xl text-foreground/70 mb-8 lg:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                            Discover the safest, most engaging toys designed to spark creativity
                            and joy in every child. From educational puzzles to outdoor fun!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                href="/category/all"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-primary rounded-full hover:bg-[#7ED890] transition-all shadow-[0_10px_30px_rgba(136,212,152,0.4)] hover:shadow-[0_15px_35px_rgba(136,212,152,0.5)] transform hover:-translate-y-1 active:scale-95"
                            >
                                Shop Now
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <Link
                                href="/category/new-arrivals"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-foreground/80 bg-white border-2 border-white shadow-sm rounded-full hover:border-secondary/20 hover:bg-secondary/5 transition-all hover:-translate-y-1"
                            >
                                New Arrivals 🎁
                            </Link>
                        </div>
                    </div>

                    {/* Hero Image / Illustration */}
                    <div className="flex-1 relative w-full max-w-[320px] lg:max-w-xl animate-float">
                        <div className="relative aspect-square rounded-[2rem] lg:rounded-[3rem] bg-white p-3 lg:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rotate-2 hover:rotate-0 transition-transform duration-500">
                            {/* Decorative elements */}
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary/20 rounded-full blur-2xl animate-pulse"></div>
                            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary/20 rounded-full blur-2xl animate-pulse delay-700"></div>

                            {/* Main visual */}
                            <div className="w-full h-full rounded-[1.5rem] lg:rounded-[2.5rem] bg-muted/30 overflow-hidden relative">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/hero-image.jpg"
                                    alt="Happy kids playing"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* Floating review card */}
                            <div className="absolute -bottom-8 -right-4 bg-white/90 backdrop-blur-md p-3 lg:p-5 rounded-2xl shadow-xl border border-white/50 animate-bounce-slow hidden sm:block">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="flex text-yellow-400 text-lg">
                                        {'★★★★★'}
                                    </div>
                                    <span className="font-bold text-foreground">4.9/5</span>
                                </div>
                                <span className="text-sm text-foreground/60 font-medium">Trusted by Happy Parents</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wave Divider */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
                <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
                </svg>
            </div>
        </section>
    );
}
