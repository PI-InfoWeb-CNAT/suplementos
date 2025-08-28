'use client';

import FastAcess from "@/components/FastAcess";
import imgEdit from "../../../../public/img-editar.svg"

import PageWrapper from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import withAuth from "@/lib/withAuth";

function PerfilClient() {
    return (
        <PageWrapper pageName="Meu Perfil">
            <div className="flex flex-col nt-sm:flex-row nt-sm:justify-between gap-y-5">
                <section className="flex justify-between rounded-2xl shadow-[0_0_5px_rgba(0,0,0,0.41)] nt-sm:w-1/2 nt-lg:w-[57%] p-6">
                    <div className="flex flex-col gap-8 w-full nt-lg:w-[60%]">
                        <h3 className="h3">Dados Pessoais</h3>
                        <form className="flex flex-col gap-6 w-full">
                            <label htmlFor="nome" className="flex items-center space-x-2 w-full text-lg">
                                <strong>Nome:</strong>
                                <input type="text" name="nome" id="nome" className="input py-0.5 rounded-sm w-full"/>
                            </label>
                            <label htmlFor="nome" className="flex items-center space-x-2 w-full text-lg">
                                <strong>Email:</strong>
                                <input type="text" name="nome" id="nome" className="input py-0.5 rounded-sm w-full"/>
                            </label>
                            <label htmlFor="nome" className="flex items-center space-x-2 mb-lg:w-3/5 text-lg">
                                <strong>CPF:</strong>
                                <input type="text" name="nome" id="nome" className="input py-0.5 rounded-sm w-full"/>
                            </label>
                            <label htmlFor="nome" className="flex items-center space-x-2 mb-lg:w-3/4 text-lg">
                                <strong>Telefone:</strong>
                                <input type="text" name="nome" id="nome" className="input py-0.5 rounded-sm w-full"/>
                            </label>
                            <div className="flex nt-lg:flex-row nt-sm:flex-col mb-lg:flex-row flex-col tb:gap-x-8 gap-x-4 gap-y-4 nt-lg:w-auto w-[180px] mt-4">
                                <Button variant="submit" size="submit">
                                    Atualizar
                                </Button>
                                <Button variant="close" size="close">
                                    Redefinir senha
                                </Button>
                            </div>
                        </form>
                    </div>
                    <Image src={imgEdit} width={225} alt="Imagem de editar" priority className="hidden nt-lg:block"/>
                </section>
                <FastAcess />
            </div>
        </PageWrapper>
    );
}


export default withAuth(PerfilClient);