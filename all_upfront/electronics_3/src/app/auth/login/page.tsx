'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login
        console.log('Logging in with:', email, password);
        // In a real app, you'd validate credentials here.
        // For now, just redirect to profile.
        router.push('/profile');
    };

    return (
        <div className="min-h-screen flex flex-col transition-colors duration-300" style={{ backgroundColor: 'var(--page-bg)' }}>
            <Header />
            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--page-bg)' }}>
                <div className="max-w-md w-full space-y-8 p-8 rounded-xl glass-panel tech-border" style={{ backgroundColor: 'var(--card-bg)' }}>
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold" style={{ color: 'var(--text-highlight)' }}>
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                            Or{' '}
                            <Link href="/auth/register" className="font-medium hover:underline" style={{ color: 'var(--accent-cyan)' }}>
                                create a new account
                            </Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <div className="rounded-md space-y-4">
                            <div>
                                <label htmlFor="email-address" className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                                    style={{
                                        backgroundColor: 'var(--page-bg)',
                                        borderColor: 'var(--card-border)',
                                        color: 'var(--text)',
                                    }}
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                                    style={{
                                        backgroundColor: 'var(--page-bg)',
                                        borderColor: 'var(--card-border)',
                                        color: 'var(--text)',
                                    }}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded"
                                    style={{ accentColor: 'var(--accent-cyan)' }}
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm" style={{ color: 'var(--text)' }}>
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium hover:underline" style={{ color: 'var(--accent-cyan)' }}>
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md transition-all"
                                style={{
                                    backgroundColor: 'var(--btn-primary-bg)',
                                    color: 'var(--btn-primary-text)'
                                }}
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
