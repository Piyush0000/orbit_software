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
                    <div className="space-y-6 animate-fadeIn">
                        <h2 className="text-xl font-bold mb-4 border-b pb-2">Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-blue-50 p-6 rounded-lg text-center cursor-pointer hover:bg-blue-100 transition-colors">
                                <h3 className="text-2xl font-bold text-blue-600">0</h3>
                                <p className="text-gray-600 text-sm mt-1">Orders</p>
                            </div>
                            <div className="bg-pink-50 p-6 rounded-lg text-center cursor-pointer hover:bg-pink-100 transition-colors">
                                <h3 className="text-2xl font-bold text-pink-600">{wishlist.length}</h3>
                                <p className="text-gray-600 text-sm mt-1">Wishlist</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg text-center cursor-pointer hover:bg-gray-100 transition-colors">
                                <h3 className="text-2xl font-bold text-gray-600">0</h3>
                                <p className="text-gray-600 text-sm mt-1">Coupons</p>
                            </div>
                        </div>

                        <div className="bg-gray-900 text-white rounded-lg p-6 mt-8 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">Detailed Profile</h3>
                                <p className="text-gray-400 text-sm">Complete your profile to get personalized recommendations.</p>
                            </div>
                            <button onClick={() => setActiveTab('profile')} className="bg-white text-black px-4 py-2 rounded-md font-bold text-sm">Edit Profile</button>
                        </div>
                    </div>
                );
            case 'profile':
                return (
                    <div className="space-y-8 animate-fadeIn max-w-2xl">
                        <div>
                            <h2 className="text-xl font-bold mb-6 border-b pb-2">Profile Details</h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">First Name</label>
                                        <input type="text" defaultValue="John" className="w-full border-b-2 border-gray-200 focus:border-black outline-none py-2 transition-colors bg-transparent" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Last Name</label>
                                        <input type="text" defaultValue="Doe" className="w-full border-b-2 border-gray-200 focus:border-black outline-none py-2 transition-colors bg-transparent" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email ID</label>
                                    <input type="email" defaultValue="john.doe@example.com" className="w-full border-b-2 border-gray-200 focus:border-black outline-none py-2 transition-colors bg-transparent" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mobile Number</label>
                                    <input type="tel" defaultValue="+91 98765 43210" className="w-full border-b-2 border-gray-200 focus:border-black outline-none py-2 transition-colors bg-transparent" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Gender</label>
                                    <div className="flex gap-4 mt-2">
                                        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="gender" defaultChecked /> Male</label>
                                        <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="gender" /> Female</label>
                                    </div>
                                </div>
                            </div>
                            <button className="mt-8 bg-black text-white px-8 py-3 rounded text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors w-full sm:w-auto">Save Details</button>
                        </div>
                    </div>
                );
            case 'orders':
                return (
                    <div className="animate-fadeIn">
                        <div className="flex justify-between items-center mb-6 border-b pb-4">
                            <h2 className="text-xl font-bold">All Orders</h2>
                            <div className="relative">
                                <input type="text" placeholder="Search in orders..." className="bg-gray-100 rounded-full px-4 py-2 pl-10 text-sm outline-none w-64" />
                                <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">No active orders properly</h3>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto">There are no recent orders to show. Why not explore our new collection?</p>
                            <Link href="/#products" className="bg-[#ff3f6c] text-white px-8 py-3 rounded text-sm font-bold uppercase tracking-wider hover:bg-[#e6355e] transition-colors inline-block shadow-lg shadow-pink-100">Start Shopping</Link>
                        </div>

                        <div className="mt-12">
                            <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider mb-6">Frequently bought interactions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Recommendation Cards placeholders */}
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="border rounded p-4 flex gap-4 items-center hover:shadow-md transition-shadow cursor-pointer">
                                        <div className="w-16 h-16 bg-gray-200 rounded"></div>
                                        <div>
                                            <h4 className="font-bold text-sm">Recommended Item {i}</h4>
                                            <p className="text-xs text-green-600 font-bold mt-1">30% OFF</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'wishlist':
                return (
                    <div className="animate-fadeIn">
                        <h2 className="text-xl font-bold mb-6 border-b pb-2">My Wishlist <span className="text-gray-400 text-base font-normal">({wishlist.length} items)</span></h2>
                        {wishlist.length === 0 ? (
                            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                                <p className="text-gray-500 text-lg mb-6">Your wishlist is empty</p>
                                <Link href="/#products" className="text-blue-600 font-bold hover:underline">
                                    Continue Shopping
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {wishlist.map((product) => (
                                    <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-300 relative">
                                        <button
                                            onClick={() => removeFromWishlist(product.id)}
                                            className="absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 z-10"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                        <div className="relative h-64 bg-gray-100">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
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
                                                    className="w-full bg-black text-white py-2 rounded text-sm font-bold uppercase tracking-wide hover:bg-gray-800"
                                                >
                                                    Move to Bag
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-sm mb-1 truncate">{product.name}</h3>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-sm">{product.price}</span>
                                                <span className="text-xs text-[#dcb100] font-bold">(30% OFF)</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            case 'addresses':
                return (
                    <div className="animate-fadeIn">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Saved Addresses</h2>
                            <button className="border border-gray-300 rounded px-4 py-2 text-sm font-bold uppercase text-blue-600 hover:bg-blue-50 transition-colors">
                                + Add New Address
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border rounded-lg p-6 relative hover:shadow-md transition-shadow">
                                <div className="absolute top-4 right-4">
                                    <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Default</span>
                                </div>
                                <h3 className="font-bold text-sm mb-2">John Doe</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    123, Upfront Tech Park, Whitefield,<br />
                                    Bengaluru, Karnataka - 560066
                                </p>
                                <p className="text-sm text-gray-600 mb-4">Mobile: <strong>+91 9876543210</strong></p>
                                <div className="flex gap-4 border-t pt-4">
                                    <button className="text-sm font-bold text-blue-600 uppercase">Edit</button>
                                    <button className="text-sm font-bold text-gray-400 uppercase hover:text-red-500">Remove</button>
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
        { id: 'overview', label: 'Overview', section: 'Account' },
        { id: 'profile', label: 'Profile Details', section: 'Account' },
        { id: 'orders', label: 'Orders & Returns', section: 'Orders' },
        { id: 'wishlist', label: 'Wishlist', section: 'Orders' },
        { id: 'credits', label: 'Upfront Credit', section: 'Credits' },
        { id: 'coupons', label: 'Coupons', section: 'Credits' },
        { id: 'cards', label: 'Saved Cards', section: 'Payment' },
        { id: 'addresses', label: 'Addresses', section: 'Account' },
        { id: 'settings', label: 'Settings', section: 'Account' },
    ];

    // Group menu items by section logic (simplified for render)
    // Actually let's just render a flat clean list with headers

    return (
        <div className="min-h-screen bg-white pt-10 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Profile Header Block */}
                <div className="bg-white mb-8 border-b pb-8">
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-2xl font-bold mb-1">Account</h1>
                            <p className="text-sm text-gray-500">John Doe</p>
                        </div>
                        <Link href="/" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Back to Home
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0 border-r pr-8">
                        <nav className="space-y-1">
                            {['overview', 'orders', 'wishlist', 'profile', 'addresses'].map(id => {
                                const item = menuItems.find(x => x.id === id);
                                if (!item) return null;
                                return (
                                    <button
                                        key={id}
                                        onClick={() => setActiveTab(id)}
                                        className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors border-l-4 ${activeTab === id
                                            ? 'border-[#ff3f6c] text-black bg-pink-50/50'
                                            : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-black'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                )
                            })}
                            <div className="my-4 border-t border-gray-100"></div>
                            <button className="w-full text-left px-4 py-3 text-sm font-medium text-gray-600 hover:text-red-500 hover:bg-red-50 border-l-4 border-transparent">
                                Logout
                            </button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-h-[600px]">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}
