"use client";

import Link from "next/link";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import AnnouncementBar from "./AnnouncementBar";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/store/authStore";
import { useStorefront } from "@/context/StorefrontContext";

export default function Header() {
    const { store, customization } = useStorefront();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { wishlist } = useWishlist();
    const { user, isAuthenticated, logout } = useAuth();
    const [mounted, setMounted] = useState(false);
    const logoUrl = customization?.logo || store?.logo || "";
    const storeName = store?.name || "ToyStore";
    const navLinks = customization?.navLinks?.length
        ? customization.navLinks
        : [
            { label: "By Age", href: "/category/age-3-5" },
            { label: "Educational", href: "/category/educational" },
            { label: "Outdoor", href: "/category/outdoor" },
            { label: "New Arrivals", href: "/category/new-arrivals" }
        ];

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="sticky top-0 z-50 bg-white shadow-sm">
            <AnnouncementBar />

            {/* Main Header */}
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>

                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                        {logoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={logoUrl} alt={storeName} className="h-10 w-10 rounded-full object-cover" />
                        ) : null}
                        <span className="text-3xl font-extrabold text-primary font-display tracking-tight">
                            {storeName}
                            <span className="text-accent">.</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8 font-medium text-gray-700">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
                                {link.label}
                            </Link>
                        ))}
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
                        className="hidden md:flex flex-1 max-w-lg mx-4 relative"
                    >
                        <input
                            type="text"
                            name="search"
                            placeholder="Search for toys, brands, or age..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-full transition-all outline-none text-sm"
                        />
                        <button type="submit" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                            <Search className="w-4 h-4" />
                        </button>
                    </form>

                    {/* User Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <Link href="/wishlist" className="p-2 hover:bg-gray-50 rounded-full transition-colors relative group">
                            <Heart className="w-6 h-6 text-gray-600 group-hover:text-red-500 transition-colors" />
                            {wishlist.length > 0 && (
                                <span className="absolute top-1 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>
                        <Link href="/cart" className="p-2 hover:bg-gray-50 rounded-full transition-colors relative group">
                            <ShoppingCart className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" />
                        </Link>
                        <Link href="/profile" className="p-2 hover:bg-gray-50 rounded-full transition-colors hidden sm:block">
                            <User className="w-6 h-6 text-gray-600 hover:text-primary transition-colors" />
                        </Link>
                        {mounted && isAuthenticated && (
                            <button
                                onClick={() => {
                                    logout();
                                    window.location.reload();
                                }}
                                className="hidden sm:block text-xs text-red-500 hover:text-red-600 font-medium"
                            >
                                Sign Out
                            </button>
                        )}
                    </div>
                </div>

                {/* Mobile Search - Visible only on mobile */}
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
                    className="md:hidden mt-4 relative"
                >
                    <input
                        type="text"
                        name="search"
                        placeholder="Search for toys..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-full text-sm focus:outline-none border border-transparent focus:border-primary/20"
                    />
                    <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                        <Search className="w-4 h-4" />
                    </button>
                </form>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-white z-[100] h-[100dvh] transition-all duration-300 lg:hidden flex flex-col pt-24 px-6 overflow-y-auto ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
                <div className="flex flex-col gap-6 text-xl font-bold text-foreground">
                    <div className="space-y-4">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Shop By Category</p>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-between py-2 border-b border-gray-100"
                            >
                                {link.label} <span className="text-gray-400">→</span>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">My Account</p>
                        {mounted && isAuthenticated ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 py-2 text-gray-900 font-bold border-b border-gray-100 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                                        {user?.name?.charAt(0) || 'U'}
                                    </div>
                                    <div className="flex flex-col">
                                        <span>{user?.name || 'User'}</span>
                                        <span className="text-xs text-gray-500 font-normal">{user?.email}</span>
                                    </div>
                                </div>
                                <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2 text-gray-600 hover:text-secondary">
                                    <User className="w-5 h-5" />
                                    My Profile
                                </Link>
                                <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2 text-gray-600 hover:text-secondary">
                                    <span className="w-5 h-5 flex items-center justify-center font-bold">📦</span>
                                    My Orders
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsMobileMenuOpen(false);
                                        window.location.reload();
                                    }}
                                    className="flex items-center gap-3 py-2 text-red-500 w-full text-left"
                                >
                                    <span className="w-5 h-5 flex items-center justify-center">→</span>
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2 text-secondary font-bold">
                                    <User className="w-5 h-5" />
                                    Login / Register
                                </Link>
                                <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 py-2 text-gray-600 hover:text-secondary">
                                    <Heart className="w-5 h-5" />
                                    Shortlist {wishlist.length > 0 && `(${wishlist.length})`}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
