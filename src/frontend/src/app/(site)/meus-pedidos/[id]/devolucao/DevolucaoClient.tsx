'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PageWrapper from "@/components/layout/PageWrapper";
import LoadingContainer from "@/components/loading/LoadingContainer";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { PedidoProps } from "@/types/pedido";
import { formatarPreco } from "@/lib/utils";
import withAuth from "@/lib/withAuth";
import { devolucaoSchema, DevolucaoSchemaType } from "@/schemas/devolucaoSchema";
import { notify } from "@/lib/toast";

type DevolucaoFormData = {
    motivo: string;
    arquivo?: FileList;
    itens: Record<string, {
        selected: boolean;
        quantity: number;
    }>;
};

function DevolucaoClient({ id }: { id: string }) {
    const { register, handleSubmit, control, reset, watch } = useForm<DevolucaoFormData>({
        resolver: zodResolver(devolucaoSchema),
        defaultValues: {
            motivo: "",
            itens: {},
        },
    });
    const [pedido, setPedido] = useState<PedidoProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const itensSelecionados = watch("itens");

    const totalReembolso = pedido?.itens.reduce((acc, item) => {
        const selecionado = itensSelecionados?.[item.id];
        if (selecionado?.selected && selecionado.quantity > 0) {
            return acc + item.produto.preco_calculado * selecionado.quantity;
        }
        return acc;
    }, 0) || 0;


    useEffect(() => {
        if (!id) {
            setLoading(false);
            setError("ID do pedido não fornecido.");
            return;
        }

        const fetchPedido = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get(`/pedidos/${id}/`);
                setPedido(response.data);

                const itensDefault: Record<number, { selected: boolean; quantity: number }> = {};
                response.data.itens.forEach((item: any) => {
                    itensDefault[item.id] = { selected: false, quantity: 0 };
                });
                reset({ motivo: "", itens: itensDefault });
            } catch (err: any) {
                console.error("Erro ao buscar pedido:", err);
                if (err.response?.status === 404) {
                    setError("Pedido não encontrado ou não pertence a você.");
                } else {
                    setError("Erro ao carregar os dados do pedido.");
                }
                setPedido(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPedido();
    }, [id, reset]);

    const onSubmit = async (data: DevolucaoSchemaType) => {
        if (!pedido) return; 

        const formData = new FormData();

        formData.append('motivo', data.motivo);

        if (data.arquivo && data.arquivo.length > 0) {
            formData.append('arquivo', data.arquivo[0]);
        }

        formData.append('itens', JSON.stringify(data.itens));

        setIsSubmitting(true);
        try {
            await api.post(
                `/pedidos/${pedido.id}/solicitar_devolucao/`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            notify("Solicitação de devolução enviada com sucesso!", "success");
            router.push(`/minhas-devolucoes`);

        } catch (error: any) {
            console.error("Erro ao solicitar devolução:", error);
            notify(error.response?.data?.erro || "Falha ao enviar solicitação.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const onError = (errors: FieldErrors<DevolucaoSchemaType>) => {
        const getFirstErrorMessage = (errObj: any): string | null => {
            if (!errObj) return null;
            if (typeof errObj.message === "string") return errObj.message;
            if (typeof errObj.root?.message === "string") return errObj.root.message;

            for (const value of Object.values(errObj)) {
                const msg = getFirstErrorMessage(value);
                if (msg) return msg;
            }
            return null;
        };
        const firstErrorMessage = getFirstErrorMessage(errors);

        notify(firstErrorMessage || "Erro ao validar dados", "warning");
    };

    return (
        <PageWrapper pageName={`Devolução do pedido #${id}`}>
            <LoadingContainer loading={loading}>
                {error && (
                    <p className="notFound">{error}</p>
                )}

                {pedido && (
                    <>
                        <h2 className="h2 lg:hidden">Devolução do pedido #{id}</h2>
                        <form onSubmit={handleSubmit(onSubmit, onError)} className="grid grid-cols-1 xl:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">

                            {/* --- COLUNA DA ESQUERDA (Formulário) --- */}
                            <div className="lg:col-span-2 space-y-6">

                                {/* Card 1: Lista de Itens */}
                                <div className="bg-white p-6 rounded-lg card-shadow">
                                    <h2 className="text-xl font-semibold border-b pb-3 mb-4">
                                        1. Selecione os itens para devolver
                                    </h2>
                                    <div className="space-y-4">
                                        {pedido.itens.map((item) => (
                                            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-md">
                                                <Controller
                                                    name={`itens.${item.id}.selected`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Checkbox
                                                            id={`item-${item.id}`}
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    )}
                                                />
                                                <label htmlFor={`item-${item.id}`} className="flex-1 font-medium text-sm sm:text-base">
                                                    {item.produto.nome} - {formatarPreco(item.produto.preco_calculado)}
                                                    <span className="block text-sm text-gray-500 font-normal">
                                                        Comprado: {item.quantidade} un.
                                                    </span>
                                                </label>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        className="input text-lg pl-1 pr-0 py-0 w-[50px]"
                                                        {...register(`itens.${item.id}.quantity`, {
                                                            valueAsNumber: true,
                                                            min: 0,
                                                            max: item.quantidade,
                                                        })}
                                                        onInput={(e) => {
                                                            const target = e.target as HTMLInputElement;
                                                            const value = Number(target.value);
                                                            if (value > item.quantidade) target.value = String(item.quantidade);
                                                            if (value < 0) target.value = "0";
                                                        }}
                                                    />
                                                    <span className="text-gray-500 text-sm">/ {item.quantidade}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Card 2: Motivo e Upload */}
                                <div className="bg-white p-6 rounded-lg card-shadow">
                                    <h2 className="text-xl font-semibold border-b pb-3 mb-4">
                                        2. Detalhes da Devolução
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="motivo" className="block font-medium mb-1">
                                                Motivo da devolução (obrigatório):
                                            </label>
                                            <Textarea
                                                id="motivo"
                                                rows={4}
                                                placeholder="Ex: O produto veio com o lacre rompido."
                                                {...register("motivo")}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="arquivo" className="block font-medium">
                                                Anexar foto ou vídeo (opcional):
                                            </label>

                                            <div className="relative flex items-center justify-between border border-green rounded-lg p-2 cursor-pointer">
                                                <span className="bg-dark-grey text-green px-4 py-2 rounded-md text-sm font-medium">
                                                    Escolher arquivo
                                                </span>

                                                <span className="text-gray-500 truncate ml-2" id="file-name">
                                                    Nenhum arquivo escolhido
                                                </span>

                                                <input
                                                    id="arquivo"
                                                    type="file"
                                                    accept="image/*,video/*"
                                                    {...register("arquivo")}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    onChange={(e) => {
                                                        const fileName = e.target.files?.[0]?.name || "Nenhum arquivo escolhido"
                                                        document.getElementById("file-name")!.textContent = fileName
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* --- COLUNA DA DIREITA (Resumo) --- */}
                            <div className="lg:col-span-1">
                                <div className="bg-white p-6 rounded-lg card-shadow space-y-4">
                                    <h2 className="text-xl font-semibold border-b pb-3 mb-4">
                                        Resumo da Devolução
                                    </h2>
                                    {/* Lista dos itens selecionados */}
                                    <div className="space-y-2">
                                        <h5 className="text-lg font-semibold m-0">Itens:</h5>
                                        {pedido.itens
                                            .filter(
                                                (item) =>
                                                    itensSelecionados?.[item.id]?.selected &&
                                                    itensSelecionados?.[item.id]?.quantity > 0
                                            )
                                            .map((item) => (
                                                <div key={item.id} className="flex justify-between">
                                                    <span className="text-gray-700">{item.produto.nome}</span>
                                                    <span className="font-medium">x{itensSelecionados[item.id].quantity}</span>
                                                </div>
                                            ))}

                                        {/* Caso nenhum item tenha sido selecionado */}
                                        {pedido.itens.every(
                                            (item) =>
                                                !itensSelecionados?.[item.id]?.selected ||
                                                !itensSelecionados?.[item.id]?.quantity
                                        ) && (
                                                <p className="text-gray-500 italic">
                                                    Nenhum item selecionado ainda.
                                                </p>
                                            )}
                                    </div>
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total a reembolsar:</span>
                                        <span>R$ {formatarPreco(totalReembolso)}</span>
                                    </div>
                                    <Button
                                        type="submit"
                                        variant="submit"
                                        size="lg"
                                        className="w-full mt-4"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </LoadingContainer>
        </PageWrapper>
    );
}

export default withAuth(DevolucaoClient);