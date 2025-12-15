'use client';
import { useState, useEffect } from "react";
import { PackageSearch, Truck, Box, CheckCheck, List, XCircle } from 'lucide-react';

import FastAcess from "@/components/FastAcess";
import PageWrapper from "@/components/layout/PageWrapper";
import LoadingContainer from "@/components/loading/LoadingContainer";
import withAuth from "@/lib/withAuth";
import { PedidoProps, PEDIDO_STATUS_MAP, PedidoStatusType } from "@/types/pedido";
import api from "@/services/api";
import { formatarData, formatarPreco } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import CancelarPedidoModal from "@/components/modals/pedido/CancelarPedidoModal";
import { notify } from "@/lib/toast";
import DetalhesPedidoModal from "@/components/modals/pedido/DetalhesPedidoModal";

const getStatusInfo = (status: PedidoStatusType) => {
    switch (status) {
        case '1':
            return {
                icon: <PackageSearch className="text-yellow-500" size={24} />,
                text: PEDIDO_STATUS_MAP[status],
                message: "Seu pedido está sendo preparado."
            };
        case '2':
            return {
                icon: <Truck className="text-blue-500" size={24} />,
                text: PEDIDO_STATUS_MAP[status],
                message: "Seu pedido foi enviado!"
            };
        case '3':
            return {
                icon: <Box className="text-purple-500" size={24} />,
                text: PEDIDO_STATUS_MAP[status],
                message: "Seu pedido foi entregue!"
            };
        case '4':
            return {
                icon: <CheckCheck className="text-green-500" size={24} />,
                text: PEDIDO_STATUS_MAP[status],
                message: "Pedido finalizado com sucesso!"
            };
        case '5':
            return {
                icon: <XCircle className="text-red-500" size={24} />,
                text: PEDIDO_STATUS_MAP[status],
                message: "Seu pedido foi cancelado."
            };
        default:
            return {
                icon: <PackageSearch className="text-gray-500" size={24} />,
                text: "Desconhecido",
                message: "Status do pedido indisponível."
            };
    }
}

type StatusFiltro = PedidoStatusType | 'all';

const abasFiltro: { id: StatusFiltro; nome: string; icon: React.ReactNode }[] = [
    { id: 'all', nome: "Todos", icon: <List size={18} /> },
    { id: '1', nome: "Processando", icon: <PackageSearch size={18} /> },
    { id: '2', nome: "Enviado", icon: <Truck size={18} /> },
    { id: '3', nome: "Entregue", icon: <Box size={18} /> },
    { id: '4', nome: "Finalizado", icon: <CheckCheck size={18} /> },
    { id: '5', nome: "Cancelado", icon: <XCircle size={18} /> },
];

function MeusPedidosClient() {
    const [pedidos, setPedidos] = useState<PedidoProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFiltro, setStatusFiltro] = useState<StatusFiltro>('all');

    useEffect(() => {
        api.get("/pedidos/")
            .then(res => setPedidos(res.data))
            .catch(err => console.error("Erro ao carregar pedidos:", err))
            .finally(() => setLoading(false));
    }, []);

    const handlePedidoCancelado = (pedidoId: number) => {
        setPedidos(currentPedidos =>
            currentPedidos.map(pedido =>
                pedido.id === pedidoId
                    ? { ...pedido, status: '5' }
                    : pedido
            )
        );

        setStatusFiltro('5');
    };

    const handleConfirmar = async (pedidoId: number) => {
        setLoading(true);
        try {
            await api.post(`/pedidos/${pedidoId}/confirmar_entrega/`);

            setPedidos(currentPedidos =>
                currentPedidos.map(pedido =>
                    pedido.id === pedidoId
                        ? { ...pedido, status: '4' } 
                        : pedido
                )
            );

            notify("Entrega confirmada com sucesso!", "success");
            setStatusFiltro('4');
        } catch (error: any) {
            notify("Erro ao confirmar entrega!", "error");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const pedidosFiltrados = pedidos.filter(pedido => {
        if (statusFiltro === 'all') return true;
        return pedido.status === statusFiltro;
    });

    return (
        <PageWrapper pageName="Meus Pedidos">
            <div className="flex flex-col 2xl:flex-row nt-sm:justify-between gap-y-5 mx-auto w-full">
                <h2 className="h2 lg:hidden">Meus Pedidos</h2>
                <section className="2xl:w-[58%] w-full 2xl:max-h-[700px] 2xl:overflow-y-auto 2xl:pr-1">
                    <LoadingContainer loading={loading}>
                        {pedidos.length > 0 ? (
                            <>
                                {/* --- ABAS DE FILTRO --- */}
                                <div className="border-b border-gray-200 mb-6 overflow-x-auto">
                                    <nav className="flex sm:space-x-6 space-x-4 whitespace-nowrap sm:max-w-full mb-lg:max-w-[390px] max-w-[350px] overflow-x-auto hide-scrollbar" aria-label="Abas de Pedidos">
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
                                    <h5>Pedido</h5>
                                    <h5>Valor</h5>
                                    <h5>Status</h5>
                                    <h5>Mensagem</h5>
                                    <h5 className="text-center">Ação</h5>
                                </div>


                                {pedidosFiltrados.length > 0 ? (
                                    pedidosFiltrados.map(pedido => {
                                        const statusInfo = getStatusInfo(pedido.status);
                                        return (
                                            <div
                                                key={pedido.id}
                                                className="grid grid-cols-1 md:grid-cols-5 gap-4 p-5 mb-5 border border-gray-200 rounded-lg shadow-sm items-center text-sm"
                                            >

                                                {/* --- Coluna Pedido (ID e Data) --- */}
                                                <div className="space-y-1">
                                                    {/* Label para mobile */}
                                                    <p className="font-bold text-dark-grey text-base">
                                                        Pedido #{pedido.id}
                                                    </p>
                                                    <p className="text-gray-500 text-xs">{formatarData(pedido.dt_hora)}</p>
                                                </div>

                                                {/* --- Coluna Valor --- */}
                                                <div className="space-y-1">
                                                    <span className="font-bold text-dark-grey md:hidden">Valor</span>
                                                    <p className="font-semibold text-base">R$ {formatarPreco(pedido.total)}</p>
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
                                                    <DetalhesPedidoModal pedido={pedido} />
                                                    {pedido.status === '1' && (
                                                        <CancelarPedidoModal pedidoId={pedido.id} onCancelSuccess={handlePedidoCancelado} />
                                                    )}
                                                    {pedido.status === '3' && (
                                                        <Button
                                                            variant="submit"
                                                            className="py-0 max-md:py-5 !text-sm"
                                                            disabled={loading}
                                                            onClick={() => pedido.id && handleConfirmar(pedido.id)}
                                                        >
                                                            {loading ? "Confirmando..." : "Confirmar Entrega"}
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <div>
                                        <p className="text-center text-gray-500 text-lg py-10">
                                            Nenhum pedido encontrado com este status.
                                        </p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <p className="notFound">Nenhum pedido realizado.</p>
                        )}
                    </LoadingContainer>
                </section>
                <FastAcess />
            </div>
        </PageWrapper>
    )
}

export default withAuth(MeusPedidosClient);