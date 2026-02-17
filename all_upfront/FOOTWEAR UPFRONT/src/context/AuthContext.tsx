'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    name: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
}

interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
    user: User | null;
    updateUser: (details: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const defaultUser: User = {
        name: 'Virat Runner',
        email: 'virat@example.com',
        phone: '+91 98765 43210',
        dob: '1995-05-15',
        gender: 'Male',
        address: {
            street: '123 Stadium Road',
            city: 'Mumbai',
            state: 'Maharashtra',
            zipCode: '400001',
            country: 'India'
        }
    };

    const login = () => {
        setIsLoggedIn(true);
        // Check for stored user data first, otherwise use default
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                setUser(defaultUser);
                localStorage.setItem('user', JSON.stringify(defaultUser));
            }
            localStorage.setItem('isLoggedIn', 'true');
        } catch (e) {
            console.error('Local storage error', e);
            setUser(defaultUser);
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        try {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('user');
        } catch (e) { console.error(e); }
        router.push('/');
    };

    const updateUser = (details: Partial<User>) => {
        if (!user) return;
        const updatedUser = { ...user, ...details };
        setUser(updatedUser);
        try {
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (e) { console.error(e); }
    };

    // Check storage on mount
    useEffect(() => {
        try {
            const storedLogin = localStorage.getItem('isLoggedIn');
            const storedUser = localStorage.getItem('user');

            if (storedLogin === 'true') {
                setIsLoggedIn(true);
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                } else {
                    setUser(defaultUser);
                }
            }
        } catch (e) { console.error(e); }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
