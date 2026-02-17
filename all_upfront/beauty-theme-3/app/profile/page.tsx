
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { User, Package, LogOut, Settings, CreditCard } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
    const router = useRouter();

    const handleLogout = () => {
        // Clear auth state (mock)
        router.push("/login"); // Redirect to login
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header Section */}
                <div className="text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">My Account</h1>
                        <p className="text-muted-foreground mt-2">Welcome back, <span className="text-primary font-medium">Priya</span></p>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="gap-2 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground">
                        <LogOut className="w-4 h-4" /> Sign Out
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {/* Sidebar / User Info Card */}
                    <div className="md:col-span-1 space-y-6">
                        <h2 className="text-2xl font-serif font-bold flex items-center gap-3">
                            <User className="w-6 h-6 text-primary" /> Personal Details
                        </h2>
                        <div className="bg-card border border-border/40 p-6 rounded-none relative group overflow-hidden">

                            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700"></div>
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                    <User className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-lg">Priya Sharma</h3>
                                    <p className="text-sm text-muted-foreground">priya@example.com</p>
                                </div>
                            </div>
                            <div className="space-y-4 relative z-10">
                                <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-primary/5 hover:text-primary">
                                    <Settings className="w-4 h-4" /> Account Details
                                </Button>
                                <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-primary/5 hover:text-primary">
                                    <CreditCard className="w-4 h-4" /> Payment Methods
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content / Orders */}
                    <div className="md:col-span-2 space-y-6">
                        <h2 className="text-2xl font-serif font-bold flex items-center gap-3">
                            <Package className="w-6 h-6 text-primary" /> Order History
                        </h2>

                        <div className="space-y-4">
                            {/* Mock Order 1 */}
                            <div className="bg-card border border-border/40 p-6 rounded-none hover:border-primary/50 transition-colors group">
                                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Order #ORD-2024-8901</p>
                                        <p className="text-sm font-medium mt-1">Placed on Feb 2, 2026</p>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-sm">
                                        Delivered
                                    </span>
                                </div>
                                <div className="flex gap-4 items-center border-t border-border/20 pt-4">
                                    <div className="relative w-16 h-16 bg-muted">
                                        <Image src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=200" alt="Product" fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-serif font-medium">Luminous Glow Serum</h4>
                                        <p className="text-sm text-muted-foreground">Qty: 1</p>
                                    </div>
                                    <p className="font-bold">₹3,599</p>
                                </div>
                                <div className="mt-4 text-right">
                                    <Button variant="link" className="text-primary p-0 h-auto font-medium group-hover:underline">View Details</Button>
                                </div>
                            </div>

                            {/* Mock Order 2 */}
                            <div className="bg-card border border-border/40 p-6 rounded-none hover:border-primary/50 transition-colors">
                                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Order #ORD-2024-8112</p>
                                        <p className="text-sm font-medium mt-1">Placed on Jan 15, 2026</p>
                                    </div>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-sm">
                                        Shipped
                                    </span>
                                </div>
                                <div className="flex gap-4 items-center border-t border-border/20 pt-4">
                                    <div className="relative w-16 h-16 bg-muted">
                                        <Image src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=200" alt="Product" fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-serif font-medium">Velvet Matte Lipstick</h4>
                                        <p className="text-sm text-muted-foreground">Qty: 2</p>
                                    </div>
                                    <p className="font-bold">₹4,598</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
