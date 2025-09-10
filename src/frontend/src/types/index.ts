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