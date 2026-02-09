"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { filters } from "@/lib/products";

interface ProductFiltersProps {
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
    selectedSkinTypes: string[];
    setSelectedSkinTypes: (types: string[]) => void;
    selectedProductTypes: string[];
    setSelectedProductTypes: (types: string[]) => void;
    selectedPriceRanges: number[];
    setSelectedPriceRanges: (ranges: number[]) => void;
}

export function ProductFilters({
    selectedCategories,
    setSelectedCategories,
    selectedSkinTypes,
    setSelectedSkinTypes,
    selectedProductTypes,
    setSelectedProductTypes,
    selectedPriceRanges,
    setSelectedPriceRanges,
}: ProductFiltersProps) {

    const toggleFilter = (list: string[], setList: (l: string[]) => void, item: string) => {
        if (list.includes(item)) {
            setList(list.filter((i) => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    const togglePriceFilter = (index: number) => {
        if (selectedPriceRanges.includes(index)) {
            setSelectedPriceRanges(selectedPriceRanges.filter((i) => i !== index));
        } else {
            setSelectedPriceRanges([...selectedPriceRanges, index]);
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="font-serif text-xl font-bold mb-4">Filters</h3>

            <Accordion type="multiple" defaultValue={["category", "skinType", "price"]} className="w-full">

                {/* Category Filter */}
                <AccordionItem value="category">
                    <AccordionTrigger>Category</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {filters.categories.map((category) => (
                                <div key={category} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`category-${category}`}
                                        checked={selectedCategories.includes(category)}
                                        onCheckedChange={() => toggleFilter(selectedCategories, setSelectedCategories, category)}
                                    />
                                    <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">{category}</Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Skin Type Filter */}
                <AccordionItem value="skinType">
                    <AccordionTrigger>Skin Type</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {filters.skinTypes.map((type) => (
                                <div key={type} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`skin-${type}`}
                                        checked={selectedSkinTypes.includes(type)}
                                        onCheckedChange={() => toggleFilter(selectedSkinTypes, setSelectedSkinTypes, type)}
                                    />
                                    <Label htmlFor={`skin-${type}`} className="text-sm cursor-pointer">{type}</Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Product Type Filter */}
                <AccordionItem value="productType">
                    <AccordionTrigger>Product Type</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {filters.productTypes.map((type) => (
                                <div key={type} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`type-${type}`}
                                        checked={selectedProductTypes.includes(type)}
                                        onCheckedChange={() => toggleFilter(selectedProductTypes, setSelectedProductTypes, type)}
                                    />
                                    <Label htmlFor={`type-${type}`} className="text-sm cursor-pointer">{type}</Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Price Range Filter */}
                <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            {filters.priceRanges.map((range, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`price-${idx}`}
                                        checked={selectedPriceRanges.includes(idx)}
                                        onCheckedChange={() => togglePriceFilter(idx)}
                                    />
                                    <Label htmlFor={`price-${idx}`} className="text-sm cursor-pointer">{range.label}</Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
