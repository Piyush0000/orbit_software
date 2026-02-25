'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfileDropdown() {
    const router = useRouter();

    const handleLogout = () => {
        router.push('/auth/login');
    };

    return (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-lg shadow-xl py-2 z-50 animate-fadeIn glass-panel" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)' }}>
            <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--header-border)' }}>
                <p className="text-sm font-bold leading-none" style={{ color: 'var(--text-highlight)' }}>Hello, John Doe</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>john.doe@example.com</p>
            </div>

            <div className="py-2">
                <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm hover:bg-white/10 transition-colors flex items-center gap-3"
                    style={{ color: 'var(--text)' }}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    Orders
                </Link>
                <Link
                    href="/profile?tab=wishlist"
                    className="block px-4 py-2 text-sm hover:bg-white/10 transition-colors flex items-center gap-3"
                    style={{ color: 'var(--text)' }}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    Wishlist
                </Link>
                <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm hover:bg-white/10 transition-colors flex items-center gap-3"
                    style={{ color: 'var(--text)' }}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Upfront Credit <span className="text-[10px] font-bold text-white bg-pink-500 px-1.5 rounded ml-auto">NEW</span>
                </Link>
            </div>

            <div className="py-2" style={{ borderTop: '1px solid var(--header-border)' }}>
                <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                    style={{ color: 'var(--text)' }}
                >
                    Saved Cards
                </Link>
                <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                    style={{ color: 'var(--text)' }}
                >
                    Saved Addresses
                </Link>
            </div>

            <div className="pt-2" style={{ borderTop: '1px solid var(--header-border)' }}>
                <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors font-medium"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
