'use client';

import ProductCard from "@/components/ProductCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useProdutos } from '@/context/ProductContext';

export default function PromocoesClient() {
    const { produtos, loading } = useProdutos()

    const produtos_promocoes = produtos.filter(produto => produto.porcentagem_desconto > 0)

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
            {produtos_promocoes.length > 0 ? (
                <div className="productsContainer">
                    {produtos_promocoes.map(produto => (
                        <ProductCard key={produto.id} product={produto} />
                    ))}
                </div>
            ) : (
                <p className="text-dark-grey text-2xl font-semibold">Nenhum produto em promoção no momento.</p>
            )}
        </section>
    )
}