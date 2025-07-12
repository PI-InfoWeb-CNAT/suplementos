export const pageList: Record<string, string> = {
    '/promocoes': 'Promoções',
    '/categorias/acessorios': 'Acessórios',
    '/categorias/alimentos': 'Alimentos',
    '/categorias/roupas': 'Roupas',
    '/categorias/suplementos': 'Suplementos',
    '/perfil': 'Meu Perfil',
}

export interface IconProps {
    icon: React.ReactNode;
    href: string;
}

export interface NavLinkProps extends IconProps {
    name: string;
}

export interface CategoryProps extends NavLinkProps {
    isEven: boolean;
}

export interface MenuContextType {
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
}

export interface LoadingSpinnerProps {
    size?: number;
    color?: string;
}