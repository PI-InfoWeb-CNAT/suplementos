import { CarrinhoItemProps } from "./carrinho";
export * from './pedido';

export interface IconProps {
    icon: React.ReactNode;
    href?: string;
}

export interface NavLinkProps {
    href?: string;
    icon: React.ReactNode;
    name: string;
}

export interface CardLinkProps {
    href: string;
    icon: React.ReactNode;
    text: string;
}

export interface CategoryProps extends NavLinkProps {
    isEven?: boolean;
}

export interface MenuContextType {
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
}

export interface LoadingSpinnerProps {
    size?: number;
    color?: string;
}

export interface ItemCardProps {
    item: CarrinhoItemProps;
    pageName: string;
    statusPedido?: string;
}

export interface Lote {
    id: number;
    produto_nome: string;
    validade: string;
    quantidade: number;
}

export interface DashboardData {
    resumo: {
        total_vencidos: number;
        total_proximos: number;
    };
    vencidos: Lote[];
    proximos_vencimento: Lote[];
}

export interface LotesVencidosProps {
    dados: Lote[];
    total: number;
    onRefresh?: () => void;
}

export interface LotesProximosProps {
    dados: Lote[];
    total: number;
}