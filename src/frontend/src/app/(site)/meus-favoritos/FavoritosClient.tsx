'use client';
import { useEffect, useState, useMemo } from "react";

import api from "@/services/api";
import ProductCard from "@/components/ProductCard";
import PageWrapper from "@/components/layout/PageWrapper";
import LoadingContainer from "@/components/loading/LoadingContainer";
import Filter from "@/components/Filter";
import withAuth from "@/lib/withAuth";
import { ProductProps } from "@/types/products";

function FavoritosClient() {
    const [produtos, setProdutos] = useState<ProductProps[]>([]); 
    const [produtosOrdenados, setProdutosOrdenados] = useState<ProductProps[]>([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/favoritos/")
            .then(res => setProdutos(res.data))
            .catch(err => console.error("Erro ao carregar favoritos:", err))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        setProdutosOrdenados(produtos);
    }, [produtos]);

    return (
        <PageWrapper pageName="Meus Favoritos">
            {produtos.length > 0 ? (
                <>
                    <h2 className="h2 lg:hidden">Meus Favoritos</h2>
                    <Filter produtos={produtos} onChange={setProdutosOrdenados} />

                    <LoadingContainer loading={loading}>
                        <div className="productsContainer">
                            {produtosOrdenados.map(produto => (
                                <ProductCard
                                    key={produto.id}
                                    product={produto}
                                    onFavoriteChange={(produtoId, isFavorited) => {
                                        if (!isFavorited) {
                                            setProdutos(prev => prev.filter(p => p.id !== produtoId));
                                            setProdutosOrdenados(prev => prev.filter(p => p.id !== produtoId));
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    </LoadingContainer>
                </>
            ) : (
                <p className="notFound">Nenhum produto favoritado.</p>
            )}
        </PageWrapper>
    );
}

export default withAuth(FavoritosClient);