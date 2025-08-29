'use client';
import { useEffect, useState } from "react";

import api from "@/services/api";
import ProductCard from "@/components/ProductCard";
import PageWrapper from "@/components/layout/PageWrapper";
import LoadingContainer from "@/components/loading/LoadingContainer";
import withAuth from "@/lib/withAuth";
import { ProductProps } from "@/types/products";

function FavoritosClient() {
    const [produtos, setProdutos] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/favoritos/")
            .then(res => setProdutos(res.data))
            .catch(err => {
                console.error("Erro ao carregar favoritos:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <PageWrapper pageName="Meus Favoritos">
            <LoadingContainer loading={loading}>
                {produtos.length > 0 ? (
                    <div className="productsContainer">
                        {produtos.map(produto => (
                            <ProductCard
                                key={produto.id}
                                product={produto}
                                onFavoriteChange={(produtoId, isFavorited) => {
                                    if (!isFavorited) {
                                        setProdutos(prev => prev.filter(p => p.id !== produtoId));
                                    }
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="notFound">Nenhum produto favoritado.</p>
                )}
            </LoadingContainer>
        </PageWrapper>
    );
}

export default withAuth(FavoritosClient);
