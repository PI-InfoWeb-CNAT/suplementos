'use client';
import Image from "next/image";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import imgEdit from "../../../../public/img-editar.svg"
import FastAcess from "@/components/FastAcess";
import PageWrapper from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import withAuth from "@/lib/withAuth";
import { notify } from "@/lib/toast";
import api from "@/services/api";
import { editPerfilSchema, EditPerfilSchemaType } from "@/schemas/editPerfilSchema";
import RedefinirSenhaModal from "@/components/modals/RedefinirSenhaModal";

function PerfilClient() {
    const { user, setUser } = useAuth();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<EditPerfilSchemaType>({
        resolver: zodResolver(editPerfilSchema),
        mode: "onChange",
        defaultValues: {
            nome: user?.nome || "",
            email: user?.email || "",
            cpf: user?.cpf || "",
            telefone_celular: user?.telefone || "",
        }
    })

    const onSubmit = async (data: EditPerfilSchemaType) => {
        if (!user) return;

        const updatedData: any = {};

        if (data.nome !== user.nome) updatedData.nome = data.nome;
        if (data.cpf !== user.cpf) updatedData.cpf = data.cpf;
        if (data.telefone_celular !== user.telefone) updatedData.telefone_celular = data.telefone_celular;
        if (data.email !== user.email) updatedData.user = { email: data.email };

        if (Object.keys(updatedData).length === 0) {
            notify("Altere algum campo antes de atualizar.", "warning");
            return;
        }

        try {
            const response = await api.patch(`/clientes/${user.id}/`, updatedData);

            const updatedUser = {
                ...user,
                ...response.data,
                email: response.data.user?.email || user.email,
            };

            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            reset({
                nome: updatedUser.nome,
                email: updatedUser.email,
                cpf: updatedUser.cpf,
                telefone_celular: updatedUser.telefone_celular,
            });

            notify("Dados atualizados com sucesso!", "success");
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

    return (
        <PageWrapper pageName="Meu Perfil">
            <div className="flex flex-col nt-sm:flex-row nt-sm:justify-between gap-y-5 lg:w-full md:w-[65%] mx-auto">
                <section className="flex justify-between rounded-2xl card-shadow nt-sm:w-1/2 nt-lg:w-[57%] p-6">
                    <div className="flex flex-col gap-4 w-full nt-lg:w-[60%]">
                        <h3 className="h3 mb-4">Dados Pessoais</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
                            <label htmlFor="nome" className="w-full sm:text-lg">
                                <div className="flex items-center space-x-2">
                                    <strong>Nome:</strong>
                                    <input {...register("nome")} type="text" id="nome" className="input w-full" />
                                </div>
                                {errors.nome && (
                                    <span className="text-red-500 text-sm mt-1 leading-1">
                                        {errors.nome.message}
                                    </span>
                                )}
                            </label>
                            <label htmlFor="email" className="w-full sm:text-lg">
                                <div className="flex items-center space-x-2">
                                    <strong>Email:</strong>
                                    <input {...register("email")} type="text" id="email" className="input w-full" />
                                </div>
                                {errors.email && (
                                    <span className="text-red-500 text-sm mt-1 leading-1">
                                        {errors.email.message}
                                    </span>
                                )}
                            </label>
                            <label htmlFor="cpf" className="mb-lg:w-3/5 sm:text-lg">
                                <div className="flex items-center space-x-2">
                                    <strong>CPF:</strong>
                                    <input {...register("cpf")} type="text" id="cpf" className="input w-full" />
                                </div>
                                {errors.cpf && (
                                    <span className="text-red-500 text-sm mt-1 leading-1">
                                        {errors.cpf.message}
                                    </span>
                                )}
                            </label>
                            <label htmlFor="telefone_celular" className="mb-lg:w-3/4 sm:text-lg">
                                <div className="flex items-center space-x-2">
                                    <strong>Telefone:</strong>
                                    <input {...register("telefone_celular")} type="text" id="telefone_celular" className="input w-full" />
                                </div>
                                {errors.telefone_celular && (
                                    <span className="text-red-500 text-sm mt-1 leading-1">
                                        {errors.telefone_celular.message}
                                    </span>
                                )}
                            </label>
                            <Button variant="submit" size="submit" className="w-50 mt-4">
                                Atualizar
                            </Button>
                        </form>
                        <RedefinirSenhaModal />
                    </div>
                    <Image src={imgEdit} width={225} alt="Imagem de editar" priority className="hidden nt-lg:block" />
                </section>
                <FastAcess />
            </div>
        </PageWrapper>
    );
}

export default withAuth(PerfilClient);