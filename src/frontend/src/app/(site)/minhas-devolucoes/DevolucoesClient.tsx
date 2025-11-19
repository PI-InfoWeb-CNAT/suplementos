'use client';
import { useEffect, useState } from 'react';
import { List, FileClock, ThumbsUp, CircleDollarSign, XCircle, Ban } from 'lucide-react';

import FastAcess from "@/components/FastAcess";
import PageWrapper from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import LoadingContainer from '@/components/loading/LoadingContainer';
import CancelarDevolucaoModal from '@/components/modals/devolucao/CancelarDevolucaoModal';
import { DevolucaoStatusType, DEVOLUCAO_STATUS_MAP, DevolucaoProps } from '@/types/devolucao';
import { formatarData, formatarPreco } from "@/lib/utils";
import withAuth from "@/lib/withAuth";
import api from '@/services/api';

const getStatusInfo = (status: DevolucaoStatusType) => {
    switch (status) {
        case '1':
            return {
                icon: <FileClock className="text-yellow-500" size={24} />,
                text: DEVOLUCAO_STATUS_MAP[status],
                message: "Sua solicitação está sendo analisada."
            };
        case '2':
            return {
                icon: <ThumbsUp className="text-blue-500" size={24} />,
                text: DEVOLUCAO_STATUS_MAP[status],
                message: "Solicitação aprovada. Reembolso em processo."
            };
        case '3': 
            return {
                icon: <CircleDollarSign className="text-green-500" size={24} />,
                text: DEVOLUCAO_STATUS_MAP[status],
                message: "Reembolso efetuado com sucesso!"
            };
        case '4':
            return {
                icon: <XCircle className="text-red-500" size={24} />,
                text: DEVOLUCAO_STATUS_MAP[status],
                message: "Sua solicitação foi recusada."
            };
        case '5': 
            return {
                icon: <Ban className="text-gray-500" size={24} />,
                text: DEVOLUCAO_STATUS_MAP[status],
                message: "Você cancelou esta solicitação."
            };
        default:
            return {
                icon: <FileClock className="text-gray-500" size={24} />,
                text: "Desconhecido",
                message: "Status da devolução indisponível."
            };
    }
}

type StatusFiltro = DevolucaoStatusType | 'all';

const abasFiltro: { id: StatusFiltro; nome: string; icon: React.ReactNode }[] = [
    { id: 'all', nome: "Todos", icon: <List size={18} /> },
    { id: '1', nome: "Pendente", icon: <FileClock size={18} /> },
    { id: '2', nome: "Aprovada", icon: <ThumbsUp size={18} /> },
    { id: '3', nome: "Reembolsado", icon: <CircleDollarSign size={18} /> },
    { id: '4', nome: "Recusada", icon: <XCircle size={18} /> },
    { id: '5', nome: "Cancelada", icon: <Ban size={18} /> },
];


