
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { User, Package, LogOut, Settings, CreditCard, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
    const router = useRouter();

    const handleLogout = () => {
        // Clear auth state (mock)
        router.push("/login"); // Redirect to login
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4 md:px-8 text-foreground font-sans">
            <div className="max-w-6xl mx-auto space-y-10">

                {/* Header Section - Elegantly Minimal */}
                <div className="flex flex-row flex-wrap justify-between items-end gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-6 border-b border-border">
                    <div>
                        <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-muted-foreground">Dashboard</span>
                        <h1 className="text-3xl md:text-5xl font-serif font-medium text-foreground mt-1 md:mt-2">Hello, <span className="italic text-primary">Priya</span></h1>
                    </div>
                    <Button variant="ghost" onClick={handleLogout} className="gap-2 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors text-sm h-auto py-2">
                        <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Sign Out</span><span className="sm:hidden">Exit</span>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                    {/* Sidebar / User Info Card - Takes 4 columns */}
                    <div className="md:col-span-4 space-y-6">
                        <h2 className="text-2xl font-serif font-medium text-foreground flex items-center gap-3">
                            Personal Details
                        </h2>
                        <div className="bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border/50 relative overflow-hidden">
                            <div className="flex flex-col items-center text-center gap-4 relative z-10">
                                <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-primary mb-2 shadow-inner">
                                    <User className="w-10 h-10" />
                                </div>
                                <div>
                                    <h3 className="font-serif font-medium text-xl text-foreground">Priya Sharma</h3>
                                    <p className="text-sm text-muted-foreground mt-1">priya@example.com</p>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium uppercase tracking-wider rounded-full">Member</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 pl-2">Account Settings</h3>
                            <Button variant="ghost" className="w-full justify-between hover:bg-secondary/50 hover:text-primary text-foreground/80 h-12 rounded-xl group px-4">
                                <span className="flex items-center gap-3"><Settings className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" /> Account Details</span>
                                <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button variant="ghost" className="w-full justify-between hover:bg-secondary/50 hover:text-primary text-foreground/80 h-12 rounded-xl group px-4">
                                <span className="flex items-center gap-3"><CreditCard className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" /> Payment Methods</span>
                                <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </div>

                    {/* Main Content / Orders - Takes 8 columns */}
                    <div className="md:col-span-8 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-serif font-medium text-foreground flex items-center gap-3">
                                Recent Orders
                            </h2>
                            <Button variant="link" className="text-primary hover:text-primary/80">View All</Button>
                        </div>

                        <div className="space-y-4">
                            {/* Mock Order 1 */}
                            <div className="bg-card border border-border/50 p-6 rounded-2xl hover:shadow-md transition-all duration-300 group">
                                <div className="flex flex-wrap justify-between items-center gap-4 mb-6 pb-4 border-b border-border/30">
                                    <div className="flex gap-4 items-center">
                                        <div className="bg-secondary p-2 rounded-lg">
                                            <Package className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">Order #ORD-8901</p>
                                            <p className="text-xs text-muted-foreground">Feb 2, 2026</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-100 text-xs font-bold uppercase tracking-wider rounded-full">
                                        Delivered
                                    </span>
                                </div>
                                <div className="flex gap-6 items-center">
                                    <div className="relative w-20 h-20 bg-muted/30 rounded-xl overflow-hidden shadow-sm">
                                        <Image src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=200" alt="Product" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-serif font-medium text-lg text-foreground group-hover:text-primary transition-colors">Luminous Glow Serum</h4>
                                        <p className="text-sm text-muted-foreground mt-1">Standard Shipping</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg text-primary">₹3,599</p>
                                        <p className="text-xs text-muted-foreground">1 Item</p>
                                    </div>
                                </div>
                            </div>

                            {/* Mock Order 2 */}
                            <div className="bg-card border border-border/50 p-6 rounded-2xl hover:shadow-md transition-all duration-300 group">
                                <div className="flex flex-wrap justify-between items-center gap-4 mb-6 pb-4 border-b border-border/30">
                                    <div className="flex gap-4 items-center">
                                        <div className="bg-secondary p-2 rounded-lg">
                                            <Package className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground">Order #ORD-8112</p>
                                            <p className="text-xs text-muted-foreground">Jan 15, 2026</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold uppercase tracking-wider rounded-full">
                                        Shipped
                                    </span>
                                </div>
                                <div className="flex gap-6 items-center">
                                    <div className="relative w-20 h-20 bg-muted/30 rounded-xl overflow-hidden shadow-sm">
                                        <Image src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=200" alt="Product" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-serif font-medium text-lg text-foreground group-hover:text-primary transition-colors">Velvet Matte Lipstick</h4>
                                        <p className="text-sm text-muted-foreground mt-1">Express Shipping</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg text-primary">₹4,598</p>
                                        <p className="text-xs text-muted-foreground">2 Items</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
