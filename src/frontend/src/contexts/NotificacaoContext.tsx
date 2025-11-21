'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { NotificacaoContextData } from '@/types/notificacao';
import api from '@/services/api';

const NotificacaoContext = createContext({} as NotificacaoContextData);

export function NotificacaoProvider({ children }: { children: ReactNode }) {
    const [count, setCount] = useState(0);
    const { isLogged } = useAuth();

    const atualizarContador = async () => {
        if (!isLogged) return;
        try {
            const response = await api.get('/notificacoes/nao_lidas_count/');
            setCount(response.data.count);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        atualizarContador();
        
        const interval = setInterval(atualizarContador, 60000);
        return () => clearInterval(interval);
    }, [isLogged]);

    return (
        <NotificacaoContext.Provider value={{ count, atualizarContador }}>
            {children}
        </NotificacaoContext.Provider>
    );
}

export const useNotificacao = () => useContext(NotificacaoContext);