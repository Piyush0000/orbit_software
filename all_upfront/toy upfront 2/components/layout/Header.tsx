"use client";

import Link from "next/link";
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import AnnouncementBar from "./AnnouncementBar";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "@/store/authStore";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { usePathname } from "next/navigation";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { wishlist } = useWishlist();
    const { cartCount } = useCart();
    const { isAuthenticated } = useAuth();
    const pathname = usePathname();

    // Close menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);


    return (
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100/50 shadow-sm transition-all duration-300">
            {/* Colorful Top Strip */}
            <div className="h-2 w-full bg-gradient-to-r from-primary via-accent to-secondary" />

            <AnnouncementBar />

            {/* Main Header */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-foreground/80 hover:bg-muted rounded-full transition-colors z-50 relative"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 group flex items-center gap-2 z-50 relative">
                        <div className="bg-primary/10 p-2 rounded-xl rotate-3 group-hover:rotate-6 transition-transform">
                            <span className="text-2xl">🧸</span>
                        </div>
                        <span className="text-2xl sm:text-3xl font-extrabold text-foreground font-display tracking-tight leading-none">
                            Toy<span className="text-primary">Store</span>
                            <span className="text-secondary animate-pulse">.</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-2 font-medium text-foreground/80">
                        <div className="group relative cursor-pointer px-4 py-2 hover:bg-muted/50 rounded-full transition-all">
                            <span className="group-hover:text-primary transition-colors">By Age</span>
                            <div className="absolute top-full left-0 w-56 bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-2 hidden group-hover:block border border-gray-100 mt-2">
                                <Link href="/category/age-0-2" className="block px-4 py-3 hover:bg-muted/50 rounded-xl text-sm transition-colors text-foreground/80 hover:text-primary">0 - 2 Years</Link>
                                <Link href="/category/age-3-5" className="block px-4 py-3 hover:bg-muted/50 rounded-xl text-sm transition-colors text-foreground/80 hover:text-primary">3 - 5 Years</Link>
                                <Link href="/category/age-6-8" className="block px-4 py-3 hover:bg-muted/50 rounded-xl text-sm transition-colors text-foreground/80 hover:text-primary">6 - 8 Years</Link>
                                <Link href="/category/age-9-12" className="block px-4 py-3 hover:bg-muted/50 rounded-xl text-sm transition-colors text-foreground/80 hover:text-primary">9 - 12 Years</Link>
                            </div>
                        </div>
                        <Link href="/category/educational" className="px-4 py-2 hover:bg-muted/50 rounded-full hover:text-primary transition-all">Educational</Link>
                        <Link href="/category/outdoor" className="px-4 py-2 hover:bg-muted/50 rounded-full hover:text-primary transition-all">Outdoor</Link>
                        <Link href="/category/new-arrivals" className="px-4 py-2 hover:bg-muted/50 rounded-full hover:text-primary transition-all">New Arrivals</Link>
                    </nav>

                    {/* Search Bar */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const query = formData.get('search');
                            if (query) {
                                window.location.href = `/category/all?search=${query}`;
                            }
                        }}
                        className="hidden md:flex flex-1 max-w-md mx-6 relative group"
                    >
                        <input
                            type="text"
                            name="search"
                            placeholder="Find something fun..."
                            className="w-full pl-11 pr-4 py-3 bg-white border border-muted/60 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-full transition-all outline-none text-sm placeholder:text-gray-400 text-foreground shadow-[0_2px_15px_rgba(0,0,0,0.03)]"
                        />
                        <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                    </form>

                    {/* User Actions */}
                    <div className="flex items-center gap-2 z-50 relative">
                        <Link href="/wishlist" className="p-2.5 hover:bg-muted rounded-full transition-colors relative group text-foreground/70 hover:text-red-400">
                            <Heart className="w-6 h-6 transition-transform group-hover:scale-110" />
                            {wishlist.length > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-red-400 text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>
                        <Link href="/cart" className="p-2.5 hover:bg-muted rounded-full transition-colors relative group text-foreground/70 hover:text-primary">
                            <ShoppingCart className="w-6 h-6 transition-transform group-hover:scale-110" />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        {isAuthenticated ? (
                            <div className="relative group p-2.5 hover:bg-muted rounded-full transition-colors hidden sm:block">
                                <User className="w-6 h-6 text-foreground/70" />
                                <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <ProfileDropdown />
                                </div>
                            </div>
                        ) : (
                            <Link href="/auth/login" className="px-4 py-2 bg-primary text-white rounded-full font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hidden sm:block">
                                Login
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Search - Visible only on mobile */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const query = formData.get('search');
                        if (query) {
                            window.location.href = `/category/all?search=${query}`;
                        }
                    }}
                    className="md:hidden mt-4 relative z-0"
                >
                    <input
                        type="text"
                        name="search"
                        placeholder="Search for toys..."
                        className="w-full pl-10 pr-4 py-2.5 bg-muted/50 rounded-full text-sm focus:outline-none border border-transparent focus:border-primary/20 focus:bg-white text-foreground placeholder:text-gray-400"
                    />
                    <button type="submit" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                        <Search className="w-4 h-4" />
                    </button>
                </form>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-white z-[100] h-[100dvh] transition-all duration-300 lg:hidden flex flex-col pt-24 px-6 overflow-y-auto ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                    }`}
            >
                <div className="flex flex-col gap-6 text-xl font-bold text-foreground">
                    <div className="space-y-4">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Shop By Age</p>
                        <Link href="/category/age-0-2" className="flex items-center justify-between py-2 border-b border-gray-100">0 - 2 Years <ChevronRight className="w-4 h-4 text-gray-400" /></Link>
                        <Link href="/category/age-3-5" className="flex items-center justify-between py-2 border-b border-gray-100">3 - 5 Years <ChevronRight className="w-4 h-4 text-gray-400" /></Link>
                        <Link href="/category/age-6-8" className="flex items-center justify-between py-2 border-b border-gray-100">6 - 8 Years <ChevronRight className="w-4 h-4 text-gray-400" /></Link>
                        <Link href="/category/age-9-12" className="flex items-center justify-between py-2 border-b border-gray-100">9 - 12 Years <ChevronRight className="w-4 h-4 text-gray-400" /></Link>
                    </div>

                    <div className="space-y-4 mt-4">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Categories</p>
                        <Link href="/category/educational" className="flex items-center justify-between py-2 border-b border-gray-100">Educational Toys <ChevronRight className="w-4 h-4 text-gray-400" /></Link>
                        <Link href="/category/outdoor" className="flex items-center justify-between py-2 border-b border-gray-100">Outdoor Fun <ChevronRight className="w-4 h-4 text-gray-400" /></Link>
                        <Link href="/category/new-arrivals" className="flex items-center justify-between py-2 border-b border-gray-100 text-primary">New Arrivals <ChevronRight className="w-4 h-4 text-primary" /></Link>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100">
                        {isAuthenticated ? (
                            <div className="space-y-4">
                                <Link href="/profile" className="flex items-center gap-3 py-2 text-gray-600 hover:text-primary">
                                    <User className="w-5 h-5" />
                                    My Profile
                                </Link>
                                <button
                                    onClick={() => {
                                        useAuth.getState().logout();
                                        window.location.reload();
                                    }}
                                    className="flex items-center gap-3 py-2 text-red-600 w-full text-left"
                                >
                                    <span className="w-5 h-5 flex items-center justify-center">→</span>
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <Link href="/auth/login" className="flex items-center gap-3 py-2 text-primary font-bold">
                                <User className="w-5 h-5" />
                                Login / Sign Up
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
