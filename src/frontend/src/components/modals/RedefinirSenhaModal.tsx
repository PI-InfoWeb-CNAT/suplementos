'use client'
import { X } from "lucide-react"
import { useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Button } from "../ui/button"
import { redefinirSenhaSchema, RedefinirSenhaSchemaType } from "@/schemas/redefinirSenhaSchema";
import { notify } from "@/lib/toast";
import api from "@/services/api";


export default function RedefinirSenhaModal() {
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<RedefinirSenhaSchemaType>({
        resolver: zodResolver(redefinirSenhaSchema),
        mode: "onChange"
    });

    const onSubmit = async (data: RedefinirSenhaSchemaType) => {
        try {
            await api.patch('/redefinir-senha/', data);
            notify('Senha redefinida com sucesso!', 'success');
            setOpen(false);
            reset();
        } catch (error: any) {
            if (error.response?.data) {
                const data = error.response.data as Record<string, any>;

                const message =
                    data.non_field_errors?.[0] ??
                    (Array.isArray(Object.values(data)[0])
                        ? Object.values(data)[0][0]
                        : Object.values(data)[0]) ??
                    "Erro ao redefinir a senha.";

                notify(message, "error");
            } else {
                notify('Erro ao redefinir a senha. Tente novamente.', 'error');
            }
        }
    };

    const onError = (errors: FieldErrors<RedefinirSenhaSchemaType>) => {
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
                <Button variant="close" size="close" type="button" className="w-50">
                    Redefinir senha
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:min-w-160 h-110 flex flex-col justify-center items-center gap-15" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle className="font-semibold text-2xl">Redefinição da Senha</DialogTitle>
                    <VisuallyHidden>
                        <DialogDescription>Preencha os campos abaixo e redefina sua senha</DialogDescription>
                    </VisuallyHidden>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col gap-6 sm:w-4/5 w-full">
                    <label htmlFor="senha_atual" className="flex items-center space-x-2 sm:text-lg">
                        <strong className="sm:w-30">Senha atual:</strong>
                        <input {...register("senha_atual")} type="text" id="senha_atual" className="input flex-1" />
                    </label>
                    <label htmlFor="nova_senha" className="flex items-center space-x-2 sm:text-lg">
                        <strong className="sm:w-30">Nova senha:</strong>
                        <input {...register("nova_senha")} type="text" id="nova_senha" className="input flex-1" />
                    </label>
                    <label htmlFor="confirmacao_nova_senha" className="flex items-center space-x-2 sm:text-lg">
                        <strong className="sm:w-50">Confirmação da senha:</strong>
                        <input {...register("confirmacao_nova_senha")} type="text" id="confirmacao_nova_senha" className="input flex-1" />
                    </label>
                    <div className="flex gap-8 mt-5">
                        <Button variant="submit" size="submit" type="submit">
                            Redefinir
                        </Button>
                        <DialogClose asChild>
                            <Button variant="close" size="close" type="button">
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
