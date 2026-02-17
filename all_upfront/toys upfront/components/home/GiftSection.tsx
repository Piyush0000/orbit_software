import Link from "next/link";
import { Gift, PartyPopper, Calendar } from "lucide-react";

export default function GiftSection() {
    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
                    {/* Decor */}
                    <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
                        <Gift className="w-64 h-64 text-primary" />
                    </div>

                    <div className="relative z-10 max-w-2xl">
                        <span className="inline-block px-3 py-1 bg-white text-primary text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                            Gift Guide
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 font-display">
                            Find the Perfect Gift 🎁
                        </h2>
                        <p className="text-lg text-gray-700 mb-8 max-w-lg">
                            Whether it's a first birthday, a holiday surprise, or just because—we have
                            curated collections to make gifting easy and memorable.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mb-8">
                            <Link href="/gifts/birthday" className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="p-2 bg-pink-100 text-pink-600 rounded-lg">
                                    <PartyPopper className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Birthdays</h4>
                                    <p className="text-xs text-gray-500">Shop by age</p>
                                </div>
                            </Link>
                            <Link href="/gifts/holiday" className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Holidays</h4>
                                    <p className="text-xs text-gray-500">Festive picks</p>
                                </div>
                            </Link>
                        </div>

                        <Link
                            href="/gifts"
                            className="inline-block bg-gray-900 text-white font-bold py-3.5 px-8 rounded-full hover:bg-gray-800 transition-colors shadow-lg"
                        >
                            Explore All Gifts
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
