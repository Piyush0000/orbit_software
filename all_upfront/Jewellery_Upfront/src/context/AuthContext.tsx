"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    pincode?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string) => void;
    signup: (userData: User) => void;
    logout: () => void;
    updateProfile: (updatedData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    // Load user from local storage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('lumiere_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // Init with default user for demo if needed, or null
            // setUser({ firstName: 'Shreya', lastName: 'Chauhan', email: 'shreya@example.com', phone: '+91 98765 43210', address: '123, Park Avenue', city: 'Bangalore', pincode: '560038' });
        }
    }, []);

    const login = (email: string) => {
        // Mock login - usually would verify credentials
        const mockUser: User = {
            firstName: 'Shreya',
            lastName: 'Chauhan',
            email: email,
            phone: '+91 98765 43210',
            address: '123, Park Avenue',
            city: 'Bangalore',
            pincode: '560038'
        };
        setUser(mockUser);
        localStorage.setItem('lumiere_user', JSON.stringify(mockUser));
        router.push('/account');
    };

    const signup = (userData: User) => {
        setUser(userData);
        localStorage.setItem('lumiere_user', JSON.stringify(userData));
        router.push('/account');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('lumiere_user');
        router.push('/login');
    };

    const updateProfile = (updatedData: Partial<User>) => {
        if (user) {
            const newUser = { ...user, ...updatedData };
            setUser(newUser);
            localStorage.setItem('lumiere_user', JSON.stringify(newUser));
            alert("Profile updated successfully!");
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            login,
            signup,
            logout,
            updateProfile
        }}>
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
