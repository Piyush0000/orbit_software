import { ShieldCheck, Leaf, HeartHandshake, FlaskConical } from "lucide-react";

const features = [
    { icon: ShieldCheck, title: "Dermatologically Tested", desc: "Safe for all skin types" },
    { icon: Leaf, title: "100% Vegan", desc: "Plant-based goodness" },
    { icon: HeartHandshake, title: "Cruelty Free", desc: "Never tested on animals" },
    { icon: FlaskConical, title: "Paraben Free", desc: "No harmful chemicals" },
];

export function TrustSafety() {
    return (
        <section className="py-20 bg-background border-t border-border/30">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {features.map((feature) => (
                        <div key={feature.title} className="flex flex-col items-center text-center gap-4 group cursor-default">
                            <div className="p-5 rounded-full bg-secondary/30 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground mb-1 font-serif tracking-wide">{feature.title}</h4>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
