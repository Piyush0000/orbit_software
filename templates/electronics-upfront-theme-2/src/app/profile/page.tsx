'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useWishlist } from '@/store/wishlistStore';
import { useCart } from '@/store/cartStore';

function ProfileContent() {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState('orders');

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab && ['overview', 'orders', 'wishlist', 'profile', 'addresses'].includes(tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleLogout = () => {
        // Mock logout - in a real app this would clear auth state
        if (confirm('Are you sure you want to log out?')) {
            window.location.href = '/auth/login';
        }
    };

    const handleSaveDetails = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Profile details saved successfully!');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="space-y-6 animate-fadeIn">
                        <h2 className="text-2xl font-black mb-4 border-b border-white/10 pb-4 text-white font-heading tracking-wide">Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white/5 p-6 rounded-xl text-center cursor-pointer hover:bg-white/10 transition-all border border-white/5 hover:border-[var(--accent-blue)] hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                                <h3 className="text-4xl font-black text-[var(--accent-blue)] neon-text-blue">0</h3>
                                <p className="text-gray-400 text-sm mt-2 uppercase tracking-wider font-bold">Orders</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-xl text-center cursor-pointer hover:bg-white/10 transition-all border border-white/5 hover:border-[var(--accent-purple)] hover:shadow-[0_0_15px_rgba(189,0,255,0.2)]">
                                <h3 className="text-4xl font-black text-[var(--accent-purple)] neon-text-purple">{wishlist.length}</h3>
                                <p className="text-gray-400 text-sm mt-2 uppercase tracking-wider font-bold">Wishlist</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-xl text-center cursor-pointer hover:bg-white/10 transition-all border border-white/5 hover:border-[var(--accent-green)] hover:shadow-[0_0_15px_rgba(0,255,148,0.2)]">
                                <h3 className="text-4xl font-black text-[var(--accent-green)] neon-text-green">0</h3>
                                <p className="text-gray-400 text-sm mt-2 uppercase tracking-wider font-bold">Coupons</p>
                            </div>
                        </div>

                        <div className="bg-[var(--section-alt)] border border-white/10 rounded-xl p-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_rgba(0,240,255,0.05),_transparent_60%)]"></div>
                            <div className="relative z-10">
                                <h3 className="font-bold text-xl text-white mb-1">Complete Your Profile</h3>
                                <p className="text-gray-400 text-sm">Unlock personalized recommendations and exclusive member perks.</p>
                            </div>
                            <button onClick={() => setActiveTab('profile')} className="relative z-10 bg-white text-black px-6 py-3 rounded font-bold text-sm uppercase tracking-wide hover:bg-[var(--accent-blue)] hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                );
            case 'profile':
                return (
                    <div className="space-y-8 animate-fadeIn max-w-2xl">
                        <form onSubmit={handleSaveDetails}>
                            <h2 className="text-2xl font-black mb-6 border-b border-white/10 pb-4 text-white font-heading tracking-wide">Profile Details</h2>
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-[var(--accent-blue)] uppercase mb-2 tracking-wider">First Name</label>
                                        <input type="text" defaultValue="John" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)] outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[var(--accent-blue)] uppercase mb-2 tracking-wider">Last Name</label>
                                        <input type="text" defaultValue="Doe" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)] outline-none transition-all" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[var(--accent-blue)] uppercase mb-2 tracking-wider">Email ID</label>
                                    <input type="email" defaultValue="john.doe@example.com" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)] outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[var(--accent-blue)] uppercase mb-2 tracking-wider">Mobile Number</label>
                                    <input type="tel" defaultValue="+91 98765 43210" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)] outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[var(--accent-blue)] uppercase mb-2 tracking-wider">Gender</label>
                                    <div className="flex gap-6 mt-2">
                                        <label className="flex items-center gap-3 cursor-pointer text-gray-300 hover:text-white transition-colors">
                                            <input type="radio" name="gender" defaultChecked className="accent-[var(--accent-blue)] w-4 h-4" /> Male
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer text-gray-300 hover:text-white transition-colors">
                                            <input type="radio" name="gender" className="accent-[var(--accent-blue)] w-4 h-4" /> Female
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button className="mt-8 bg-[var(--accent-blue)] text-black px-8 py-3 rounded font-bold uppercase tracking-wider hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all w-full sm:w-auto transform hover:-translate-y-1">
                                Save Details
                            </button>
                        </form>
                    </div>
                );
            case 'orders':
                return (
                    <div className="animate-fadeIn">
                        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                            <h2 className="text-2xl font-black text-white font-heading tracking-wide">All Orders</h2>
                            <div className="relative">
                                <input type="text" placeholder="Search in orders..." className="bg-white/5 border border-white/10 rounded-full px-4 py-2 pl-10 text-sm outline-none w-64 text-white focus:border-[var(--accent-blue)] transition-colors" />
                                <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-xl border border-white/10 p-12 text-center">
                            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">No active orders properly</h3>
                            <p className="text-gray-400 mb-8 max-w-md mx-auto">There are no recent orders to show. Why not explore our new collection?</p>
                            <Link href="/#products" className="bg-[var(--accent-green)] text-black px-8 py-3 rounded font-bold uppercase tracking-wider hover:bg-white hover:shadow-[0_0_15px_rgba(0,255,148,0.4)] transition-all inline-block">Start Shopping</Link>
                        </div>

                        <div className="mt-16">
                            <h3 className="font-bold text-[var(--accent-purple)] uppercase text-xs tracking-widest mb-6">Frequently bought interactions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3].map(i => (
                                    <Link key={i} href={`/products/${i}`} className="bg-white/5 border border-white/5 rounded-lg p-4 flex gap-4 items-center hover:bg-white/10 hover:border-[var(--accent-blue)] transition-all cursor-pointer group">
                                        <div className="w-16 h-16 bg-black/50 rounded overflow-hidden">
                                            {/* Placeholder for interaction image */}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-white group-hover:text-[var(--accent-blue)] transition-colors">Recommended Item {i}</h4>
                                            <p className="text-xs text-[var(--accent-green)] font-bold mt-1">30% OFF</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'wishlist':
                return (
                    <div className="animate-fadeIn">
                        <h2 className="text-2xl font-black mb-8 border-b border-white/10 pb-4 text-white font-heading tracking-wide">My Wishlist <span className="text-[var(--accent-blue)] text-lg font-normal">({wishlist.length} items)</span></h2>
                        {wishlist.length === 0 ? (
                            <div className="bg-white/5 rounded-xl border border-white/10 p-16 text-center">
                                <p className="text-gray-400 text-xl mb-8">Your wishlist is empty</p>
                                <Link href="/#products" className="text-[var(--accent-blue)] font-bold hover:text-white transition-colors uppercase tracking-widest text-sm border-b border-[var(--accent-blue)] hover:border-white pb-1">
                                    Continue Shopping
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {wishlist.map((product) => (
                                    <div key={product.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group hover:border-[var(--accent-purple)] transition-all duration-300 relative hover:shadow-[0_0_20px_rgba(189,0,255,0.15)]">
                                        <button
                                            onClick={() => removeFromWishlist(product.id)}
                                            className="absolute top-2 right-2 w-8 h-8 bg-black/60 backdrop-blur rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 z-10 hover:bg-white transition-all"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                        <div className="relative h-64 bg-black/40">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-md p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-white/10">
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
                                                    className="w-full bg-[var(--accent-blue)] text-black py-2 rounded text-xs font-bold uppercase tracking-wide hover:bg-white transition-colors"
                                                >
                                                    Move to Bag
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-bold text-sm mb-1 truncate text-white group-hover:text-[var(--accent-purple)] transition-colors">{product.name}</h3>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-sm text-gray-300">{product.price}</span>
                                                <span className="text-xs text-[var(--accent-green)] font-bold bg-[var(--accent-green)]/10 px-2 py-0.5 rounded">30% OFF</span>
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
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-black text-white font-heading tracking-wide">Saved Addresses</h2>
                            <button className="border border-[var(--accent-blue)] rounded px-6 py-2 text-sm font-bold uppercase text-[var(--accent-blue)] hover:bg-[var(--accent-blue)] hover:text-black transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                                + Add New Address
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border border-white/10 rounded-xl p-8 relative hover:border-[var(--accent-blue)] transition-all bg-white/5 group">
                                <div className="absolute top-4 right-4">
                                    <span className="bg-[var(--accent-blue)] text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Default</span>
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-white">John Doe</h3>
                                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                                    123, Upfront Tech Park, Whitefield,<br />
                                    Bengaluru, Karnataka - 560066
                                </p>
                                <p className="text-sm text-gray-400 mb-6">Mobile: <strong className="text-white">+91 9876543210</strong></p>
                                <div className="flex gap-6 border-t border-white/10 pt-4">
                                    <button className="text-sm font-bold text-[var(--accent-blue)] uppercase hover:text-white transition-colors">Edit</button>
                                    <button className="text-sm font-bold text-gray-500 uppercase hover:text-red-500 transition-colors">Remove</button>
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
        <div className="min-h-screen pt-10 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300" style={{ backgroundColor: 'var(--page-bg)' }}>
            <div className="max-w-6xl mx-auto">

                {/* Profile Header Block */}
                <div className="mb-12 border-b border-white/10 pb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-black mb-2 text-white font-heading tracking-tight">
                                My <span className="text-[var(--accent-blue)]">Account</span>
                            </h1>
                            <p className="text-gray-400 font-medium tracking-wide">Welcome back, John Doe</p>
                        </div>
                        {/* Could add specific edit button here */}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <nav className="space-y-2 sticky top-24">
                            {['overview', 'orders', 'wishlist', 'profile', 'addresses'].map(id => {
                                const item = menuItems.find(x => x.id === id);
                                if (!item) return null;
                                return (
                                    <button
                                        key={id}
                                        onClick={() => setActiveTab(id)}
                                        className={`w-full text-left px-5 py-4 text-sm font-bold transition-all rounded-lg flex items-center justify-between group ${activeTab === id
                                            ? 'bg-[var(--accent-blue)] text-black shadow-[0_0_15px_rgba(0,240,255,0.3)] translate-x-1'
                                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        <span className="uppercase tracking-wider">{item.label}</span>
                                        {activeTab === id && (
                                            <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
                                        )}
                                    </button>
                                )
                            })}
                            <div className="my-6 border-t border-white/10"></div>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-5 py-4 text-sm font-bold text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all uppercase tracking-wider flex items-center gap-3"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                Logout
                            </button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-h-[600px] glass p-8 rounded-2xl border border-white/10">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProfilePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading Profile...</div>}>
            <ProfileContent />
        </Suspense>
    );
}
