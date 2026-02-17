import Link from "next/link";
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone, ShieldCheck, RefreshCw, Truck, Lock } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-contact-black text-gray-300 pt-16 pb-8 border-t border-gray-800" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="container mx-auto px-4">

                {/* Trust Badges - Top of Footer */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-gray-800 mb-12">
                    <div className="flex flex-col items-center text-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-white font-serif text-lg">100% Authentic</h4>
                            <p className="text-xs text-gray-500 mt-1">Direct from brands</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center text-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500">
                            <Truck className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-white font-serif text-lg">Free Shipping</h4>
                            <p className="text-xs text-gray-500 mt-1">On orders above ₹1499</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center text-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500">
                            <RefreshCw className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-white font-serif text-lg">Easy Returns</h4>
                            <p className="text-xs text-gray-500 mt-1">7-day return policy</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center text-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500">
                            <Lock className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-white font-serif text-lg">Secure Payments</h4>
                            <p className="text-xs text-gray-500 mt-1">SSL Encrypted</p>
                        </div>
                    </div>
                </div>

                {/* Main Footer Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Col */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-serif text-white">PERFUME UPFRONT</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Discover your signature scent with our curated collection of luxury fragrances. 100% authentic, directly from the world's finest brands.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gold-500 hover:text-black transition-colors"><Facebook className="w-4 h-4" /></a>
                            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gold-500 hover:text-black transition-colors"><Instagram className="w-4 h-4" /></a>
                            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gold-500 hover:text-black transition-colors"><Twitter className="w-4 h-4" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white text-lg font-serif mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/about" className="hover:text-gold-400 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-gold-400 transition-colors">Contact Support</Link></li>
                            <li><Link href="/shipping" className="hover:text-gold-400 transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/faq" className="hover:text-gold-400 transition-colors">FAQs</Link></li>
                            <li><Link href="/stores" className="hover:text-gold-400 transition-colors">Store Locations</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-white text-lg font-serif mb-6">Categories</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/men" className="hover:text-gold-400 transition-colors">Men's Perfumes</Link></li>
                            <li><Link href="/women" className="hover:text-gold-400 transition-colors">Women's Perfumes</Link></li>
                            <li><Link href="/unisex" className="hover:text-gold-400 transition-colors">Unisex Fragrances</Link></li>
                            <li><Link href="/luxury" className="hover:text-gold-400 transition-colors">Luxury Collection</Link></li>
                            <li><Link href="/gift-sets" className="hover:text-gold-400 transition-colors">Gift Sets</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white text-lg font-serif mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex gap-3">
                                <MapPin className="w-5 h-5 text-gold-500 shrink-0" />
                                <span>123 Luxury Lane, Perfume City, PC 560001</span>
                            </li>
                            <li className="flex gap-3">
                                <Phone className="w-5 h-5 text-gold-500 shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex gap-3">
                                <Mail className="w-5 h-5 text-gold-500 shrink-0" />
                                <span>support@perfumeupfront.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} Perfume Upfront. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
