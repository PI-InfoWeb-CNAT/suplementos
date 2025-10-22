import { X } from "lucide-react";
import { CarrinhoItemProps } from "@/types/carrinho";
import { notify } from "@/lib/toast";
import { useCarrinho } from "@/contexts/CarrinhoContext";

const CarrinhoItemCard = ({ item }: { item: CarrinhoItemProps; }) => {
    const { removeItem } = useCarrinho();

    const handleRemoveItem = async () => {
        try {
            await removeItem(item);
            notify("Item removido do carrinho com sucesso!", "success");
        } catch (error) {
            console.error("Erro ao remover item:", error);
            notify("Erro ao remover o item do carrinho.", "error");
        }
    };

    return (
        <div className="relative card-shadow flex flex-col xs:flex-row rounded-3xl">
            <div className="2xl:w-60 xl:w-50 md:w-60 sm:w-50 xs:w-40 w-full">
                <img src={item.produto.imagem} alt={`Imagem do produto ${item.produto.nome}`} className="w-full h-full rounded-3xl object-cover object-center" />
            </div>
            <div className="pl-6 pr-10 py-4 flex flex-col flex-1 justify-between gap-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h3 className="sm:text-2xl text-xl font-medium">{item.produto.nome}</h3>
                    {item.produto.porcentagem_desconto > 0 && (
                        <div className="tb:text-base text-sm bg-dark-grey text-light-green px-2 py-1 tb:rounded-md rounded-sm">
                            {item.produto.porcentagem_desconto}% OFF
                        </div>
                    )}
                </div>
                <div className="sm:space-y-4 space-y-2">
                    <p className="font-bold sm:text-lg">Preço: <span className="font-medium">{item.produto.preco_calculado}</span></p>
                    <p className="font-bold sm:text-lg">Quantidade: <span className="font-medium">{item.quantidade}</span></p>
                    <p className="font-bold sm:text-[22px] text-lg">Subtotal: <span className="font-medium">{item.subtotal}</span></p>
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