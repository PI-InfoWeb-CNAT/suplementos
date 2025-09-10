'use client';
import { useEffect, useState } from "react";

import FastAcess from "@/components/FastAcess";
import PageWrapper from "@/components/layout/PageWrapper";
import AddEnderecoModal from "@/components/modals/AddEnderecoModal";
import withAuth from "@/lib/withAuth";
import api from "@/services/api";
import { EnderecoProps } from "@/types/endereco";
import EnderecoCard from "@/components/EnderecoCard";

function EnderecosClient() {
    const [enderecos, setEnderecos] = useState<EnderecoProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.get("/enderecos/")
            .then(res => {
                setEnderecos(res.data);
            })
            .catch(err => console.error("Erro ao carregar endereços do cliente:", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <PageWrapper pageName="Meus Endereços">
            <div className="flex flex-col nt-sm:flex-row nt-sm:justify-between gap-y-5 nt-sm:w-full tb:w-[65%] mx-auto">
                <section className="flex flex-wrap gap-x-10 gap-y-12 nt-sm:w-1/2 nt-lg:w-[57%]">

                    {enderecos.map((endereco) => (
                        <EnderecoCard key={endereco.id} endereco={endereco}/>
                    ))}
                    <AddEnderecoModal onSuccess={(novoEndereco) => setEnderecos(prev => [...prev, novoEndereco])} />
                </section>
                <FastAcess />
            </div>
        </PageWrapper>
    )
}

export default withAuth(EnderecosClient);