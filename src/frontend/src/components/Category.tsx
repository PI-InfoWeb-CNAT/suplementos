import Link from "next/link";
import { CategoryProps } from "@/types/index";

const Category = ({href, icon, name, isEven}: CategoryProps) => {
  return (
    <Link href={`/categorias/${href}`} className={`group flex justify-center items-center gap-5 w-full mb-lg:w-[45%] nt-lg:w-[48%] dt:w-1/5 h-15 mb-lg:h-20 text-base md:text-xl text-white p-4 rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.6)] transition-all duration-300 ${isEven ? 'bg-dark-grey hover:bg-[#2E2E2E]' : 'bg-dark-green hover:bg-[#17A300]'}`}>
        {icon}
        {name}
    </Link>
  )
}

export default Category;