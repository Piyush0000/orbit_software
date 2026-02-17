'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login
        window.location.href = '/profile';
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--page-bg)' }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(0,240,255,0.1),_transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(189,0,255,0.1),_transparent_50%)]"></div>

            <div className="glass p-10 rounded-2xl border border-white/10 w-full max-w-md relative z-10 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-white font-heading tracking-tight mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to access your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-[var(--accent-blue)] uppercase mb-2 tracking-wider">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)] outline-none transition-all placeholder-gray-600"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-bold text-[var(--accent-blue)] uppercase tracking-wider">Password</label>
                            <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">Forgot Password?</a>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)] outline-none transition-all placeholder-gray-600"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[var(--accent-blue)] text-black font-bold py-3 rounded-lg hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all transform hover:-translate-y-1 uppercase tracking-wide"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-8 text-center text-gray-400 text-sm">
                    Don't have an account?
                    <Link href="/auth/register" className="text-[var(--accent-purple)] font-bold hover:text-white transition-colors ml-2">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}
