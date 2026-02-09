'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/authStore';
import { ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const register = useAuth((state) => state.register);

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
            register(formData.name, formData.email);
            setIsLoading(false);
            router.push('/');
        }, 1000);
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
            {/* Left Side - Image/Brand */}
            <div className="hidden md:relative md:flex items-center justify-center bg-blue-50 overflow-hidden order-2">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent" />
                <div className="relative z-10 text-white p-12 text-center">
                    <h1 className="text-5xl font-extrabold font-display mb-4 drop-shadow-md">Join the Fun!</h1>
                    <p className="text-xl font-medium drop-shadow-sm">Create an account and start exploring.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-8 lg:p-12 order-1">
                <div className="w-full max-w-md space-y-8">
                    <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Store
                    </Link>

                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 font-display">Create Account</h2>
                        <p className="mt-2 text-gray-600">Join our community of happy parents</p>
                    </div>

                    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                placeholder="John Doe"
                            />
                        </div>

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
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                placeholder="name@example.com"
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
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                placeholder="Create a password"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                placeholder="Confirm your password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-primary/20 text-sm font-bold text-white bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all transform hover:-translate-y-0.5 mt-6"
                        >
                            {isLoading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-500">Already have an account? </span>
                        <Link href="/auth/login" className="font-bold text-primary hover:text-primary/80 transition-colors">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
