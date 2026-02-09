"use client";

import Link from "next/link";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose, SheetDescription } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useStorefront } from "@/context/StorefrontContext";
import { SearchOverlay } from "@/components/search/SearchOverlay";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();
    const { customization, store } = useStorefront();

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = customization?.navbar?.links?.length ? customization.navbar.links : [
        { label: "Shop", url: "/shop" },
        { label: "Best Sellers", url: "/#bestsellers" },
        { label: "Concerns", url: "/concerns" },
        { label: "About Us", url: "/about" },
    ];

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-500 border-b border-transparent ${isScrolled ? "bg-background/80 backdrop-blur-xl border-border/50 shadow-md" : "bg-transparent"}`}>
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">

                    {/* Mobile Menu */}
                    <div className="flex items-center md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] flex flex-col p-6 bg-background border-r border-border">
                                <SheetHeader className="text-left px-0">
                                    <SheetTitle className="font-serif text-3xl font-bold tracking-tight uppercase">
                                        {store?.name || "LUMIÈRE"}<span className="text-primary">.</span>
                                    </SheetTitle>
                                    <SheetDescription className="text-xs text-muted-foreground uppercase tracking-widest">
                                        {store?.description || "Premium Beauty & Skincare"}
                                    </SheetDescription>
                                </SheetHeader>

                                <nav className="flex flex-col gap-6 mt-12">
                                    {navLinks.map((link) => (
                                        <SheetClose key={link.label} asChild>
                                            <Link
                                                href={link.url}
                                                className="text-lg font-medium hover:text-primary transition-colors border-b border-white/5 pb-2"
                                            >
                                                {link.label}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </nav>

                                <div className="mt-auto pb-8 text-sm text-muted-foreground opacity-50">
                                    <p>© 2024 {store?.name || "Lumière Beauty"}.</p>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Logo */}
                    <div className="flex-1 flex items-center justify-center md:justify-start md:flex-none">
                        <Link href="/" className="text-3xl font-serif font-bold tracking-tighter text-foreground group uppercase">
                            {store?.logo ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img src={store.logo} alt={store.name} style={{ height: customization?.navbar?.logoHeight || '50px' }} />
                            ) : (
                                <> {store?.name || "LUMIÈRE"}<span className="text-primary group-hover:text-foreground transition-colors">.</span></>
                            )}
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-10 items-center">
                        {navLinks.map((link) => (
                            <Link key={link.label} href={link.url} className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-widest relative group">
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* Icons */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden sm:flex hover:bg-primary/10 hover:text-primary rounded-full transition-colors"
                            onClick={() => setIsSearchOpen(true)}
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                        <Link href="/login">
                            <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary rounded-full transition-colors">
                                <User className="h-5 w-5" />
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-primary/10 hover:text-primary rounded-full relative transition-colors"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingBag className="h-5 w-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-[10px] text-primary-foreground font-bold flex items-center justify-center rounded-full animate-in zoom-in border border-background">
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
