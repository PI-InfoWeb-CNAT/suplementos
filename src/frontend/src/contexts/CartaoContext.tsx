'use client';

import { createContext, useContext, useState, useEffect } from "react";
import { CartaoContextType, CartaoProps } from "@/types/cartao";
import api from "@/services/api";
import { useAuth } from "./AuthContext";

const CartaoContext = createContext<CartaoContextType | null>(null);

export const CartaoProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartoes, setCartoes] = useState<CartaoProps[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const getCartoes = async () => {
        setLoading(true);
        try {
            const response = await api.get("/cartoes/");
            setCartoes(response.data);
        } catch (error) {
            console.error("Erro ao buscar endereços:", error);
        } finally {
            setLoading(false);
        }
    }

    const addCartao = (cartao: CartaoProps) => {
        setCartoes(prev => [...prev, cartao]);
    }

    const updateCartao = (cartao: CartaoProps) => {
        setCartoes(prev => prev.map(e => e.id === cartao.id ? cartao : e));
    }

    const deleteCartao = (id: number) => {
        setCartoes(prev => prev.filter(e => e.id !== id));
    }

    useEffect(() => {
        if (user) {
            getCartoes();
        }
    }, [user]);

    return (
        <CartaoContext.Provider value={{ cartoes, loading, getCartoes, addCartao, updateCartao, deleteCartao }}>
            {children}
        </CartaoContext.Provider>
    )
}

export const useCartoes = () => {
    const ctx = useContext(CartaoContext);
    if (!ctx) throw new Error("useCartoes deve ser usado dentro de CartaoProvider");
    return ctx;
};