import Link from "next/link";
import { usePathname } from 'next/navigation';
import { CardLinkProps } from "@/types";

const CardLink = ({ href, icon, text }: CardLinkProps) => {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link href={href} className="flex flex-col items-center gap-1 group">
            <div 
            className={`flex justify-center items-center nt-lg:w-[110px] nt-lg:h-[110px] nt-sm:w-[100px] nt-sm:h-[100px] w-[110px] h-[110px] rounded-md
            ${isActive ? 'bg-dark-grey text-light-green' : 'bg-light-grey text-dark-grey group-hover:bg-dark-grey group-hover:text-light-green transition-color-slow'}`}>
                {icon}
            </div>
            <p className="text-dark-grey nt-lg:text-lg text-center font-medium">{text}</p>
        </Link>
    )
}

export default CardLink;