'use client';
import Image from "next/image";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import imgEdit from "../../../../public/img-editar.svg"
import FastAcess from "@/components/FastAcess";
import PageWrapper from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
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

    const onError = (errors: FieldErrors<EditPerfilSchemaType>) => {
        const firstError = Object.values(errors)[0];

        if (firstError && "message" in firstError) {
            notify(firstError.message as string, "warning");
        } else {
            notify("Erro ao validar dados", "warning");
        }
    };

    return (
        <PageWrapper pageName="Meu Perfil">
            <div className="flex flex-col nt-sm:flex-row nt-sm:justify-between gap-y-5">
                <section className="flex justify-between rounded-2xl shadow-[0_0_5px_rgba(0,0,0,0.41)] nt-sm:w-1/2 nt-lg:w-[57%] p-6">
                    <div className="flex flex-col gap-8 w-full nt-lg:w-[60%]">
                        <h3 className="h3">Dados Pessoais</h3>
                        <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col gap-6 w-full">
                            <label htmlFor="nome" className="flex items-center space-x-2 w-full text-lg">
                                <strong>Nome:</strong>
                                <input {...register("nome")} type="text" id="nome" className="input pl-2 py-0.5 rounded-sm w-full" />
                            </label>
                            <label htmlFor="email" className="flex items-center space-x-2 w-full text-lg">
                                <strong>Email:</strong>
                                <input {...register("email")} type="text" id="email" className="input pl-2 py-0.5 rounded-sm w-full" />
                            </label>
                            <label htmlFor="cpf" className="flex items-center space-x-2 mb-lg:w-3/5 text-lg">
                                <strong>CPF:</strong>
                                <input {...register("cpf")} type="text" id="cpf" className="input pl-2 py-0.5 rounded-sm w-full" />
                            </label>
                            <label htmlFor="telefone_celular" className="flex items-center space-x-2 mb-lg:w-3/4 text-lg">
                                <strong>Telefone:</strong>
                                <input {...register("telefone_celular")} type="text" id="telefone_celular" className="input pl-2 py-0.5 rounded-sm w-full" />
                            </label>
                            <div className="flex nt-lg:flex-row nt-sm:flex-col mb-lg:flex-row flex-col tb:gap-x-8 gap-x-4 gap-y-4 nt-lg:w-auto w-[180px] mt-4">
                                <Button variant="submit" size="submit">
                                    Atualizar
                                </Button>
                                <RedefinirSenhaModal />
                            </div>
                        </form>
                    </div>
                    <Image src={imgEdit} width={225} alt="Imagem de editar" priority className="hidden nt-lg:block" />
                </section>
                <FastAcess />
            </div>
        </PageWrapper>
    );
}

export default withAuth(PerfilClient);