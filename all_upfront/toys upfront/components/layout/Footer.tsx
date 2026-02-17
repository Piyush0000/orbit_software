import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Info */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4 font-display">
                            Toy<span className="text-primary">Store</span>.
                        </h3>
                        <p className="text-sm leading-relaxed mb-6 text-gray-400">
                            Approved by kids, trusted by parents. We bring you the safest,
                            most fun, and educational toys from around the world.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Shop</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/category/new" className="hover:text-white transition-colors">New Arrivals</Link></li>
                            <li><Link href="/category/best-sellers" className="hover:text-white transition-colors">Best Sellers</Link></li>
                            <li><Link href="/category/educational" className="hover:text-white transition-colors">Educational Toys</Link></li>
                            <li><Link href="/category/sale" className="hover:text-white transition-colors">Sale & Offers</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Support</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/track-order" className="hover:text-primary transition-colors">Track Your Order</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
                            <li><Link href="/returns" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
                            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary shrink-0" />
                                <span>123 Playful Street, Toyland City, TC 90210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <span>support@toystore.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} ToyStore Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
