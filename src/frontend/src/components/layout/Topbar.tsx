'use client';

import Link from 'next/link';
import Image from "next/image";

import { IoMenu } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";
import { BiSolidBell } from "react-icons/bi";

import UserDropdown from '@/components/UserDropdown';
import Icon from '@/components/Icon';
import { useAuth } from '@/contexts/AuthContext';
import { useMenu } from '@/contexts/MenuContext';
import { useCarrinho } from '@/contexts/CarrinhoContext'; 
import { useNotificacao } from '@/contexts/NotificacaoContext';

const Topbar = ({ page }: { page: string }) => {
    const { setMenuOpen } = useMenu();
    const { isLogged, user, loading: authLoading } = useAuth();
    const { totalItems, isInitialized } = useCarrinho();
    const { count } = useNotificacao();

    return (
        <header className="flex items-center justify-between">
            {/* TÍTULO DO DESKTOP */}
            <h1 className="hidden nt-sm:block h1 font-bold">{page}</h1>
            {/* ÍCONE DE HAMBURGUER PARA MENU MOBILE */}
            <button className='nt-sm:hidden' onClick={() => setMenuOpen(true)}>
                <Icon icon={<IoMenu className='text-[18px] tb:text-[22px]' />} />
            </button>
            {/* LOGO PARA MOBILE */}
            <Link href='/' className='nt-sm:hidden relative w-[130px] h-[30px] mb-lg:w-[150px] mb-lg:h-[35px] tb:w-[170px] tb:h-[40px] cursor-pointer'>
                <Image src="/Logo-preta-longa.webp" fill alt="Logo preta da PowerUP" />
            </Link>
            <div className='flex items-center gap-2'>
                <div className='relative mr-2'>
                    {isInitialized && (
                        <>
                            <Icon icon={<IoMdCart className='text-[18px] tb:text-[22px]' />} href="/carrinho" />
                            {totalItems > 0 && (
                                <span className="tb:w-6 tb:h-6 w-5 h-5 flex justify-center items-center absolute -top-2 -right-2 bg-red-500 text-white tb:text-sm text-xs font-semibold px-1.5 py-0.5 rounded-full">
                                    {totalItems}
                                </span>
                            )}
                        </>
                    )}
                </div>

                {authLoading ? (
                    null
                ) : isLogged && user ? (
                    <>
                        <div className='relative mr-2'>
                            <Icon icon={<BiSolidBell className='text-[18px] tb:text-[22px]' />} href="/notificacoes" />
                            {count > 0 && (
                                <span className="tb:w-6 tb:h-6 w-5 h-5 flex justify-center items-center absolute -top-2 -right-2 bg-red-500 text-white tb:text-sm text-xs font-semibold px-1.5 py-0.5 rounded-full">
                                    {count}
                                </span>
                            )}
                        </div>
                        <div className='hidden nt-sm:block'>
                            <UserDropdown user={user} />
                        </div>
                    </>
                ) : (
                    <div className='hidden nt-sm:flex items-center gap-2'>
                        <Link href="/login" className=" bg-dark-grey py-2 px-4 font-medium text-white text-base rounded-tl-[10px] rounded-br-[10px] hover:text-light-green transition-color-slow">
                            Entrar
                        </Link>
                        <Link href="/cadastro" className=" bg-dark-grey py-2 px-4 font-medium text-white text-base rounded-tl-[10px] rounded-br-[10px] hover:text-light-green transition-color-slow">
                            Cadastrar
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Topbar;