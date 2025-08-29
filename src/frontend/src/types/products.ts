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
}

export interface ProductCardProps {
  product: ProductProps;
  onFavoriteChange?: (produtoId: number, isFavorited: boolean) => void;
}

export interface FilterProps {
  ordenacao: string;
  setOrdenacao: (value: string) => void;
}

export interface ProductContextType {
  produtos: ProductProps[];
  setProdutos: React.Dispatch<React.SetStateAction<ProductProps[]>>;
  loading: boolean;
}