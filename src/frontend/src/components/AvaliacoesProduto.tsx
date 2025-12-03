import { Star } from "lucide-react";
import { ProductProps } from "@/types/products";

export default function AvaliacoesHistograma({ produto }: { produto: ProductProps }) {
    const distribuicao = produto.distribuicao_avaliacoes || { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 };
    const total = produto.total_avaliacoes || 0;
    const media = produto.media_avaliacoes || 0;

    const totalParaCalculo = total === 0 ? 1 : total;

    const valoresDistribuicao = Object.values(distribuicao);
    const maxVotos = Math.max(...valoresDistribuicao, 0);

    const niveis = [5, 4, 3, 2, 1];

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row gap-8 md:gap-16 items-start">
                
                {/* --- LADO ESQUERDO: Nota Grande --- */}
                <div className="flex flex-col items-center justify-center md:items-start max-xs:mx-auto space-y-2">
                    <div className="flex items-end text-dark-grey">
                        <span className="sm:text-9xl text-8xl font-bold leading-none">
                            {media.toFixed(1).replace('.', ',')}
                        </span>
                        <span className="text-2xl font-medium text-gray-400 mb-1 ml-1">/5</span>
                    </div>
                    
                    {/* Estrelas da Média */}
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={20}
                                className={`${
                                    star <= Math.round(media) 
                                        ? "text-yellow-400 fill-yellow-400" 
                                        : "text-gray-300 fill-gray-100"
                                }`}
                            />
                        ))}
                    </div>
                    
                    <p className="text-sm text-gray-500 font-medium">
                        {total} {total === 1 ? 'avaliação' : 'avaliações'}
                    </p>
                </div>

                {/* --- LADO DIREITO: Barras de Progresso --- */}
                <div className="lg:w-1/2 w-full space-y-3">
                    {niveis.map((nivel) => {
                        const count = distribuicao[nivel.toString() as keyof typeof distribuicao] || 0;
                        const percent = (count / totalParaCalculo) * 100;

                        const isHighest = count === maxVotos && maxVotos > 0;

                        return (
                            <div key={nivel} className="flex items-center gap-3 text-sm">
                                {/* Label da Estrela (ex: 5) */}
                                <div className="flex items-center w-4 shrink-0 font-bold text-gray-600">
                                    {nivel}
                                </div>
                                
                                <Star 
                                    size={14} 
                                    className={`-ml-1 ${
                                        isHighest 
                                            ? "text-yellow-400 fill-yellow-400" 
                                            : "text-gray-400 fill-gray-400"
                                    }`} 
                                />

                                {/* Barra de Fundo */}
                                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-yellow-400 rounded-full transition-all duration-500 ease-out" 
                                        style={{ width: `${percent}%` }}
                                    ></div>
                                </div>
                                
                                {/* Contagem numérica */}
                                <div className="w-8 text-right text-gray-500 shrink-0 font-medium text-xs">
                                    {count}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}