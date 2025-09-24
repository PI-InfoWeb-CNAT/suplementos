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
            <h2 className="h2 lg:hidden">Minha Carteira</h2>
            <div className="flex flex-col nt-sm:flex-row nt-sm:justify-between gap-y-5 nt-sm:w-full tb:w-[85%] mx-auto">
                <section className="tb:w-full mb-lg:w-3/4 mb-lg:mx-auto tb:mx-0 grid xl:grid-cols-2 lg:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-x-10 gap-y-8 nt-sm:w-1/2 nt-lg:w-[57%] nt-sm:p-1 nt-sm:pr-2">
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