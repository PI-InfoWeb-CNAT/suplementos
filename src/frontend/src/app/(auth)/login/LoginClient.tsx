'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

import { loginSchema, LoginSchemaType } from "@/schemas/loginSchema";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { notify } from "@/lib/toast";
import api from "@/services/api";
import EsqueceuSenhaModal from "@/components/modals/EsqueceuSenhaModal";

export default function LoginClient() {
    const { login, user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect");

    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        mode: "onChange"
    });

    const onSubmit = async (data: LoginSchemaType) => {
        try {
            const response = await api.post("/login/", {
                email: data.email,
                password: data.senha,
            });

            const novoUsuario = response.data;

            // --- LÓGICA DE VERIFICAÇÃO DE ADMIN ---
            if (redirect && redirect.includes("/admin")) {
                if (novoUsuario.perfil !== 'admin') {
                    notify("Esta conta não possui permissão de administrador.", "error");
                    return; 
                }
            }
            
            localStorage.setItem("access", novoUsuario.access);
            localStorage.setItem("refresh", novoUsuario.refresh);

            login({ 
                id: novoUsuario.id, 
                nome: novoUsuario.nome, 
                email: novoUsuario.email, 
                perfil: novoUsuario.perfil, 
                cpf: novoUsuario.cpf, 
                telefone: novoUsuario.telefone 
            });
            
            notify(`Bem-vindo, ${novoUsuario.nome}!`, "success");

            setTimeout(() => {
                if (redirect) {
                    router.push(redirect); 
                } else {
                    router.push("/");
                }
            }, 1000);

        } catch (error: any) {
            console.error("Erro ao fazer login:", error.response?.data || error.message);
            notify("Email ou senha incorretos.", "error");
        }
    };

    const onError = (errors: FieldErrors<LoginSchemaType>) => {
        const firstError = Object.values(errors)[0];

        if (firstError && "message" in firstError) {
            notify(firstError.message as string, "warning");
        } else {
            notify("Erro ao validar dados", "warning");
        }
    };

    return (
        <main className="flex relative h-screen">
            <section className="relative nt-sm:w-[60%] w-full flex flex-col justify-center items-center bg-white rounded-r-3xl z-20">
                <div className="nt-lg:w-[50%] w-3/4 space-y-15 flex flex-col items-center">
                    <h3 className="mb-lg:text-2xl text-xl text-center font-semibold">BEM VINDO DE VOLTA!</h3>
                    <div className="w-full space-y-15">

                        <form id="login-form" onSubmit={handleSubmit(onSubmit, onError)} className="space-y-7">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="font-semibold mb-lg:text-lg">E-MAIL</label>
                                <input {...register("email")} type="email" name="email" id="email" placeholder="Digite seu e-mail" className="input px-3 py-2.5 rounded-md" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="senha" className="font-semibold mb-lg:text-lg">SENHA</label>
                                <input {...register("senha")} type="password" name="senha" id="senha" placeholder="Digite sua senha" className="input px-3 py-2.5 rounded-md" />
                            </div>
                        </form>

                        <div className="flex justify-between items-center">
                            <Button
                                type="submit"
                                form="login-form"
                                variant="submit"
                                size="submit"
                            >
                                Entrar
                            </Button>

                            <EsqueceuSenhaModal />
                        </div>
                    </div>
                    <a href="/cadastro" className="text-center mb-lg:text-lg font-semibold text-dark-green hover:underline">
                        Não tem uma conta? Cadastre-se
                    </a>
                </div>
                <p className="absolute top-10 left-1/2 -translate-x-1/2 text-dark-green mb-lg:text-xl text-lg font-semibold">
                    Login
                </p>
            </section>
            <section className="hidden nt-sm:block z-10 w-[41%] absolute right-0">
                <img className="object-cover w-full h-screen" src="/foto_cadastro_login.png" alt="/foto_cadastro_login.png" />
                <a href="/cadastro" className="absolute top-10 left-1/2 -translate-x-1/2 text-gray-400 hover:text-white transition-all duration-300 text-xl font-semibold">
                    Cadastro
                </a>
            </section>
            <a href="/" className="absolute tb:top-7 top-9 right-10 z-20">
                <button className="nt-sm:text-gray-400 nt-sm:hover:text-white text-dark-green hover:brightness-70 transition-all duration-300 cursor-pointer">
                    <X className="tb:w-10 w-8 h-auto" />
                </button>
            </a>
        </main>
    )
}