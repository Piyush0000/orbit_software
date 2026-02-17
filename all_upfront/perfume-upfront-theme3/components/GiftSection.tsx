import Link from "next/link";
import { Gift } from "lucide-react";

export default function GiftSection() {
    return (
        <section className="py-24 relative bg-[#F5F1E8] overflow-hidden">
            {/* Background Image / Decoration */}
            <div className="absolute inset-0 z-0 opacity-10">
                {/* Using a subtle paper texture or light image */}
                <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />
            </div>

            {/* Decorative Circle */}
            <div className="absolute -left-20 top-20 w-60 h-60 rounded-full bg-[#EAE5D8] blur-3xl opacity-60"></div>
            <div className="absolute -right-20 bottom-20 w-80 h-80 rounded-full bg-[#EAE5D8] blur-3xl opacity-60"></div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="mb-8 flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-[#fffdf9] flex items-center justify-center text-[#4A4238] border border-[#EAE5D8] shadow-sm animate-float">
                        <Gift className="w-8 h-8" strokeWidth={1} />
                    </div>
                </div>

                <h2 className="text-4xl md:text-6xl font-serif mb-6 text-[#2C2621]">The Perfect Gift</h2>
                <p className="max-w-xl mx-auto text-[#5D554A] text-lg mb-12 font-light leading-relaxed">
                    Give the gift of luxury. Make every celebration unforgettable with our exclusive gift sets, wrapped in signature packaging.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link
                        href="/gifts/men"
                        className="px-8 py-4 bg-[#2C2621] text-[#F5F1E8] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#4A4238] transition-all duration-300 min-w-[180px]"
                    >
                        Gifts for Him
                    </Link>
                    <Link
                        href="/gifts/women"
                        className="px-8 py-4 bg-transparent text-[#2C2621] text-xs uppercase tracking-[0.2em] font-bold border border-[#2C2621]/30 hover:bg-[#2C2621] hover:text-[#F5F1E8] transition-all duration-300 min-w-[180px]"
                    >
                        Gifts for Her
                    </Link>
                </div>
            </div>
        </section>
    );
}
