import Link from "next/link";
import { Gift } from "lucide-react";

export default function GiftSection() {
    return (
        <section className="py-20 relative bg-contrast-black text-white">
            {/* Background Image / Decoration */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center fixed-attachment" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-gold-500/90 flex items-center justify-center text-white border border-gold-300">
                        <Gift className="w-8 h-8" />
                    </div>
                </div>

                <h2 className="text-4xl md:text-6xl font-serif mb-6">The Perfect Gift</h2>
                <p className="max-w-xl mx-auto text-gray-300 text-lg mb-10 font-light">
                    Give the gift of luxury. Make every celebration unforgettable with our exclusive gift sets, wrapped in signature packaging.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link
                        href="/gifts/men"
                        className="px-8 py-3 bg-white text-black text-sm uppercase tracking-widest font-bold hover:bg-gold-500 hover:text-white transition-colors min-w-[180px]"
                    >
                        Gifts for Him
                    </Link>
                    <Link
                        href="/gifts/women"
                        className="px-8 py-3 border border-white text-white text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-colors min-w-[180px]"
                    >
                        Gifts for Her
                    </Link>
                </div>
            </div>
        </section>
    );
}
