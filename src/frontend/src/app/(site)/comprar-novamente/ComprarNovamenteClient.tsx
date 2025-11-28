'use client';
import { useEffect, useState } from "react";

import PageWrapper from "@/components/layout/PageWrapper";
import ProductCard from "@/components/ProductCard";
import LoadingContainer from "@/components/loading/LoadingContainer";
import api from "@/services/api";
import withAuth from "@/lib/withAuth"; 
import { ProductProps } from "@/types/products";

function ComprarNovamente() {
    const [produtos, setProdutos] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/produtos/comprar_novamente/')
            .then(response => {
                setProdutos(response.data);
            })
            .catch(err => console.error("Erro ao buscar histórico", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <PageWrapper pageName="Comprar Novamente">
            <h2 className="h2 lg:hidden">Comprar Novamente</h2>
            
            <LoadingContainer loading={loading}>
                {produtos.length > 0 ? (
                    <div className="productsContainer"> 
                        {produtos.map(produto => (
                            <ProductCard key={produto.id} product={produto} />
                        ))}
                    </div>
                ) : (
                    <p className="notFound">Você ainda não realizou nenhuma compra</p>
                )}
            </LoadingContainer>
        </PageWrapper>
    );
}

export default withAuth(ComprarNovamente);