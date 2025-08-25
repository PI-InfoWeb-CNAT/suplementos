export interface User {
    nome: string;   
    email: string;
    perfil: string;
};

export interface AuthContextType {
    isLogged: boolean;
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    loading: boolean;
};
