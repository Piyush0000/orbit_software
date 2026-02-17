import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function Footer() {
    return (
        <footer className="bg-secondary/30 pt-16 pb-8 border-t border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Brand & Newsletter */}
                    <div className="col-span-1 md:col-span-1.5 space-y-6">
                        <Link href="/" className="text-2xl font-serif font-bold tracking-tighter text-foreground">
                            LUMIÈRE<span className="text-primary">.</span>
                        </Link>
                        <p className="text-muted-foreground max-w-xs">
                            Elevating your daily ritual with premium, clean, and sustainable beauty essentials.
                        </p>
                        <div className="flex gap-2">
                            <Input placeholder="Enter your email" className="bg-background border-none shadow-sm rounded-full" />
                            <Button className="rounded-full px-6">Subscribe</Button>
                        </div>
                    </div>

                    {/* Links 1 */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-foreground">Shop</h4>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Skincare</Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Makeup</Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Haircare</Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">New Arrivals</Link>
                    </div>

                    {/* Links 2 */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-foreground">Support</h4>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shipping & Returns</Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
                    </div>

                    {/* Social */}
                    <div className="flex flex-col gap-4">
                        <h4 className="font-bold text-foreground">Follow Us</h4>
                        <div className="flex gap-4">
                            <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-secondary rounded-full"><Instagram className="w-5 h-5" /></Button>
                            <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-secondary rounded-full"><Facebook className="w-5 h-5" /></Button>
                            <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-secondary rounded-full"><Twitter className="w-5 h-5" /></Button>
                        </div>
                    </div>
                </div>

                <Separator className="bg-border/50" />

                <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Lumière Beauty. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-foreground">Privacy</Link>
                        <Link href="#" className="hover:text-foreground">Terms</Link>
                        <Link href="#" className="hover:text-foreground">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
