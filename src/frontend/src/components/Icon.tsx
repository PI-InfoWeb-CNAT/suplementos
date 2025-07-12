import Link from 'next/link';

import { IconProps } from '@/types/index';

const Icon = ({icon, href = '#'}: IconProps) => {
    return (
        <Link href={href} className='bg-dark-grey text-light-green flex justify-center items-center w-max p-2 rounded-full hover:bg-[#2E2E2E] transition-all duration-[200ms]'>
            {icon}
        </Link>
    )
}

export default Icon;