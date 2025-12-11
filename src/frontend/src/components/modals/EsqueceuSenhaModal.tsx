'use client'
import { useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Button } from "../ui/button"
import { recuperarSenhaSchema, RecuperarSenhaSchemaType } from "@/schemas/recuperarSenhaSchema";
import { notify } from "@/lib/toast";
import api from "@/services/api"; 

export default function EsqueceuSenhaModal() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<RecuperarSenhaSchemaType>({
        resolver: zodResolver(recuperarSenhaSchema),
        mode: "onChange",
    });

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onSubmit = async (data: RecuperarSenhaSchemaType) => {
        setLoading(true);
        try {
            await api.post('/auth/users/reset_password/', {
                email: data.email
            });

            notify("E-mail de recuperação enviado com sucesso!", "success");
            setOpen(false); 
            reset();

        } catch (error: any) {
            console.error(error);

            if (error.response?.status === 400) {
                notify("Esse e-mail não está cadastrado.", "warning");
            } else {
                notify("Erro ao solicitar recuperação. Tente novamente.", "error");
            }
        } finally {
            setLoading(false);
        }
    };

    const onError = (errors: FieldErrors<RecuperarSenhaSchemaType>) => {
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
                <p className="text-dark-green font-semibold hover:underline cursor-pointer">Esqueceu a senha?</p>
            </DialogTrigger>

            <DialogContent className="w-180 flex flex-col justify-center items-center" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle className="font-semibold text-2xl mb-5 text-center">
                        Recuperação de Senha
                    </DialogTitle>
                    <VisuallyHidden>
                        <DialogTitle>Recuperação da Senha</DialogTitle>
                        <DialogDescription>Recuperação da senha do usuário por meio do e-mail.</DialogDescription>
                    </VisuallyHidden>
                </DialogHeader>
                
                <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full space-y-10">
                    <div className="flex flex-col gap-2">
                        <label className="font-bold">E-mail:*</label>
                        <input 
                            {...register("email")} 
                            type="email" 
                            placeholder="Digite seu e-mail cadastrado" 
                            className="input" 
                        />
                    </div>
                    <Button 
                        type="submit" 
                        variant="submit" 
                        size="submit"
                        disabled={loading} 
                    >
                        {loading ? "Enviando..." : "Enviar"}
                    </Button>
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