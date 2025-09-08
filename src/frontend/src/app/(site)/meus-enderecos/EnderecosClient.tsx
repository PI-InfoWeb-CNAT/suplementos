'use client';

import FastAcess from "@/components/FastAcess";
import PageWrapper from "@/components/layout/PageWrapper";
import withAuth from "@/lib/withAuth";

function EnderecosClient() {
    return (
        <PageWrapper pageName="Meus Endereços">
            <div className="flex flex-col nt-sm:flex-row nt-sm:justify-between gap-y-5 lg:w-full md:w-[65%] mx-auto">
                <section className="flex flex-wrap">

                </section>
                <FastAcess />
            </div>
        </PageWrapper>
    )
}

export default withAuth(EnderecosClient);