import { ShieldCheck, Leaf, FlaskConical, Droplets } from "lucide-react";

interface TrustBadgeProps {
    type: "cruelty-free" | "vegan" | "dermatologist-tested" | "clean";
    className?: string;
}

export function TrustBadge({ type, className }: TrustBadgeProps) {
    const badges = {
        "cruelty-free": {
            icon: Leaf,
            label: "Cruelty Free",
            color: "text-green-600",
            bg: "bg-green-50",
        },
        "vegan": {
            icon: Leaf,
            label: "Vegan",
            color: "text-emerald-600",
            bg: "bg-emerald-50",
        },
        "dermatologist-tested": {
            icon: ShieldCheck,
            label: "Derm Tested",
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        "clean": {
            icon: Droplets, // Replaced FlaskConical with Droplets as a proxy for "clean/pure"
            label: "Clean Formula",
            color: "text-cyan-600",
            bg: "bg-cyan-50",
        },
    };

    const { icon: Icon, label, color, bg } = badges[type];

    return (
        <div className={`flex flex-col items-center justify-center p-3 rounded-xl ${bg} ${className}`}>
            <Icon className={`w-6 h-6 mb-2 ${color}`} />
            <span className={`text-[10px] uppercase tracking-wider font-semibold ${color}`}>
                {label}
            </span>
        </div>
    );
}
