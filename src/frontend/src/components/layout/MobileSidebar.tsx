import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { useMenu } from "@/contexts/MenuContext";
import { useAuth } from "@/contexts/AuthContext";

import { IoIosClose } from "react-icons/io";
import { IoHomeSharp } from "react-icons/io5";
import { BsFillLightningChargeFill, BsBasket3Fill } from "react-icons/bs";
import { FaTrophy, FaHeart } from "react-icons/fa";
import { BiSolidUser } from "react-icons/bi";
import { MdLogin, MdLogout } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";

import AjudaModal from "../modals/AjudaModal";
import ExcluirContaModal from "../modals/ExcluirContaModal";
import NavLink from "./NavLink";

export default function MobileSidebar() {
    const pathname = usePathname();
    const { menuOpen, setMenuOpen } = useMenu();
    const [openExcluir, setOpenExcluir] = useState(false);
    const { isLogged, logout } = useAuth();

    const [showSidebar, setShowSidebar] = useState(false);
    const [shouldAnimate, setShouldAnimate] = useState(false);

    const isAdminRoute = pathname?.startsWith('/admin');

    useEffect(() => {
        if (menuOpen) {
            setShowSidebar(true);
            setTimeout(() => setShouldAnimate(true), 10);
        } else {
            setShouldAnimate(false);
            const timeout = setTimeout(() => setShowSidebar(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [menuOpen]);

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname, setMenuOpen]);

    return (
        <>
            {/* Overlay escuro */}
            {(menuOpen || showSidebar) && (
                <div
                    className={`fixed inset-0 bg-black z-20 transition-opacity duration-300 ease-in-out ${menuOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
                        }`}
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Sidebar com animação de entrada/saída */}
            {(menuOpen || showSidebar) && (
                <aside
                    className={`fixed top-0 left-0 z-30 h-full bg-white flex flex-col justify-between px-10 py-15 
                        tb:w-2/5 mb-lg:w-3/5 mb:w-3/4 w-4/5
                        transition-transform duration-300 ease-in-out
                        ${shouldAnimate ? 'translate-x-0' : '-translate-x-full'}
                    `}
                >
                    <button onClick={() => setMenuOpen(false)} className="absolute top-5 right-5 cursor-pointer">
                        <IoIosClose size={40} className="text-light-blue hover:text-white" />
                    </button>

                    <nav className='flex flex-col gap-10 mt-12'>

                        {!isAdminRoute ? (
                            <ul className="flex flex-col gap-6">
                                <NavLink href="/" icon={<IoHomeSharp />} name="Página Inicial" />
                                <NavLink href="/promocoes" icon={<BsFillLightningChargeFill />} name="Promoções" />
                                <NavLink href="/mais-vendidos" icon={<FaTrophy />} name="Mais Vendidos" />
                                <NavLink href="/meus-pedidos" icon={<BsBasket3Fill />} name="Meus Pedidos" />
                                <NavLink href="/meus-favoritos" icon={<FaHeart />} name="Meus Favoritos" />
                                <NavLink href="/perfil" icon={<BiSolidUser />} name="Meu Perfil" />
                            </ul>
                        ) : (
                            <ul className="flex flex-col gap-6">
                                <NavLink href="/admin" icon={<IoHomeSharp />} name="Painel Admin" />
                                <NavLink href="/admin/pedidos" icon={<BsBasket3Fill />} name="Pedidos" />
                                <NavLink href="/admin/perfil" icon={<BiSolidUser />} name="Meu Perfil" />
                            </ul>
                        )}

                        {isLogged ? (
                            <ul className="flex flex-col gap-3">
                                <div onClick={() => logout()}>
                                    <NavLink icon={<MdLogout />} name="Sair" />
                                </div>
                                <div onClick={() => setOpenExcluir(true)}>
                                    <NavLink icon={<FaRegTrashCan />} name="Excluir Conta" />
                                </div>
                            </ul>
                        ) : (
                            <ul className="flex flex-col gap-3">
                                <NavLink href="/login" icon={<MdLogin />} name="Entrar" />
                                <NavLink href="/cadastro" icon={<IoMdPersonAdd />} name="Cadastrar" />
                            </ul>
                        )}
                    </nav>

                    <AjudaModal />
                    <ExcluirContaModal open={openExcluir} onOpenChange={setOpenExcluir} />
                </aside>
            )}
        </>
    );
}