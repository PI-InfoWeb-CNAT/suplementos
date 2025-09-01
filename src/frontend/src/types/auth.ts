export interface User {
    id: number;
    nome: string;   
    email: string;
    perfil: string;
    cpf: string;
    telefone: string;
};

export interface AuthContextType {
    isLogged: boolean;
    isLoggingOut: boolean;
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: (userData: User) => void;
    logout: (showMessage?: boolean) => void;
    loading: boolean;
};
