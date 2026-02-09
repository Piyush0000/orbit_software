"use client"

import Link from "next/link"
import { ShoppingCart, Search, Menu, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"

import { CartDrawer } from "./CartDrawer"
import { useCart } from "@/context/CartContext"
import { useStorefront } from "@/context/StorefrontContext"
import { Product } from "@/types/product"
import Image from "next/image"

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState<Product[]>([])
    const [isSearching, setIsSearching] = useState(false)

    const pathname = usePathname()
    const { totalItems } = useCart()
    const { store, products, customization } = useStorefront()

    // Search logic
    useEffect(() => {
        if (searchQuery.trim().length > 1) {
            setIsSearching(true)
            const timer = setTimeout(() => {
                const results = products.filter(p =>
                    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.category.toLowerCase().includes(searchQuery.toLowerCase())
                ).slice(0, 5)
                setSearchResults(results)
                setIsSearching(false)
            }, 300)
            return () => clearTimeout(timer)
        } else {
            setSearchResults([])
        }
    }, [searchQuery])

    // Close results when route changes
    useEffect(() => {
        setIsOpen(false)
        setSearchQuery("")
    }, [pathname])

    const highlightText = (text: string, query: string) => {
        if (!query) return text
        const parts = text.split(new RegExp(`(${query})`, "gi"))
        return parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase()
                ? <span key={i} className="text-primary font-black bg-primary/10">{part}</span>
                : part
        )
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Brand Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        {customization?.navbar?.logoHeight ? (
                             // eslint-disable-next-line @next/next/no-img-element
                             <img src={store?.logo} alt={store?.name} className="h-8 w-auto object-contain" style={{ height: customization.navbar.logoHeight }} />
                        ) : store?.logo ? (
                             // eslint-disable-next-line @next/next/no-img-element
                             <img src={store.logo} alt={store.name} className="h-8 w-auto object-contain" />
                        ) : null}
                        <span className="text-xl font-bold tracking-tight text-primary uppercase">{store?.name || 'Provision & Co.'}</span>
                    </Link>
                </div>

                {/* Search Bar - Hidden on mobile, visible on medium+ */}
                <div className="hidden md:flex flex-1 max-w-md mx-8 relative group">
                    <Input
                        type="search"
                        placeholder="Search for snacks, beverages, combos..."
                        className="w-full pl-10 h-10 bg-zinc-50 border-zinc-200 focus-visible:ring-primary focus:bg-white transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoComplete="off"
                    />
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${searchQuery ? "text-primary" : "text-zinc-400"}`} />

                    {/* Search Results Dropdown */}
                    {searchQuery.length > 1 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-zinc-200 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                            {isSearching ? (
                                <div className="p-4 flex items-center gap-3">
                                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                    <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Searching...</span>
                                </div>
                            ) : searchResults.length > 0 ? (
                                <div className="py-2">
                                    <p className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 bg-zinc-50/50">Results</p>
                                    {searchResults.map(product => (
                                        <Link
                                            key={product.id}
                                            href={`/products/${product.id}`}
                                            className="flex items-center gap-4 px-4 py-3 hover:bg-zinc-50 transition-colors group/item"
                                            onClick={() => setSearchQuery("")}
                                        >
                                            <div className="relative w-10 h-10 bg-zinc-100 shrink-0 overflow-hidden">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={product.image || (product.images && product.images[0]) || ''} alt={product.name} className="object-cover w-full h-full" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-black uppercase tracking-tighter text-zinc-900 group-hover/item:text-primary transition-colors truncate">
                                                    {highlightText(product.name, searchQuery)}
                                                </p>
                                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{product.category}</p>
                                            </div>
                                            <span className="text-xs font-black text-zinc-900 pr-2">₹{product.price}</span>
                                        </Link>
                                    ))}
                                    <Link href="/categories/all" className="block text-center p-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:bg-zinc-50 border-t border-zinc-100">
                                        View All Products
                                    </Link>
                                </div>
                            ) : (
                                <div className="p-8 text-center bg-zinc-50/50">
                                    <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">No search results found</p>
                                    <p className="text-[10px] font-medium text-zinc-500">Try a different keyword or category</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-primary relative group">
                        Home
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                    <Link href="/categories/all" className="transition-colors hover:text-primary relative group">
                        Categories
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                    <Link href="/combos" className="transition-colors hover:text-primary relative group">
                        Combos
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                    <Link href="/offers" className="transition-colors hover:text-primary relative group">
                        Offers
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                    </Link>
                </nav>

                {/* Icons & Mobile Menu */}
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="hidden lg:flex items-center gap-2">
                        <Link href="/login">
                            <Button variant="ghost" className="text-sm font-bold uppercase tracking-widest hover:bg-zinc-50 px-4">
                                Log In
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button className="text-sm font-black uppercase tracking-widest px-6 rounded-none">
                                Sign Up
                            </Button>
                        </Link>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative hover:bg-zinc-50 rounded-full"
                        onClick={() => setIsCartOpen(true)}
                    >
                        <ShoppingCart className="w-5 h-5" />
                        {totalItems > 0 && (
                            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white animate-in zoom-in duration-300">
                                {totalItems}
                            </span>
                        )}
                    </Button>

                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden hover:bg-zinc-50 rounded-full">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[350px] p-6">
                            <SheetHeader className="text-left mb-8">
                                <SheetTitle className="text-2xl font-black text-primary uppercase tracking-tighter">
                                    Provision & Co.
                                </SheetTitle>
                            </SheetHeader>

                            <div className="flex flex-col gap-6">
                                {/* Mobile Search */}
                                <div className="relative md:hidden">
                                    <Input
                                        type="search"
                                        placeholder="Search products..."
                                        className="w-full pl-10 h-10 bg-zinc-50 border-zinc-200"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                </div>

                                <nav className="flex flex-col gap-4">
                                    <Link
                                        href="/"
                                        className="text-lg font-bold uppercase tracking-widest text-zinc-900 hover:text-primary py-2 border-b border-zinc-100 last:border-0 transition-colors"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        href="/categories/all"
                                        className="text-lg font-bold uppercase tracking-widest text-zinc-900 hover:text-primary py-2 border-b border-zinc-100 last:border-0 transition-colors"
                                    >
                                        Categories
                                    </Link>
                                    <Link
                                        href="/combos"
                                        className="text-lg font-bold uppercase tracking-widest text-zinc-900 hover:text-primary py-2 border-b border-zinc-100 last:border-0 transition-colors"
                                    >
                                        Combos
                                    </Link>
                                    <Link
                                        href="/offers"
                                        className="text-lg font-bold uppercase tracking-widest text-zinc-900 hover:text-primary py-2 border-b border-zinc-100 last:border-0 transition-colors"
                                    >
                                        Offers
                                    </Link>
                                </nav>

                                <div className="flex flex-col gap-3 py-6 border-y border-zinc-100">
                                    <Link href="/login" className="w-full">
                                        <Button className="w-full h-12 font-black uppercase tracking-widest rounded-none">
                                            Log In
                                        </Button>
                                    </Link>
                                    <Link href="/signup" className="w-full">
                                        <Button variant="outline" className="w-full h-12 font-black uppercase tracking-widest border-zinc-200 hover:bg-zinc-50 rounded-none">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </div>

                                <div className="pt-2 text-center">
                                    <p className="text-sm text-zinc-400 font-medium">© 2026 Provision & Co.</p>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
        </header>
    )
}
