import { ShieldCheck, Leaf, FlaskConical, Award } from "lucide-react";

export default function TrustedBadges() {
    const badges = [
        { text: "BPA Free & Non-Toxic", icon: FlaskConical },
        { text: "Safety Certified (BIS/ASTM)", icon: ShieldCheck },
        { text: "Eco-Friendly Materials", icon: Leaf },
        { text: "Award Winning Toys", icon: Award },
    ];

    return (
        <div className="bg-primary/5 border-y border-primary/10 py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {badges.map((badge, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-center text-center gap-3">
                            <div className="p-3 bg-white rounded-full shadow-sm text-primary">
                                <badge.icon className="w-8 h-8" />
                            </div>
                            <span className="font-bold text-gray-800 text-sm md:text-base">
                                {badge.text}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
