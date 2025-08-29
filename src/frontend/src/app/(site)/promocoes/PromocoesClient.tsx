'use client';
import { useState, useMemo } from "react";

import ProductCard from "@/components/ProductCard";
import LoadingContainer from "@/components/loading/LoadingContainer";
import { useProdutos } from '@/context/ProductContext';
import Filter from "@/components/Filter";
import PageWrapper from "@/components/layout/PageWrapper";
import { ProductProps } from "@/types/products";

export default function PromocoesClient() {
    const { produtos, loading } = useProdutos();

    const produtosPromocoesOriginais = useMemo(
        () => produtos.filter(p => p.porcentagem_desconto > 0),
        [produtos]
    );

    const [produtosPromocoes, setProdutosPromocoes] = useState<ProductProps[]>(produtosPromocoesOriginais);

    return (
        <PageWrapper pageName="Promoções">
            <section className="space-y-10">
                <h2 className="h2 lg:hidden">Promoções</h2>

                <Filter produtos={produtosPromocoesOriginais} onChange={setProdutosPromocoes} />

                <LoadingContainer loading={loading}>
                    {produtosPromocoes.length > 0 ? (
                        <div className="productsContainer">
                            {produtosPromocoes.map((produto) => (
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
