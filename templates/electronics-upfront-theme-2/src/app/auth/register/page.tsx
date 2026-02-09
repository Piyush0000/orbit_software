'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock register
        window.location.href = '/profile';
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--page-bg)' }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,255,148,0.1),_transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(189,0,255,0.1),_transparent_50%)]"></div>

            <div className="glass p-10 rounded-2xl border border-white/10 w-full max-w-md relative z-10 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-white font-heading tracking-tight mb-2">Create Account</h1>
                    <p className="text-gray-400">Join the future of technology</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-[var(--accent-green)] uppercase mb-2 tracking-wider">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[var(--accent-green)] focus:ring-1 focus:ring-[var(--accent-green)] outline-none transition-all placeholder-gray-600"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-[var(--accent-green)] uppercase mb-2 tracking-wider">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[var(--accent-green)] focus:ring-1 focus:ring-[var(--accent-green)] outline-none transition-all placeholder-gray-600"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-[var(--accent-green)] uppercase mb-2 tracking-wider">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[var(--accent-green)] focus:ring-1 focus:ring-[var(--accent-green)] outline-none transition-all placeholder-gray-600"
                            placeholder="Create a password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[var(--accent-green)] text-black font-bold py-3 rounded-lg hover:bg-white hover:shadow-[0_0_20px_rgba(0,255,148,0.4)] transition-all transform hover:-translate-y-1 uppercase tracking-wide"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-8 text-center text-gray-400 text-sm">
                    Already have an account?
                    <Link href="/auth/login" className="text-[var(--accent-purple)] font-bold hover:text-white transition-colors ml-2">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}
