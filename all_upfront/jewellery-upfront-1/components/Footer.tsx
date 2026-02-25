"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-black text-white border-t border-white/10 pt-20 pb-10 font-body">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <Link href="/" className="inline-block mb-6">
                            <h2 className="text-2xl font-cinzel font-bold tracking-widest text-white">
                                LUXE<span className="text-gold">JEWELS</span>
                            </h2>
                        </Link>
                        <p className="text-gray-400 mb-6 font-light leading-relaxed">
                            Crafting timeless elegance for the modern soul. Each piece tells a story of luxury, passion, and artistry.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-white/60 hover:text-gold transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="text-white/60 hover:text-gold transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="text-white/60 hover:text-gold transition-colors"><Twitter className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h3 className="text-gold font-cinzel font-bold mb-6 tracking-wider">Shop</h3>
                        <ul className="space-y-4">
                            <li><Link href="/new-arrivals" className="text-gray-400 hover:text-white transition-colors">New Arrivals</Link></li>
                            <li><Link href="/best-sellers" className="text-gray-400 hover:text-white transition-colors">Best Sellers</Link></li>
                            <li><Link href="/category/necklaces" className="text-gray-400 hover:text-white transition-colors">Necklaces</Link></li>
                            <li><Link href="/category/rings" className="text-gray-400 hover:text-white transition-colors">Rings</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h3 className="text-gold font-cinzel font-bold mb-6 tracking-wider">Support</h3>
                        <ul className="space-y-4">
                            <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/care" className="text-gray-400 hover:text-white transition-colors">Jewellery Care</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-gold font-cinzel font-bold mb-6 tracking-wider">Newsletter</h3>
                        <p className="text-gray-400 mb-6 font-light">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <div className="flex flex-col space-y-3">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Your Email Address"
                                    className="w-full bg-white/5 border border-white/10 py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors placeholder:text-gray-600"
                                />
                                <button className="absolute right-3 top-3 text-gold hover:text-white transition-colors">
                                    <Mail className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-light">
                    <p>&copy; 2025 LuxeJewels. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
