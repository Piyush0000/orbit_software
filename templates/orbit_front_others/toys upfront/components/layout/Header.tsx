"use client";

import Link from "next/link";
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { useState } from "react";
import AnnouncementBar from "./AnnouncementBar";
import { useWishlist } from "@/context/WishlistContext";
import { useStore } from "@/contexts/StoreContext";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { wishlist } = useWishlist();
    const { store } = useStore();

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
                    <Link href="/" className="flex-shrink-0">
                        <span className="text-3xl font-extrabold text-primary font-display tracking-tight">
                            {store?.name || "ToyStore"}
                            <span className="text-accent">.</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8 font-medium text-gray-700">
                        <div className="group relative cursor-pointer py-2">
                            <span className="group-hover:text-primary transition-colors">By Age</span>
                            <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-xl p-2 hidden group-hover:block border border-gray-100">
                                <Link href="/category/age-0-2" className="block px-4 py-2 hover:bg-gray-50 rounded-lg">0 - 2 Years</Link>
                                <Link href="/category/age-3-5" className="block px-4 py-2 hover:bg-gray-50 rounded-lg">3 - 5 Years</Link>
                                <Link href="/category/age-6-8" className="block px-4 py-2 hover:bg-gray-50 rounded-lg">6 - 8 Years</Link>
                                <Link href="/category/age-9-12" className="block px-4 py-2 hover:bg-gray-50 rounded-lg">9 - 12 Years</Link>
                            </div>
                        </div>
                        <Link href="/category/educational" className="hover:text-primary transition-colors">Educational</Link>
                        <Link href="/category/outdoor" className="hover:text-primary transition-colors">Outdoor</Link>
                        <Link href="/category/new-arrivals" className="hover:text-primary transition-colors">New Arrivals</Link>
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
                            <span className="absolute top-1 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                                2
                            </span>
                        </Link>
                        <Link href="/profile" className="p-2 hover:bg-gray-50 rounded-full transition-colors hidden sm:block">
                            <User className="w-6 h-6 text-gray-600 hover:text-primary transition-colors" />
                        </Link>
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
        </div>
    );
}
