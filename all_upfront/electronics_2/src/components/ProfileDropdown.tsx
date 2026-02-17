'use client';

import Link from 'next/link';

export default function ProfileDropdown() {
    return (
        <div className="absolute right-0 top-full mt-4 w-72 glass rounded-xl border border-white/10 p-2 z-50 animate-fadeIn shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <div className="px-4 py-4 border-b border-white/10 mb-2">
                <p className="text-sm font-bold text-white leading-none">Hello, John Doe</p>
                <p className="text-xs text-gray-400 mt-1">john.doe@example.com</p>
            </div>

            <div className="space-y-1">
                <Link
                    href="/profile?tab=orders"
                    className="block px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-[var(--accent-blue)] transition-all rounded-lg flex items-center gap-3 group"
                >
                    <svg className="w-4 h-4 group-hover:drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    Orders
                </Link>
                <Link
                    href="/profile?tab=wishlist"
                    className="block px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-[var(--accent-purple)] transition-all rounded-lg flex items-center gap-3 group"
                >
                    <svg className="w-4 h-4 group-hover:drop-shadow-[0_0_5px_rgba(189,0,255,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    Wishlist
                </Link>
                <Link
                    href="/profile"
                    className="block px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-[var(--accent-green)] transition-all rounded-lg flex items-center gap-3 group"
                >
                    <svg className="w-4 h-4 group-hover:drop-shadow-[0_0_5px_rgba(0,255,148,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Credits <span className="text-[9px] font-bold text-black bg-[var(--accent-green)] px-1.5 py-0.5 rounded ml-auto">NEW</span>
                </Link>
            </div>

            <div className="border-t border-white/10 my-2 pt-2 space-y-1">
                <Link
                    href="/profile?tab=addresses"
                    className="block px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors hover:pl-5"
                >
                    Saved Addresses
                </Link>
                <Link
                    href="/profile?tab=profile"
                    className="block px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors hover:pl-5"
                >
                    Edit Profile
                </Link>
            </div>

            <div className="border-t border-white/10 pt-2">
                <button
                    onClick={() => window.location.href = '/auth/login'}
                    className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all font-bold uppercase tracking-wider rounded-lg"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
