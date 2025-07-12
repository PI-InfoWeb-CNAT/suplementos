'use client';

import { FaMagnifyingGlass, FaBottleWater, FaShirt } from "react-icons/fa6";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { GiKnifeFork } from "react-icons/gi";
import { FaChevronDown } from "react-icons/fa";

import Category from "@/components/Category";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import ProductCard from "@/components/ProductCard";
import { useProdutos } from '@/context/ProductContext';
import LoadingSpinner from "@/components/LoadingSpinner";

export default function HomeClient() { 
    const { produtos, loading } = useProdutos()
    
    return (
        <>
            <section>
                <form action="">
                    <div className="relative">
                        <input type="text" placeholder="Encontre o seu produto" className="bg-dark-grey text-white text-sm mb-lg:text-base w-full mb-lg:px-15 px-12 py-3 outline-none rounded-lg"/>
                        <button className="cursor-pointer absolute left-0 mb-lg:top-[25%] top-[28%] ml-3 text-light-green mb-lg:text-2xl text-xl">
                            <FaMagnifyingGlass />
                        </button>
                    </div>
                </form>
            </section>
            <section className="slides">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem>
                            <img
                            src="/carrossel/imagem1_carrossel.webp"
                            alt="Imagem 1"
                            className="w-full object-cover nt-sm:rounded-[30px] mb:rounded-[15px] rounded-[10px]"
                            />
                        </CarouselItem>
                        <CarouselItem>
                            <img
                            src="/carrossel/imagem2_carrossel.webp"
                            alt="Imagem 2"
                            className="w-full object-cover nt-sm:rounded-[30px] mb:rounded-[15px] rounded-[10px]"
                            />
                        </CarouselItem>
                        <CarouselItem>
                            <img
                            src="/carrossel/imagem3_carrossel.webp"
                            alt="Imagem 3"
                            className="w-full object-cover nt-sm:rounded-[30px] mb:rounded-[15px] rounded-[10px]"
                            />
                        </CarouselItem>
                        <CarouselItem>
                            <img
                            src="/carrossel/imagem4_carrossel.webp"
                            alt="Imagem 4"
                            className="w-full object-cover nt-sm:rounded-[30px] mb:rounded-[15px] rounded-[10px]"
                            />
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </section>
            <div className="space-y-20">
                <section className="space-y-8">
                    <h2 className="h2">Categorias</h2>
                    <div className="flex justify-between items-center flex-wrap gap-y-5">
                        <Category href="acessorios" icon={<FaBottleWater className="text-light-green text-3xl md:text-4xl" />} name="Acessórios" isEven={true} />
                        <Category href="alimentos" icon={<GiKnifeFork className="text-black text-3xl md:text-4xl" />} name="Alimentos" isEven={false} />
                        <Category href="roupas" icon={<FaShirt className="text-light-green text-3xl md:text-4xl" />} name="Roupas" isEven={true} />
                        <Category href="suplementos" icon={<BsFillLightningChargeFill className="text-black text-3xl md:text-4xl" />} name="Suplementos" isEven={false} />
                    </div>
                </section>
                <section className="space-y-8">
                    <div className="flex justify-between items-center">
                        <h2 className="h2">Ofertas Especiais</h2>
                        <a href="/promocoes" className="group flex items-center gap-2">
                            <p className="font-bold tb:text-lg">Ver mais</p>
                            <FaChevronDown className="text-dark-green text-lg mb-lg:text-xl rotate-180-smooth" />
                        </a>
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <div className="productsContainer">
                            {produtos.map(produto => (
                                produto.porcentagem_desconto > 0 && (
                                    <ProductCard key={produto.id} product={produto} />
                                )
                            ))}
                        </div>
                    )}
                </section>
                <section className="space-y-8">
                    <div className="flex justify-between items-center">
                        <h2 className="h2">Mais Vendidos</h2>
                        <a href="/promocoes" className="group flex items-center gap-2">
                            <p className="font-bold tb:text-lg">Ver mais</p>
                            <FaChevronDown className="text-dark-green text-lg mb-lg:text-xl rotate-180-smooth" />
                        </a>
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <div className="productsContainer">
                            {produtos.map(produto => (
                                <ProductCard key={produto.id} product={produto} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}