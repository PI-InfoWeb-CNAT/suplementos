'use client';
import { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/PageWrapper";
import ProductCard from "@/components/ProductCard";
import LoadingContainer from "@/components/loading/LoadingContainer";
import api from "@/services/api";
import { ProductProps } from "@/types/products";
import Filter from "@/components/Filter";

export default function MaisVendidosClient() {
    const [produtos, setProdutos] = useState<ProductProps[]>([]);
    const [produtosOrdenados, setProdutosOrdenados] = useState<ProductProps[]>([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/produtos/mais_vendidos/')
            .then(response => {
                setProdutos(response.data);
            })
            .catch(err => console.error("Erro ao buscar histórico", err))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        setProdutosOrdenados(produtos);
    }, [produtos]);

    return (
        <PageWrapper pageName="Mais Vendidos">
            {produtos.length > 0 ? (
                <>
                    <h2 className="h2 lg:hidden">Meus Favoritos</h2>
                    <Filter produtos={produtos} onChange={setProdutosOrdenados} />

                    <LoadingContainer loading={loading}>
                        <div className="productsContainer">
                            {produtosOrdenados.map(produto => (
                                <ProductCard key={produto.id} product={produto} />
                            ))}
                        </div>
                    </LoadingContainer>
                </>
            ) : (
                <p className="notFound">Nenhuma venda realizada.</p>
            )}
        </PageWrapper>
    );
}