"use client";

import Link from "next/link";
import { Search, ShoppingCart, Heart, MapPin, Phone, User, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import AnnouncementBar from "./AnnouncementBar";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/store/authStore";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { wishlist } = useWishlist();
    const { cartCount } = useCart();
    const { user, isAuthenticated, logout } = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);



    return (
        <div className="sticky top-0 z-50 shadow-sm transition-all duration-300 font-sans">
            {/* Top White Section: Logo, Search, Actions */}
            <div className="bg-white py-3 border-b border-gray-100">
                <div className="container mx-auto px-4 flex items-center justify-between gap-4">

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-foreground/80 hover:bg-muted rounded-full transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>

                    {/* Logo Area */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
                        <div className="bg-primary/20 p-1.5 rounded-lg rotate-3 group-hover:rotate-12 transition-transform">
                            <span className="text-2xl">🧸</span>
                        </div>
                        <span className="text-3xl font-extrabold text-foreground font-display tracking-tight leading-none">
                            Toy<span className="text-primary">Store</span>
                            <span className="text-secondary animate-pulse text-4xl leading-none">.</span>
                        </span>
                    </Link>

                    {/* Search Bar - Big & Centered */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const query = formData.get('search');
                            if (query) {
                                window.location.href = `/category/all?search=${query}`;
                            }
                        }}
                        className="hidden md:flex flex-1 max-w-xl mx-8 relative"
                    >
                        <input
                            type="text"
                            name="search"
                            placeholder="Search for a Category, Brand or Product"
                            className="w-full pl-4 pr-10 py-2 bg-white border border-gray-300 rounded-sm focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-sm placeholder:text-gray-400 text-foreground transition-all"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-accent transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                    </form>

                    {/* Desktop Utility Links (Top Right) */}
                    <div className="hidden lg:flex items-center gap-4 text-xs font-medium text-gray-600">
                        <div className="flex items-center gap-1 cursor-pointer hover:text-secondary whitespace-nowrap">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>Select location</span>
                        </div>
                        <Link href="#" className="hover:text-secondary whitespace-nowrap">Stores & Preschools</Link>
                        <Link href="#" className="hover:text-secondary whitespace-nowrap">Support</Link>
                        <Link href="#" className="hover:text-secondary whitespace-nowrap">Track Order</Link>

                        <Link href="/profile" className="flex items-center gap-1 hover:text-secondary pl-2 border-l border-gray-300">
                            <User className="w-4 h-4" />
                            <span>Login / Register</span>
                        </Link>

                        <Link href="/wishlist" className="flex items-center gap-1 hover:text-secondary">
                            <Heart className="w-4 h-4" />
                            <span>Shortlist</span>
                            {wishlist.length > 0 && <span className="text-secondary font-bold">({wishlist.length})</span>}
                        </Link>

                        <Link href="/cart" className="flex items-center gap-1 hover:text-secondary">
                            <ShoppingCart className="w-5 h-5 text-secondary" />
                            <span className="text-secondary font-bold">Cart</span>
                            {cartCount > 0 && <span className="bg-secondary text-white text-[10px] px-1.5 py-0.5 rounded-full">{cartCount}</span>}
                        </Link>

                        {mounted && isAuthenticated ? (
                            <div className="flex items-center gap-2 pl-4 border-l border-gray-300">
                                <span className="font-bold text-secondary">Hi, {user?.name}</span>
                                <button
                                    onClick={() => {
                                        logout();
                                        window.location.reload();
                                    }}
                                    className="text-xs text-red-500 hover:text-red-600 underline"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 pl-4 border-l border-gray-300">
                                <Link href="/auth/login" className="flex items-center gap-1 hover:text-secondary">
                                    <User className="w-4 h-4" />
                                    <span>Login</span>
                                </Link>
                                <Link href="/auth/register" className="flex items-center gap-1 hover:text-secondary">
                                    <span>Register</span>
                                </Link>
                            </div>
                        )}
                    </div>
                    {/* Mobile Icons (Visible only on mobile) */}
                    <div className="flex lg:hidden items-center gap-3">
                        <Link href="/cart" className="relative text-foreground/70">
                            <ShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-xs flex items-center justify-center rounded-full">{cartCount}</span>}
                        </Link>
                    </div>

                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-white z-[100] h-[100dvh] transition-all duration-300 lg:hidden flex flex-col pt-24 px-6 overflow-y-auto ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
                <div className="flex flex-col gap-6 text-xl font-bold text-foreground">
                    <div className="space-y-4">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Shop By Category</p>
                        <Link href="/category/educational" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between py-2 border-b border-gray-100">Learning <span className="text-gray-400">→</span></Link>
                        <Link href="/category/soft-toys" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between py-2 border-b border-gray-100">Soft Toys <span className="text-gray-400">→</span></Link>
                        <Link href="/category/action-figures" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between py-2 border-b border-gray-100">Action Figures <span className="text-gray-400">→</span></Link>
                        <Link href="/category/outdoor" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-between py-2 border-b border-gray-100">Outdoor <span className="text-gray-400">→</span></Link>
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

            {/* Bottom Yellow Section: Navigation */}
            <div className="bg-primary shadow-sm hidden lg:block">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center justify-between text-[13px] font-bold text-foreground/90 tracking-wide">
                        <div className="flex items-center">
                            <div className="px-5 py-3 cursor-pointer hover:bg-white/20 transition-colors flex items-center gap-1">
                                ALL TOYS <ChevronDown className="w-3 h-3" />
                            </div>
                            <Link href="/category/educational" className="px-4 py-3 hover:bg-white/20 transition-colors uppercase">Learning</Link>
                            <Link href="/category/soft-toys" className="px-4 py-3 hover:bg-white/20 transition-colors uppercase">Soft Toys</Link>
                            <Link href="/category/action-figures" className="px-4 py-3 hover:bg-white/20 transition-colors uppercase">Action Figures</Link>
                            <Link href="/category/dolls" className="px-4 py-3 hover:bg-white/20 transition-colors uppercase">Dolls</Link>
                            <Link href="/category/arts-crafts" className="px-4 py-3 hover:bg-white/20 transition-colors uppercase">Arts & Crafts</Link>
                            <Link href="/category/vehicles" className="px-4 py-3 hover:bg-white/20 transition-colors uppercase">Vehicles</Link>
                            <Link href="/category/outdoor" className="px-4 py-3 hover:bg-white/20 transition-colors uppercase">Outdoor</Link>
                            <Link href="/category/puzzles" className="px-4 py-3 hover:bg-white/20 transition-colors uppercase">Puzzles</Link>
                            <Link href="/category/games" className="px-4 py-3 hover:bg-white/20 transition-colors uppercase">Board Games</Link>
                        </div>
                        <div className="bg-white/30 px-4 py-3 font-extrabold text-[#113068]">
                            Club
                        </div>
                    </nav>
                </div>
            </div>


            {/* Mobile Search - Visible only on mobile */}
            <div className="bg-white p-2 md:hidden border-b border-gray-100">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const query = formData.get('search');
                        if (query) {
                            window.location.href = `/category/all?search=${query}`;
                        }
                    }}
                    className="relative"
                >
                    <input
                        type="text"
                        name="search"
                        placeholder="Search..."
                        className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                    />
                    <button type="submit" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500">
                        <Search className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );
}
