import Link from "next/link";
import { Gift, PartyPopper, Calendar, Sparkles } from "lucide-react";

export default function GiftSection() {
    return (
        <section className="py-10 px-4">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">🎁</span>
                            <h2 className="text-2xl font-bold font-display text-gray-900">
                                Gift Guide
                            </h2>
                        </div>
                        <p className="text-sm text-gray-500">Curated picks for every occasion.</p>
                    </div>
                    <Link href="/gifts" className="text-sm font-bold text-primary hover:underline">
                        View All Gifts →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Card 1: Birthdays */}
                    <Link href="/gifts/birthday" className="group flex items-center gap-4 p-4 rounded-2xl bg-pink-50 hover:bg-pink-100 transition-all border border-pink-100/50 hover:shadow-md">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                            <PartyPopper className="w-6 h-6 text-pink-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-base">Birthdays</h3>
                            <p className="text-xs text-pink-400 font-medium">Shop by Age</p>
                        </div>
                    </Link>

                    {/* Card 2: Holidays */}
                    <Link href="/gifts/holiday" className="group flex items-center gap-4 p-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100 transition-all border border-indigo-100/50 hover:shadow-md">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                            <Calendar className="w-6 h-6 text-indigo-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-base">Holidays</h3>
                            <p className="text-xs text-indigo-400 font-medium">Festive Favorites</p>
                        </div>
                    </Link>

                    {/* Card 3: Tiny Treats */}
                    <Link href="/gifts/under-20" className="group flex items-center gap-4 p-4 rounded-2xl bg-orange-50 hover:bg-orange-100 transition-all border border-orange-100/50 hover:shadow-md">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                            <Sparkles className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-base">Tiny Treats</h3>
                            <p className="text-xs text-orange-400 font-medium">Under $20</p>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
