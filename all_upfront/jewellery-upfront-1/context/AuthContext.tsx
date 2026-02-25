"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user session", e);
                localStorage.removeItem("user");
            }
        }
        setIsLoading(false);
    }, []);

    const login = (email: string) => {
        // Mock login - strictly local
        const mockUser: User = {
            id: "user-123",
            name: "Priya Sharma", // Consistent with the mock UI
            email: email,
            phone: "+91 98765 43210"
        };
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        router.push("/account");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        router.push("/account"); // Redirect to login screen (which lives at /account when logged out)
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
