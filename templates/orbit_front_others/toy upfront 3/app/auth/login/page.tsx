'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(email);
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-amber-50/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">
                {/* Left Side - Image/Brand */}
                <div className="w-full md:w-1/2 bg-primary/10 p-12 flex flex-col justify-center items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
                    <div className="relative z-10">
                        <span className="text-6xl mb-6 block">🧸</span>
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 font-display">Welcome Back!</h2>
                        <p className="text-gray-600 mb-8">
                            Sign in to access your wishlist, track orders, and get personalized toy recommendations.
                        </p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 font-display">Sign In</h1>
                        <p className="text-gray-500 text-sm mt-2">Enter your details to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white"
                                placeholder="parent@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/25"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500 text-sm">
                            Don't have an account?{' '}
                            <Link href="/auth/register" className="text-secondary font-bold hover:underline">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
