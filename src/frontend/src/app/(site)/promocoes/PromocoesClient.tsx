'use client';
import { useEffect, useState } from "react";

import ProductCard from "@/components/ProductCard";
import LoadingContainer from "@/components/loading/LoadingContainer";
import Filter from "@/components/Filter";
import PageWrapper from "@/components/layout/PageWrapper";
import api from "@/services/api";
import { ProductProps } from "@/types/products";

export default function PromocoesClient() {
    const [produtosOriginais, setProdutosOriginais] = useState<ProductProps[]>([]);
    const [produtosPromocoes, setProdutosPromocoes] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.get("/promocoes/")
            .then(res => {
                setProdutosOriginais(res.data);
                setProdutosPromocoes(res.data);
            })
            .catch(err => console.error("Erro ao carregar promoções:", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <PageWrapper pageName="Promoções">
            <section className="space-y-10">
                <h2 className="h2 lg:hidden">Promoções</h2>

                <Filter produtos={produtosOriginais} onChange={setProdutosPromocoes} />

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
