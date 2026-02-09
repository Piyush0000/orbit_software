'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/authStore';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const login = useAuth((state) => state.login);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login delay
        setTimeout(() => {
            login(email);
            setIsLoading(false);
            router.push('/');
        }, 1000);
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
            {/* Left Side - Image/Brand */}
            <div className="hidden md:relative md:flex items-center justify-center bg-yellow-50 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                <div className="relative z-10 text-white p-12 text-center">
                    <h1 className="text-5xl font-extrabold font-display mb-4 drop-shadow-md">Welcome Back!</h1>
                    <p className="text-xl font-medium drop-shadow-sm">Ready for more fun and games?</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-8 lg:p-12">
                <div className="w-full max-w-md space-y-8">
                    <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Store
                    </Link>

                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 font-display">Sign In</h2>
                        <p className="mt-2 text-gray-600">Access your wishlist and orders</p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    placeholder="parent@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-primary/20 text-sm font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all transform hover:-translate-y-0.5"
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-500">New to ToyStore? </span>
                        <Link href="/auth/register" className="font-bold text-primary hover:text-primary/80 transition-colors">
                            Create an account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
