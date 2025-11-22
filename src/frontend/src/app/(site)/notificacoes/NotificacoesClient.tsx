'use client';
import { useEffect, useState } from 'react';

import FastAcess from "@/components/FastAcess";
import PageWrapper from "@/components/layout/PageWrapper";
import LoadingContainer from "@/components/loading/LoadingContainer";
import NotificacaoCard from '@/components/NotificacaoCard';
import api from '@/services/api';
import { useNotificacao } from '@/contexts/NotificacaoContext'; 
import { Notificacao } from '@/types/notificacao';
import withAuth from "@/lib/withAuth";
import { notify } from "@/lib/toast";

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

    const handleLimparNotificacoes = async () => {
        try {
            await api.delete('/notificacoes/limpar_notificacoes/');
            
            setNotificacoes([]);
            
            notify("Todas as notificações foram removidas com sucesso.", "success");
        } catch (error) {
            console.error("Erro ao limpar notificações", error);
            notify("Erro ao limpar notificações.", "error");
        }
    };

    return (
        <PageWrapper pageName="Notificações">
            <div className="flex flex-col 2xl:flex-row nt-sm:justify-between gap-y-5 mx-auto w-full">
                <section className="2xl:w-[58%] w-full">
                    <h2 className="h2 mb-6 lg:hidden">Notificações</h2>
                    
                    <LoadingContainer loading={loading}>
                        {notificacoes.length > 0 ? (
                            <div className='flex flex-col gap-3 items-end'>
                                <button onClick={handleLimparNotificacoes}>
                                    <p className='text-gray text-sm hover:underline cursor-pointer'>Limpar todas as notificações</p>
                                </button>
                                
                                <div className="2xl:max-h-[700px] overflow-auto p-1 pr-2 space-y-5">
                                    {notificacoes.map((notificacao) => (
                                        <NotificacaoCard key={notificacao.id} notificacao={notificacao} />
                                    ))}
                                </div>
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