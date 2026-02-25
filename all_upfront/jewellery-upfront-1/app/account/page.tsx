"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Package, Heart, MapPin, LogOut, FileText, RefreshCw, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";

const MOCK_ORDERS = [
    {
        id: "ORD-9928-XA",
        date: "Feb 06, 2026",
        total: "₹47,379",
        status: "Processing",
        items: ["Ethereal Diamond Solitaire Ring"]
    },
    {
        id: "ORD-8821-BC",
        date: "Jan 15, 2026",
        total: "₹2,499",
        status: "Delivered",
        items: ["Minimalist Pearl Drop Earrings"]
    }
];

export default function AccountPage() {
    const { isAuthenticated, user, login, logout, isLoading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        login(email);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background pt-32 flex justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    // LOGIN VIEW
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background pt-32 pb-20 flex items-center justify-center px-4">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-heading font-bold">Welcome Back</h1>
                        <p className="text-muted-foreground">Sign in to access your orders and wishlist.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6 bg-card p-8 rounded-lg border border-border">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Button variant="link" className="px-0 text-xs text-gold h-auto">Forgot password?</Button>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-12"
                            />
                        </div>
                        <Button type="submit" className="w-full h-12 bg-gold hover:bg-gold/90 text-black font-bold uppercase tracking-wider">
                            Sign In
                        </Button>
                    </form>

                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">Don't have an account? </span>
                        <Button variant="link" className="px-0 text-gold font-bold">Create Account</Button>
                    </div>
                </div>
            </div>
        );
    }

    // DASHBOARD VIEW
    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-8 max-w-6xl">
                <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0 space-y-6">
                        <div className="bg-secondary/20 p-6 rounded-lg text-center">
                            <div className="w-20 h-20 bg-gold rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-black border-4 border-background">
                                {user?.name.charAt(0)}S
                            </div>
                            <h2 className="font-heading font-bold text-lg">{user?.name}</h2>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>

                        <nav className="flex flex-col space-y-1">
                            <Button variant="ghost" className="justify-start font-medium text-gold bg-secondary/10 hover:bg-secondary/20 hover:text-gold">
                                <Package className="w-4 h-4 mr-3" /> Orders
                            </Button>
                            <Button variant="ghost" className="justify-start font-medium text-foreground/70 hover:text-foreground hover:bg-secondary/10">
                                <Heart className="w-4 h-4 mr-3" /> Wishlist
                            </Button>
                            <Button variant="ghost" className="justify-start font-medium text-foreground/70 hover:text-foreground hover:bg-secondary/10">
                                <MapPin className="w-4 h-4 mr-3" /> Addresses
                            </Button>
                            <Button variant="ghost" className="justify-start font-medium text-foreground/70 hover:text-foreground hover:bg-secondary/10">
                                <FileText className="w-4 h-4 mr-3" /> Warranty Cards
                            </Button>
                            <Button variant="ghost" className="justify-start font-medium text-foreground/70 hover:text-foreground hover:bg-secondary/10">
                                <RefreshCw className="w-4 h-4 mr-3" /> Returns
                            </Button>
                            <Button
                                variant="ghost"
                                className="justify-start font-medium text-red-500 hover:text-red-500 hover:bg-red-500/10 mt-4"
                                onClick={logout}
                            >
                                <LogOut className="w-4 h-4 mr-3" /> Sign Out
                            </Button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="mb-8">
                            <h1 className="text-3xl font-heading font-bold mb-2">My Orders</h1>
                            <p className="text-muted-foreground">Track your jewelry orders and returns.</p>
                        </div>

                        <div className="space-y-6">
                            {MOCK_ORDERS.map((order) => (
                                <Card key={order.id} className="overflow-hidden">
                                    <CardHeader className="bg-secondary/10 py-4 flex flex-row items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <CardTitle className="text-base font-bold">{order.id}</CardTitle>
                                                <Badge variant={order.status === "Delivered" ? "secondary" : "default"} className={order.status === "Processing" ? "bg-gold text-black hover:bg-gold" : ""}>
                                                    {order.status}
                                                </Badge>
                                            </div>
                                            <CardDescription className="text-xs mt-1">Placed on {order.date}</CardDescription>
                                        </div>
                                        <Button variant="outline" size="sm" className="hidden sm:flex hover:bg-transparent hover:text-gold hover:border-gold transition-colors">View Invoice</Button>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                            <div className="space-y-1">
                                                {order.items.map((item, idx) => (
                                                    <p key={idx} className="font-medium text-sm text-foreground">{item}</p>
                                                ))}
                                                {order.items.length > 1 && <p className="text-xs text-muted-foreground">+ {order.items.length - 1} more items</p>}
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-muted-foreground">Total Amount</p>
                                                <p className="font-bold text-lg">{order.total}</p>
                                            </div>
                                        </div>
                                        <div className="mt-6 pt-4 border-t border-border flex gap-4">
                                            <Button variant="link" className="px-0 text-gold h-auto">Track Order</Button>
                                            <div className="w-px h-4 bg-border my-auto"></div>
                                            <Button variant="link" className="px-0 text-muted-foreground h-auto">Need Help?</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Additional Quick Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-gold" /> Warranty
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">You have 2 active warranty certificates linked to this account.</p>
                                    <Button variant="outline" size="sm" className="hover:bg-transparent hover:text-gold hover:border-gold transition-colors">View Certificates</Button>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <RefreshCw className="w-5 h-5 text-gold" /> Services
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">Request polishing, resizing, or repairs for your jewellery.</p>
                                    <Link href="/support">
                                        <Button variant="outline" size="sm" className="hover:bg-transparent hover:text-gold hover:border-gold transition-colors">Request Service</Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
