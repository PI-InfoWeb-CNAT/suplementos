import { ProductProps } from "./products";

export interface CarrinhoItemProps {
    id: number;               
    produto: ProductProps;    
    quantidade: number;
    preco: number;          
    imagem: string | null;
    subtotal: number;
}