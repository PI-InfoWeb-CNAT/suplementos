'use client';

import { useProdutos } from "@/context/ProductContext"

export default function ProductClient({id}: {id: string}) {
    const idNumber = Number(id);
    const { produtos, loading } = useProdutos();

    const produto = produtos.find(produto => produto.id === idNumber)

    return (
        <p>{produto ? produto.nome : 'Produto não encontrado'}</p>
    )
}