"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, ArrowRight } from "lucide-react"

interface ComboCardProps {
    title: string
    items: string[]
    price: number
    originalPrice: number
    image: string
    className?: string
}

export function ComboCard({ title, items, price, originalPrice, image, className }: ComboCardProps) {
    return (
        <Card className="group border-border overflow-hidden rounded-none bg-card hover:border-primary/50 transition-all shadow-sm hover:shadow-xl">
            <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform">
                    <div className="flex gap-2 mb-2">
                        <span className="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-2 py-1">Limited Combo</span>
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none mb-1">{title}</h3>
                    <p className="text-zinc-300 text-xs font-medium italic mb-2">{items.join(" + ")}</p>
                </div>
            </div>
            <CardContent className="p-6 pt-4 flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">Bundle Price</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-card-foreground tracking-tighter">₹{price}</span>
                        <span className="text-sm font-bold text-muted-foreground line-through tracking-tighter">₹{originalPrice}</span>
                    </div>
                </div>
                <Button size="icon" className="h-12 w-12 rounded-none bg-zinc-900 hover:bg-primary transition-all group/btn">
                    <Plus className="h-6 w-6 transition-transform group-hover/btn:rotate-90" />
                </Button>
            </CardContent>
        </Card>
    )
}
