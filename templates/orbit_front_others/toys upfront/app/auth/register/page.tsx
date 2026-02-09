'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        register(name, email);
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-pink-50/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row-reverse">
                {/* Right Side - Image/Brand */}
                <div className="w-full md:w-1/2 bg-secondary/10 p-12 flex flex-col justify-center items-center text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <span className="text-6xl mb-6 block">🚀</span>
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 font-display">Join the Fun!</h2>
                        <p className="text-gray-600 mb-8">
                            Create an account to unlock exclusive member deals, early access to new toys, and more.
                        </p>
                    </div>
                </div>

                {/* Left Side - Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 font-display">Create Account</h1>
                        <p className="text-gray-500 text-sm mt-2">It's free and takes less than a minute</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-gray-50 focus:bg-white"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-gray-50 focus:bg-white"
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
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all bg-gray-50 focus:bg-white"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-secondary/25"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500 text-sm">
                            Already have an account?{' '}
                            <Link href="/auth/login" className="text-primary font-bold hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
