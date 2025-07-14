'use client';

import { useState, useEffect } from 'react';
import { FaMagnifyingGlass, FaBottleWater, FaShirt } from "react-icons/fa6";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { GiKnifeFork } from "react-icons/gi";
import { FaChevronDown } from "react-icons/fa";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Category from "@/components/Category";
import ProductCard from "@/components/ProductCard";
import { useProdutos } from '@/context/ProductContext';
import LoadingSpinner from "@/components/LoadingSpinner";
import { ProductProps } from '@/types/products';

export default function HomeClient() {
    const { produtos, loading } = useProdutos();
    const [pesquisarProduto, setPesquisarProduto] = useState('');
    const [resultado, setResultado] = useState<ProductProps[]>([]);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const pesquisa = pesquisarProduto.toLowerCase().trim();

        setResultado([]);
        
        if (pesquisa === '') {
            setShowResults(false);
        return;
        }

        const resultados = produtos.filter(produto =>
            produto.nome.toLowerCase().includes(pesquisa)
        );

        setResultado(resultados);
        setShowResults(true);
    };

    useEffect(() => {
        if (pesquisarProduto === '') {
            setShowResults(false);
        } 
    }, [pesquisarProduto]);

    return (
        <>
            <section>
                <form onSubmit={handleSearch}>
                    <div className="relative">
                        <input
                        type="text"
                        placeholder="Encontre o seu produto"
                        value={pesquisarProduto}
                        onChange={(e) => setPesquisarProduto(e.target.value)}
                        className="bg-dark-grey text-white text-sm mb-lg:text-base w-full mb-lg:px-15 px-12 py-3 outline-none rounded-lg"
                        />
                        <button
                        type="submit"
                        className="cursor-pointer absolute left-0 mb-lg:top-[25%] top-[28%] ml-3 text-light-green mb-lg:text-2xl text-xl"
                        >
                            <FaMagnifyingGlass />
                        </button>
                    </div>
                </form>
            </section>

            {showResults ? (
                // SEÇÃO DO RESULTADO DA PESQUISA 
                <section className="space-y-8 mt-2">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <LoadingSpinner />
                        </div>
                    ) : resultado.length > 0 ? (
                        <div className="productsContainer">
                            {resultado.map(produto => (
                                <ProductCard key={produto.id} product={produto} />
                            ))}
                        </div>
                    ) : (
                        <p className="notFound">Nenhum produto encontrado.</p>
                    )}
                </section>
            ) : (
                // SEÇÃO DA HOME 
                <>
                    <section className="slides">
                        <Carousel>
                            <CarouselContent>
                                {['imagem1', 'imagem2', 'imagem3', 'imagem4'].map((img, index) => (
                                    <CarouselItem key={index}>
                                        <img
                                        src={`/carrossel/${img}_carrossel.webp`}
                                        alt={`Imagem ${index + 1}`}
                                        className="w-full object-cover nt-sm:rounded-[30px] mb:rounded-[15px] rounded-[10px]"
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </section>

                    <div className="space-y-20">
                        <section className="space-y-8">
                            <h2 className="h2">Categorias</h2>
                            <div className="flex justify-between items-center flex-wrap gap-y-5">
                                <Category href="acessorios" icon={<FaBottleWater className="text-light-green text-3xl md:text-4xl" />} name="Acessórios" isEven />
                                <Category href="alimentos" icon={<GiKnifeFork className="text-black text-3xl md:text-4xl" />} name="Alimentos" isEven={false} />
                                <Category href="roupas" icon={<FaShirt className="text-light-green text-3xl md:text-4xl" />} name="Roupas" isEven />
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
                                    {produtos.map(produto =>
                                        produto.porcentagem_desconto > 0 && (
                                            <ProductCard key={produto.id} product={produto} />
                                        )
                                    )}
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
            )}
        </>
    );
}
