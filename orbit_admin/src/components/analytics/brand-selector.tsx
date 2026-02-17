import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
interface BrandSelectorProps {
    selectedBrandId: string
    onBrandChange: (brandId: string) => void
    brands: Array<{ id: string; name: string }>
}

export function BrandSelector({ selectedBrandId, onBrandChange, brands }: BrandSelectorProps) {
    const [open, setOpen] = React.useState(false)

    const selectedBrand = brands.find((brand) => brand.id === selectedBrandId)

    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Brands</h3>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {selectedBrand ? selectedBrand.name : "Select brand..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search brand..." />
                        <CommandList>
                            <CommandEmpty>No brand found.</CommandEmpty>
                            <CommandGroup>
                                {brands.map((brand) => (
                                    <CommandItem
                                        key={brand.id}
                                        value={brand.name}
                                        onSelect={() => {
                                            onBrandChange(brand.id)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                selectedBrandId === brand.id ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {brand.name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
