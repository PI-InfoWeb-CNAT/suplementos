'use client';

import { useEffect, useState } from "react";
import api from "@/services/api";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { toast } from "sonner";
import { PedidoProps } from "@/types";
import { formatarData } from "@/lib/utils";
import PageWrapper from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import AdminDetalhesPedidoModal from "@/components/modals/pedido/AdminDetalhesPedidoModal";

export default function PedidosAdmin() {
    const [pedidos, setPedidos] = useState<PedidoProps[]>([]);
    const [loading, setLoading] = useState(true);

    const STATUS_MAP = {
        '1': 'Processando',
        '2': 'Enviado',
        '3': 'Entregue',
        '4': 'Finalizado',
        '5': 'Cancelado'
    };

    useEffect(() => {
        fetchPedidos();
    }, []);

    const fetchPedidos = async () => {
        try {
            const response = await api.get('/pedidos/');
            setPedidos(response.data);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
            toast.error("Erro ao carregar pedidos.");
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value: number | string) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(Number(value));
    };

    if (loading) return (
        <div className="flex justify-center items-center h-[50vh]">
            <LoadingSpinner />
        </div>
    );

    return (
        <PageWrapper pageName="Pedidos">
            <section className="w-full">
                {/* Desktop View */}
                <div className="hidden sm:block bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#333] text-white">
                                <tr>
                                    <th className="p-4 font-semibold text-center border-r border-gray-600">ID</th>
                                    <th className="p-4 font-semibold text-center border-r border-gray-600">Usuário</th>
                                    <th className="p-4 font-semibold text-center border-r border-gray-600">Total</th>
                                    <th className="p-4 font-semibold text-center border-r border-gray-600">Status</th>
                                    <th className="p-4 font-semibold text-center border-r border-gray-600">Data/Hora</th>
                                    <th className="p-4 font-semibold text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidos.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-gray-500 italic">
                                            Nenhum pedido encontrado.
                                        </td>
                                    </tr>
                                ) : (
                                    pedidos.map((pedido) => (
                                        <tr key={pedido.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="p-4 text-center text-gray-600 font-medium border-r border-gray-100">
                                                {pedido.id}
                                            </td>
                                            <td className="p-4 text-center text-gray-800 font-medium border-r border-gray-100">
                                                {pedido.user_nome || "-"}
                                            </td>
                                            <td className="p-4 text-center text-gray-800 font-medium border-r border-gray-100">
                                                {formatCurrency(pedido.total)}
                                            </td>
                                            <td className="p-4 text-center text-gray-600 border-r border-gray-100">
                                                {STATUS_MAP[pedido.status as keyof typeof STATUS_MAP] || pedido.status}
                                            </td>
                                            <td className="p-4 text-center text-gray-600 border-r border-gray-100">
                                                {formatarData(pedido.dt_hora)}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col gap-2 xl:flex-row items-center justify-center">
                                                    <AdminDetalhesPedidoModal pedido={pedido} />
                                                    <Button className="max-xl:w-full bg-dark-grey text-light-green text-base cursor-pointer">
                                                        Editar
                                                    </Button>
                                                    <Button className="max-xl:w-full bg-[#FF360A] hover:bg-[#CC2D08] text-white text-base cursor-pointer">
                                                        Excluir
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile View */}
                <div className="sm:hidden space-y-4">
                    {pedidos.length === 0 ? (
                        <div className="bg-white p-8 rounded-lg shadow border border-gray-200 text-center text-gray-500 italic">
                            Nenhum pedido encontrado.
                        </div>
                    ) : (
                        pedidos.map((pedido) => (
                            <div key={pedido.id} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                                <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                                    <span className="font-bold text-gray-800">#{pedido.id}</span>
                                    <span className="text-sm font-medium px-2 py-1 rounded bg-gray-100 text-gray-600">
                                        {STATUS_MAP[pedido.status as keyof typeof STATUS_MAP] || pedido.status}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Usuário:</span>
                                        <span className="font-medium text-gray-800">{pedido.user_nome || "-"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Total:</span>
                                        <span className="font-medium text-gray-800">{formatCurrency(pedido.total)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Data:</span>
                                        <span className="font-medium text-gray-800">{formatarData(pedido.dt_hora)}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-2 pt-2 border-t border-gray-100">
                                    <AdminDetalhesPedidoModal pedido={pedido} />
                                    <Button className="w-full bg-dark-grey text-light-green text-base cursor-pointer">
                                        Editar
                                    </Button>
                                    <Button className="w-full bg-[#FF360A] hover:bg-[#CC2D08] text-white text-base cursor-pointer">
                                        Excluir
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </PageWrapper>
    );
}
