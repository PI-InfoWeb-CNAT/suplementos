'use client'
import { useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Star } from "lucide-react";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Button } from "../ui/button"
import { CarrinhoItemProps } from "@/types/carrinho"
import { avaliacaoProdutoSchema, AvaliacaoProdutoSchemaType } from "@/schemas/avaliacaoProdutoSchema";
import { notify } from "@/lib/toast";
import api from "@/services/api"; 

export default function AvaliarProdutoModal({ item, onSuccess }: { item: CarrinhoItemProps, onSuccess: () => void }) {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<AvaliacaoProdutoSchemaType>({
            resolver: zodResolver(avaliacaoProdutoSchema),
            mode: "onChange",
            defaultValues: { nota: 0 } 
    });

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const notaAtual = watch("nota");

    const onSubmit = async (data: AvaliacaoProdutoSchemaType) => {
        setLoading(true);
        try {
            await api.post(`/produtos/${item.produto.id}/avaliar/`, {
                nota: data.nota
            });

            notify("Avaliação enviada com sucesso!", "success");
            setOpen(false);
            
            if (onSuccess) {
                onSuccess();
            }
        } catch (error: any) {
            console.error("Erro ao avaliar:", error);
            const msg = error.response?.data?.erro || "Erro ao enviar avaliação.";
            notify(msg, "error");
        } finally {
            setLoading(false);
        }
    }

    const onError = (errors: FieldErrors<AvaliacaoProdutoSchemaType>) => {
        const firstError = Object.values(errors)[0];
        if (firstError && "message" in firstError) {
            notify(firstError.message as string, "warning");
        }
    };
    
    const renderEstrelas = () => {
        return (
            <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4, 5].map((estrela) => (
                    <button
                        key={estrela}
                        type="button" 
                        onClick={() => setValue("nota", estrela, { shouldValidate: true })}
                        className="transition-transform hover:scale-110 focus:outline-none cursor-pointer"
                    >
                        <Star 
                            size={32} 
                            fill={estrela <= notaAtual ? "#FFC107" : "none"} 
                            color={estrela <= notaAtual ? "#FFC107" : "#CBD5E1"}
                            className="transition-colors"
                        />
                    </button>
                ))}
            </div>
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="submit" size="sm" className="max-md:py-5 max-sm:w-full max-sm:my-2">
                    Avaliar Produto
                </Button>
            </DialogTrigger>

            <DialogContent className="!w-150 !max-w-[90dvw] min-h-80 flex flex-col items-center justify-center py-15" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle className="font-semibold text-2xl mb-5">
                        Avaliação do produto <strong>{item.produto.nome}</strong>
                    </DialogTitle>
                    <VisuallyHidden>
                        <DialogTitle>Avaliar Produto</DialogTitle>
                        <DialogDescription>Avaliação do Produto {item.produto.nome}</DialogDescription>
                    </VisuallyHidden>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8 flex flex-col items-center">
                    
                    <input 
                        type="hidden" 
                        {...register("nota", { valueAsNumber: true })} 
                    />

                    <div className="flex flex-col items-center gap-2">
                        {renderEstrelas()}
                        <span className="text-sm text-gray-400 mt-2 min-h-[20px]">
                            {notaAtual > 0 ? 
                                (notaAtual === 5 ? "Muito bom!" : notaAtual === 4 ? "Bom" : notaAtual === 3 ? "Razoável" : notaAtual === 2 ? "Ruim" : "Muito ruim") 
                                : "Selecione uma nota"}
                        </span>
                    </div>

                    <div className="flex gap-4 w-full justify-center">
                        <Button
                            type="submit"
                            variant="submit"
                            size="submit"
                            disabled={loading}
                            className="px-8"
                        >
                            {loading ? "Enviando..." : "Avaliar"}
                        </Button>
                        <DialogClose asChild>
                            <Button variant="close" size="close" type="button" disabled={loading}>
                                Cancelar
                            </Button>
                        </DialogClose>
                    </div>
                </form>

                <DialogClose asChild>
                    <button className="absolute p-0.5 right-4 top-4 border-none rounded-sm text-black hover:bg-gray-200 transition-color-slow cursor-pointer focus:outline-none">
                        <X className="w-7 h-auto" />
                    </button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}