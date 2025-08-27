'use client';

import imgEdit from "../../../../public/img-editar.svg"

import PageWrapper from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import { BiSolidUser } from "react-icons/bi";
import { BsBasket3Fill } from "react-icons/bs";
import { FaHeart, FaLocationDot } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";
import { MdReplay } from "react-icons/md";

interface CardLinkProps {
    href: string;
    icon: React.ReactNode;
    text: string;
}

const CardLink = ({ href, icon, text }: CardLinkProps) => {
    return (
        <Link href={href} className="flex flex-col items-center gap-1 group">
            <div className="flex justify-center items-center w-[110px] h-[110px] bg-light-grey text-dark-grey rounded-md group-hover:bg-dark-grey group-hover:text-light-green transition-color-slow">
                {icon}
            </div>
            <p className="text-dark-grey text-lg text-center font-medium">{text}</p>
        </Link>
    )
}

export default function PerfilClient() {
    return (
        <PageWrapper pageName="Meu Perfil">
            <div className="flex justify-between">
                <section className="flex justify-between rounded-2xl shadow-[0_0_5px_rgba(0,0,0,0.41)] w-[57%] p-6">
                    <div className="flex flex-col gap-8 w-[60%]">
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
                            <label htmlFor="nome" className="flex items-center space-x-2 w-3/5 text-lg">
                                <strong>CPF:</strong>
                                <input type="text" name="nome" id="nome" className="input py-0.5 rounded-sm w-full"/>
                            </label>
                            <label htmlFor="nome" className="flex items-center space-x-2 w-3/4 text-lg">
                                <strong>Telefone:</strong>
                                <input type="text" name="nome" id="nome" className="input py-0.5 rounded-sm w-full"/>
                            </label>
                            <div className="flex gap-8 mt-4">
                                <Button variant="submit" size="submit">
                                    Atualizar
                                </Button>
                                <Button variant="close" size="close">
                                    Redefinir senha
                                </Button>
                            </div>
                        </form>
                    </div>
                    <Image src={imgEdit} width={225} alt="Imagem de editar" priority />
                </section>
                <section className="space-y-5 w-[37%]">
                    <h3 className="h3 ml-4"> Mais Opções</h3>
                    <div className="grid grid-cols-3 gap-x-8 gap-y-7">
                        <CardLink href="/perfil" icon={<BiSolidUser size={55}/>} text="Meu Perfil"/>
                        <CardLink href="/meus-pedidos" icon={<BsBasket3Fill size={45}/>} text="Meus Pedidos"/>
                        <CardLink href="/meus-favoritos" icon={<FaHeart size={45}/>} text="Meus Favoritos"/>
                        <CardLink href="/meus-enderecos" icon={<FaLocationDot size={45}/>} text="Meus Endereços"/>
                        <CardLink href="/minha-carteira" icon={<IoWalletOutline size={50}/>} text="Minha Carteira"/>
                        <CardLink href="/comprar-novamente" icon={<MdReplay size={50}/>} text="Comprar Novamente"/>
                    </div>
                </section>
            </div>
        </PageWrapper>
    );
}
