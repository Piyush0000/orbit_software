"use client"

import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface QuantitySelectorProps {
    quantity: number
    onIncrement: () => void
    onDecrement: () => void
    className?: string
}

export function QuantitySelector({ quantity, onIncrement, onDecrement, className }: QuantitySelectorProps) {
    return (
        <div className={cn("inline-flex items-center border border-zinc-200 bg-zinc-50 rounded-none overflow-hidden", className)}>
            <Button
                variant="ghost"
                size="icon"
                onClick={onDecrement}
                className="h-10 w-10 hover:bg-zinc-100 rounded-none border-r border-zinc-200"
            >
                <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center text-sm font-black text-zinc-900">{quantity}</span>
            <Button
                variant="ghost"
                size="icon"
                onClick={onIncrement}
                className="h-10 w-10 hover:bg-zinc-100 rounded-none border-l border-zinc-200"
            >
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    )
}

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function NutritionTable({ nutrition }: { nutrition: any }) {
    const items = [
        { label: "Energy", value: nutrition.energy },
        { label: "Protein", value: nutrition.protein },
        { label: "Carbohydrates", value: nutrition.carbohydrates },
        { label: "Total Sugar", value: nutrition.sugar },
        { label: "Total Fat", value: nutrition.fat },
    ]

    return (
        <div className="border border-zinc-100 rounded-none overflow-hidden bg-white shadow-sm">
            <Table>
                <TableHeader className="bg-zinc-900">
                    <TableRow className="hover:bg-transparent border-0">
                        <TableHead className="text-white font-black uppercase tracking-widest h-12">Nutrient</TableHead>
                        <TableHead className="text-white font-black uppercase tracking-widest h-12 text-right">Per Serving</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.label} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition-colors">
                            <TableCell className="font-bold text-zinc-600 text-sm py-4">{item.label}</TableCell>
                            <TableCell className="text-right font-black text-zinc-900 text-sm py-4 uppercase tracking-tighter">{item.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
