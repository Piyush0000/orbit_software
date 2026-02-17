"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Search, Menu, Heart, User, ShoppingBag, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";


const NAV_LINKS = [
    { href: "/men", label: "Men" },
    { href: "/women", label: "Women" },
    { href: "/unisex", label: "Unisex" },
    { href: "/luxury", label: "Luxury Collection" },
    { href: "/new-arrivals", label: "New Arrivals" },
    { href: "/gift-sets", label: "Gift Sets" },
    { href: "/sale", label: "Sale", highlight: true },
];

const ANNOUNCEMENTS = [
    "100% Authentic Perfumes",
    "Free Shipping Above ₹1499",
    "Long-Lasting Premium Fragrances",
    "Gift-Ready Packaging",
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [announcementIndex, setAnnouncementIndex] = useState(0);
    const { cartCount } = useCart();

    // Handle scroll for sticky header proper styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Rotate announcements
    useEffect(() => {
        const interval = setInterval(() => {
            setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    isScrolled
                        ? "bg-contrast-black/95 backdrop-blur-md shadow-sm py-2 border-b border-gray-800"
                        : "bg-transparent py-3 border-b border-white/10"
                )}
            >
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex flex-col">
                            <Link href="/" className="text-2xl lg:text-3xl font-serif font-bold tracking-tight">
                                PERFUME UPFRONT
                            </Link>
                            <span className="text-[10px] uppercase tracking-widest text-gray-500 hidden sm:block">
                                Signature Scents for Every Moment
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-6">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-medium uppercase tracking-wide transition-all duration-300",
                                        // @ts-ignore
                                        link.highlight
                                            ? "px-4 py-2 bg-white text-black font-bold hover:bg-gold-500 hover:text-white rounded-sm"
                                            : "text-white/80 hover:text-gold-400"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Utilities */}
                        <div className="flex items-center gap-4 text-white">
                            <button className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Search">
                                <Search className="w-5 h-5" />
                            </button>
                            <button className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:block" aria-label="Wishlist">
                                <Heart className="w-5 h-5" />
                            </button>
                            <Link href="/cart" className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Cart">
                                <div className="relative">
                                    <ShoppingBag className="w-5 h-5" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                                            {cartCount}
                                        </span>
                                    )}
                                </div>
                            </Link>
                            <button className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:block" aria-label="Account">
                                <User className="w-5 h-5" />
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                className="lg:hidden p-2 hover:bg-white/10 rounded-full text-white"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Announcement Bar - Positioned below fixed header */}
            <div
                className={cn(
                    "fixed left-0 right-0 z-40 bg-secondary text-white text-center py-2 transition-all duration-300",
                    isScrolled ? "top-[60px]" : "top-[75px] lg:top-[85px]"
                )}
            >
                <p className="text-xs font-medium tracking-widest uppercase animate-fade-in">
                    {ANNOUNCEMENTS[announcementIndex]}
                </p>
            </div>

            {/* Spacer to prevent content overlap */}
            <div className="h-[100px] lg:h-[120px]" />

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-[#050505] pt-24 px-6 lg:hidden animate-fade-in">
                    <nav className="flex flex-col gap-6">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-lg font-medium border-b border-white/10 pb-4 flex justify-between items-center transition-colors",
                                    // @ts-ignore
                                    link.highlight ? "text-gold-400" : "text-white/90"
                                )}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                                <ChevronDown className="-rotate-90 w-4 h-4 text-white/40" />
                            </Link>
                        ))}
                        <div className="flex gap-4 mt-8 justify-center border-t border-white/10 pt-8">
                            <Link href="/account" className="flex flex-col items-center gap-2 text-xs uppercase text-white/80" onClick={() => setMobileMenuOpen(false)}>
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                                    <User className="w-5 h-5" />
                                </div>
                                Account
                            </Link>
                            <Link href="/wishlist" className="flex flex-col items-center gap-2 text-xs uppercase text-white/80" onClick={() => setMobileMenuOpen(false)}>
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                                    <Heart className="w-5 h-5" />
                                </div>
                                Wishlist
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
}
