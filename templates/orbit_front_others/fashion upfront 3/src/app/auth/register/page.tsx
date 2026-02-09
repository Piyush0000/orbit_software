'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate register delay
        setTimeout(() => {
            setIsLoading(false);
            router.push('/profile');
        }, 1000);
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left Side - Form */}
            <div className="flex items-center justify-center p-8 bg-[var(--page-bg)] text-[var(--text-primary)] order-2 md:order-1">
                <div className="w-full max-w-md space-y-10">
                    <div className="text-center">
                        <h1 className="text-4xl font-heading font-medium tracking-tight">Create Account</h1>
                        <p className="mt-2 text-[var(--text-secondary)] text-sm tracking-wide">Join the UPFRONT community</p>
                    </div>

                    <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-[0.15em] mb-2">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full px-0 py-3 bg-transparent border-b border-[var(--card-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-color)] transition-colors text-sm"
                                    placeholder="John Doe"
                                />
                            </div>

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
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full px-0 py-3 bg-transparent border-b border-[var(--card-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-color)] transition-colors text-sm"
                                    placeholder="Create a password"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-[0.15em] mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="block w-full px-0 py-3 bg-transparent border-b border-[var(--card-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-color)] transition-colors text-sm"
                                    placeholder="Confirm your password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 text-[var(--accent-color)] bg-transparent border-[var(--text-secondary)] rounded focus:ring-[var(--accent-color)]"
                            />
                            <label htmlFor="terms" className="ml-2 block text-xs text-[var(--text-secondary)] tracking-wide">
                                I agree to the <a href="#" className="underline hover:text-[var(--text-primary)]">Terms</a> and <a href="#" className="underline hover:text-[var(--text-primary)]">Privacy Policy</a>
                            </label>
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
                                {isLoading ? 'Creating account...' : 'Create Account'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center text-xs tracking-wide">
                        <span className="text-[var(--text-secondary)]">Already have an account? </span>
                        <Link href="/auth/login" className="font-bold text-[var(--text-primary)] hover:text-[var(--accent-color)] uppercase ml-1 transition-colors">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Side - Image/Brand */}
            <div className="hidden md:block relative bg-[#0B0B0B] order-1 md:order-2">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=1600&fit=crop" // Another fashion image
                    alt="Fashion Lifestyle"
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute bottom-10 right-10 z-20 text-[var(--text-primary)] text-right">
                    <h2 className="text-5xl font-heading font-bold mb-2 tracking-tight">JOIN US.</h2>
                    <p className="text-lg font-light tracking-wide text-[var(--text-secondary)]">Experience exclusive collections.</p>
                </div>
            </div>
        </div>
    );
}
