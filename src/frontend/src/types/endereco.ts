export interface EnderecoProps {
    id: number;
    apelido: string;
    destinatario: string;
    cep: string;
    uf: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    complemento: string;
}

export interface EnderecoCardProps {
  endereco: EnderecoProps;
}