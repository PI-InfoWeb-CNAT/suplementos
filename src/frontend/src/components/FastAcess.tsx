import { BiSolidUser } from "react-icons/bi";
import { BsBasket3Fill } from "react-icons/bs";
import { FaHeart, FaLocationDot } from "react-icons/fa6";
import { IoWalletOutline } from "react-icons/io5";
import { MdReplay, MdAssignmentReturn } from "react-icons/md";

import CardLink from "./CardLink";

const FastAcess = () => {
    return (
        <section className="space-y-5 tb:w-4/5 nt-sm:w-[45%] nt-lg:w-[37%]">
            <h3 className="h3 nt-lg:ml-4"> Acesso Rápido</h3>
            <div className="grid mb-lg:grid-cols-3 grid-cols-2 gap-x-8 gap-y-7">
                <CardLink href="/perfil" icon={<BiSolidUser size={55}/>} text="Meu Perfil"/>
                <CardLink href="/meus-pedidos" icon={<BsBasket3Fill size={45}/>} text="Meus Pedidos"/>
                <CardLink href="/minhas-devolucoes" icon={<MdAssignmentReturn size={45}/>} text="Minhas Devoluções"/>
                <CardLink href="/perfil/meus-enderecos" icon={<FaLocationDot size={45}/>} text="Meus Endereços"/>
                <CardLink href="/perfil/minha-carteira" icon={<IoWalletOutline size={50}/>} text="Minha Carteira"/>
                <CardLink href="/comprar-novamente" icon={<MdReplay size={50}/>} text="Comprar Novamente"/>
            </div>
        </section>
    )
}

export default FastAcess;