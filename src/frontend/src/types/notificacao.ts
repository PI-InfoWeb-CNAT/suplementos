export interface Notificacao {
    id: number;
    categoria: string;
    titulo: string;
    texto: string;
    lida: boolean;
    data_envio: string;
}

export interface NotificacaoContextData {
    count: number;
    atualizarContador: () => void;
}