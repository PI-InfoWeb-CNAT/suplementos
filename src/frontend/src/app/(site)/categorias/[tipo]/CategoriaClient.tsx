'use client';

import { useProdutos } from '@/contexts/ProductContext';
import ProductCard from "@/components/ProductCard";
import PageWrapper from '@/components/layout/PageWrapper';
import LoadingContainer from '@/components/loading/LoadingContainer';

export default function CategoriaClient({tipo}: {tipo: string}) {
    const { produtos, loading } = useProdutos();
    const produtos_tipo = produtos.filter(produto => produto.categoria == tipo)

    const categorias: Record<string, string> = {
        acessorios: 'Acessórios',
        alimentos: 'Alimentos',
        roupas: 'Roupas',
        suplementos: 'Suplementos',
    };

    const pageName = categorias[tipo]

    return (
        <PageWrapper pageName={pageName}>
            <section>
                <LoadingContainer loading={loading}>
                    <div className="productsContainer">
                        {produtos_tipo.map((produto) => (
                            <ProductCard key={produto.id} product={produto} />
                        ))}
                    </div>
                </LoadingContainer>
            </section>
        </PageWrapper>
    )
}