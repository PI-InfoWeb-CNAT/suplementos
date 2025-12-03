export interface ProductProps {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string;
  porcentagem_desconto: number;
  categoria: string;
  preco_calculado: number;
  is_favorited: boolean;
  estoque?: number;
  media_avaliacoes?: number;
  total_avaliacoes?: number;
  minha_avaliacao?: number | null;
  distribuicao_avaliacoes?: Record<string, number>;
}

export interface ProductCardProps {
  product: ProductProps;
  onFavoriteChange?: (produtoId: number, isFavorited: boolean) => void;
}

export interface FilterProps {
  produtos: ProductProps[];
  onChange?: (produtosOrdenados: ProductProps[]) => void;
  initialOrdenacao?: string;
  showReset?: boolean;
  extraOptions?: { value: string; label: string }[];
}

export interface ProductContextType {
  produtos: ProductProps[];
  setProdutos: React.Dispatch<React.SetStateAction<ProductProps[]>>;
  loading: boolean;
}