function DevolucoesClient() {
    const [statusFiltro, setStatusFiltro] = useState<StatusFiltro>('all');
    const [devolucoes, setDevolucoes] = useState<DevolucaoProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/devolucoes/")
            .then(res => setDevolucoes(res.data))
            .catch(err => console.error("Erro ao carregar devoluções:", err))
            .finally(() => setLoading(false));
    }, []);

    const handleDevolucaoCancelada = (devolucaoId: number) => {
        setDevolucoes(currentDevolucoes =>
            currentDevolucoes.map(devolucao =>
                devolucao.id === devolucaoId
                    ? { ...devolucao, status: '5' }
                    : devolucao
            )
        );

        setStatusFiltro('5');
    };

    const devolucoesFiltradas = devolucoes.filter(devolucao => {
        if (statusFiltro === 'all') return true;
        return devolucao.status === statusFiltro;
    });

    return (
        <PageWrapper pageName="Minhas Devoluções">
            <div className="flex flex-col 2xl:flex-row nt-sm:justify-between gap-y-5 mx-auto w-full">
                <h2 className="h2 lg:hidden">Minhas Devoluções</h2>
                <section className="2xl:w-[61%] w-full 2xl:max-h-[700px] 2xl:overflow-y-auto 2xl:pr-1">
                    <LoadingContainer loading={loading}>
                        {devolucoes.length > 0 ? (
                            <>
                                {/* --- ABAS DE FILTRO --- */}
                                <div className="border-b border-gray-200 mb-6 overflow-x-auto">
                                    <nav className="flex sm:space-x-6 space-x-4 whitespace-nowrap sm:max-w-full mb-lg:max-w-[390px] max-w-[350px] overflow-x-auto hide-scrollbar" aria-label="Abas de Devoluções">
                                        {abasFiltro.map((aba) => (
                                            <button
                                                key={aba.id}
                                                onClick={() => setStatusFiltro(aba.id)}
                                                className={`
                                                        flex items-center gap-2 py-4 px-1 border-b-2 font-medium sm:text-sm text-xs cursor-pointer
                                                        ${statusFiltro === aba.id
                                                        ? 'border-dark-green text-dark-green'
                                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                    }
                                                    `}
                                            >
                                                {aba.icon}
                                                <span>{aba.nome}</span>
                                            </button>
                                        ))}
                                    </nav>
                                </div>

                                <div className="hidden md:grid grid-cols-5 gap-4 p-4 font-bold text-gray-600 items-center">
                                    <h5>Solicitação</h5>
                                    <h5>Valor</h5>
                                    <h5>Status</h5>
                                    <h5>Mensagem</h5>
                                    <h5 className="text-center">Ação</h5>
                                </div>


                                {devolucoesFiltradas.length > 0 ? (
                                    devolucoesFiltradas.map(devolucao => {
                                        const statusInfo = getStatusInfo(devolucao.status);
                                        return (
                                            <div
                                                key={devolucao.id}
                                                className="grid grid-cols-1 md:grid-cols-5 gap-4 p-5 mb-5 border border-gray-200 rounded-lg shadow-sm items-center text-sm"
                                            >

                                                {/* --- Coluna Pedido (ID e Data) --- */}
                                                <div className="space-y-1">
                                                    {/* Label para mobile */}
                                                    <p className="font-bold text-dark-grey text-base">
                                                        Solicitação #{devolucao.id}
                                                    </p>
                                                    <p className="text-gray-600 text-xs">
                                                        (Referente ao Pedido #{devolucao.pedido_id})
                                                    </p>
                                                    <p className="text-gray-500 text-xs">{formatarData(devolucao.data_solicitacao)}</p>
                                                </div>

                                                {/* --- Coluna Valor --- */}
                                                <div className="space-y-1">
                                                    <span className="font-bold text-dark-grey md:hidden">Valor</span>
                                                    <p className="font-semibold text-base">R$ {formatarPreco(devolucao.total)}</p>
                                                </div>

                                                {/* --- Coluna Status --- */}
                                                <div className="space-y-1">
                                                    <span className="font-bold text-dark-grey md:hidden">Status</span>
                                                    <div className="flex items-center gap-2">
                                                        {statusInfo.icon}
                                                        <span className="font-semibold">{statusInfo.text}</span>
                                                    </div>
                                                </div>

                                                {/* --- Coluna Mensagem --- */}
                                                <div className="space-y-1">
                                                    <span className="font-bold text-dark-grey md:hidden">Mensagem</span>
                                                    <p className="text-dark-grey">{statusInfo.message}</p>
                                                </div>

                                                {/* --- Coluna Ação (Botão) --- */}
                                                <div className="text-center flex flex-col max-md:w-40 gap-3">
                                                    <Button variant="submit" className="!py-1 max-md:py-5 !text-sm">
                                                        Ver detalhes
                                                    </Button>
                                                    {devolucao.status === '1' && (
                                                        <CancelarDevolucaoModal devolucaoId={devolucao.id} onCancelSuccess={handleDevolucaoCancelada} />
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div>
                                        <p className="text-center text-gray-500 text-lg py-10">
                                            Nenhuma devolução encontrada com este status.
                                        </p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <p className="notFound">Nenhuma devolução realizada.</p>
                        )}
                    </LoadingContainer>
                </section>
                <FastAcess />
            </div>
        </PageWrapper>
    )
}

export default withAuth(DevolucoesClient);