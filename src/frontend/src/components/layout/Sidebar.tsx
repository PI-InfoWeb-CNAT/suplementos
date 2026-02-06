'use client';

import Link from 'next/link';
import Image from "next/image";
import { usePathname } from 'next/navigation';

import { IoHomeSharp } from "react-icons/io5";
import { BsFillLightningChargeFill, BsBasket3Fill } from "react-icons/bs";
import { FaTrophy } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { BiSolidUser } from "react-icons/bi";

import logo from '../../../public/Logo-preta-longa.webp';
import AjudaModal from '../modals/AjudaModal';
import MobileSidebar from './MobileSidebar';
import NavLink from './NavLink';

const Sidebar = () => {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');

    return (
        <>
            <MobileSidebar />

            {/* DESKTOP SIDEBAR */}
            <aside className="hidden nt-sm:flex flex-col justify-between w-max h-auto">
                <div className='flex flex-col gap-15'>
                    <Link href="/" className="block">
                        <div className="relative w-[170px] h-[40px]">
                            <Image src={logo} alt="Logo preta da PowerUP" fill sizes='170px' />
                        </div>
                    </Link>
                    <nav>
                        {!isAdminRoute ? (
                            <ul className="flex flex-col gap-6">
                                <NavLink href="/" icon={<IoHomeSharp size={24} />} name="Página Inicial" />
                                <NavLink href="/promocoes" icon={<BsFillLightningChargeFill size={24} />} name="Promoções" />
                                <NavLink href="/mais-vendidos" icon={<FaTrophy size={24} />} name="Mais Vendidos" />
                                <NavLink href="/meus-pedidos" icon={<BsBasket3Fill size={24} />} name="Meus Pedidos" />
                                <NavLink href="/meus-favoritos" icon={<FaHeart size={24} />} name="Meus Favoritos" />
                                <NavLink href="/perfil" icon={<BiSolidUser size={24} />} name="Meu Perfil" />
                            </ul>
                        ) : (
                            <ul className="flex flex-col gap-6">
                                <NavLink href="/admin" icon={<IoHomeSharp size={24} />} name="Painel Admin" />
                                <NavLink href="/admin/pedidos" icon={<BsBasket3Fill size={24} />} name="Pedidos" />
                                <NavLink href="/admin/perfil" icon={<BiSolidUser size={24} />} name="Meu Perfil" />
                            </ul>
                        )}
                    </nav>
                </div>
                <AjudaModal />
            </aside>
        </>
    )
}

export default Sidebar;