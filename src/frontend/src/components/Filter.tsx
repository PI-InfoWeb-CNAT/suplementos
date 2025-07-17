import { FaChevronDown } from "react-icons/fa";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectIcon } from "@/components/ui/select";

import { FilterProps } from "@/types/products";

const Filter = ({ ordenacao, setOrdenacao }: FilterProps) => {
    return (
        <div className="flex items-center gap-5">
            <p className="text-lg">Ordenar por:</p>
            <Select value={ordenacao} onValueChange={(value) => {
                if (value === "reset") {
                    setOrdenacao("");
                } else {
                    setOrdenacao(value);
                }
            }}>
                <SelectTrigger className="w-[220px] bg-dark-grey !text-white text-base py-6 cursor-pointer [&>svg]:hidden">
                    <SelectValue placeholder="Selecione" />
                    <SelectIcon className="text-white text-xl">
                        <FaChevronDown className="text-white" />
                    </SelectIcon>
                </SelectTrigger>
                <SelectContent className="bg-dark-grey text-white">
                    <SelectItem value="reset" className="py-2">Sem ordenação</SelectItem>
                    <SelectItem value="az" className="py-2">Alfabética (A-Z)</SelectItem>
                    <SelectItem value="za" className="py-2">Alfabética (Z-A)</SelectItem>
                    <SelectItem value="menor_preco" className="py-2">Menor preço</SelectItem>
                    <SelectItem value="maior_preco" className="py-2">Maior preço</SelectItem>
                    <SelectItem value="menor_promocao" className="py-2">Menor promoção</SelectItem>
                    <SelectItem value="maior_promocao" className="py-2">Maior promoção</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default Filter;