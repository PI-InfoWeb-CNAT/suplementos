import { useState, useEffect } from "react";

import { FaChevronDown } from "react-icons/fa";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectIcon } from "@/components/ui/select";
import { FilterProps } from "@/types/products";


const Filter = ({ produtos, onChange, initialOrdenacao = "", showReset = true, extraOptions = [] }: FilterProps) => {
    const [ordenacao, setOrdenacao] = useState(initialOrdenacao);

    useEffect(() => {
        if (!produtos) return;

        const sorted = [...produtos].sort((a, b) => {
            switch (ordenacao) {
                case "az": return a.nome.localeCompare(b.nome);
                case "za": return b.nome.localeCompare(a.nome);
                case "menor_preco": return a.preco - b.preco;
                case "maior_preco": return b.preco - a.preco;
                case "menor_promocao": return a.porcentagem_desconto - b.porcentagem_desconto;
                case "maior_promocao": return b.porcentagem_desconto - a.porcentagem_desconto;
                default: return 0;
            }
        });

        onChange?.(sorted);
    }, [ordenacao, produtos, onChange]);

    return (
        <div className="flex items-center gap-5">
            <p className="text-lg">Ordenar por:</p>
            <Select
                value={ordenacao}
                onValueChange={(value) => setOrdenacao(value === "reset" ? "" : value)}
            >
                <SelectTrigger className="w-[220px] bg-dark-grey !text-white text-base py-6 cursor-pointer [&>svg]:hidden">
                    <SelectValue placeholder="Selecione" />
                    <SelectIcon className="text-white text-xl">
                        <FaChevronDown />
                    </SelectIcon>
                </SelectTrigger>
                <SelectContent className="bg-dark-grey text-white">
                    {showReset && <SelectItem value="reset" className="py-2">Sem ordenação</SelectItem>}
                    <SelectItem value="az" className="py-2">Alfabética (A-Z)</SelectItem>
                    <SelectItem value="za" className="py-2">Alfabética (Z-A)</SelectItem>
                    <SelectItem value="menor_preco" className="py-2">Menor preço</SelectItem>
                    <SelectItem value="maior_preco" className="py-2">Maior preço</SelectItem>
                    <SelectItem value="menor_promocao" className="py-2">Menor promoção</SelectItem>
                    <SelectItem value="maior_promocao" className="py-2">Maior promoção</SelectItem>

                    {extraOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value} className="py-2">
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default Filter;
