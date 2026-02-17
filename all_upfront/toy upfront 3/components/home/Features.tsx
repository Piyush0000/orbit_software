import { Brain, Smile, Activity, Users } from "lucide-react";

export default function Features() {
    const features = [
        {
            icon: Brain,
            title: "Boosts Creativity",
            desc: "Toys that spark imagination and creative thinking.",
            color: "text-purple-500",
            bg: "bg-purple-50 bg-opacity-50"
        },
        {
            icon: Activity,
            title: "Motor Skills",
            desc: "Enhancing coordination and physical development.",
            color: "text-blue-500",
            bg: "bg-blue-50 bg-opacity-50"
        },
        {
            icon: Smile,
            title: "Emotional Growth",
            desc: "Building confidence and emotional intelligence.",
            color: "text-orange-500",
            bg: "bg-orange-50 bg-opacity-50"
        },
        {
            icon: Users,
            title: "Social Play",
            desc: "Encouraging teamwork and communication skills.",
            color: "text-green-500",
            bg: "bg-green-50 bg-opacity-50"
        }
    ];

    return (
        <section className="py-10 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center p-6 rounded-2xl">
                            <div className={`w-16 h-16 ${feature.bg} rounded-full flex items-center justify-center mb-6`}>
                                <feature.icon className={`w-8 h-8 ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">{feature.title}</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
