'use client';
import { useRouter } from "next/navigation";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { BsFillLightningChargeFill } from "react-icons/bs";

import PageWrapper from "@/components/layout/PageWrapper";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useCarrinho } from "@/contexts/CarrinhoContext";
import { useProdutos } from "@/contexts/ProductContext";
import { carrinhoSchema, CarrinhoSchemaType } from "@/schemas/carrinhoSchema";
import { notify } from "@/lib/toast";
import LoadingSpinner from "@/components/loading/LoadingSpinner"; 
import { formatarPreco } from "@/lib/utils";
import AvaliacoesProduto from "@/components/AvaliacoesProduto";

export default function ProductClient({ id }: { id: string }) {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<CarrinhoSchemaType>({
        resolver: zodResolver(carrinhoSchema),
        defaultValues: { quantidade: 0 } 
    });
    const idNumber = Number(id);

    const { produtos, loading } = useProdutos();
    const { addItem } = useCarrinho();

    const produto = produtos.find(produto => produto.id === idNumber);

    if (loading) {
        return (
            <PageWrapper pageName="Carregando...">
                <section className="flex justify-center items-center h-[50vh]">
                    <LoadingSpinner />
                </section>
            </PageWrapper>
        );
    }

    if (!produto) {
        return (
            <PageWrapper pageName="Erro">
                <p className="notFound text-center text-xl mt-10">Produto não encontrado.</p>
            </PageWrapper>
        );
    }

    const estoqueDisponivel = produto.estoque || 0;
    const isEsgotado = estoqueDisponivel === 0;

    const produtos_relacionados = produtos.filter(p => p.categoria === produto.categoria && p.id !== produto.id);

    const onSubmit = async (data: CarrinhoSchemaType) => {
        if (data.quantidade > estoqueDisponivel) {
            notify(`Apenas ${estoqueDisponivel} unidades disponíveis do produto.`, "warning");
            return;
        }

        try {
            await addItem(produto!, Number(data.quantidade));

            notify("Produto adicionado ao carrinho com sucesso!", "success");
            setTimeout(() => {
                router.push("/carrinho");
            }, 1500);
        } catch (error: any) {
            if (error.response) {
                notify(error.response.data.erro || "Erro ao adicionar produto.", "error");
            } else {
                notify("Falha ao adicionar produto.", "error");
            }
        }
    };

    const onError = (errors: FieldErrors<CarrinhoSchemaType>) => {
        const firstError = Object.values(errors)[0];

        if (firstError && "message" in firstError) {
            notify(firstError.message as string, "warning");
        } else {
            notify("Erro ao validar dados", "warning");
        }
    };

    return (
        <PageWrapper pageName={produto.nome}>
            <h2 className="h2 nt-sm:hidden">{produto.nome}</h2>
            <section className="flex flex-col tb:flex-row items-center gap-10 nt-sm:h-[370px] tb:h-[320px]">
                <img src={produto.imagem} alt={`Imagem do produto ${produto.nome}`} className="w-auto h-full rounded-3xl" />
                <div className="tb:w-[640px] w-full flex flex-col gap-y-5">
                    <div className="nt-sm:max-h-[190px] tb:max-h-[140px] tb:overflow-auto text-dark-grey border border-[#C6C6C6] rounded-md p-4 space-y-2">
                        <h5 className="font-semibold mb-lg:text-xl text-lg">Informações do produto</h5>
                        <p className="font-medium mb-lg:text-base text-sm">{produto.descricao}</p>
                    </div>
                    
                    <div className="flex tb:justify-start justify-center items-center gap-4">
                        <p className="nt-sm:text-4xl mb-lg:text-3xl text-[26px] font-medium">R$<span>{formatarPreco(produto.preco_calculado)}</span></p>
                        <div className="bg-dark-grey text-light-green mb-lg:px-8 px-6 py-2 rounded-md">
                            <BsFillLightningChargeFill className="mb-lg:text-[25px] text-[20px]" />
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col tb:items-start items-center space-y-5">
                        <div className="flex flex-col gap-1">
                            <div className="space-x-4 flex items-center">
                                <label htmlFor="qtd_produto" className="text-lg font-medium">Quantidade:</label>
                                <input
                                    {...register("quantidade", { 
                                        valueAsNumber: true,
                                    })} 
                                    type="number"
                                    id="qtd_produto"
                                    min="1"
                                    disabled={isEsgotado}
                                    className="input text-lg pl-1 pr-0 py-0 w-[60px] disabled:cursor-not-allowed"
                                />
                            </div>
                            
                            {!isEsgotado && estoqueDisponivel < 5 && (
                                <span className="text-orange-600 text-sm font-medium">
                                    Corra! Restam apenas {estoqueDisponivel} unidades.
                                </span>
                            )}
                             {isEsgotado && (
                                <span className="text-red-600 text-sm font-medium">
                                    Produto indisponível no momento.
                                </span>
                            )}
                        </div>

                        <Button 
                            type="submit" 
                            variant="submit" 
                            size="submit"
                            disabled={isEsgotado}
                            className="disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isEsgotado ? "Esgotado" : "Adicionar ao carrinho"}
                        </Button>
                    </form>
                </div>
            </section>

            <section>
                <h2 className="h2 mt-10 mb-6">Avaliação do Produto</h2>
                <AvaliacoesProduto produto={produto} />
            </section>
            
            {produtos_relacionados.length > 0 && (
                <section className="mt-10 space-y-8">
                    <h2 className="h2">Produtos Relacionados</h2>
                    <div className="productsContainer">
                        {produtos_relacionados.map(produto => (
                            <ProductCard key={produto.id} product={produto} />
                        ))}
                    </div>
                </section>
            )}
        </PageWrapper>
    )
}