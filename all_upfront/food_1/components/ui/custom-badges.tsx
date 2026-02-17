import { cn } from "@/lib/utils"

interface VegNonVegBadgeProps {
    veg: boolean
    className?: string
}

export function VegNonVegBadge({ veg, className }: VegNonVegBadgeProps) {
    return (
        <div className={cn("inline-flex items-center gap-1.5", className)}>
            <div className={cn(
                "flex h-4 w-4 items-center justify-center border-2 rounded-[2px]",
                veg ? "border-green-600" : "border-red-600"
            )}>
                <div className={cn(
                    "h-2 w-2 rounded-full",
                    veg ? "bg-green-600" : "bg-red-600"
                )} />
            </div>
            <span className={cn(
                "text-[10px] font-black uppercase tracking-widest",
                veg ? "text-green-600" : "text-red-600"
            )}>
                {veg ? "Veg" : "Non-Veg"}
            </span>
        </div>
    )
}

interface SpiceLevelTagProps {
    level: "Mild" | "Medium" | "Spicy" | "None"
    className?: string
}

export function SpiceLevelTag({ level, className }: SpiceLevelTagProps) {
    if (level === "None") return null

    const colors = {
        Mild: "bg-green-50 text-green-700 border-green-100",
        Medium: "bg-orange-50 text-orange-700 border-orange-100",
        Spicy: "bg-red-50 text-red-700 border-red-100"
    }

    return (
        <div className={cn(
            "inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider",
            colors[level],
            className
        )}>
            {level}
        </div>
    )
}

import { ShieldCheck, Truck, RotateCcw } from "lucide-react"

export function TrustBadge({ icon, text }: { icon: "shield" | "truck" | "refresh", text: string }) {
    const icons = {
        shield: <ShieldCheck className="w-4 h-4 text-primary" />,
        truck: <Truck className="w-4 h-4 text-primary" />,
        refresh: <RotateCcw className="w-4 h-4 text-primary" />
    }

    return (
        <div className="flex items-center gap-2 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-100 w-fit">
            {icons[icon]}
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{text}</span>
        </div>
    )
}
