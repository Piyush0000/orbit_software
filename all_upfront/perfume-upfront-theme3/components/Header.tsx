"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Search, Menu, ShoppingBag, User, X, ChevronDown } from "lucide-react";
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
    "Complimentary Shipping on all orders",
    "Discover the Essence of Elegance",
    "Free samples with every purchase",
];

import { useStoreContext } from "@/context/store-context";

export default function Header() {
    const { customization, storeInfo } = useStoreContext();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [announcementIndex, setAnnouncementIndex] = useState(0);
    const { cartCount } = useCart();

    const handleSectionClick = (sectionId: string) => (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.parent !== window) {
            window.parent.postMessage({ type: 'ORBIT_SECTION_CLICK', sectionId }, '*');
        }
    };

    const logoText = customization?.headerStyle?.storeName || customization?.headerStyle?.logoText || storeInfo?.name || "SCENTARIS";
    const logoUrl = customization?.headerStyle?.logoUrl;
    const announcementText = customization?.announcementBar?.text || ANNOUNCEMENTS[announcementIndex];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Elegant Announcement Bar - Fixed height to ensure alignment */}
            <div 
                onClick={handleSectionClick('announcementBar')}
                className="fixed top-0 left-0 right-0 z-50 bg-[#F5F1E8] text-[#5D554A] text-[10px] uppercase tracking-[0.2em] font-medium text-center h-[32px] flex items-center justify-center border-b border-[#EAE5D8] hover:outline hover:outline-2 hover:outline-blue-500/50 cursor-pointer"
            >
                <p className="animate-fade-in">{announcementText}</p>
            </div>

            <header
                onClick={handleSectionClick('headerStyle')}
                className={cn(
                    "fixed left-0 right-0 z-40 transition-all duration-500 hover:outline hover:outline-2 hover:outline-blue-500/50 cursor-pointer",
                    // Adjusted top position to exactly match announcement bar height
                    "top-[32px]",
                    isScrolled
                        ? "bg-[#F5F1E8]/95 backdrop-blur-md py-4 shadow-sm border-b border-[#EAE5D8]"
                        : "bg-transparent py-8"
                )}
            >
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex flex-col group items-center lg:items-start z-50">
                            {logoUrl ? (
                                <img src={logoUrl} alt={logoText} className="h-10 object-contain" />
                            ) : (
                                <>
                                    <h1 className="text-2xl lg:text-3xl font-serif text-[#2C2621] tracking-widest leading-none">
                                        {logoText}
                                    </h1>
                                    <span className="text-[9px] uppercase tracking-[0.4em] text-[#5D554A] mt-1 group-hover:text-[#2C2621] transition-colors">
                                        Nude et Signature
                                    </span>
                                </>
                            )}
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-10">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300 relative group py-2",
                                        // @ts-ignore
                                        link.highlight ? "text-[#4A4238] font-bold" : "text-[#5D554A] hover:text-[#2C2621]"
                                    )}
                                >
                                    {link.label}
                                    <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-[#2C2621] group-hover:w-full group-hover:left-0 transition-all duration-300" />
                                </Link>
                            ))}
                        </nav>

                        {/* Utilities */}
                        <div className="flex items-center gap-6 text-[#2C2621]">
                            <button className="hover:opacity-70 transition-opacity" aria-label="Search">
                                <Search className="w-5 h-5" strokeWidth={1} />
                            </button>
                            <Link href="/cart" className="hover:opacity-70 transition-opacity relative" aria-label="Cart">
                                <ShoppingBag className="w-5 h-5" strokeWidth={1} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#2C2621] text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <button className="hidden sm:block hover:opacity-70 transition-opacity" aria-label="Account">
                                <User className="w-5 h-5" strokeWidth={1} />
                            </button>
                            <button
                                className="lg:hidden hover:opacity-70 transition-opacity"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" strokeWidth={1} /> : <Menu className="w-6 h-6" strokeWidth={1} />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-30 bg-[#F5F1E8] pt-48 px-8 lg:hidden animate-fade-in">
                    <nav className="flex flex-col gap-6">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-xl font-serif text-[#2C2621] border-b border-[#EAE5D8] pb-4 flex justify-between items-center"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                                <ChevronDown className="-rotate-90 w-4 h-4 text-[#A1887F]" />
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </>
    );
}
