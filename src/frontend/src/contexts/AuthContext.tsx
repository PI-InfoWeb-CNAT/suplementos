'use client';

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useMenu } from "./MenuContext";

import { notify } from '@/lib/toast';
import { User, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const router = useRouter();
    const { setMenuOpen } = useMenu();

    useEffect(() => {
        const access = localStorage.getItem('access');
        const userData = localStorage.getItem('user');

        if (access && userData) {
            const parsed = JSON.parse(userData);
            setUser(parsed);
        }
        setLoading(false);
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = (showMessage = true) => {
        setIsLoggingOut(true);
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');

        if (showMessage) {
            notify("Você saiu da sua conta com sucesso.", "success");
        }

        setMenuOpen(false);
        router.replace('/'); 
    };

    return (
        <AuthContext.Provider value={{ isLogged: !!user, user, setUser, login, logout, loading, isLoggingOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};