'use client';

import Link from 'next/link';
import Image from "next/image";
import { usePathname } from 'next/navigation';

import { IoHomeSharp } from "react-icons/io5";
import { BsFillLightningChargeFill, BsBasket3Fill, BsQuestionCircleFill } from "react-icons/bs";
import { FaTrophy } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { BiSolidUser } from "react-icons/bi";
import { IoIosClose, IoMdPersonAdd } from "react-icons/io";
import { MdLogin } from "react-icons/md";

import { NavLinkProps } from '@/types/index';
import logo from '../../../public/Logo-preta-longa.webp';
import { useMenu } from '@/context/MenuContext'
import AjudaModal from '../modals/AjudaModal';

const NavLink = ({href, icon, name}: NavLinkProps) => {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <li>
            <Link href={href} 
            className={`flex items-center gap-3 mb-lg:text-lg text-base font-semibold pl-3
            ${isActive ? 'text-dark-green border-l-2 border-dark-green transition-border-fast' : 'text-dark-grey hover:text-dark-green transition-color-slow'}`}
            >
                {icon}
                {name}
            </Link>
        </li>
    );
}

const Sidebar = () => {
    const { menuOpen, setMenuOpen } = useMenu()

    return (
        <>
            {/* MOBILE SIDEBAR */}
            {menuOpen && (
                <aside className="nt-sm:hidden fixed top-0 left-0 z-3 tb:w-2/5 mb-lg:w-3/5 mb:w-3/4 w-4/5 h-full bg-white flex flex-col px-10 py-15">
                    <button onClick={() => setMenuOpen(false)} className="absolute top-5 right-5 cursor-pointer">
                        <IoIosClose size={40} className="text-light-blue hover:text-white" />
                    </button>
                    <nav className='flex flex-col gap-10'>
                        <ul className="flex flex-col gap-6">
                            <NavLink href="/" icon={<IoHomeSharp className='mb-lg:text-[24px] text-[20px]' />} name="Página Inicial" />
                            <NavLink href="/promocoes" icon={<BsFillLightningChargeFill className='mb-lg:text-[24px] text-[20px]' />} name="Promoções" />
                            <NavLink href="/mais-vendidos" icon={<FaTrophy className='mb-lg:text-[24px] text-[20px]' />} name="Mais Vendidos" />
                            <NavLink href="/meus-pedidos" icon={<BsBasket3Fill className='mb-lg:text-[24px] text-[20px]' />} name="Meus Pedidos" />
                            <NavLink href="/meus-favoritos" icon={<FaHeart className='mb-lg:text-[24px] text-[20px]' />} name="Meus Favoritos" />
                            <NavLink href="/perfil" icon={<BiSolidUser className='mb-lg:text-[24px] text-[20px]' />} name="Meu Perfil" />
                        </ul>
                        <ul className="flex flex-col gap-3">
                            <NavLink href="/login" icon={<MdLogin className='mb-lg:text-[24px] text-[20px]' />} name="Entrar" />
                            <NavLink href="/cadastro" icon={<IoMdPersonAdd className='mb-lg:text-[24px] text-[20px]' />} name="Cadastrar" />
                        </ul>
                    </nav>
                </aside>
            )}

            {/* DESKTOP SIDEBAR */}
            <aside className="hidden nt-sm:flex flex-col justify-between w-max h-auto">
                <div className='flex flex-col gap-15'>
                    <Link href="/">
                        <Image src={logo} width={170} height={60} alt="Logo preta da PowerUP" />
                    </Link>
                    <nav>
                        <ul className="flex flex-col gap-6">
                            <NavLink href="/" icon={<IoHomeSharp size={24} />} name="Página Inicial" />
                            <NavLink href="/promocoes" icon={<BsFillLightningChargeFill size={24} />} name="Promoções" />
                            <NavLink href="/mais-vendidos" icon={<FaTrophy size={24} />} name="Mais Vendidos" />
                            <NavLink href="/meus-pedidos" icon={<BsBasket3Fill size={24} />} name="Meus Pedidos" />
                            <NavLink href="/meus-favoritos" icon={<FaHeart size={24} />} name="Meus Favoritos" />
                            <NavLink href="/perfil" icon={<BiSolidUser size={24} />} name="Meu Perfil" />
                        </ul>
                    </nav>
                </div>
                <AjudaModal />
            </aside>
        </>
    )
}

export default Sidebar;