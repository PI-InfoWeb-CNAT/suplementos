import { LotesVencidosProps } from "@/types";
import ExcluirLoteModal from "../modals/ExcluirLoteModal";

export function LotesVencidos({ dados, total, onRefresh }: LotesVencidosProps) {
    
    const formatDate = (dateString: string) => {
        if (!dateString) return "-";
        const date = new Date(dateString + 'T00:00:00');
        return new Intl.DateTimeFormat('pt-BR').format(date);
    };

    return (
        <section className="space-y-4">
            <div className="flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-red-600">🚨 Lotes Vencidos</h2>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                    {total} encontrados
                </span>
            </div>
            <p className="text-gray-500 text-sm">Estes produtos estão vencidos e já foram retirados de circulação.</p>

            <div className="bg-transparent sm:bg-white rounded-lg sm:shadow sm:border sm:border-red-200">
                <table className="w-full text-left border-collapse block sm:table">
                    {/* Cabeçalho some no mobile */}
                    <thead className="hidden sm:table-header-group">
                        <tr className="bg-red-50 text-red-800 border-b border-red-100">
                            <th className="p-4 font-semibold">Produto</th>
                            <th className="p-4 font-semibold">Validade</th>
                            <th className="p-4 font-semibold text-center">Qtd. Atual</th>
                            <th className="p-4 font-semibold text-center">Status</th>
                            <th className="p-4 font-semibold text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="block sm:table-row-group">
                        {dados.length === 0 ? (
                            <tr className="block sm:table-row bg-white rounded-lg shadow sm:shadow-none p-4 sm:p-0">
                                <td colSpan={5} className="p-8 text-center text-gray-500 italic block sm:table-cell">
                                    Nenhum lote vencido encontrado. Tudo certo! ✅
                                </td>
                            </tr>
                        ) : (
                            dados.map((lote) => (
                                <tr key={lote.id} className="block sm:table-row bg-white mb-4 sm:mb-0 rounded-lg shadow sm:shadow-none border sm:border-b border-red-100 sm:hover:bg-gray-50">
                                    
                                    {/* PRODUTO */}
                                    <td className="flex justify-between items-center sm:table-cell p-4 font-medium text-gray-800 border-b sm:border-none">
                                        <span className="sm:hidden font-bold text-gray-500 text-sm">Produto:</span>
                                        <span>{lote.produto_nome}</span>
                                    </td>
                                    
                                    {/* VALIDADE */}
                                    <td className="flex justify-between items-center sm:table-cell p-4 border-b sm:border-none">
                                        <span className="sm:hidden font-bold text-gray-500 text-sm">Validade:</span>
                                        <span className="text-red-600 font-bold">{formatDate(lote.validade)}</span>
                                    </td>
                                    
                                    {/* QUANTIDADE */}
                                    <td className="flex justify-between items-center sm:table-cell p-4 border-b sm:border-none">
                                        <span className="sm:hidden font-bold text-gray-500 text-sm">Quantidade:</span>
                                        <div className="font-mono text-lg text-right sm:text-center">{lote.quantidade}</div>
                                    </td>
                                    
                                    {/* STATUS */}
                                    <td className="flex justify-between items-center sm:table-cell p-4 border-b sm:border-none">
                                        <span className="sm:hidden font-bold text-gray-500 text-sm">Status:</span>
                                        <div className="text-right sm:text-center">
                                            <span className="inline-block px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded">
                                                VENCIDO
                                            </span>
                                        </div>
                                    </td>
                                    
                                    {/* AÇÕES */}
                                    <td className="flex justify-between items-center sm:table-cell p-4">
                                        <span className="sm:hidden font-bold text-gray-500 text-sm">Ações:</span>
                                        <div className="text-right sm:text-center">
                                            <ExcluirLoteModal loteId={lote.id} onRefresh={onRefresh} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}