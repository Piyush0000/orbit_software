import { ShieldCheck, Leaf, HeartHandshake, FlaskConical } from "lucide-react";

const features = [
    { icon: ShieldCheck, title: "Dermatologically Tested", desc: "Safe for all skin types" },
    { icon: Leaf, title: "100% Vegan", desc: "Plant-based goodness" },
    { icon: HeartHandshake, title: "Cruelty Free", desc: "Never tested on animals" },
    { icon: FlaskConical, title: "Paraben Free", desc: "No harmful chemicals" },
];

export function TrustSafety() {
    return (
        <section className="py-16 bg-primary/5 border-t border-b border-primary/10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {features.map((feature) => (
                        <div key={feature.title} className="flex flex-col items-center text-center gap-3 group">
                            <div className="p-4 rounded-full bg-background shadow-sm text-primary group-hover:scale-110 transition-transform duration-300">
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground">{feature.title}</h4>
                                <p className="text-sm text-muted-foreground">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
