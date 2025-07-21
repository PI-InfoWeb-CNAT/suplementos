'use client';

import { useProdutos } from '@/context/ProductContext';
import ProductCard from "@/components/ProductCard";

export default function CategoriaClient({tipo}: {tipo: string}) {
    const { produtos, loading } = useProdutos();
    const produtos_tipo = produtos.filter(produto => produto.categoria == tipo)

    return (
        <section>
            <div className="productsContainer">
                {produtos_tipo.map((produto) => (
                    <ProductCard key={produto.id} product={produto} />
                ))}
            </div>
        </section>
    )
}