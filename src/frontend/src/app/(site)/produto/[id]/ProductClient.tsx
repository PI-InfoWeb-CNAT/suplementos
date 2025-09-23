'use client';

import { BsFillLightningChargeFill } from "react-icons/bs";

import PageWrapper from "@/components/layout/PageWrapper";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useProdutos } from "@/contexts/ProductContext"

export default function ProductClient({id}: {id: string}) {
    const idNumber = Number(id);
    const { produtos, loading } = useProdutos();

    const produto = produtos.find(produto => produto.id === idNumber)

    const produtos_relacionados = produto ? produtos.filter(p => p.categoria === produto.categoria && p.id !== produto.id) : [];

    if (loading) {
        return (
            <section className="flex justify-center items-center h-full">
                <LoadingSpinner />
            </section>
        );
    }

    if (!produto) {
        return <p className="notFound">Produto não encontrado.</p>
    }

    return (
        <PageWrapper pageName={produto.nome}>
            <h2 className="h2 nt-sm:hidden">{produto.nome}</h2>
            <section className="flex flex-col tb:flex-row items-center gap-10 nt-sm:h-[370px] tb:h-[320px]">
                <img src={produto.imagem} alt={`Imagem do produto ${produto.nome}`} className="w-auto h-full rounded-3xl"/>
                <div className="tb:w-[640px] w-full flex flex-col gap-y-5">
                    <div className="nt-sm:max-h-[190px] tb:max-h-[140px] tb:overflow-auto text-dark-grey border border-[#C6C6C6] rounded-md p-4 space-y-2">
                        <h5 className="font-semibold mb-lg:text-xl text-lg">Informações do produto</h5>
                        <p className="font-medium mb-lg:text-base text-sm">{produto.descricao}</p>
                    </div>
                    <div className="flex tb:justify-start justify-center items-center gap-4">
                        <p className="nt-sm:text-4xl mb-lg:text-3xl text-[26px] font-medium">R$<span>{produto.preco_calculado}</span></p>
                        <div className="bg-dark-grey text-light-green mb-lg:px-8 px-6 py-2 rounded-md">
                            <BsFillLightningChargeFill className="mb-lg:text-[25px] text-[20px]"/>
                        </div>
                    </div>
                    <form action="" className="flex flex-col tb:items-start items-center space-y-5">
                        <div className="space-x-4">
                            <label htmlFor="qtd_produto" className="text-lg font-medium">Quantidade:</label>
                            <input type="number" name="qtd_produto" id="qtd_produto" placeholder="0" className="input text-lg pl-1 pr-0 py-0 w-[50px]"/>
                        </div>
                        <Button type="submit" variant="submit" size="submit">
                            Adicionar ao carrinho
                        </Button>
                    </form>
                </div>
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