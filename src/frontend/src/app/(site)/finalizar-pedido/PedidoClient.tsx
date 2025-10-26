'use client';
import Image from "next/image";

import ItemCard from "@/components/ItemCard";
import PageWrapper from "@/components/layout/PageWrapper";
import LoadingContainer from "@/components/loading/LoadingContainer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCarrinho } from "@/contexts/CarrinhoContext";
import { useCartoes } from "@/contexts/CartaoContext";
import { useEnderecos } from "@/contexts/EnderecoContext";
import { capitalize, formatarPreco } from "@/lib/utils";
import withAuth from "@/lib/withAuth";

function PedidoClient() {
    const { loading: authLoading, isLogged } = useAuth();
    const { cartoes, loading: cartoesLoading } = useCartoes();
    const { enderecos, loading: enderecosLoading } = useEnderecos();
    const { items, totalPrice, isLoading: carrinhoLoading } = useCarrinho();

    const loading = authLoading || (!authLoading && (carrinhoLoading || enderecosLoading || cartoesLoading));

    return (
        <PageWrapper pageName="Finalizar Pedido">
            <section className="space-y-10">
                <h2 className="h2 lg:hidden">Finalizar Pedido</h2>
                <LoadingContainer loading={loading}>
                    <form className="w-full flex flex-col xl:flex-row justify-between">
                        <section className="w-[62%] space-y-7">
                            <div className="flex justify-between">
                                <div className="card-shadow space-y-8 rounded-2xl px-6 py-6 max-w-sm">
                                    <h4 className="h4">Endereço</h4>
                                    <select name="enderecoSelect" id="enderecoSelect" defaultValue="" className="input w-full">
                                        <option value="" disabled>Selecione um endereço</option>
                                        {enderecos.map(endereco => (
                                            <option key={endereco.id} value={endereco.id}>
                                                {endereco.apelido} - {endereco.rua}, {endereco.numero} - {endereco.cidade}, {endereco.uf}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="card-shadow space-y-8 rounded-2xl px-6 py-6 max-w-sm">
                                    <h4 className="h4">Cartão</h4>
                                    <select name="cartaoSelect" id="cartaoSelect" defaultValue="" className="input w-full">
                                        <option value="" disabled>Selecione um cartão</option>
                                        {cartoes.map(cartao => (
                                            <option key={cartao.id} value={cartao.id}>
                                                {cartao.apelido} - {cartao.titular} - {capitalize(cartao.tipo)}, **** {cartao.numero.slice(-4)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <div className="card-shadow rounded-2xl p-6 space-y-6">
                                    <h4 className="h4">Produtos</h4>
                                    <div className="space-y-6 max-h-128 overflow-auto p-2">
                                        {items.map(item => (
                                            <ItemCard 
                                                key={item.produto.id} 
                                                item={item}
                                                pageName="Finalizar Pedido" 
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="card-shadow rounded-3xl 2xl:w-[30%] xl:w-[35%] md:w-1/2 sm:w-3/4 px-7 py-5 h-max">
                            <div className="flex justify-between items-center text-[22px] font-semibold">
                                <p>Total:</p>
                                <span>R$ {formatarPreco(totalPrice)}</span>
                            </div>
                            <a href="/finalizar-pedido" className="mt-10 mb-4 block">
                                <Button type="submit" variant="submit" size="submit" className="w-full py-2 rounded-lg">
                                    Confirmar compra
                                </Button>
                            </a>
                            <div className="w-full h-[1px] bg-gray-400"></div>
                            <div className="relative w-full 2xl:h-96 xl:h-80 h-92 mt-6">
                                <Image src={'/imagem-compra.png'} alt="Imagem da Compra" fill className="object-cover"/>
                            </div>
                        </section>    
                    </form>
                </LoadingContainer>
            </section>
        </PageWrapper>
    )
}

export default withAuth(PedidoClient);