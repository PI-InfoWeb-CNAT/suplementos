'use client'

import FastAcess from "@/components/FastAcess";
import PageWrapper from "@/components/layout/PageWrapper";
import LoadingContainer from "@/components/loading/LoadingContainer";
import AddCartaoModal from "@/components/modals/cartao/AddCartaoModal";
import CartaoCard from "@/components/CartaoCard";
import { useCartoes } from "@/contexts/CartaoContext";
import withAuth from "@/lib/withAuth"

function CarteiraClient() {
    const { cartoes, loading } = useCartoes();

    return (
        <PageWrapper pageName="Minha Carteira">
            <div className="flex flex-col nt-sm:flex-row nt-sm:justify-between gap-y-5 nt-sm:w-full tb:w-[85%] mx-auto">
                <section className="grid nt-lg:grid-cols-2 nt-sm:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-x-10 gap-y-8 nt-sm:w-1/2 nt-lg:w-[57%] nt-sm:max-h-[1100px] nt-sm:overflow-y-auto nt-sm:p-1 nt-sm:pr-2">
                    <LoadingContainer loading={loading}>
                        {cartoes.map((cartao) => (
                            <CartaoCard key={cartao.id} cartao={cartao}/>
                        ))}
                        <AddCartaoModal />
                    </LoadingContainer>
                </section>
                <FastAcess />
            </div>
        </PageWrapper>
    )
}

export default withAuth(CarteiraClient);