'use client';

import FastAcess from "@/components/FastAcess";
import PageWrapper from "@/components/layout/PageWrapper";
import AddEnderecoModal from "@/components/modals/AddEnderecoModal";
import withAuth from "@/lib/withAuth";

function EnderecosClient() {
    return (
        <PageWrapper pageName="Meus Endereços">
            <div className="flex flex-col nt-sm:flex-row nt-sm:justify-between gap-y-5 nt-sm:w-full tb:w-[65%] mx-auto">
                <section className="flex flex-wrap gap-x-10 gap-y-15 nt-sm:w-1/2 nt-lg:w-[57%]">
                    <AddEnderecoModal />
                </section>
                <FastAcess />
            </div>
        </PageWrapper>
    )
}

export default withAuth(EnderecosClient);