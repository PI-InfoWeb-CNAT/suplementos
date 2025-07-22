import Link from "next/link";

import { CiHeart } from "react-icons/ci";

import { ProductProps } from "@/types/products";
import { Button } from "@/components/ui/button";
import Icon from "./Icon";

const ProductCard = ({ product }: {product: ProductProps}) => {
    return (
        <div className="relative flex flex-col tb:w-[220px] w-[200px]">
            <div className="absolute top-3 right-3 z-20">
                <Icon icon={<CiHeart className='text-[18px] tb:text-[24px]' />} />
            </div>
            <div className="z-10">
                <img
                src={product.imagem}
                alt={`Imagem do produto ${product.nome}`}
                className="rounded-3xl h-[210px] w-full object-cover"
                />
            </div>
            <div className="flex flex-col flex-grow bg-white rounded-b-3xl shadow-lg px-5 pt-12 pb-5 -mt-7 z-0">
                <div>
                    <h5 className="tb:text-xl text-lg font-semibold line-clamp-2">{product.nome}</h5>
                    <div className="flex justify-between items-center mt-2">
                        <div>
                            {product.porcentagem_desconto > 0 && (
                                <p className="text-sm line-through">{product.preco} R$</p>
                            )}
                            <p className="tb:text-xl text-lg font-semibold">
                                {product.preco_calculado.toFixed(2)} R$
                            </p>
                        </div>
                        {product.porcentagem_desconto > 0 && (
                        <div className="tb:text-base text-sm bg-dark-grey text-light-green px-2 py-1 tb:rounded-md rounded-sm">
                            {product.porcentagem_desconto}% OFF
                        </div>
                        )}
                    </div>
                </div>
                <div className="w-full flex justify-center mt-5">
                    {/* BOTÃO DO SHADCN */}
                    <Button asChild variant="submit" size="submit">
                        <Link href="#">Comprar</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;