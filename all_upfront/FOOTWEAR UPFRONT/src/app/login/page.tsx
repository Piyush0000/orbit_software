'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import styles from './login.module.css';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const { login } = useAuth();
    const router = useRouter();

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call and login
        login();
        router.push('/profile');
    };

    return (
        <div className={styles.container}>
            <div className={styles.authCard}>
                <h1 className={styles.title}>{isLogin ? 'Welcome Back' : 'Join Upfront'}</h1>
                <p className={styles.subtitle}>
                    {isLogin ? 'Login to access your profile' : 'Create an account to start shopping'}
                </p>

                <form className={styles.form} onSubmit={handleAuth}>
                    {!isLogin && (
                        <div className={styles.inputGroup}>
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" placeholder="John Doe" className={styles.input} required={!isLogin} />
                        </div>
                    )}

                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" placeholder="you@example.com" className={styles.input} required />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="••••••••" className={styles.input} required />
                    </div>

                    <Button variant="primary" size="lg" className={styles.submitBtn} type="submit">
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </Button>
                </form>

                <div className={styles.footer}>
                    <p>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button className={styles.toggleBtn} onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Register' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
