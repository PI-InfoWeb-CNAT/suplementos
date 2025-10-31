'use client';
import { useState, useEffect } from "react";
import Link from 'next/link'; 
import { PackageSearch, Truck, Box, CheckCheck } from 'lucide-react';

import FastAcess from "@/components/FastAcess";
import PageWrapper from "@/components/layout/PageWrapper";
import LoadingContainer from "@/components/loading/LoadingContainer";
import withAuth from "@/lib/withAuth";
import { PedidoProps, PEDIDO_STATUS_MAP, PedidoStatusType } from "@/types/pedido"; 
import api from "@/services/api";
import { formatarData, formatarPreco } from "@/lib/utils"; 
import { Button } from "@/components/ui/button"; 

const getStatusInfo = (status: PedidoStatusType) => {
    switch (status) {
        case '1': 
            return {
                icon: <PackageSearch className="text-yellow-500" size={24} />,
                text: PEDIDO_STATUS_MAP[status],
                message: "Seu pedido está sendo preparado."
            };
        case '2': // Enviado
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
        case '4': // Recebido
            return {
                icon: <CheckCheck className="text-green-500" size={24} />,
                text: PEDIDO_STATUS_MAP[status],
                message: "Pedido recebido com sucesso!"
            };
        default:
            return {
                icon: <PackageSearch className="text-gray-500" size={24} />,
                text: "Desconhecido",
                message: "Status do pedido indisponível."
            };
    }
}

function MeusPedidosClient() {
    const [pedidos, setPedidos] = useState<PedidoProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/pedidos/") 
            .then(res => setPedidos(res.data))
            .catch(err => console.error("Erro ao carregar pedidos:", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <PageWrapper pageName="Meus Pedidos">
            <div className="flex flex-col 2xl:flex-row nt-sm:justify-between gap-y-5 mx-auto">
                <h2 className="h2 lg:hidden">Meus Pedidos</h2>
                <section className="2xl:w-[58%] w-full">
                    <LoadingContainer loading={loading}>
                        {pedidos.length > 0 ? (
                            <>

                                <div className="hidden md:grid grid-cols-5 gap-4 p-4 font-bold text-gray-600 items-center">
                                    <h5>Pedido</h5>
                                    <h5>Valor</h5>
                                    <h5>Status</h5>
                                    <h5>Mensagem</h5>
                                    <h5 className="text-center">Ação</h5>
                                </div>

                                {pedidos.map(pedido => {
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
                                            <div className="text-center flex flex-col max-md:w-50 gap-3">
                                                <Button variant="submit" size="sm" className="px-3 py-0 !text-sm">
                                                    Ver detalhes
                                                </Button>
                                                {pedido.status === '1' && (
                                                    <Button variant="destructive" size="sm" className="cursor-pointer">
                                                        Cancelar pedido
                                                    </Button>
                                                )}
                                                {pedido.status === '3' && (
                                                    <Button variant="submit" size="sm" className="px-3 py-0 !text-sm">
                                                        Confirmar entrega
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
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