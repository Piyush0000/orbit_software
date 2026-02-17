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
        <div className={cn("inline-flex items-center border border-border bg-muted rounded-none overflow-hidden", className)}>
            <Button
                variant="ghost"
                size="icon"
                onClick={onDecrement}
                className="h-10 w-10 hover:bg-muted/80 rounded-none border-r border-border"
            >
                <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center text-sm font-black text-foreground">{quantity}</span>
            <Button
                variant="ghost"
                size="icon"
                onClick={onIncrement}
                className="h-10 w-10 hover:bg-muted/80 rounded-none border-l border-border"
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
        <div className="border border-border rounded-none overflow-hidden bg-card shadow-sm">
            <Table>
                <TableHeader className="bg-foreground">
                    <TableRow className="hover:bg-transparent border-0">
                        <TableHead className="text-background font-black uppercase tracking-widest h-12">Nutrient</TableHead>
                        <TableHead className="text-background font-black uppercase tracking-widest h-12 text-right">Per Serving</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.label} className="border-b border-border last:border-0 hover:bg-muted transition-colors">
                            <TableCell className="font-bold text-muted-foreground text-sm py-4">{item.label}</TableCell>
                            <TableCell className="text-right font-black text-foreground text-sm py-4 uppercase tracking-tighter">{item.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
