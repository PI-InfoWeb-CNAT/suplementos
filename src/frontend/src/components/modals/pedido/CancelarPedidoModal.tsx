'use client'
import { useState } from "react"

import { X } from "lucide-react"
import { RiAlertFill } from "react-icons/ri";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import { Button } from "../../ui/button"
import { notify } from "@/lib/toast";
import { CancelarPedidoProps } from "@/types/pedido";
import api from "@/services/api";

export default function CancelarPedidoModal({ pedidoId, onCancelSuccess }: CancelarPedidoProps) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleCancelar = async (pedidoId: number) => {
        setLoading(true);
        try {
            await api.post(`/pedidos/${pedidoId}/cancelar/`);
            
            notify("Pedido cancelado com sucesso!", "success");
            onCancelSuccess(pedidoId);
            setOpen(false);
        } catch (error: any) {
            notify("Erro ao cancelar o pedido!", "error");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" size="sm" className="cursor-pointer">
                    Cancelar pedido
                </Button>
            </DialogTrigger>

            <DialogContent className="w-180 h-80 flex flex-col justify-center items-center" aria-describedby={undefined}>
                <DialogHeader>
                    <VisuallyHidden>
                        <DialogTitle>Cancelar pedido</DialogTitle>
                        <DialogDescription>Confirme abaixo o seu desejo de cancelar o pedido</DialogDescription>
                    </VisuallyHidden>
                </DialogHeader>

                <div className="flex flex-col items-center gap-5 px-10 text-center tb:text-xl text-lg font-semibold">
                    <div>
                        <p>Deseja realmente cancelar o pedido #{pedidoId}?</p>
                        <strong>Essa é uma ação permanente.</strong>
                    </div>
                    <RiAlertFill size={60} />
                    <div className="flex gap-8">
                        <Button variant="close" size="close" onClick={() => setOpen(false)}>
                            Voltar
                        </Button>
                        <Button
                            variant="submit"
                            size="submit"
                            disabled={loading}
                            onClick={() => pedidoId && handleCancelar(pedidoId)}
                        >
                            {loading ? "Cancelando..." : "Cancelar"}
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
    )
}