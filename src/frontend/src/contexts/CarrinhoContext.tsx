'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import { CarrinhoItemProps, CarrinhoContextState, CarrinhoContextProps, CarrinhoAction } from '@/types/carrinho';
import { ProductProps } from '@/types/products';
import api from '@/services/api';

const LOCAL_CARRINHO_KEY = 'carrinhoAnonimo';

const getLocalCarrinho = (): CarrinhoItemProps[] => {
    try {
        const localData = localStorage.getItem(LOCAL_CARRINHO_KEY);
        return localData ? JSON.parse(localData) : [];
    } catch (error) {
        return [];
    }
};
const saveLocalCarrinho = (items: CarrinhoItemProps[]) => {
    localStorage.setItem(LOCAL_CARRINHO_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('localCarrinhoUpdated'));
};

const initialState: CarrinhoContextState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    isLoading: true,
    isInitialized: false,
};

const calculateTotals = (items: CarrinhoItemProps[]) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantidade, 0);
    const totalPrice = items.reduce((sum, item) => {
        const price = item.produto?.preco || 0;
        return sum + (price * item.quantidade);
    }, 0);
    return { totalItems, totalPrice };
};

const carrinhoReducer = (state: CarrinhoContextState, action: CarrinhoAction): CarrinhoContextState => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };

        case 'SET_CARRINHO':
            const items = action.payload;
            const { totalItems, totalPrice } = calculateTotals(items);
            return {
                ...state,
                items,
                totalItems,
                totalPrice,
                isLoading: false,
                isInitialized: true,
            };

        case 'LIMPAR_CARRINHO':
            return { ...initialState, isLoading: false, isInitialized: true };

        default:
            return state;
    }
};

const CarrinhoContext = createContext<CarrinhoContextProps | undefined>(undefined);

export const CarrinhoProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(carrinhoReducer, initialState);
    const { isLogged, loading: authLoading } = useAuth();

    const tentativaMigracao = useRef(false);

    const carregarCarrinho = useCallback(async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await api.get('/carrinho/');
            dispatch({ type: 'SET_CARRINHO', payload: response.data.carrinho.itens || [] });
        } catch (error) {
            console.error("Falha ao carregar carrinho:", error);
            dispatch({ type: 'SET_CARRINHO', payload: [] });
        }
    }, []);

    // Efeito para carregar o carrinho inicial ou quando o login muda
    useEffect(() => {
        if (authLoading) {
            return; // Espera a autenticação resolver
        }

        const runStartup = async () => {
            if (isLogged) {
                // --- Usuário está LOGADO ---
                dispatch({ type: 'SET_LOADING', payload: true });

                const localItems = getLocalCarrinho();

                if (localItems.length > 0 && !tentativaMigracao.current) {
                    tentativaMigracao.current = true; // Marca a tentativa

                    try {
                        const payload = {
                            itens: localItems.map(item => ({
                                produto_id: item.produto.id,
                                quantidade: item.quantidade
                            }))
                        };

                        await api.post('/carrinho/migracao/', payload);
                        saveLocalCarrinho([]);

                    } catch (err) {
                        console.error("Falha ao fazer merge do carrinho:", err);
                    }
                }

                await carregarCarrinho();

            } else {
                tentativaMigracao.current = false;
                const localItems = getLocalCarrinho();

                dispatch({ type: 'SET_LOADING', payload: true });
                dispatch({ type: 'SET_CARRINHO', payload: localItems });
            }
        };

        runStartup();

    }, [authLoading, isLogged, carregarCarrinho]);

    const addItem = useCallback(async (product: ProductProps, quantity: number) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            if (isLogged) { 
                await api.post('/carrinho/', {
                    produto: product.id,
                    quantidade: quantity,
                });
                await carregarCarrinho();
            } else {
                const localItems = getLocalCarrinho();
                const itemIndex = localItems.findIndex(i => i.produto.id === product.id);
                if (itemIndex > -1) {
                    localItems[itemIndex].quantidade += quantity;
                } else {
                    localItems.push({
                        id: 0,
                        produto: product,
                        quantidade: quantity,
                        preco: product.preco,
                        imagem: product.imagem,
                        subtotal: (product.preco || 0 ) * quantity,
                    });
                }
                saveLocalCarrinho(localItems);
                dispatch({ type: 'SET_CARRINHO', payload: localItems });
            }
        } catch (error) {
            console.error("Falha ao adicionar item:", error);
            throw error;
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, [isLogged, carregarCarrinho]);

    const removeItem = useCallback(async (itemToRemove: CarrinhoItemProps) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            if (isLogged) { 
                await api.delete(`/carrinho/${itemToRemove.id}/`);
                await carregarCarrinho();
            } else {
                const localItems = getLocalCarrinho();
                const newItems = localItems.filter(i => i.produto.id !== itemToRemove.produto.id);
                saveLocalCarrinho(newItems);
                dispatch({ type: 'SET_CARRINHO', payload: newItems });
            }
        } catch (error) {
            console.error("Falha ao remover item:", error);
            throw error;
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, [isLogged, carregarCarrinho]); 

    const value = {
        ...state,
        addItem,
        removeItem,
    };

    return (
        <CarrinhoContext.Provider value={value}>
            {children}
        </CarrinhoContext.Provider>
    );
};

export const useCarrinho = () => {
    const context = useContext(CarrinhoContext);
    if (context === undefined) {
        throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
    }
    return context;
};