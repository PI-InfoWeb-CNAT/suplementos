'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { X } from "lucide-react";
import { CiCirclePlus } from "react-icons/ci";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import LoadingContainer from "@/components/loading/LoadingContainer";
import { cartaoSchema, CartaoSchemaType } from "@/schemas/cartaoSchema";
import { useCartoes } from "@/contexts/CartaoContext";
import { notify } from "@/lib/toast";
import api from "@/services/api";

export default function AddCartaoModal() {
    const { register, handleSubmit, watch, reset, setValue, formState: { errors } } = useForm<CartaoSchemaType>({
        resolver: zodResolver(cartaoSchema),
        mode: "onChange"
    });

    const numeroValue = watch("numero");
    const [open, setOpen] = useState(false);
    const [showInputs, setShowInputs] = useState(false);
    const [loading, setLoading] = useState(false);
    const [brandName, setBrandName] = useState("");
    const { addCartao } = useCartoes();

    useEffect(() => {
        const onlyNumbers = numeroValue?.replace(/\D/g, "");
        if (!onlyNumbers || onlyNumbers.length < 8) return;

        const bin = onlyNumbers.slice(0, 8);
        const timeout = setTimeout(() => {
            setLoading(true);

            axios.get(`https://api.pagar.me/bin/v1/${bin}`)
                .then(response => {
                    if (response.data.erro) {
                        notify("Número inválido", "warning");
                        setShowInputs(false);
                    } else {
                        setValue("bandeira", response.data.brand || "");
                        setBrandName(response.data.brandName || "");

                        setTimeout(() => {
                            setShowInputs(true)
                            setLoading(false);
                        }, 500)
                    }
                })
                .catch(() => {
                    notify("Erro ao consultar número", "error");
                    setLoading(false);

                })
        }, 1500);

        return () => clearTimeout(timeout);
    }, [numeroValue]);

    const onSubmit = async (data: CartaoSchemaType) => {
        if (data.tipo === "") {
            notify("Selecione o tipo do cartão", "warning");
            return;
        }

        try {
            const response = await api.post("/cartoes/", {
                apelido: data.apelido,
                titular: data.titular,
                numero: data.numero,
                bandeira: data.bandeira,
                tipo: data.tipo,
            });

            addCartao(response.data);
            notify("Cartão adicionado com sucesso", "success");
            setOpen(false);
            setShowInputs(false);
            reset();
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

    const onError = (errors: FieldErrors<CartaoSchemaType>) => {
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
                <div className='2xl:h-[450px] h-[300px] group flex flex-col justify-center items-center gap-3 border-2 border-dashed border-dark-grey rounded-xl text-dark-grey text-xl  cursor-pointer'>
                    <CiCirclePlus size={45} className="group-hover:scale-115 transition-all duration-300" />
                    <p className="font-medium text-center">Adicione um novo cartão</p>
                </div>
            </DialogTrigger>

            <DialogContent className="min-h-80 flex flex-col justify-center items-center py-15" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle className="font-semibold text-2xl mb-5">Adicionar novo cartão</DialogTitle>
                    <VisuallyHidden>
                        <DialogDescription>Para adicionar um cartão, preencha os campos e aperte em adicionar.</DialogDescription>
                    </VisuallyHidden>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col items-center gap-6 sm:w-4/5 w-full">
                    <label htmlFor="numero" className="flex items-center space-x-2 sm:text-lg mb-5 w-full">
                        <strong>Número:*</strong>
                        <input
                            {...register("numero")}
                            type="text"
                            id="numero"
                            className="input w-full"
                            placeholder="Digite o número do cartão"
                            value={numeroValue || ""}
                            onChange={(e) => setValue("numero", e.target.value, { shouldValidate: true })}
                        />
                    </label>
                    <LoadingContainer loading={loading}>
                        {showInputs && (
                            <>
                                <label htmlFor="titular" className="flex flex-col space-x-2 sm:text-lg w-full">
                                    <strong className="">Titular:*</strong>
                                    <input {...register("titular")} type="text" id="titular" className="input" placeholder="Ex: JOÃO DA SILVA" />
                                </label>
                                <label htmlFor="bairro" className="flex flex-col space-x-2 sm:text-lg w-full">
                                    <strong className="">Apelido:*</strong>
                                    <input {...register("apelido")} type="text" id="bairro" className="input" placeholder="Ex: Meu Cartão" />
                                </label>
                                <div className="flex justify-between w-full">
                                    <label htmlFor="nandeira" className="flex flex-col space-x-2 sm:text-lg w-[50%]">
                                        <strong className="">Bandeira:*</strong>
                                        <input type="text" id="bandeira" className="input" value={brandName} readOnly />
                                    </label>
                                    <label htmlFor="tipo" className="flex flex-col space-x-2 sm:text-lg w-[40%]">
                                        <strong>Tipo:*</strong>
                                        <select {...register("tipo")} id="tipo" className="input">
                                            <option value="">Selecione</option>
                                            <option value="debito">Débito</option>
                                            <option value="credito">Crédito</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="flex gap-8 mt-5">
                                    <Button variant="submit" size="submit" type="submit">
                                        Adicionar
                                    </Button>
                                    <DialogClose asChild>
                                        <Button variant="close" size="close" type="button"
                                            onClick={() => {
                                                reset();
                                                setShowInputs(false);
                                            }}
                                        >
                                            Cancelar
                                        </Button>
                                    </DialogClose>
                                </div>
                            </>
                        )}
                    </LoadingContainer>
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