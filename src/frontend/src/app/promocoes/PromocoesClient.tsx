'use client';

import { useState } from "react";

import { FaChevronDown } from "react-icons/fa";

import ProductCard from "@/components/ProductCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useProdutos } from '@/context/ProductContext';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectIcon} from "@/components/ui/select";

export default function PromocoesClient() {
    const { produtos, loading } = useProdutos();
    const [ordenacao, setOrdenacao] = useState("");

    const produtos_promocoes = produtos.filter(produto => produto.porcentagem_desconto > 0)

    const produtos_ordenados = [...produtos_promocoes].sort((a, b) => {
        switch (ordenacao) {
            case "az":
                return a.nome.localeCompare(b.nome);
            case "za":
                return b.nome.localeCompare(a.nome);
            case "menor_preco":
                return a.preco - b.preco;
            case "maior_preco":
                return b.preco - a.preco;
            case "menor_promocao":
                return a.porcentagem_desconto - b.porcentagem_desconto;
            case "maior_promocao":
                return b.porcentagem_desconto - a.porcentagem_desconto;
            default:
                return 0;
        }
    });

    if (loading) {
        return (
            <section className="flex justify-center items-center h-64">
                <LoadingSpinner />
            </section>
        );
    }

    return (
        <section className="space-y-10">
            <h2 className="h2 lg:hidden">Promoções</h2>

            <div className="flex items-center gap-5">
                <p className="text-lg">Ordenar por:</p>
                <Select value={ordenacao} onValueChange={setOrdenacao}>
                    <SelectTrigger className="w-[220px] bg-dark-grey !text-white text-base py-6 cursor-pointer [&>svg]:hidden">
                        <SelectValue placeholder="Selecione" />
                        <SelectIcon className="text-white text-xl">
                            <FaChevronDown className="text-white"/>
                        </SelectIcon>
                    </SelectTrigger>
                    <SelectContent className="bg-dark-grey text-white">
                        <SelectItem value="az" className="py-2">Alfabética (A-Z)</SelectItem>
                        <SelectItem value="za" className="py-2">Alfabética (Z-A)</SelectItem>
                        <SelectItem value="menor_preco" className="py-2">Menor preço</SelectItem>
                        <SelectItem value="maior_preco" className="py-2">Maior preço</SelectItem>
                        <SelectItem value="menor_promocao" className="py-2">Menor promoção</SelectItem>
                        <SelectItem value="maior_promocao" className="py-2">Maior promoção</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {produtos_ordenados.length > 0 ? (
                <div className="productsContainer">
                {produtos_ordenados.map((produto) => (
                    <ProductCard key={produto.id} product={produto} />
                ))}
                </div>
            ) : (
                <p className="notFound">Nenhum produto em promoção no momento.</p>
            )}
        </section>
    );
}
