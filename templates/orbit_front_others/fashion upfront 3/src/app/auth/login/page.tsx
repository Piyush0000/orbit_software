'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login delay
        setTimeout(() => {
            setIsLoading(false);
            router.push('/profile');
        }, 1000);
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left Side - Image/Brand */}
            <div className="hidden md:block relative bg-[#0B0B0B]">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&h=1600&fit=crop" // Fashion image
                    alt="Fashion Editorial"
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute bottom-10 left-10 z-20 text-[var(--text-primary)]">
                    <h2 className="text-5xl font-heading font-bold mb-2 tracking-tight">UPFRONT.</h2>
                    <p className="text-lg font-light tracking-wide text-[var(--text-secondary)]">Redefining modern fashion.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-8 bg-[var(--page-bg)] text-[var(--text-primary)]">
                <div className="w-full max-w-md space-y-10">
                    <div className="text-center">
                        <h1 className="text-4xl font-heading font-medium tracking-tight">Welcome Back</h1>
                        <p className="mt-2 text-[var(--text-secondary)] text-sm tracking-wide">Sign in to your account</p>
                    </div>

                    <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-[0.15em] mb-2">
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
                                    className="block w-full px-0 py-3 bg-transparent border-b border-[var(--card-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-color)] transition-colors text-sm"
                                    placeholder="name@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-[0.15em] mb-2">
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
                                    className="block w-full px-0 py-3 bg-transparent border-b border-[var(--card-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-color)] transition-colors text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-[var(--accent-color)] bg-transparent border-[var(--text-secondary)] rounded focus:ring-[var(--accent-color)]"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-xs text-[var(--text-secondary)] tracking-wide">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-xs">
                                <a href="#" className="font-bold text-[var(--text-primary)] hover:text-[var(--accent-color)] tracking-wide transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-4 px-4 border border-[var(--accent-color)] rounded-none text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent-color)] hover:bg-[var(--accent-color)] hover:text-black transition-all duration-300"
                            >
                                {isLoading ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : null}
                                {isLoading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center text-xs tracking-wide">
                        <span className="text-[var(--text-secondary)]">Don&apos;t have an account? </span>
                        <Link href="/auth/register" className="font-bold text-[var(--text-primary)] hover:text-[var(--accent-color)] uppercase ml-1 transition-colors">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
