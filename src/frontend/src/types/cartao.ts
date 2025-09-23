export interface CartaoProps {
    id: number;
    apelido: string;
    titular: string;
    numero: string;
    bandeira: string;
    tipo: string;
}

export interface CartaoCardProps {
    cartao: CartaoProps;
}

export interface CartaoContextType {
    cartoes: CartaoProps[];
    loading: boolean;
    getCartoes: () => Promise<void>;
    addCartao: (cartao: CartaoProps) => void;
    updateCartao: (cartao: CartaoProps) => void;
    deleteCartao: (id: number) => void;
};