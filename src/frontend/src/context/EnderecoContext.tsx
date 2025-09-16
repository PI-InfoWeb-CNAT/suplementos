'use client';

import { createContext, useContext, useState, useEffect } from "react";
import { EnderecoContextType, EnderecoProps } from "@/types/endereco";
import api from "@/services/api";
import { useAuth } from "./AuthContext";

const EnderecoContext = createContext<EnderecoContextType | null>(null);

export const EnderecoProvider = ({ children }: { children: React.ReactNode }) => {
    const [enderecos, setEnderecos] = useState<EnderecoProps[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const getEnderecos = async () => {
        setLoading(true);
        try {
            const response = await api.get("/enderecos/");
            setEnderecos(response.data);
        } catch (error) {
            console.error("Erro ao buscar endereços:", error);
        } finally {
            setLoading(false);
        }
    }

    const addEndereco = (endereco: EnderecoProps) => {
        setEnderecos(prev => [...prev, endereco]);
    }

    const updateEndereco = (endereco: EnderecoProps) => {
        setEnderecos(prev => prev.map(e => e.id === endereco.id ? endereco : e));
    }

    const deleteEndereco = (id: number) => {
        setEnderecos(prev => prev.filter(e => e.id !== id));
    }

    useEffect(() => {
        if (user) {
            getEnderecos();
        }
    }, [user]);

    return (
        <EnderecoContext.Provider value={{ enderecos, loading, getEnderecos, addEndereco, updateEndereco, deleteEndereco }}>
            {children}
        </EnderecoContext.Provider>
    )
}

export const useEnderecos = () => {
    const ctx = useContext(EnderecoContext);
    if (!ctx) throw new Error("useEnderecos deve ser usado dentro de EnderecoProvider");
    return ctx;
};