import { ShieldCheck, Truck, Leaf, HardHat } from "lucide-react"

const features = [
    {
        icon: <ShieldCheck className="w-10 h-10 text-primary" />,
        title: "FSSAI Approved",
        description: "Quality and safety standards guaranteed by FSSAI certification.",
    },
    {
        icon: <Leaf className="w-10 h-10 text-primary" />,
        title: "Freshly Packed",
        description: "Packed only after you order to ensure maximum freshness.",
    },
    {
        icon: <Truck className="w-10 h-10 text-primary" />,
        title: "Fast Delivery",
        description: "Get your favorites delivered to your doorstep within hours.",
    },
    {
        icon: <HardHat className="w-10 h-10 text-primary" />,
        title: "No Artificials",
        description: "100% natural ingredients with no artificial preservatives.",
    },
]

export default function TrustSafety() {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {features.map((feature) => (
                        <div key={feature.title} className="flex flex-col items-center text-center space-y-4">
                            <div className="rounded-full bg-card p-6 shadow-inner border border-border">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-foreground uppercase tracking-tight">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm max-w-[200px] leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
