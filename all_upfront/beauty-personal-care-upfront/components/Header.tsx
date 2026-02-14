"use client";

import Link from "next/link";
import { ShoppingCart, Search, Menu, User, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose, SheetDescription } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { SearchOverlay } from "@/components/search/SearchOverlay";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Shop", href: "/shop" },
        { name: "Best Sellers", href: "/#bestsellers" },
        { name: "Concerns", href: "/concerns" },
        { name: "About Us", href: "/about" },
    ];

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Mobile Menu */}
                    <div className="flex items-center md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] flex flex-col p-6">
                                <SheetHeader className="text-left px-0">
                                    <SheetTitle className="font-serif text-2xl font-bold">
                                        LUMIÈRE<span className="text-primary">.</span>
                                    </SheetTitle>
                                    <SheetDescription className="text-xs text-muted-foreground">
                                        Premium Beauty & Skincare
                                    </SheetDescription>
                                </SheetHeader>

                                <nav className="flex flex-col gap-6 mt-10">
                                    {navLinks.map((link) => (
                                        <SheetClose key={link.name} asChild>
                                            <Link
                                                href={link.href}
                                                className="text-lg font-medium hover:text-primary transition-colors border-b border-border/40 pb-2"
                                            >
                                                {link.name}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </nav>

                                <div className="mt-auto pb-8 text-sm text-muted-foreground">
                                    <p>© 2024 Lumière Beauty.</p>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Logo */}
                    <div className="flex-1 flex items-center justify-center md:justify-start md:flex-none">
                        <Link href="/" className="text-2xl font-serif font-bold tracking-tighter text-foreground">
                            LUMIÈRE<span className="text-primary">.</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-8 items-center">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-wide">
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Icons */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden sm:flex hover:bg-secondary rounded-full"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                        <Link href="/login">
                            <Button variant="ghost" size="icon" className="hover:bg-secondary rounded-full">
                                <User className="h-5 w-5" />
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-secondary rounded-full relative"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingBag className="h-5 w-5" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 h-4 w-4 bg-primary text-[10px] text-primary-foreground font-bold flex items-center justify-center rounded-full animate-in zoom-in">
                                    {cartCount}
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
