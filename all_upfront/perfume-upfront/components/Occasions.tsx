import Link from "next/link";
import { Briefcase, GlassWater, Heart, Sun, PartyPopper, Plane } from "lucide-react";

const OCCASIONS = [
    { name: "Office Wear", icon: Briefcase, image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=800&auto=format&fit=crop", href: "/occasion/office" },
    { name: "Date Night", icon: Heart, image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop", href: "/occasion/date" },
    { name: "Daily Wear", icon: Sun, image: "https://images.unsplash.com/photo-1515377905703-c4788e51af93?q=80&w=800&auto=format&fit=crop", href: "/occasion/daily" },
    { name: "Party", icon: PartyPopper, image: "https://images.unsplash.com/photo-1496024840928-4c417adf211d?q=80&w=800&auto=format&fit=crop", href: "/occasion/party" },
];

export default function Occasions() {
    return (
        <section className="py-16 bg-cream">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-contrast-black">Shop by Occasion</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {OCCASIONS.map((occ, idx) => (
                        <Link
                            key={idx}
                            href={occ.href}
                            className="group relative h-64 overflow-hidden rounded-sm cursor-pointer"
                        >
                            {/* Background */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${occ.image})` }}
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                <div className="p-4 rounded-full border border-white/30 backdrop-blur-sm mb-4 group-hover:bg-white group-hover:text-black transition-all duration-300">
                                    <occ.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-serif tracking-wide">{occ.name}</h3>
                                <span className="text-xs uppercase tracking-widest mt-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">Explore</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
