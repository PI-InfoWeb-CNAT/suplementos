'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";

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
import { notify } from "@/lib/toast";
import { PedidoFormData } from "@/types/pedido";
import api from "@/services/api";

function PedidoClient() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<PedidoFormData>({ 
        mode: "onChange" 
    });

    const { loading: authLoading } = useAuth();
    const { cartoes, loading: cartoesLoading } = useCartoes();
    const { enderecos, loading: enderecosLoading } = useEnderecos();
    const { items, totalPrice, isLoading: carrinhoLoading, limparCarrinho } = useCarrinho();

    const loading = authLoading || (!authLoading && (carrinhoLoading || enderecosLoading || cartoesLoading));


    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (data: PedidoFormData) => {
        setSubmitting(true);
        try {
            const payload: any = {};
            if (data.endereco) payload.endereco = data.endereco;
            if (data.cartao) payload.cartao = data.cartao;

            await api.post('/pedidos/', payload);

            notify('Pedido realizado com sucesso!', 'success');

            setTimeout(() => {
                router.push('/meus-pedidos');

                if (typeof limparCarrinho === 'function') {
                    limparCarrinho();
                }
            }, 1500)
        } catch (err: any) {
            const message = err?.response?.data?.erro || err?.response?.data?.detail || 'Erro ao finalizar pedido';
            notify(message, 'warning');
        } finally {
            setSubmitting(false);
        }
    };

    const onError = (errors: FieldErrors<PedidoFormData>) => {
        const firstError = Object.values(errors)[0];

        if (firstError && "message" in firstError) {
            notify(firstError.message as string, "warning");
        } else {
            notify("Erro ao validar dados", "warning");
        }
    };

    return (
        <PageWrapper pageName="Finalizar Pedido">
            <section className="space-y-10">
                <h2 className="h2 lg:hidden">Finalizar Pedido</h2>
                <LoadingContainer loading={loading}>
                    <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full flex flex-col xl:flex-row justify-between xl:gap-0 gap-y-10">
                        <section className="xl:w-[62%] space-y-7">
                            <div className="flex flex-col sm:flex-row justify-between gap-5">
                                <div className="card-shadow space-y-8 rounded-2xl px-6 py-6 sm:max-w-sm">
                                    <h4 className="h4">Endereço</h4>
                                    <select 
                                        {...register("endereco", { 
                                            required: "Por favor, selecione um endereço." 
                                        })}
                                        defaultValue="" 
                                        className="input w-full"
                                    >
                                        <option value="" disabled>Selecione um endereço</option>
                                        {enderecos.map(endereco => (
                                            <option key={endereco.id} value={endereco.id}>
                                                {endereco.apelido} - {endereco.rua}, {endereco.numero} - {endereco.cidade}, {endereco.uf}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="card-shadow space-y-8 rounded-2xl px-6 py-6 sm:max-w-sm">
                                    <h4 className="h4">Cartão</h4>
                                    <select 
                                        {...register("cartao", { 
                                            required: "Por favor, selecione um cartão." 
                                        })}
                                        defaultValue="" 
                                        className="input w-full"
                                    >
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
                                    <div className="flex flex-col justify-center gap-y-6 sm:max-h-128 sm:overflow-auto p-2 xs:w-auto w-[240px] max-xs:mx-auto">
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
                            <div className="mt-10 mb-4 block">
                                <Button disabled={submitting} type="submit" variant="submit" size="submit" className="w-full py-2 rounded-lg">
                                    {submitting ? 'Processando...' : 'Confirmar compra'}
                                </Button>
                            </div>
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