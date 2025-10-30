import { ProductProps } from "./products";

export interface CarrinhoItemProps {
    id: number;               
    produto: ProductProps;    
    quantidade: number;
    preco: number;          
    imagem: string | null;
    subtotal: number;
}

export interface CarrinhoContextState {
    items: CarrinhoItemProps[];
    totalItems: number;
    totalPrice: number;
    isLoading: boolean;
    isInitialized: boolean;
}

export interface CarrinhoContextProps extends CarrinhoContextState {
    addItem: (product: ProductProps, quantity: number) => Promise<void>;
    removeItem: (item: CarrinhoItemProps) => Promise<void>;
    updateQuantidade: (item: CarrinhoItemProps, novaQuantidade: number) => Promise<void>;
    limparCarrinho?: () => void;
}

export type CarrinhoAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_CARRINHO'; payload: CarrinhoItemProps[] }
    | { type: 'LIMPAR_CARRINHO' };