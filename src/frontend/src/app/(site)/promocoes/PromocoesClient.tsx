'use client';

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import LoadingContainer from "@/components/loading/LoadingContainer";
import { useProdutos } from '@/context/ProductContext';
import Filter from "@/components/Filter";
import PageWrapper from "@/components/layout/PageWrapper";

export default function PromocoesClient() {
    const { produtos, loading } = useProdutos();
    const [ordenacao, setOrdenacao] = useState("");

    const produtos_promocoes = produtos.filter(produto => produto.porcentagem_desconto > 0);

    const produtos_ordenados = [...produtos_promocoes].sort((a, b) => {
        switch (ordenacao) {
            case "az":
                return a.nome.localeCompare(b.nome);
            case "za":
                return b.nome.localeCompare(a.nome);
            case "menor_preco":
                return a.preco - b.preco;
            case "maior_preco":
                return b.preco - a.preco;
            case "menor_promocao":
                return a.porcentagem_desconto - b.porcentagem_desconto;
            case "maior_promocao":
                return b.porcentagem_desconto - a.porcentagem_desconto;
            default:
                return 0;
        }
    });


    return (
        <PageWrapper pageName="Promoções">
            <section className="space-y-10">
                <h2 className="h2 lg:hidden">Promoções</h2>

                <Filter ordenacao={ordenacao} setOrdenacao={setOrdenacao} />

                <LoadingContainer loading={loading}>
                    {produtos_ordenados.length > 0 ? (
                        <div className="productsContainer">
                            {produtos_ordenados.map((produto) => (
                                <ProductCard key={produto.id} product={produto} />
                            ))}
                        </div>
                    ) : (
                        <p className="notFound">Nenhum produto em promoção no momento.</p>
                    )}
                </LoadingContainer>
            </section>
        </PageWrapper>
    );
}
