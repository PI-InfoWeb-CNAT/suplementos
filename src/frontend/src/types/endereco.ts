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

export interface EnderecoContextType {
  enderecos: EnderecoProps[];
  loading: boolean;
  getEnderecos: () => Promise<void>;
  addEndereco: (endereco: EnderecoProps) => void;
  updateEndereco: (endereco: EnderecoProps) => void;
  deleteEndereco: (id: number) => void;
};