'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const router = useRouter();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate registration
        console.log('Registering with:', formData);
        // In a real app, you'd validate and create account here.
        router.push('/profile');
    };

    return (
        <div className="min-h-screen flex flex-col transition-colors duration-300" style={{ backgroundColor: 'var(--page-bg)' }}>
            <Header />
            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--page-bg)' }}>
                <div className="max-w-md w-full space-y-8 p-8 rounded-xl glass-panel tech-border" style={{ backgroundColor: 'var(--card-bg)' }}>
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold" style={{ color: 'var(--text-highlight)' }}>
                            Create your account
                        </h2>
                        <p className="mt-2 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                            Already have an account?{' '}
                            <Link href="/auth/login" className="font-medium hover:underline" style={{ color: 'var(--accent-cyan)' }}>
                                Sign in
                            </Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                        <div className="rounded-md space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                                        First Name
                                    </label>
                                    <input
                                        id="first-name"
                                        name="firstName"
                                        type="text"
                                        required
                                        className="appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                                        style={{
                                            backgroundColor: 'var(--page-bg)',
                                            borderColor: 'var(--card-border)',
                                            color: 'var(--text)',
                                        }}
                                        placeholder="John"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                                        Last Name
                                    </label>
                                    <input
                                        id="last-name"
                                        name="lastName"
                                        type="text"
                                        required
                                        className="appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                                        style={{
                                            backgroundColor: 'var(--page-bg)',
                                            borderColor: 'var(--card-border)',
                                            color: 'var(--text)',
                                        }}
                                        placeholder="Doe"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    />
                                </div>
                            </div>
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
                                    placeholder="john.doe@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                                    style={{
                                        backgroundColor: 'var(--page-bg)',
                                        borderColor: 'var(--card-border)',
                                        color: 'var(--text)',
                                    }}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                                    Confirm Password
                                </label>
                                <input
                                    id="confirm-password"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
                                    style={{
                                        backgroundColor: 'var(--page-bg)',
                                        borderColor: 'var(--card-border)',
                                        color: 'var(--text)',
                                    }}
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                />
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
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
