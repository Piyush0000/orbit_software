"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useStorefront } from "@/context/StorefrontContext";

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
    const { cartCount, setIsCartOpen } = useCart();
    const { customization, store } = useStorefront();

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

    const navLinks = customization?.navbar?.links?.length ? customization.navbar.links : [
        { label: "Men", url: "/shop?category=men" },
        { label: "Women", url: "/shop?category=women" },
        { label: "Unisex", url: "/shop?category=unisex" },
        { label: "Luxury Collection", url: "/shop?tag=luxury" },
        { label: "New Arrivals", url: "/shop?sort=newest" },
    ];

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
                            <Link href="/" className="text-2xl lg:text-3xl font-serif font-bold tracking-tight text-white uppercase">
                                {store?.logo ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img src={store.logo} alt={store.name} style={{ height: customization?.navbar?.logoHeight || '40px' }} />
                                ) : (
                                    store?.name || "PERFUME UPFRONT"
                                )}
                            </Link>
                            {!store?.logo && (
                                <span className="text-[10px] uppercase tracking-widest text-gray-500 hidden sm:block">
                                    {store?.description || "Signature Scents for Every Moment"}
                                </span>
                            )}
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.url}
                                    href={link.url}
                                    className={cn(
                                        "text-xs font-medium uppercase tracking-widest transition-all duration-300 text-white/80 hover:text-gold-400"
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
                            <Link href="/cart" className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Cart" onClick={(e) => {
                                e.preventDefault();
                                setIsCartOpen(true);
                            }}>
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
                    "fixed left-0 right-0 z-40 bg-black text-white text-center py-2 transition-all duration-300",
                    isScrolled ? "top-[60px]" : "top-[75px] lg:top-[85px]"
                )}
            >
                <p className="text-[10px] font-medium tracking-[0.2em] uppercase animate-fade-in text-gold-300">
                    {ANNOUNCEMENTS[announcementIndex]}
                </p>
            </div>

            {/* Spacer to prevent content overlap */}
            <div className="h-[100px] lg:h-[120px]" />

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-[#050505] pt-24 px-6 lg:hidden animate-fade-in">
                    <nav className="flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.url}
                                href={link.url}
                                className={cn(
                                    "text-sm font-medium border-b border-white/10 pb-4 flex justify-between items-center transition-colors text-white/90 uppercase tracking-widest"
                                )}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                                <ChevronDown className="-rotate-90 w-4 h-4 text-white/40" />
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </>
    );
}
