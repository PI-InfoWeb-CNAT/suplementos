import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';

import { FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import logo from '../../../public/Logo-branca-longa.webp';

const Footer = () => {
    const pathname = usePathname()

    const links = [
        { href: '/', label: 'Página Inicial' },
        { href: '/promocoes', label: 'Promoções' },
        { href: '/mais-vendidos', label: 'Mais Vendidos' },
        { href: '/meus-favoritos', label: 'Meus Favoritos' },
        { href: '/meus-pedidos', label: 'Meus Pedidos' },
        { href: '/perfil', label: 'Meu Perfil' },
    ]

    return (
        <footer className="w-full flex flex-col md:flex-row gap-y-10 justify-between items-center bodyPadding py-10 bg-dark-grey text-white rounded-t-[15px]">
            <Image src={logo} width={170} height={60} alt="Logo branca da PowerUP" className="w-auto h-auto"/>
            <nav className="w-full flex justify-center">
                <ul className="md:w-[80%] xl:w-full flex flex-wrap justify-center items-center gap-x-10 gap-y-5 text-base lg:text-lg">
                    {links.map(link => (
                        <li key={link.href}>
                            <Link href={link.href} className={`hover:text-light-green transition-all duration-300 ${pathname === link.href ? 'text-light-green' : 'text-white'}`}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="flex items-center gap-8">
                <Link href="" target="_blank" className="hover:text-light-green transition-all duration-300">
                    <FaInstagram size={28} />
                </Link>
                <Link href="" target="_blank" className="hover:text-light-green transition-all duration-300">
                    <FaTiktok size={24} />
                </Link>
                <Link href="" target="_blank" className="hover:text-light-green transition-all duration-300">
                    <FaXTwitter size={24} />
                </Link>
            </div>
        </footer>
    )
}

export default Footer;