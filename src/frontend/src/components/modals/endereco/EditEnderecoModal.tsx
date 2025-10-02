'use client'
import axios from "axios";
import { useState, useEffect } from "react"
import { useForm, FieldErrors } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

import { X } from "lucide-react"
import { LuRotateCcw } from "react-icons/lu";
import { Button } from "../../ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { enderecoSchema, EnderecoSchemaType } from "@/schemas/enderecoSchema";
import { notify } from "@/lib/toast";
import { EnderecoCardProps } from "@/types/endereco";
import LoadingContainer from "../../loading/LoadingContainer";
import { useEnderecos } from "@/contexts/EnderecoContext";
import api from "@/services/api";

export default function EditEnderecoModal({endereco}: EnderecoCardProps) {
    const { register, handleSubmit, watch, reset, setValue, formState: { errors, isDirty } } = useForm<EnderecoSchemaType>({
        resolver: zodResolver(enderecoSchema),
        mode: "onChange",
        defaultValues: {
            apelido: endereco.apelido,
            destinatario: endereco.destinatario,
            cep: endereco.cep,
            uf: endereco.uf,
            cidade: endereco.cidade,
            bairro: endereco.bairro,
            rua: endereco.rua,
            numero: endereco.numero,
            complemento: endereco.complemento,
        }
    });

    const cepValue = watch("cep");
    const [cepInvalido, setCepInvalido] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { updateEndereco } = useEnderecos();

    const formatCep = (value: string) => {
        const numbers = value.replace(/\D/g, "");
        if (numbers.length <= 5) return numbers;
        return numbers.replace(/^(\d{5})(\d{0,3})/, "$1-$2");
    };

    useEffect(() => {
        const onlyNumbers = cepValue?.replace(/\D/g, "");
        if (onlyNumbers?.length === 8) {
            setLoading(true);

            axios.get(`https://viacep.com.br/ws/${onlyNumbers}/json/`)
                .then((response) => {
                    if (response.data.erro) {
                        setLoading(false);
                        notify("CEP inválido", "warning");
                        setCepInvalido(true);
                        return;
                    }

                    setValue("rua", response.data.logradouro || "");
                    setValue("bairro", response.data.bairro || "");
                    setValue("cidade", response.data.localidade || "");
                    setValue("uf", response.data.uf || "");
                    setCepInvalido(false);
                    setTimeout(() => {
                        setLoading(false);
                    }, 500)
                })
                .catch(() => {
                    notify("Erro ao consultar CEP", "error");
                    setLoading(false);
                });
        }
    }, [cepValue, setValue]);

    const onSubmit = async (data: EnderecoSchemaType) => {
        if (cepInvalido) {
            notify("CEP inválido", "warning");
            return;
        }
        if (!isDirty) {
            notify("Altere algum campo antes de atualizar.", "warning");
            return;
        }

        try {
            const response = await api.patch(`/enderecos/${endereco.id}/`, data);

            updateEndereco(response.data)
            setOpen(false)
            notify("Endereço atualizado com sucesso!", "success")
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

    const onError = (errors: FieldErrors<EnderecoSchemaType>) => {
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

            <DialogContent className="min-h-80 flex flex-col justify-center items-center py-10" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle className="font-semibold text-2xl mb-5">Edição do endereço <strong>{endereco.apelido}</strong></DialogTitle>
                    <VisuallyHidden>
                        <DialogDescription>Para obter ajuda, acesse o e-mail abaixo</DialogDescription>
                    </VisuallyHidden>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col items-center gap-6 sm:w-4/5 w-full">
                    <label htmlFor="cep" className="flex items-center space-x-2 sm:text-lg mb-5">
                        <strong>CEP:</strong>
                        <input
                            {...register("cep")}
                            type="text"
                            id="cep"
                            className="input pl-2 py-0.5 rounded-sm flex-1"
                            placeholder="00000-000"
                            maxLength={9}
                            value={cepValue || ""}
                            onChange={(e) => setValue("cep", formatCep(e.target.value), { shouldValidate: true })}
                        />
                    </label>
                    {errors.cep && <p className="text-red-500 -mt-10">{errors.cep.message}</p>}
                    <LoadingContainer loading={loading}>
                        <label htmlFor="rua" className="flex flex-col space-x-2 sm:text-lg w-full">
                            <strong className="">Rua:*</strong>
                            <input {...register("rua")} type="text" id="rua" className="input" />
                        </label>
                        <label htmlFor="bairro" className="flex flex-col space-x-2 sm:text-lg w-full">
                            <strong className="">Bairro:*</strong>
                            <input {...register("bairro")} type="text" id="bairro" className="input" />
                        </label>
                        <div className="flex justify-between w-full">
                            <label htmlFor="rua" className="flex flex-col space-x-2 sm:text-lg w-[70%]">
                                <strong className="">Cidade:*</strong>
                                <input {...register("cidade")} type="text" id="rua" className="input" />
                            </label>
                            <label htmlFor="rua" className="flex flex-col space-x-2 sm:text-lg w-[20%]">
                                <strong className="">UF:*</strong>
                                <input {...register("uf")} type="text" id="rua" className="input" />
                            </label>
                        </div>
                        <div className="flex justify-between w-full">
                            <label htmlFor="numero" className="flex flex-col space-x-2 sm:text-lg w-[30%]">
                                <strong className="">Número:*</strong>
                                <input {...register("numero")} type="text" id="numero" className="input" placeholder="Ex: 123" />
                            </label>
                            <label htmlFor="complemento" className="flex flex-col space-x-2 sm:text-lg w-[60%]">
                                <strong className="">Complemento:</strong>
                                <input {...register("complemento")} type="text" id="complemento" className="input" placeholder="Ex: Apartamento 000" />
                            </label>
                        </div>
                        <label htmlFor="apelido" className="flex flex-col space-x-2 sm:text-lg w-full">
                            <strong className="">Apelido:*</strong>
                            <input {...register("apelido")} type="text" id="apelido" className="input" placeholder="Ex: Meu Endereço" />
                        </label>
                        <label htmlFor="destinatario" className="flex flex-col space-x-2 sm:text-lg w-full">
                            <strong className="">Destinatário:*</strong>
                            <input {...register("destinatario")} type="text" id="destinatario" className="input" placeholder="Ex: João da Silva" />
                        </label>
                        <div className="w-full" >
                            <LuRotateCcw size={30} className="bg-dark-grey text-green rounded-full p-1.5 cursor-pointer" onClick={() => reset()}/>
                        </div>
                        
                        <div className="flex gap-8 mt-5">
                            <Button variant="submit" size="submit" type="submit">
                                Atualizar
                            </Button>
                            <DialogClose asChild>
                                <Button variant="close" size="close" type="button" onClick={() => reset()}>
                                    Cancelar
                                </Button>
                            </DialogClose>
                        </div>
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