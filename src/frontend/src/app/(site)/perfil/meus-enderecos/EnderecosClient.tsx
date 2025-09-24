'use client';

import FastAcess from "@/components/FastAcess";
import PageWrapper from "@/components/layout/PageWrapper";
import AddEnderecoModal from "@/components/modals/endereco/AddEnderecoModal";
import withAuth from "@/lib/withAuth";
import EnderecoCard from "@/components/EnderecoCard";
import { useEnderecos } from "@/contexts/EnderecoContext";
import LoadingContainer from "@/components/loading/LoadingContainer";

function EnderecosClient() {
    const { enderecos, loading } = useEnderecos();

    return (
        <PageWrapper pageName="Meus Endereços">
            <h2 className="h2 lg:hidden">Meus Endereços</h2>
            <div className="flex flex-col nt-sm:flex-row nt-sm:justify-between gap-y-5 nt-sm:w-full tb:w-[85%] mx-auto">
                <section className="grid xl:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-x-10 gap-y-8 nt-sm:w-1/2 nt-lg:w-[57%] nt-sm:max-h-[1100px] nt-sm:overflow-y-auto nt-sm:p-1 nt-sm:pr-2">
                    <LoadingContainer loading={loading}>
                        {enderecos.map((endereco) => (
                            <EnderecoCard key={endereco.id} endereco={endereco}/>
                        ))}
                        <AddEnderecoModal />
                    </LoadingContainer>
                </section>
                <FastAcess />
            </div>
        </PageWrapper>
    )
}

export default withAuth(EnderecosClient);