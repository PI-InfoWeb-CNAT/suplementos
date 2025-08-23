import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavLinkProps } from '@/types/index';

const NavLink = ({href = "#", icon, name}: NavLinkProps) => {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <li>
            <Link href={href} 
            className={`flex items-center gap-3 mb-lg:text-lg text-base font-semibold pl-3
            ${isActive ? 'text-green border-l-2 border-green transition-border-fast' : 'text-dark-grey hover:text-green transition-color-slow'}`}
            >
                {icon}
                {name}
            </Link>
        </li>
    );
}

export default NavLink;