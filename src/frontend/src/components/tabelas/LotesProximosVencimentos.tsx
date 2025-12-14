import { LotesProximosProps } from "@/types";

export function LotesProximosVencimentos({ dados, total }: LotesProximosProps) {

    const formatDate = (dateString: string) => {
        if (!dateString) return "-";
        const date = new Date(dateString + 'T00:00:00');
        return new Intl.DateTimeFormat('pt-BR').format(date);
    };

    const calculateDaysDiff = (dateString: string) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const expiryDate = new Date(dateString + 'T00:00:00');
        const diffTime = expiryDate.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const getDiscountSuggestion = (dateString: string) => {
        const diffDays = calculateDaysDiff(dateString);
        if (diffDays < 5) return { label: "75% OFF", color: "bg-red-100 text-red-700 border-red-200" };
        if (diffDays < 10) return { label: "60% OFF", color: "bg-orange-100 text-orange-700 border-orange-200" };
        if (diffDays < 20) return { label: "50% OFF", color: "bg-yellow-100 text-yellow-700 border-yellow-200" };
        return { label: "40% OFF", color: "bg-blue-100 text-blue-700 border-blue-200" };
    };

    return (
        <section className="space-y-4">
            <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-orange-600">⚠️ Vencimento Próximo (30 dias)</h2>
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                    {total} encontrados
                </span>
            </div>
            <p className="text-gray-500 text-sm">Estes produtos vencem em breve. Coloque-os em promoção para vendê-los.</p>

            {/* Removemos o overflow-x-auto para permitir o layout de cards no mobile sem scroll lateral */}
            <div className="bg-transparent sm:bg-white rounded-lg sm:shadow sm:border sm:border-orange-200">
                <table className="w-full text-left border-collapse block sm:table">
                    {/* Cabeçalho oculto no mobile */}
                    <thead className="hidden sm:table-header-group">
                        <tr className="bg-orange-50 text-orange-800 border-b border-orange-100">
                            <th className="p-4 font-semibold">Produto</th>
                            <th className="p-4 font-semibold">Validade</th>
                            <th className="p-4 font-semibold text-center">Qtd. Atual</th>
                            <th className="p-4 font-semibold text-center">Sugestão de Promoção</th>
                        </tr>
                    </thead>
                    <tbody className="block sm:table-row-group">
                        {dados.length === 0 ? (
                            <tr className="block sm:table-row bg-white rounded-lg shadow sm:shadow-none p-4 sm:p-0">
                                <td colSpan={4} className="p-8 text-center text-gray-500 italic block sm:table-cell">
                                    Nenhum lote vencendo nos próximos 30 dias.
                                </td>
                            </tr>
                        ) : (
                            dados.map((lote) => {
                                const discount = getDiscountSuggestion(lote.validade);
                                const daysRemaining = calculateDaysDiff(lote.validade);

                                return (
                                    <tr key={lote.id} className="block sm:table-row bg-white mb-4 sm:mb-0 rounded-lg shadow sm:shadow-none border sm:border-b border-orange-100 sm:hover:bg-gray-50">
                                        
                                        {/* PRODUTO */}
                                        <td className="flex justify-between items-center sm:table-cell p-4 font-medium text-gray-800 border-b sm:border-none">
                                            <span className="sm:hidden font-bold text-gray-500 text-sm">Produto:</span>
                                            <span>{lote.produto_nome}</span>
                                        </td>
                                        
                                        {/* VALIDADE */}
                                        <td className="flex justify-between items-center sm:table-cell p-4 border-b sm:border-none">
                                            <span className="sm:hidden font-bold text-gray-500 text-sm">Validade:</span>
                                            <div className="flex flex-col text-right sm:text-left">
                                                <span className="text-orange-600 font-bold">
                                                    {formatDate(lote.validade)}
                                                </span>
                                                <span className="text-xs text-gray-500 font-medium mt-1">
                                                    Faltam {daysRemaining} dias
                                                </span>
                                            </div>
                                        </td>

                                        {/* QUANTIDADE */}
                                        <td className="flex justify-between items-center sm:table-cell p-4 border-b sm:border-none">
                                            <span className="sm:hidden font-bold text-gray-500 text-sm">Quantidade:</span>
                                            <div className="font-mono text-lg text-right sm:text-center">{lote.quantidade}</div>
                                        </td>

                                        {/* SUGESTÃO */}
                                        <td className="flex justify-between items-center sm:table-cell p-4">
                                            <span className="sm:hidden font-bold text-gray-500 text-sm">Sugestão:</span>
                                            <div className="text-right sm:text-center">
                                                <span className={`inline-block px-3 py-1 text-xs sm:text-sm font-bold rounded border ${discount.color}`}>
                                                    {discount.label}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}