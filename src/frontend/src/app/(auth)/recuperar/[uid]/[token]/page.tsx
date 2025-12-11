'use client';
import { useState, useEffect, useRef } from "react"; 
import { useRouter, useParams } from "next/navigation";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { notify } from "@/lib/toast";
import { RecuperarSenhaSchemaType, resetPasswordSchema, ResetPasswordSchemaType } from "@/schemas/recuperarSenhaSchema";
import api from "@/services/api";

export default function PasswordResetConfirm() {
    const router = useRouter();
    const params = useParams();
    
    const uidRef = useRef<string>("");
    const tokenRef = useRef<string>("");

    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordSchemaType>({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onChange",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (params.uid && params.token) {
            uidRef.current = params.uid as string;
            tokenRef.current = params.token as string;

            window.history.replaceState(null, '', '/redefinir-senha');
        }
    }, [params]);

    const onSubmit = async (data: ResetPasswordSchemaType) => {
        setLoading(true);
        try {
            await api.post('/auth/users/reset_password_confirm/', {
                uid: uidRef.current,    
                token: tokenRef.current,
                new_password: data.new_password,
                re_new_password: data.re_new_password
            });

            notify("Senha alterada com sucesso! Faça login.", "success");
            
            setTimeout(() => {
                router.push('/login');
            }, 2000);

        } catch (error: any) {
            console.error(error);
            const msg = error.response?.data?.token ? "O link expirou ou é inválido." : 
                        (error.response?.data?.new_password?.[0] || "Erro ao redefinir senha.");
            notify(msg, "error");
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
        <div className="flex flex-col items-center justify-center py-10 sm:py-20 h-screen max-w-[90dvw] mx-auto">
            <div className="w-full max-w-md bg-white p-8 rounded-lg card-shadow">
                <h2 className="text-2xl font-bold text-center mb-6 text-dark-grey">
                    Nova Senha
                </h2>
                <p className="text-center text-gray-500 mb-8 text-sm">
                    Crie uma nova senha segura para sua conta.
                </p>

                <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Nova Senha</label>
                        <input 
                            {...register("new_password")} 
                            type="password" 
                            className="input w-full" 
                            placeholder="Mínimo 8 caracteres"
                        />
                        {errors.new_password && <span className="text-red-500 text-xs">{errors.new_password.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-bold">Confirmar Nova Senha</label>
                        <input 
                            {...register("re_new_password")} 
                            type="password" 
                            className="input w-full" 
                            placeholder="Repita a senha"
                        />
                        {errors.re_new_password && <span className="text-red-500 text-xs">{errors.re_new_password.message}</span>}
                    </div>

                    <Button 
                        type="submit" 
                        variant="submit" 
                        size="lg" 
                        className="w-full mt-4"
                        disabled={loading}
                    >
                        {loading ? "Redefinindo..." : "Salvar Nova Senha"}
                    </Button>
                </form>
            </div>
        </div>
    );
}