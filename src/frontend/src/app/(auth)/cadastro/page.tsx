import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CadastroPage() {
    return (
        <main className="flex flex-row-reverse relative h-screen">
        <section className="relative nt-sm:w-[60%] w-full flex flex-col justify-center items-center bg-white rounded-l-3xl z-20 ">
                <div className="nt-lg:w-[50%] w-3/4 space-y-15 flex flex-col items-center  mt-20">
                    <form action="" className="w-full space-y-15 mt-5 mb-5">
                        <div className="space-y-7">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="nome" className="font-semibold mb-lg:text-lg">NOME COMPLETO</label>
                                <input type="text" name="nome" id="nome" placeholder="Digite seu nome" className="input w-full"/>
                            </div>
                            <div className="flex flex-col gap-4">
                                <label htmlFor="email" className="font-semibold mb-lg:text-lg">E-MAIL</label>
                                <input type="email" name="email" id="email" placeholder="Digite seu email" className="input w-full" />
                            </div>
                         
                            <div className="w-full flex flex-col md:flex-row md:space-x-24 space-y-6 md:space-y-0 items-start">
                                <div className="flex flex-col gap-2 w-full md:w-1/2">
                                    <label htmlFor="cpf" className="font-semibold mb-lg:text-lg whitespace-nowrap">CPF</label>
                                    <input type="text" name="cpf" id="cpf" placeholder="Digite seu CPF" className="input w-full" />
                                </div>

                                <div className="flex flex-col gap-2 w-full md:w-1/2">
                                    <label htmlFor="telefone" className="font-semibold mb-lg:text-lg whitespace-nowrap">TELEFONE CELULAR</label>
                                    <input type="text" name="telefone" id="telefone" placeholder="Digite seu telefone celular" className="input w-full" />
                                </div>
                            </div>

                            <div className="w-full flex flex-col md:flex-row md:space-x-24 space-y-6 md:space-y-0 items-start">
                                <div className="flex flex-col gap-2 w-full md:w-1/2">
                                    <label htmlFor="senha" className="font-semibold mb-lg:text-lg whitespace-nowrap">SENHA</label>
                                    <input type="text" name="senha" id="senha" placeholder="Digite sua senha" className="input w-full" />
                                </div>

                                <div className="flex flex-col gap-2 w-full md:w-1/2">
                                    <label htmlFor="telefone2" className="font-semibold mb-lg:text-lg whitespace-nowrap">CONFIRMAÇÃO DA SENHA</label>
                                    <input type="text" name="telefone2" id="telefone2" placeholder="Digite sua senha novamente" className="input w-full" />
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
    )
}