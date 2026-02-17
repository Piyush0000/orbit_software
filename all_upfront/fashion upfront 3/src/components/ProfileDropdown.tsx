'use client';

import Link from 'next/link';

export default function ProfileDropdown() {
    return (
        <div className="absolute right-0 top-full mt-2 w-64 bg-[var(--card-bg)] rounded-none shadow-2xl border border-[var(--card-border)] py-2 z-50 animate-fadeIn text-[var(--text-primary)]">
            <div className="px-4 py-3 border-b border-[var(--card-border)]">
                <p className="text-sm font-bold text-[var(--text-primary)] leading-none uppercase tracking-wide">Hello, John Doe</p>
                <p className="text-xs text-[var(--text-secondary)] mt-1 font-light">john.doe@example.com</p>
            </div>

            <div className="py-2">
                <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--header-bg)] hover:text-[var(--accent-color)] transition-colors flex items-center gap-3 uppercase tracking-wider font-medium"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    Orders
                </Link>
                <Link
                    href="/wishlist"
                    className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--header-bg)] hover:text-[var(--accent-color)] transition-colors flex items-center gap-3 uppercase tracking-wider font-medium"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    Wishlist
                </Link>
                <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--header-bg)] hover:text-[var(--accent-color)] transition-colors flex items-center gap-3 uppercase tracking-wider font-medium"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Myntra Credit <span className="text-[9px] font-bold text-black bg-[var(--accent-color)] px-1.5 py-0.5 rounded-sm ml-auto tracking-widest">NEW</span>
                </Link>
            </div>

            <div className="border-t border-[var(--card-border)] py-2">
                <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--header-bg)] hover:text-[var(--accent-color)] transition-colors uppercase tracking-wider font-medium"
                >
                    Saved Cards
                </Link>
                <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--header-bg)] hover:text-[var(--accent-color)] transition-colors uppercase tracking-wider font-medium"
                >
                    Saved Addresses
                </Link>
            </div>

            <div className="border-t border-[var(--card-border)] pt-2">
                <button className="w-full text-left px-4 py-2 text-sm text-[var(--text-muted)] hover:text-red-500 hover:bg-[var(--header-bg)] transition-colors font-bold uppercase tracking-wider">
                    Logout
                </button>
            </div>
        </div>
    );
}
