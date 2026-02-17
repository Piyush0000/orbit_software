'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/store/authStore';
import { User, LogOut, Package, Heart } from 'lucide-react';

export default function ProfileDropdown() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    if (!user) return null;

    return (
        <div className="w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                <p className="text-sm font-bold text-gray-900 truncate">Hello, {user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>

            <div className="p-2 space-y-1">
                <Link href="/profile" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary rounded-xl transition-colors">
                    <User className="w-4 h-4" />
                    My Profile
                </Link>
                <Link href="/orders" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary rounded-xl transition-colors">
                    <Package className="w-4 h-4" />
                    My Orders
                </Link>
                <Link href="/wishlist" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary rounded-xl transition-colors">
                    <Heart className="w-4 h-4" />
                    My Wishlist
                </Link>
            </div>

            <div className="border-t border-gray-100 mt-1 p-2">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
