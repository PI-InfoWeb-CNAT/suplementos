'use client'
import { useState, useEffect } from "react"
import { useForm, FieldErrors } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

import { X } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Button } from "@/components/ui/button";
import { CartaoCardProps } from "@/types/cartao";
import { editCartaoSchema, EditCartaoSchemaType } from "@/schemas/cartaoSchema";
import api from "@/services/api";
import { notify } from "@/lib/toast";
import { useCartoes } from "@/contexts/CartaoContext";

export default function EditCartaoModal({ cartao }: CartaoCardProps) {
    const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm<EditCartaoSchemaType>({
        resolver: zodResolver(editCartaoSchema),
        mode: "onChange",
        defaultValues: {
            apelido: cartao.apelido,
            titular: cartao.titular,
            bandeira: cartao.bandeira,
            tipo: cartao.tipo,
        }
    });

    useEffect(() => {
        reset({
            apelido: cartao.apelido,
            titular: cartao.titular,
            bandeira: cartao.bandeira,
            tipo: cartao.tipo,
        });
    }, [cartao, reset]); 

    const [open, setOpen] = useState(false);
    const { updateCartao } = useCartoes();

    const onSubmit = async (data: EditCartaoSchemaType) => {
        if (!isDirty) {
            notify("Altere algum campo antes de atualizar.", "warning");
            return;
        }

        try {
            const response = await api.patch(`/cartoes/${cartao.id}/`, data);

            updateCartao(response.data)
            setOpen(false)
            reset()
            notify("Cartão atualizado com sucesso!", "success")
        } catch (error: any) {
            if (error.response) {
                console.error("Erro na resposta da API:", error.response.data);
                const erros = error.response.data.errors || [error.response.data.detail];
                notify(erros, "error");
            } else {
                console.error("Erro de rede:", error.message);
                notify("Erro de rede. Tente novamente.", "error");
            }
        }
    }

    const onError = (errors: FieldErrors<EditCartaoSchemaType>) => {
        const firstError = Object.values(errors)[0];

        if (firstError && "message" in firstError) {
            notify(firstError.message as string, "warning");
        } else {
            notify("Erro ao validar dados", "warning");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="submit">
                    Editar
                </Button>
            </DialogTrigger>

            <DialogContent className="min-h-80 flex flex-col justify-center items-center py-20" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle className="font-semibold text-2xl mb-5 text-center sm:w-4/5 w-full mx-auto">Edição do cartão <strong>{cartao.apelido}</strong></DialogTitle>
                    <VisuallyHidden>
                        <DialogDescription>Para obter ajuda, acesse o e-mail abaixo</DialogDescription>
                    </VisuallyHidden>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col items-center gap-6 sm:w-4/5 w-full">
                    <label htmlFor="rua" className="flex flex-col space-x-2 sm:text-lg w-full">
                        <strong className="">Titular:*</strong>
                        <input {...register("titular")} type="text" id="rua" className="input" placeholder="Ex: JOÃO DA SILVA" />
                    </label>
                    <label htmlFor="bairro" className="flex flex-col space-x-2 sm:text-lg w-full">
                        <strong className="">Apelido:*</strong>
                        <input {...register("apelido")} type="text" id="bairro" className="input" placeholder="Ex: Meu Cartão" />
                    </label>
                    <div className="flex justify-between w-full">
                        <label htmlFor="bandeira" className="flex flex-col space-x-2 sm:text-lg w-[50%]">
                            <strong className="">Bandeira:*</strong>
                            <input {...register("bandeira")} type="text" id="bandeira" className="input" />
                        </label>
                        <label htmlFor="tipo" className="flex flex-col space-x-2 sm:text-lg w-[40%]">
                            <strong>Tipo:*</strong>
                            <select {...register("tipo")} id="tipo" className="input">
                                <option value="debito">Débito</option>
                                <option value="credito">Crédito</option>
                            </select>
                        </label>
                    </div>
                    <div className="flex gap-8 mt-5">
                        <Button variant="submit" size="submit" type="submit">
                            Salvar
                        </Button>
                        <DialogClose asChild>
                            <Button variant="close" size="close" type="button" onClick={() => reset()}>
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