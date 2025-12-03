'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import { FaMagnifyingGlass, FaBottleWater, FaShirt } from "react-icons/fa6";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { GiKnifeFork } from "react-icons/gi";
import { FaChevronDown } from "react-icons/fa";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Category from "@/components/Category";
import ProductCard from "@/components/ProductCard";
import { useProdutos } from '@/contexts/ProductContext';
import { ProductProps } from '@/types/products';
import PageWrapper from '@/components/layout/PageWrapper';
import LoadingContainer from '@/components/loading/LoadingContainer';

export default function HomeClient() {
    const { produtos, loading } = useProdutos();
    const produtos_promocoes = produtos.filter(produto => produto.porcentagem_desconto > 0)
    const [pesquisarProduto, setPesquisarProduto] = useState('');
    const [resultado, setResultado] = useState<ProductProps[]>([]);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const removeAcentos = (texto: string) =>
            texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        const pesquisa = removeAcentos(pesquisarProduto.toLowerCase().trim());

        setResultado([]);

        if (pesquisa === '') {
            setShowResults(false);
            return;
        }

        const resultados = produtos.filter(produto =>
            removeAcentos(produto.nome.toLowerCase()).includes(pesquisa)
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
        <PageWrapper pageName='Página Inicial'>
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
                    <p className='text-dark-grey text-xl font-medium'>Produtos encontrados: {resultado.length}</p>
                    <LoadingContainer loading={loading}>
                        {resultado.length > 0 ? (
                            <div className="productsContainer">
                                {resultado.map(produto => (
                                    <ProductCard key={produto.id} product={produto} />
                                ))}
                            </div>
                        ) : (
                            <p className="notFound">Nenhum produto encontrado.</p>
                        )}
                    </LoadingContainer>
                </section>
            ) : (
                // SEÇÃO DA HOME 
                <>
                    <section className="slides">
                        <Carousel>
                            <CarouselContent>
                                {['imagem1', 'imagem2', 'imagem3', 'imagem4'].map((img, index) => (
                                    <CarouselItem key={index}>
                                        <Image
                                            src={`/carrossel/${img}_carrossel.png`}
                                            alt={`Imagem ${index + 1}`}
                                            width={1300}
                                            height={550}
                                            className="object-cover nt-sm:rounded-[30px] mb:rounded-[15px] rounded-[10px]"
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
                                <Category href="alimentos" icon={<GiKnifeFork className="text-black text-3xl md:text-4xl" />} name="Alimentos" />
                                <Category href="roupas" icon={<FaShirt className="text-light-green text-3xl md:text-4xl" />} name="Roupas" isEven />
                                <Category href="suplementos" icon={<BsFillLightningChargeFill className="text-black text-3xl md:text-4xl" />} name="Suplementos" />
                            </div>
                        </section>

                        {produtos_promocoes.length > 0 && (
                            <section className="space-y-8">
                                <div className="flex justify-between items-center">
                                    <h2 className="h2">Ofertas Especiais</h2>
                                    <a href="/promocoes" className="group flex items-center gap-2">
                                        <p className="font-bold tb:text-lg">Ver mais</p>
                                        <FaChevronDown className="text-green text-lg mb-lg:text-xl rotate-180-smooth" />
                                    </a>
                                </div>
                                <LoadingContainer loading={loading}>
                                    <div className="productsContainer">
                                        {produtos_promocoes.slice(0, 5).map(produto =>
                                            <ProductCard key={produto.id} product={produto} />
                                        )}
                                    </div>
                                </LoadingContainer>
                            </section>
                        )}

                        <section className="space-y-8">
                            <div className="flex justify-between items-center">
                                <h2 className="h2">Mais Vendidos</h2>
                                <a href="/promocoes" className="group flex items-center gap-2">
                                    <p className="font-bold tb:text-lg">Ver mais</p>
                                    <FaChevronDown className="text-green text-lg mb-lg:text-xl rotate-180-smooth" />
                                </a>
                            </div>
                            <LoadingContainer loading={loading}>
                                <div className="productsContainer">
                                    {produtos.slice(0, 5).map(produto => (
                                        <ProductCard key={produto.id} product={produto} />
                                    ))}
                                </div>
                            </LoadingContainer>
                        </section>
                    </div>
                </>
            )}
        </PageWrapper>
    );
}
