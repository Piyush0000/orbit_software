import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#4A403A] text-[#F3E9E2] pt-12 lg:pt-20 pb-10 rounded-t-[2rem] lg:rounded-t-[3rem] mt-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <h3 className="text-3xl font-extrabold text-white font-display">
                            Toy<span className="text-primary">Store</span><span className="text-accent">.</span>
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-300 max-w-xs">
                            Creating happy memories with safe, sustainable, and educational toys.
                            Approved by kids, trusted by parents.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-all"><Twitter className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 font-display">Shop</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/category/new" className="hover:text-primary transition-colors flex items-center gap-2">New Arrivals</Link></li>
                            <li><Link href="/category/best-sellers" className="hover:text-primary transition-colors flex items-center gap-2">Best Sellers</Link></li>
                            <li><Link href="/category/educational" className="hover:text-primary transition-colors flex items-center gap-2">Educational Toys</Link></li>
                            <li><Link href="/category/sale" className="hover:text-secondary transition-colors flex items-center gap-2">Sale & Offers</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 font-display">Support</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/track-order" className="hover:text-primary transition-colors">Track Your Order</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
                            <li><Link href="/returns" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
                            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 font-display">Contact Us</h4>
                        <ul className="space-y-6 text-sm">
                            <li className="flex items-start gap-4">
                                <div className="p-2 bg-white/5 rounded-full shrink-0 text-primary">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <span className="opacity-90">123 Playful Street,<br />Toyland City, TC 90210</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="p-2 bg-white/5 rounded-full shrink-0 text-primary">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <span className="opacity-90">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="p-2 bg-white/5 rounded-full shrink-0 text-primary">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <span className="opacity-90">support@toystore.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 font-medium">
                    <p>© {new Date().getFullYear()} ToyStore Inc. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
