'use client';

import ProductCard from "@/components/ProductCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useProdutos } from '@/context/ProductContext';

export default function PromocoesClient() {
    const { produtos, loading } = useProdutos()

    if (loading) {
        return (
            <section className="flex justify-center items-center h-64">
                <LoadingSpinner />
            </section>
        )
    }

    return (
        <section className="space-y-10">
            <h2 className="h2 lg:hidden">Promoções</h2>
            <div className="productsContainer">
                {produtos.map(produto => (
                    produto.porcentagem_desconto > 0 && (
                        <ProductCard key={produto.id} product={produto} />
                    )
                ))}
            </div>
        </section>
    )
}