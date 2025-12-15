'use client';
import { useState } from "react";
import { X, Plus, Minus } from "lucide-react";

import { useCarrinho } from "@/contexts/CarrinhoContext";
import { ItemCardProps } from "@/types";
import { notify } from "@/lib/toast";
import { formatarPreco } from "@/lib/utils";
import AvaliarProdutoModal from "./modals/AvaliarProdutoModal";

const ItemCard = ({ item, pageName, statusPedido }: ItemCardProps) => {
    const { removeItem, updateQuantidade, isLoading } = useCarrinho();

    const [jaAvaliou, setJaAvaliou] = useState<boolean>(!!item.produto.minha_avaliacao);
    const mostrarBotaoAvaliar = pageName === "Meus Pedidos" && statusPedido === '4' && !jaAvaliou;

    // APENAS PARA CARRINHO
    const handleRemoveItem = async () => {
        try {
            await removeItem(item);
            notify("Item removido do carrinho com sucesso!", "success");
        } catch (error) {
            console.error("Erro ao remover item:", error);
            notify("Erro ao remover o item do carrinho.", "error");
        }
    };

    // APENAS PARA CARRINHO
    const handleUpdateQuantidade = async (novaQuantidade: number) => {
        if (novaQuantidade < 1) {
            notify("A quantidade mínima é 1", "warning");
            return;
        };
        try {
            await updateQuantidade(item, novaQuantidade);
        } catch (error) {
            console.error("Erro ao atualizar quantidade:", error);
            notify("Erro ao atualizar quantidade.", "error");
        }
    };

    return (
        <div className="relative card-shadow flex flex-col xs:flex-row rounded-3xl">
            <div className="2xl:w-60 xl:w-50 md:w-60 sm:w-50 xs:w-40 w-full">
                <img src={item.produto.imagem} alt={`Imagem do produto ${item.produto.nome}`} className="w-full h-full rounded-3xl object-cover object-center" />
            </div>
            <div className="xs:pl-6 xs:pr-10 px-6 py-4 flex flex-col flex-1 justify-between gap-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h3 className="sm:text-2xl text-xl font-medium">{item.produto.nome}</h3>
                    {item.produto.porcentagem_desconto > 0 && (
                        <div className="tb:text-base text-sm bg-dark-grey text-light-green px-2 py-1 tb:rounded-md rounded-sm">
                            {item.produto.porcentagem_desconto}% OFF
                        </div>
                    )}
                </div>
                <div className="sm:space-y-4 space-y-2">
                    <p className="font-bold sm:text-lg">Preço: <span className="font-medium">{formatarPreco(item.produto.preco_calculado)}</span></p>

                    {pageName === "carrinho" ? (
                        <div className="font-bold sm:text-lg flex items-center gap-3">
                            <span>Quantidade:</span>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => handleUpdateQuantidade(item.quantidade - 1)}
                                    disabled={isLoading}
                                    className="p-1 bg-gray-200 rounded-full disabled:opacity-50 cursor-pointer"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="font-medium w-8 text-center">{item.quantidade}</span>
                                <button 
                                    onClick={() => handleUpdateQuantidade(item.quantidade + 1)}
                                    disabled={isLoading}
                                    className="p-1 bg-gray-200 rounded-full disabled:opacity-50 cursor-pointer"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="font-bold sm:text-lg">Quantidade: <span className="font-medium">{item.quantidade}</span></p>
                    )}
                    
                    <p className="font-bold sm:text-[22px] text-lg">Subtotal: <span className="font-medium">R$ {formatarPreco(item.subtotal)}</span></p>

                    {mostrarBotaoAvaliar && (
                        <AvaliarProdutoModal 
                            item={item} 
                            onSuccess={() => setJaAvaliou(true)} 
                        />
                    )}
                </div>
            </div>
            {pageName === "carrinho" && (
                <X 
                    size={30} 
                    onClick={handleRemoveItem}
                    className="absolute top-4 right-4 bg-dark-grey text-green rounded-full p-1 cursor-pointer hover:bg-[#2E2E2E] transition-colors"
                />
            )}
        </div>
    )
}

export default ItemCard;