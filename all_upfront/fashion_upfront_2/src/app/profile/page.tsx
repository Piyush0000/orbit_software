'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/store/wishlistStore';
import { useCart } from '@/store/cartStore';

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('orders');
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="space-y-12 animate-fade-in">
                        <div className="border-b border-black pb-4">
                            <h2 className="text-3xl font-heading uppercase tracking-tight">Overview</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-zinc-50 p-8 text-center border border-zinc-100 group hover:border-black transition-colors duration-300">
                                <h3 className="text-4xl font-heading mb-2">0</h3>
                                <p className="text-sm font-bold uppercase tracking-widest text-zinc-500">Orders</p>
                            </div>
                            <div className="bg-zinc-50 p-8 text-center border border-zinc-100 group hover:border-black transition-colors duration-300">
                                <h3 className="text-4xl font-heading mb-2">{wishlist.length}</h3>
                                <p className="text-sm font-bold uppercase tracking-widest text-zinc-500">Wishlist</p>
                            </div>
                            <div className="bg-zinc-50 p-8 text-center border border-zinc-100 group hover:border-black transition-colors duration-300">
                                <h3 className="text-4xl font-heading mb-2">0</h3>
                                <p className="text-sm font-bold uppercase tracking-widest text-zinc-500">Credits</p>
                            </div>
                        </div>

                        <div className="bg-black text-white p-8 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg uppercase tracking-wide mb-1">Detailed Profile</h3>
                                <p className="text-zinc-400 text-sm font-light">Complete your profile to get personalized recommendations.</p>
                            </div>
                            <button
                                onClick={() => setActiveTab('profile')}
                                className="bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                );
            case 'profile':
                return (
                    <div className="animate-fade-in max-w-2xl">
                        <div className="border-b border-black pb-4 mb-8">
                            <h2 className="text-3xl font-heading uppercase tracking-tight">Profile Details</h2>
                        </div>
                        <div className="space-y-8">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">First Name</label>
                                    <input type="text" defaultValue="John" className="w-full border-b border-zinc-300 py-2 focus:border-black outline-none bg-transparent transition-colors font-light" />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">Last Name</label>
                                    <input type="text" defaultValue="Doe" className="w-full border-b border-zinc-300 py-2 focus:border-black outline-none bg-transparent transition-colors font-light" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">Email ID</label>
                                <input type="email" defaultValue="john.doe@example.com" className="w-full border-b border-zinc-300 py-2 focus:border-black outline-none bg-transparent transition-colors font-light" />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">Mobile Number</label>
                                <input type="tel" defaultValue="+91 98765 43210" className="w-full border-b border-zinc-300 py-2 focus:border-black outline-none bg-transparent transition-colors font-light" />
                            </div>

                            <button className="mt-8 bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors w-full sm:w-auto">
                                Save Details
                            </button>
                        </div>
                    </div>
                );
            case 'orders':
                return (
                    <div className="animate-fade-in">
                        <div className="flex justify-between items-end mb-8 border-b border-black pb-4">
                            <h2 className="text-3xl font-heading uppercase tracking-tight">All Orders</h2>
                            <div className="relative">
                                <input type="text" placeholder="SEARCH ORDERS" className="bg-transparent border-b border-zinc-300 py-2 pl-0 text-sm outline-none w-48 placeholder-zinc-400 focus:border-black transition-colors" />
                            </div>
                        </div>

                        <div className="bg-zinc-50 border border-zinc-100 p-16 text-center">
                            <p className="text-zinc-400 mb-8 font-light">No recent orders found.</p>
                            <Link href="/products" className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors inline-block">
                                Start Shopping
                            </Link>
                        </div>
                    </div>
                );
            case 'wishlist':
                return (
                    <div className="animate-fade-in">
                        <div className="border-b border-black pb-4 mb-8 flex justify-between items-baseline">
                            <h2 className="text-3xl font-heading uppercase tracking-tight">My Wishlist</h2>
                            <span className="text-zinc-500 text-sm font-bold uppercase tracking-wider">{wishlist.length} Items</span>
                        </div>

                        {wishlist.length === 0 ? (
                            <div className="bg-zinc-50 border border-zinc-100 p-16 text-center">
                                <p className="text-zinc-400 mb-8 font-light">Your wishlist is empty.</p>
                                <Link href="/products" className="text-black font-bold uppercase text-xs tracking-widest border-b border-black pb-1 hover:text-zinc-600 hover:border-zinc-600 transition-colors">
                                    Continue Shopping
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {wishlist.map((product) => (
                                    <div key={product.id} className="group flex flex-col">
                                        <div className="relative aspect-[3/4] bg-zinc-200 overflow-hidden mb-4">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <button
                                                onClick={() => removeFromWishlist(product.id)}
                                                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white/80 hover:bg-black hover:text-white transition-colors z-10"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                                            </button>
                                            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                                                <button
                                                    onClick={() => {
                                                        addToCart({
                                                            id: product.id,
                                                            name: product.name,
                                                            price: product.price,
                                                            priceNum: product.priceNum,
                                                            image: product.image,
                                                            shortDescription: product.description,
                                                        });
                                                        removeFromWishlist(product.id);
                                                    }}
                                                    className="w-full bg-white text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors shadow-lg"
                                                >
                                                    Move to Bag
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-heading uppercase text-lg leading-tight mb-1">{product.name}</h3>
                                            <p className="text-sm font-medium">{product.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            case 'addresses':
                return (
                    <div className="animate-fade-in">
                        <div className="flex justify-between items-end mb-8 border-b border-black pb-4">
                            <h2 className="text-3xl font-heading uppercase tracking-tight">Saved Addresses</h2>
                            <button className="text-xs font-bold uppercase tracking-widest text-black border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors">
                                + Add New
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border border-zinc-200 p-6 relative hover:border-black transition-colors">
                                <div className="absolute top-4 right-4">
                                    <span className="bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">Default</span>
                                </div>
                                <h3 className="font-bold text-sm uppercase tracking-wide mb-4">John Doe</h3>
                                <p className="text-sm text-zinc-600 mb-4 font-light leading-relaxed">
                                    123, Upfront Tech Park, Whitefield,<br />
                                    Bengaluru, Karnataka - 560066
                                </p>
                                <p className="text-sm text-zinc-600 mb-6 font-light">Mobile: <strong>+91 9876543210</strong></p>
                                <div className="flex gap-6 border-t border-zinc-100 pt-4">
                                    <button className="text-xs font-bold text-black uppercase tracking-widest hover:underline">Edit</button>
                                    <button className="text-xs font-bold text-zinc-400 uppercase tracking-widest hover:text-red-500">Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <div>Select a section</div>;
        }
    };

    const menuItems = [
        { id: 'overview', label: 'Overview' },
        { id: 'profile', label: 'Profile' },
        { id: 'orders', label: 'Orders' },
        { id: 'wishlist', label: 'Wishlist' },
        { id: 'addresses', label: 'Addresses' },
    ];

    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">

                <div className="flex flex-col md:flex-row gap-16">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="mb-12">
                            <h1 className="text-2xl font-heading uppercase tracking-tight mb-1">My Account</h1>
                            <p className="text-sm text-zinc-500">Welcome back, John</p>
                        </div>

                        <nav className="space-y-1">
                            {menuItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full text-left py-3 text-xs font-bold uppercase tracking-[0.15em] transition-colors border-l-2 pl-4 ${activeTab === item.id
                                        ? 'border-black text-black'
                                        : 'border-transparent text-zinc-400 hover:text-black'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                            <div className="my-8 border-t border-zinc-100 w-12"></div>
                            <button className="w-full text-left py-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400 hover:text-red-600 pl-4 border-l-2 border-transparent">
                                Logout
                            </button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-h-[600px] border-t md:border-t-0 md:border-l border-zinc-100 md:pl-16 pt-8 md:pt-0">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}
