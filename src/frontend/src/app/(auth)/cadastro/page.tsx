'use client';

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { notify } from "@/lib/toast";
import api from "@/services/api";

export default function CadastroPage() {
    const router = useRouter();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        if (data.senha !== data.confirmacaoSenha) {
            notify("As senhas não coincidem", "warning");
            return;
        }

        try {
            await api.post("/clientes/", {
                nome: data.nome,
                cpf: data.cpf,
                telefone_celular: data.telefone,
                user: {
                    email: data.email,
                    password: data.senha,
                },
            });


            notify("Cadastro realizado com sucesso!", "success");
            setTimeout(() => {
                router.push("/login");
            }, 2000); 
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
    };

    const onError = (errors: any) => {
        for (const campo in errors) {
            const erro = errors[campo]
            if (erro.type === 'minLength') {
                notify(`A senha deve ter no mínimo 8 caracteres`, "warning");
                return
            }
        }
        notify("Por favor, preencha todos os campos.", "warning");
    };

    return (
        <main className="flex flex-row-reverse relative h-screen">
            <section className="relative nt-sm:w-[60%] w-full flex flex-col justify-center items-center bg-white rounded-l-3xl z-20 ">
                <div className="nt-lg:w-[50%] w-3/4 space-y-15 flex flex-col items-center tb:mt-10 mb-lg:mt-50 mt-30">
                    <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full space-y-15 mt-5 mb-5">
                        <div className="space-y-7">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="nome" className="font-semibold mb-lg:text-lg">NOME COMPLETO</label>
                                <input {...register("nome", { required: true })} type="text" id="nome" placeholder="Digite seu nome" className="input w-full" />
                            </div>
                            <div className="flex flex-col gap-4">
                                <label htmlFor="email" className="font-semibold mb-lg:text-lg">E-MAIL</label>
                                <input {...register("email", { required: true })} type="email" id="email" placeholder="Digite seu email" className="input w-full" />
                            </div>

                            <div className="w-full flex flex-col md:flex-row md:space-x-24 space-y-6 md:space-y-0 items-start">
                                <div className="flex flex-col gap-2 w-full md:w-1/2">
                                    <label htmlFor="cpf" className="font-semibold mb-lg:text-lg whitespace-nowrap">CPF</label>
                                    <input {...register("cpf", { required: true })} type="text" id="cpf" placeholder="Digite seu CPF" className="input w-full" />
                                </div>

                                <div className="flex flex-col gap-2 w-full md:w-1/2">
                                    <label htmlFor="telefone" className="font-semibold mb-lg:text-lg whitespace-nowrap">TELEFONE CELULAR</label>
                                    <input {...register("telefone", { required: true })} type="text" id="telefone" placeholder="Digite seu telefone celular" className="input w-full" />
                                </div>
                            </div>

                            <div className="w-full flex flex-col md:flex-row md:space-x-24 space-y-6 md:space-y-0 items-start">
                                <div className="flex flex-col gap-2 w-full md:w-1/2">
                                    <label htmlFor="senha" className="font-semibold mb-lg:text-lg whitespace-nowrap">SENHA</label>
                                    <input {...register("senha", { required: true, minLength: 8 })} type="password" id="senha" placeholder="Digite sua senha" className="input w-full" />
                                </div>

                                <div className="flex flex-col gap-2 w-full md:w-1/2">
                                    <label htmlFor="confirmacaoSenha" className="font-semibold mb-lg:text-lg whitespace-nowrap">CONFIRMAÇÃO DA SENHA</label>
                                    <input {...register("confirmacaoSenha", { required: true })} type="password" id="confirmacaoSenha" placeholder="Digite sua senha novamente" className="input w-full" />
                                </div>
                            </div>
                        </div>
                        <Button type="submit" variant="submit" size="submit">
                            Criar
                        </Button>
                    </form>
                    <a href="/login" className="text-center mb-lg:text-lg font-semibold text-dark-green hover:underline">
                        Já tem uma conta? Faça login
                    </a>
                </div>
                <p className="absolute top-10 left-1/2 -translate-x-1/2 text-dark-green mb-lg:text-xl text-lg font-semibold">
                    Cadastro
                </p>
            </section>
            <section className="hidden nt-sm:block z-10 w-[41%] absolute left-0">
                <img className="object-cover w-full h-screen" src="/foto_cadastro_login.png" alt="/foto_cadastro_login.png" />
                <a href="/login" className="absolute top-10 left-1/2 -translate-x-1/2 text-gray-400 hover:text-white transition-all duration-300 text-xl font-semibold">
                    Login
                </a>
            </section>
            <a href="/" className="absolute tb:top-7 top-9 right-10 z-20">
                <button className="text-dark-green hover:brightness-70 transition-all duration-300 cursor-pointer">
                    <X className="tb:w-10 w-8 h-auto" />
                </button>
            </a>
        </main>
    );
}