"use client"

import { useParams } from "next/navigation"
import { products, categories as categoriesData, Product } from "@/lib/data"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
import { Filter, SlidersHorizontal, X } from "lucide-react"
import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"

export default function CategoryPage() {
    const params = useParams()
    const slug = params.slug as string

    const category = categoriesData.find(c => c.slug === slug)

    // Filter States
    const [priceRange, setPriceRange] = useState([0, 1000])
    const [selectedVeg, setSelectedVeg] = useState<string | null>(null) // 'veg', 'non-veg', null
    const [dietary, setDietary] = useState({
        vegan: false,
        sugarFree: false,
        glutenFree: false
    })
    const [spiceLevel, setSpiceLevel] = useState<string[]>([])

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // Category filter
            if (slug !== "all" && product.category !== slug) return false

            // Price filter
            if (product.price < priceRange[0] || product.price > priceRange[1]) return false

            // Veg filter
            if (selectedVeg === "veg" && !product.veg) return false
            if (selectedVeg === "non-veg" && product.veg) return false

            // Dietary filter
            if (dietary.vegan && !product.dietary.vegan) return false
            if (dietary.sugarFree && !product.dietary.sugarFree) return false
            if (dietary.glutenFree && !product.dietary.glutenFree) return false

            // Spice level filter
            if (spiceLevel.length > 0 && !spiceLevel.includes(product.spiceLevel)) return false

            return true
        })
    }, [slug, priceRange, selectedVeg, dietary, spiceLevel])

    const resetFilters = () => {
        setPriceRange([0, 1000])
        setSelectedVeg(null)
        setDietary({
            vegan: false,
            sugarFree: false,
            glutenFree: false
        })
        setSpiceLevel([])
    }

    const FilterSidebar = () => (
        <div className="space-y-8">
            {/* Price Range */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Price Range</h3>
                <div className="px-2">
                    <Slider
                        defaultValue={[0, 1000]}
                        max={1000}
                        step={10}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mt-6"
                    />
                    <div className="flex items-center justify-between mt-4 text-sm font-medium text-muted-foreground">
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                    </div>
                </div>
            </div>

            {/* Veg / Non-Veg */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Preference</h3>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="veg"
                            checked={selectedVeg === "veg"}
                            onCheckedChange={() => setSelectedVeg(selectedVeg === "veg" ? null : "veg")}
                        />
                        <Label htmlFor="veg" className="text-sm font-medium leading-none cursor-pointer flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm border-2 border-green-600 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                            </div>
                            Veg Only
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="non-veg"
                            checked={selectedVeg === "non-veg"}
                            onCheckedChange={() => setSelectedVeg(selectedVeg === "non-veg" ? null : "non-veg")}
                        />
                        <Label htmlFor="non-veg" className="text-sm font-medium leading-none cursor-pointer flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm border-2 border-red-600 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                            </div>
                            Non-Veg
                        </Label>
                    </div>
                </div>
            </div>

            {/* Dietary Preference */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Dietary Preference</h3>
                <div className="flex flex-col gap-3">
                    {['vegan', 'sugarFree', 'glutenFree'].map((key) => (
                        <div key={key} className="flex items-center space-x-2">
                            <Checkbox
                                id={key}
                                checked={dietary[key as keyof typeof dietary]}
                                onCheckedChange={() => setDietary(prev => ({ ...prev, [key]: !prev[key as keyof typeof dietary] }))}
                            />
                            <Label htmlFor={key} className="text-sm font-medium leading-none cursor-pointer capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Spice Level */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Spice Level</h3>
                <div className="flex flex-wrap gap-2">
                    {['Mild', 'Medium', 'Spicy'].map((level) => (
                        <Badge
                            key={level}
                            variant={spiceLevel.includes(level) ? "default" : "outline"}
                            className={`cursor-pointer px-3 py-1 text-[11px] uppercase tracking-widest ${spiceLevel.includes(level) ? 'bg-primary border-primary' : 'hover:border-primary text-muted-foreground hover:text-primary transition-colors'}`}
                            onClick={() => {
                                if (spiceLevel.includes(level)) {
                                    setSpiceLevel(spiceLevel.filter(l => l !== level))
                                } else {
                                    setSpiceLevel([...spiceLevel, level])
                                }
                            }}
                        >
                            {level}
                        </Badge>
                    ))}
                </div>
            </div>

            <Button
                variant="outline"
                className="w-full text-muted-foreground border-border hover:bg-muted"
                onClick={resetFilters}
            >
                Reset All Filters
            </Button>
        </div>
    )

    return (
        <div className="min-h-screen bg-background pt-8 pb-24">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="flex flex-col gap-4 mb-12">
                    <h1 className="text-4xl font-black tracking-tighter text-foreground uppercase">
                        {category ? category.name : "All Products"}
                    </h1>
                    <div className="flex items-center justify-between border-b border-border pb-4">
                        <p className="text-muted-foreground">Showing <span className="text-foreground font-bold">{filteredProducts.length}</span> items</p>

                        {/* Mobile Filter Toggle */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="sm" className="lg:hidden gap-2">
                                    <SlidersHorizontal className="w-4 h-4" />
                                    Filters
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-6">
                                <SheetHeader className="mb-8">
                                    <SheetTitle className="text-2xl font-black uppercase">Filters</SheetTitle>
                                    <SheetDescription>Narrow down your search.</SheetDescription>
                                </SheetHeader>
                                <FilterSidebar />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

                <div className="flex gap-12">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-64 shrink-0">
                        <div className="sticky top-24">
                            <FilterSidebar />
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
                                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                                    <X className="w-10 h-10 text-muted-foreground/50" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-foreground">No products found</h3>
                                    <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
                                </div>
                                <Button onClick={resetFilters} variant="link" className="text-primary font-bold uppercase">Clear all filters</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
