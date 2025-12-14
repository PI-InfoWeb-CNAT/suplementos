'use client';

import { useEffect, useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import withAuth from "@/lib/withAuth";
import api from "@/services/api";
import { notify } from "@/lib/toast";
import { DashboardData } from "@/types";

import { LotesVencidos } from "@/components/tabelas/LotesVencidos";
import { LotesProximosVencimentos } from "@/components/tabelas/LotesProximosVencimentos";

function AdminClient() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/lote/alerta/');
                setData(response.data);
            } catch (error) {
                console.error("Erro ao buscar alertas de estoque:", error);
                notify("Erro ao carregar dados do painel.", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <PageWrapper pageName="Página do Admin">
                <div className="flex justify-center items-center h-64">
                    <p className="text-xl text-gray-500 animate-pulse">Carregando painel...</p>
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper pageName="Painel Administrativo">
            <div className="space-y-12">
                
                {/* Tabela de Vencidos */}
                {data && (
                    <LotesVencidos 
                        dados={data.vencidos} 
                        total={data.resumo.total_vencidos} 
                    />
                )}

                {/* Tabela de Próximos */}
                {data && (
                    <LotesProximosVencimentos
                        dados={data.proximos_vencimento} 
                        total={data.resumo.total_proximos} 
                    />
                )}
                
                {/* Aqui você pode adicionar outras tabelas futuramente */}
                {/* <TabelaMaisVendidos /> */}

            </div>
        </PageWrapper>
    )
}

export default withAuth(AdminClient);