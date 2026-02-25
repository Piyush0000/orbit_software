"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const NAV_LINKS = [
    { href: "/category/necklaces", label: "Necklaces" },
    { href: "/category/earrings", label: "Earrings" },
    { href: "/category/rings", label: "Rings" },
    { href: "/category/bracelets", label: "Bracelets" },
    { href: "/category/anklets", label: "Anklets" },
    { href: "/category/sets", label: "Sets" },
    { href: "/new-arrivals", label: "New Arrivals" },
    { href: "/gifts", label: "Gift Store" },
];

import { useStoreContext } from "@/context/store-context";

export function Header() {
    const { customization, storeInfo } = useStoreContext();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const { wishlistItems } = useWishlist();

    const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
        }
    };

    const logoText = customization?.headerStyle?.storeName || customization?.headerStyle?.logoText || storeInfo?.name || "LUXE JEWELS";
    const logoUrl = customization?.headerStyle?.logoUrl;
    const announcementText = customization?.announcementBar?.text;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [isMobileMenuOpen]);

    return (
        <>
            <div className="relative w-full">
            {announcementText && (
                <div 
                    onClick={handleSectionClick('announcementBar')}
                    className="fixed top-0 left-0 right-0 z-[51] bg-gold text-black text-center py-2 text-xs font-bold tracking-widest uppercase cursor-pointer hover:outline hover:outline-2 hover:outline-blue-500/50 transition-all"
                >
                    {announcementText}
                </div>
            )}
            <header
                onClick={handleSectionClick('headerStyle')}
                style={{ top: announcementText ? '32px' : '0' }}
                className={cn(
                    "fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out font-heading cursor-pointer hover:outline hover:outline-2 hover:outline-blue-500/50",
                    isScrolled
                        ? "bg-background/95 backdrop-blur-md shadow-sm py-4 border-b border-white/5"
                        : "bg-transparent py-6"
                )}
            >
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex items-center justify-between">
                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden text-foreground hover:text-gold transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsMobileMenuOpen(true);
                            }}
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Desktop Navigation - Left */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            {NAV_LINKS.slice(0, 4).map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="group relative text-sm tracking-wide text-foreground/80 hover:text-gold transition-colors uppercase font-medium py-1"
                                >
                                    {link.label}
                                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out" />
                                </Link>
                            ))}
                        </nav>

                        {/* Logo (Center) */}
                        <Link href="/" className="flex-shrink-0 text-center mx-auto lg:mx-0">
                            {logoUrl ? (
                                <img src={logoUrl} alt={logoText} className="h-8 md:h-10 object-contain" />
                            ) : (
                                <h1 className="text-2xl md:text-3xl font-bold tracking-widest text-foreground font-cinzel">
                                    {logoText}
                                </h1>
                            )}
                        </Link>

                        {/* Desktop Navigation - Right */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            {NAV_LINKS.slice(4).map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="group relative text-sm tracking-wide text-foreground/80 hover:text-gold transition-colors uppercase font-medium py-1"
                                >
                                    {link.label}
                                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out" />
                                </Link>
                            ))}
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center space-x-4 md:space-x-6">
                            <div className={cn("relative flex items-center transition-all duration-300", isSearchOpen ? "w-48 md:w-64" : "w-6")}>
                                {isSearchOpen && (
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        autoFocus
                                        className="w-full bg-transparent border-b border-foreground/20 text-sm py-1 pr-8 focus:outline-none focus:border-accent text-foreground placeholder:text-muted-foreground/50 font-body"
                                        onBlur={() => !isScrolled && setIsSearchOpen(false)} // Optional: close on blur
                                    />
                                )}
                                <button
                                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                                    className={cn("text-foreground hover:text-gold transition-colors", isSearchOpen && "absolute right-0")}
                                >
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>

                            <Link href="/account" className="hidden md:block text-foreground hover:text-gold transition-colors">
                                <User className="w-5 h-5" />
                            </Link>
                            <Link href="/wishlist" className="relative text-foreground hover:text-gold transition-colors">
                                <Heart className="w-5 h-5" />
                                {wishlistItems.length > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 bg-red-500 text-[10px] font-bold text-white rounded-full animate-in zoom-in duration-300">
                                        {wishlistItems.length}
                                    </span>
                                )}
                            </Link>
                            <Link href="/cart" className="relative text-foreground hover:text-gold transition-colors">
                                <ShoppingBag className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 bg-gold text-[10px] font-bold text-black rounded-full animate-in zoom-in duration-300">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <div style={{ height: announcementText ? '120px' : '100px' }} />
        </div>

        {/* Mobile Drawer */}
        <div
            className={cn(
                "fixed inset-0 z-[60] lg:hidden transition-opacity duration-300",
                isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer Content */}
            <div
                className={cn(
                    "absolute top-0 left-0 w-[80%] max-w-sm h-full bg-background border-r border-white/10 shadow-2xl transition-transform duration-300 flex flex-col",
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="p-6 flex items-center justify-between border-b border-white/5">
                    <h2 className="text-xl font-cinzel font-bold tracking-widest text-foreground">MENU</h2>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="text-foreground/60 hover:text-foreground">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4">
                    <nav className="flex flex-col space-y-6">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-lg tracking-wide text-foreground/80 hover:text-gold transition-colors font-medium border-b border-white/5 pb-2"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="mt-8 flex flex-col space-y-4">
                        <Link href="/account" className="flex items-center space-x-3 text-foreground/80 hover:text-gold">
                            <User className="w-5 h-5" />
                            <span>Account</span>
                        </Link>
                        <Link href="/wishlist" className="flex items-center space-x-3 text-foreground/80 hover:text-gold">
                            <Heart className="w-5 h-5" />
                            <span>Wishlist</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
);
}
