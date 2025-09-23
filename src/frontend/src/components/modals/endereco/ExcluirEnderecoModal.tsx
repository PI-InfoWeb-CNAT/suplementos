"use client";
import { useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { X } from "lucide-react";
import { RiAlertFill } from "react-icons/ri";
import { Button } from "../../ui/button";
import api from "@/services/api";
import { notify } from "@/lib/toast";
import { useEnderecos } from "@/contexts/EnderecoContext";
import { EnderecoCardProps } from "@/types/endereco";

export default function ExcluirEnderecoModal({endereco}: EnderecoCardProps) {
    const { deleteEndereco } = useEnderecos();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await api.delete(`/enderecos/${endereco.id}/`);
            deleteEndereco(endereco.id);
            notify("Endereço excluído com sucesso!", "success");
            setOpen(false);
        } catch (error: any) {
            notify("Erro ao excluir endereço.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="exclude">
                    Excluir
                </Button>
            </DialogTrigger>

            <DialogContent className="w-180 h-80 flex flex-col justify-center items-center" aria-describedby={undefined}>
                <DialogHeader>
                    <VisuallyHidden>
                        <DialogTitle>Excluir endereço #{endereco.id}</DialogTitle>
                        <DialogDescription>Tem certeza que quer excluir esse endereço?</DialogDescription>
                    </VisuallyHidden>
                </DialogHeader>
                <div className="flex flex-col items-center gap-5 px-10 text-center tb:text-xl text-lg font-semibold">
                    <div className="space-y-2">
                        <p>Deseja realmente excluir o endereço <strong>{endereco.apelido}</strong>?</p>
                        <strong>Essa é uma ação permanente.</strong>
                    </div>
                    <RiAlertFill size={60} />
                    <div className="flex gap-8">
                        <DialogClose asChild>
                            <Button variant="close" size="close">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button variant="submit" size="submit" onClick={handleDelete} disabled={loading}>
                            {loading ? "Excluindo..." : "Excluir"}
                        </Button>
                    </div>
                </div>
                <DialogClose asChild>
                    <button className="absolute p-0.5 right-4 top-4 border-none rounded-sm text-black hover:bg-gray-200 transition-color-slow cursor-pointer focus:outline-none">
                        <X className="w-7 h-auto" />
                    </button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}