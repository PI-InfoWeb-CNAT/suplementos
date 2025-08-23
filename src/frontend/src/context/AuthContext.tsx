'use client';

import { useRouter } from "next/navigation";
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useMenu } from "./MenuContext";

import { notify } from '@/lib/toast';
import { User, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const { setMenuOpen } = useMenu();
    const router = useRouter();

    const getFirstName = (fullName: string) => fullName.split(" ")[0];

    useEffect(() => {
        const access = localStorage.getItem('access');
        const userData = localStorage.getItem('user');

        if (access && userData) {
            const parsed = JSON.parse(userData);
            parsed.nome = getFirstName(parsed.nome);
            setUser(parsed);
        }
    }, []);

    const login = (userData: User) => {
        userData.nome = getFirstName(userData.nome);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        notify("Você saiu da sua conta com sucesso.", "success");
        setTimeout(() => {
            router.push('/');
            setMenuOpen(false);
        }, 1000)
    };

    return (
        <AuthContext.Provider value={{ isLogged: !!user, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};