"use client";

import { useState } from "react";
import { User, Package, MapPin, CreditCard, LogOut, Heart } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("overview");

    const user = {
        name: "Shreya Chauhan",
        email: "shreya@example.com",
        phone: "+91 98765 43210",
        avatar: "https://ui-avatars.com/api/?name=Shreya+Chauhan&background=random"
    };

    const mockOrders = [
        { id: "#ORD-1234", date: "Jan 15, 2024", total: 2499, status: "Delivered", items: ["Robot Builder Kit"] },
        { id: "#ORD-1235", date: "Feb 01, 2024", total: 1499, status: "Processing", items: ["Plush Dino Friend"] },
    ];

    const menuItems = [
        { id: "overview", label: "Overview", icon: User },
        { id: "orders", label: "My Orders", icon: Package },
        { id: "wishlist", label: "Wishlist", icon: Heart, link: "/wishlist" }, // Direct link
        { id: "addresses", label: "Addresses", icon: MapPin },
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">My Account</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6">
                        <div className="flex items-center gap-4 mb-8">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={user.avatar} alt="Profile" className="w-16 h-16 rounded-full" />
                            <div>
                                <h2 className="font-bold text-lg text-gray-900">{user.name}</h2>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            {menuItems.map((item) => (
                                item.link ? (
                                    <Link
                                        key={item.id}
                                        href={item.link}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors font-medium"
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.label}
                                    </Link>
                                ) : (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${activeTab === item.id
                                            ? "bg-primary text-white shadow-lg shadow-primary/30"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.label}
                                    </button>
                                )
                            ))}
                            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium mt-4">
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 min-h-[500px]">
                        {activeTab === "overview" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Profile Overview</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                        <h3 className="text-gray-500 text-sm font-medium mb-1">Full Name</h3>
                                        <p className="text-gray-900 font-semibold text-lg">{user.name}</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                        <h3 className="text-gray-500 text-sm font-medium mb-1">Email Address</h3>
                                        <p className="text-gray-900 font-semibold text-lg">{user.email}</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                        <h3 className="text-gray-500 text-sm font-medium mb-1">Phone Number</h3>
                                        <p className="text-gray-900 font-semibold text-lg">{user.phone}</p>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <button className="px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-primary transition-colors font-medium">
                                        Edit Profile
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === "orders" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Order History</h2>
                                <div className="space-y-4">
                                    {mockOrders.map((order) => (
                                        <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="font-bold text-gray-900">{order.id}</span>
                                                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500">{order.date}</p>
                                                <p className="text-sm text-gray-600 mt-1">Items: {order.items.join(", ")}</p>
                                            </div>
                                            <div className="mt-4 md:mt-0 text-right">
                                                <p className="font-bold text-lg text-gray-900">₹{order.total}</p>
                                                <button className="text-primary text-sm font-bold hover:underline">View Details</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "addresses" && (
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Saved Addresses</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-4 rounded-xl border border-gray-200 relative">
                                        <span className="absolute top-4 right-4 bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">Default</span>
                                        <h3 className="font-bold text-gray-900 mb-2">Home</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            123, Toy Street, Fun City<br />
                                            Sector 4, Wonderland<br />
                                            Delhi - 110001
                                        </p>
                                        <div className="flex gap-3 mt-4">
                                            <button className="text-sm font-medium text-gray-900 hover:text-primary">Edit</button>
                                            <button className="text-sm font-medium text-red-500 hover:text-red-600">Delete</button>
                                        </div>
                                    </div>
                                    <button className="p-4 rounded-xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors h-full min-h-[150px]">
                                        <MapPin className="w-6 h-6 mb-2" />
                                        <span className="font-medium">+ Add New Address</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
