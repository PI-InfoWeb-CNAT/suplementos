import { ProductProps } from './products';
import { EnderecoProps } from './endereco';
import { CartaoProps } from './cartao';
import { DevolucaoProps } from './devolucao';

export type PedidoStatusType = '1' | '2' | '3' | '4' | '5';
export const PEDIDO_STATUS_MAP: Record<PedidoStatusType, string> = {
    '1': 'Processando',
    '2': 'Enviado',
    '3': 'Entregue',
    '4': 'Finalizado',
    '5': 'Cancelado',
};

export interface PedidoProps {
    id: number;
    user_nome: string;
    endereco: EnderecoProps | null;
    cartao: CartaoProps | null;
    total: number;
    status: PedidoStatusType;
    dt_hora: string;
    itens: PedidoItemProps[];
    devolucao: DevolucaoProps | null;
}

export interface PedidoItemProps {
    id: number;
    produto: ProductProps;
    quantidade: number;
    preco: number;
    imagem: string | null;
    subtotal: number;
}

export interface PedidoFormData {
    endereco: string;
    cartao: string;
}

export interface CancelarPedidoProps {
    pedidoId?: number;
    onCancelSuccess: (pedidoId: number) => void;
}