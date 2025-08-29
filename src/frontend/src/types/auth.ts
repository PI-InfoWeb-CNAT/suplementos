export interface User {
    nome: string;   
    email: string;
    perfil: string;
};

export interface AuthContextType {
    isLogged: boolean;
    isLoggingOut: boolean;
    user: User | null;
    login: (userData: User) => void;
    logout: (showMessage?: boolean) => void;
    loading: boolean;
};
