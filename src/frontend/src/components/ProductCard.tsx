'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";

import { ProductCardProps } from "@/types/products";
import { Button } from "@/components/ui/button";
import Icon from "./Icon";
import { useAuth } from "@/contexts/AuthContext";
import { useProdutos } from "@/contexts/ProductContext";
import api from "@/services/api";
import { notify } from "@/lib/toast";
import { formatarPreco } from "@/lib/utils";

const ProductCard = ({ product, onFavoriteChange }: ProductCardProps ) => {
    const router = useRouter();
    const { isLogged } = useAuth();
    const { setProdutos } = useProdutos();
    const [isFavorited, setIsFavorited] = useState(product.is_favorited);

    const handleFavorite = async () => {

        if (!isLogged) {
            router.push("/login");
            return;
        }

        try {
            if (isFavorited) {
                await api.delete(`/favoritos/${product.id}/`);
                setIsFavorited(false);
                onFavoriteChange?.(product.id, false);
                notify("Produto removido dos favoritos com sucesso.", "success")
            } else {
                await api.post(`/favoritos/`, { produto_id: product.id });
                setIsFavorited(true);
                onFavoriteChange?.(product.id, true);
                notify("Produto adicionado aos favoritos com sucesso.", "success")
            }

            setProdutos(prev =>
                prev.map(p =>
                    p.id === product.id ? { ...p, is_favorited: !isFavorited } : p
                )
            );
            router.push("/meus-favoritos")
        } catch (error) {
            console.error("Erro ao favoritar:", error);
        }
    };

    useEffect(() => {
        if (!isLogged) {
            setIsFavorited(false);
        }
    }, [isLogged]);

    return (
        <div className="relative flex flex-col tb:w-[220px] w-[200px]">
            <div className="absolute top-3 right-3 z-20">
                <button onClick={handleFavorite}>
                    <Icon
                        icon={
                            isFavorited ? (
                                <IoMdHeart className="text-[18px] tb:text-[24px] text-green" title="Remover dos favoritos" />
                            ) : (
                                <IoMdHeartEmpty className="text-[18px] tb:text-[24px]" title="Adicionar aos favoritos" />
                            )
                        }
                    />
                </button>
            </div>
            <div className="z-10">
                <img
                    src={product.imagem}
                    alt={`Imagem do produto ${product.nome}`}
                    className="rounded-3xl h-auto w-full object-cover"
                />
            </div>
            <div className="flex flex-col flex-grow bg-white rounded-b-3xl shadow-lg px-5 pt-12 pb-5 -mt-7 z-0">
                <div>
                    <h5 className="tb:text-xl text-lg font-semibold line-clamp-2">{product.nome}</h5>
                    <div className="flex justify-between items-center mt-2">
                        <div>
                            {product.porcentagem_desconto > 0 && (
                                <p className="text-sm line-through">{formatarPreco(product.preco)} R$</p>
                            )}
                            <p className="tb:text-xl text-lg font-semibold">
                                {formatarPreco(product.preco_calculado)} R$
                            </p>
                        </div>
                        {product.porcentagem_desconto > 0 && (
                            <div className="tb:text-base text-sm bg-dark-grey text-light-green px-2 py-1 tb:rounded-md rounded-sm">
                                {product.porcentagem_desconto}% OFF
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full flex justify-center mt-5">
                    {/* BOTÃO DO SHADCN */}
                    <Button asChild variant="submit" size="submit">
                        <Link href={`/produto/${product.id}`}>Comprar</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;