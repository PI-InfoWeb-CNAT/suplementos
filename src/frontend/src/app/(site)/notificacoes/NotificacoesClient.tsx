'use client';
import { useEffect, useState } from 'react';

import FastAcess from "@/components/FastAcess";
import PageWrapper from "@/components/layout/PageWrapper";
import LoadingContainer from "@/components/loading/LoadingContainer";
import withAuth from "@/lib/withAuth";
import api from '@/services/api';
import { useNotificacao } from '@/contexts/NotificacaoContext'; 
import { Notificacao } from '@/types/notificacao';
import NotificacaoCard from '@/components/NotificacaoCard';

function NotificacoesClient() {
    const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
    const [loading, setLoading] = useState(true);
    
    const { atualizarContador } = useNotificacao();

    useEffect(() => {
        const fetchNotificacoes = async () => {
            try {
                const response = await api.get('/notificacoes/');
                setNotificacoes(response.data);
                
                atualizarContador();
                
            } catch (error) {
                console.error("Erro ao carregar notificações", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotificacoes();
    }, [atualizarContador]);

    return (
        <PageWrapper pageName="Notificações">
            <div className="flex flex-col 2xl:flex-row nt-sm:justify-between gap-y-5 mx-auto w-full">
                <section className="2xl:w-[58%] w-full">
                    <h2 className="h2 mb-6 lg:hidden">Notificações</h2>
                    
                    <LoadingContainer loading={loading}>
                        {notificacoes.length > 0 ? (
                            <div className="bg-white rounded-lg card-shadow overflow-hidden">
                                {notificacoes.map((notificacao) => (
                                    <NotificacaoCard key={notificacao.id} notificacao={notificacao} />
                                ))}
                            </div>
                        ) : (
                            <p className="notFound">Sem notificações.</p>
                        )}
                    </LoadingContainer>
                </section>

                <FastAcess />
            </div>
        </PageWrapper>
    )
}

export default withAuth(NotificacoesClient);