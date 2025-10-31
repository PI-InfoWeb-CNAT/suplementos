import { ProductProps } from './products';
import { EnderecoProps } from './endereco';
import { CartaoProps } from './cartao';

export type PedidoStatusType = '1' | '2' | '3' | '4';
export const PEDIDO_STATUS_MAP: Record<PedidoStatusType, string> = {
    '1': 'Processando',
    '2': 'Enviado',
    '3': 'Entregue',
    '4': 'Recebido',
};

export interface PedidoProps {
    id: number;
    endereco: EnderecoProps | null; 
    cartao: CartaoProps | null;     
    total: number;        
    status: PedidoStatusType; 
    dt_hora: string;     
    itens: PedidoItemProps[]; 
}

export interface PedidoItemProps {
    id: number;
    produto: ProductProps; 
    quantidade: number;
    preco: number; 
    imagem: string | null;
    total: number; 
}

export interface PedidoFormData {
    endereco: string; 
    cartao: string;   
}