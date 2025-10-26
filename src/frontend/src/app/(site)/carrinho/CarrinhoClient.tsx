'use client';
import Image from "next/image";

import PageWrapper from "@/components/layout/PageWrapper";
import LoadingContainer from "@/components/loading/LoadingContainer";
import ItemCard from "@/components/ItemCard";
import { Button } from "@/components/ui/button";
import { useCarrinho } from "@/contexts/CarrinhoContext";
import { formatarPreco } from "@/lib/utils";


export default function CarrinhoClient() {
    const { items, totalPrice, isLoading } = useCarrinho();

    return (
        <PageWrapper pageName="Meu Carrinho">
            <section className="space-y-10">
                <h2 className="h2 lg:hidden">Meu Carrinho</h2>
                <div>
                    <LoadingContainer loading={isLoading}>
                        <div className="flex flex-col xl:flex-row justify-between xl:gap-0 gap-y-10">
                            {items.length === 0 ? (
                                <p className="notFound">Seu carrinho está vazio.</p>
                            ) : (
                                <>
                                    <section className="flex flex-col gap-8 xl:w-[62%] xs:w-full w-[240px] xs:mx-0 mx-auto xl:max-h-[640px] md:max-h-[760px] overflow-auto p-1">
                                        {items.map(item => (
                                            <ItemCard 
                                                key={item.produto.id} 
                                                item={item}
                                                pageName="carrinho" 
                                            />
                                        ))}
                                    </section>

                                    <section className="card-shadow rounded-3xl 2xl:w-[30%] xl:w-[35%] md:w-1/2 sm:w-3/4 px-7 py-5 h-max">
                                        <div className="flex justify-between items-center text-[22px] font-semibold">
                                            <p>Total:</p>
                                            <span>R$ {formatarPreco(totalPrice)}</span>
                                        </div>
                                        <a href="/finalizar-pedido" className="mt-10 mb-4 block">
                                            <Button type="button" variant="submit" size="submit" className="w-full py-2 rounded-lg">
                                                Finalizar Pedido
                                            </Button>
                                        </a>
                                        <div className="w-full h-[1px] bg-gray-400"></div>
                                        <div className="relative w-full 2xl:h-92 xl:h-80 h-92 mt-6">
                                            <Image src={'/imagem-carrinho.png'} alt="Imagem do Carrinho" fill className="object-cover"/>
                                        </div>
                                    </section>
                                </>
                            )}
                        </div>
                    </LoadingContainer>
                </div>
            </section>
        </PageWrapper>
    )
}