import { X } from "lucide-react";
import { CarrinhoItemProps } from "@/types/carrinho";
import api from "@/services/api";
import { notify } from "@/lib/toast";

const CarrinhoItemCard = ({ item, onRemove }: { item: CarrinhoItemProps; onRemove?: (id: number) => void }) => {
    const handleRemoveItem = async () => {
        try {
            await api.delete(`/carrinho/item/${item.id}/`);
            notify("Item removido do carrinho com sucesso!", "success");
            onRemove?.(item.id);
        } catch (error) {
            console.error("Erro ao remover item:", error);
            notify("Erro ao remover o item do carrinho.", "error");
        }
    };

    return (
        <div className="relative card-shadow flex rounded-3xl">
            <div className="w-60 object-cover object-center">
                <img src={item.produto.imagem} alt={`Imagem do produto ${item.produto.nome}`} className="w-full h-full rounded-3xl" />
            </div>
            <div className="px-6 py-4 flex flex-col justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                    <h3 className="text-2xl font-medium">{item.produto.nome}</h3>
                    {item.produto.porcentagem_desconto > 0 && (
                        <div className="tb:text-base text-sm bg-dark-grey text-light-green px-2 py-1 tb:rounded-md rounded-sm">
                            {item.produto.porcentagem_desconto}% OFF
                        </div>
                    )}
                </div>
                <div className="space-y-4">
                    <p className="font-bold text-lg">Preço: <span className="font-medium">{item.produto.preco_calculado}</span></p>
                    <p className="font-bold text-lg">Quantidade: <span className="font-medium">{item.quantidade}</span></p>
                    <p className="font-bold text-[22px]">Subtotal: <span className="font-medium">{item.subtotal}</span></p>
                </div>
            </div>
            <X 
                size={30} 
                onClick={handleRemoveItem}
                className="absolute top-4 right-4 bg-dark-grey text-green rounded-full p-1 cursor-pointer hover:bg-[#2E2E2E] transition-colors"
            />
        </div>
    )
}

export default CarrinhoItemCard;