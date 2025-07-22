import { Button } from "@/components/ui/button";

export default function LoginPage() {
    return (
        <main className="flex relative h-screen">
            <section className="relative nt-sm:w-[60%] w-full flex flex-col justify-center items-center bg-white rounded-r-3xl z-20">
                <div className="nt-lg:w-[50%] w-3/4 space-y-15 flex flex-col items-center">
                    <h3 className="text-2xl text-center font-semibold">BEM VINDO DE VOLTA!</h3>
                    <form action="" className="w-full space-y-15">
                        <div className="space-y-7">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="font-semibold text-lg">E-MAIL</label>
                                <input type="email" name="email" id="email" placeholder="Digite seu e-mail" className="input"/>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="senha" className="font-semibold text-lg">SENHA</label>
                                <input type="password" name="senha" id="senha" placeholder="Digite sua senha" className="input"/>
                            </div>
                        </div>
                        <Button type="submit" variant="submit" size="submit">
                            Entrar
                        </Button>
                    </form>
                    <a href="/cadastro" className="text-center text-lg font-semibold text-[#117C00] hover:text-dark-green transition-all duration-300">
                        Não tem uma conta? Cadastre-se
                    </a>
                </div>
                <a href="/login" className="absolute top-10 left-1/2 -translate-x-1/2 text-[#117C00] hover:text-dark-green transition-all duration-300 text-xl font-semibold">
                    Login
                </a>
            </section>
            <section className="hidden nt-sm:block z-10 w-[41%] absolute right-0">
                <img className="object-cover w-full h-screen" src="/foto_cadastro_login.png" alt="/foto_cadastro_login.png" />
                <a href="/cadastro" className="absolute top-10 left-1/2 -translate-x-1/2 text-gray-400 hover:text-white transition-all duration-300 text-xl font-semibold">
                    Cadastro
                </a>
            </section>
        </main>
    )
}