import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#2C2621] text-[#F5F1E8] pt-20 pb-10">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="block">
                            <h2 className="text-3xl font-serif tracking-widest text-[#F5F1E8]">SCENTARIS</h2>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#A1887F]">Nude et Signature</span>
                        </Link>
                        <p className="text-[#a1887f] text-sm leading-relaxed max-w-xs">
                            Crafting memories through the art of fragrance. Sustainable, authentic, and timeless.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 border border-[#4A4238] rounded-full flex items-center justify-center text-[#d7ccc8] hover:bg-[#F5F1E8] hover:text-[#2C2621] transition-all duration-300">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="font-serif text-lg mb-6 text-[#EAE5D8]">Collections</h3>
                        <ul className="space-y-4 text-sm text-[#d7ccc8]">
                            {['Best Sellers', 'New Arrivals', 'Men', 'Women', 'Unisex', 'Gift Sets'].map(item => (
                                <li key={item}>
                                    <Link href="/shop" className="hover:text-[#F5F1E8] hover:pl-2 transition-all duration-300 flex items-center gap-2">
                                        <span className="w-1 h-1 bg-[#4A4238] rounded-full opacity-0 group-hover:opacity-100"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-serif text-lg mb-6 text-[#EAE5D8]">Support</h3>
                        <ul className="space-y-4 text-sm text-[#d7ccc8]">
                            {['Contact Us', 'FAQs', 'Shipping & Returns', 'Privacy Policy', 'Terms of Service', 'Track Order'].map(item => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-[#F5F1E8] transition-colors">{item}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-serif text-lg mb-6 text-[#EAE5D8]">Stay in the Loop</h3>
                        <p className="text-sm text-[#d7ccc8] mb-6">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <div className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-[#1e1a17] border border-[#3e2723] px-4 py-3 text-sm text-[#F5F1E8] placeholder-[#5d554a] focus:outline-none focus:border-[#a1887f] transition-colors"
                            />
                            <button className="w-full bg-[#F5F1E8] text-[#2C2621] py-3 text-xs uppercase font-bold tracking-widest hover:bg-[#d7ccc8] transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-[#3e2723] pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#8d6e63]">
                    <p>&copy; 2026 Scentaris. All rights reserved.</p>
                    <div className="flex gap-8">
                        <span>Privacy</span>
                        <span>Terms</span>
                        <span>Sitemap</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
