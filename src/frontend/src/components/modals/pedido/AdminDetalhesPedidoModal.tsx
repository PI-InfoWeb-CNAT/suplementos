'use client';

import { useState } from "react";
import { X } from "lucide-react";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { PedidoProps } from "@/types/pedido";
import ItemCard from "@/components/ItemCard";

interface AdminDetalhesPedidoModalProps {
    pedido: PedidoProps;
}

export default function AdminDetalhesPedidoModal({ pedido }: AdminDetalhesPedidoModalProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="max-xl:w-full bg-blue-700 hover:bg-blue-800 text-white text-base cursor-pointer">
                    Detalhes
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:min-w-[600px] w-full max-w-[90dvw] max-h-[90vh] overflow-y-auto flex flex-col p-6 rounded-xl" aria-describedby={undefined}>
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-2xl font-bold">Detalhes do pedido #{pedido.id}</DialogTitle>
                    <VisuallyHidden>
                        <DialogDescription>Detalhes completos do pedido #{pedido.id}</DialogDescription>
                    </VisuallyHidden>
                </DialogHeader>

                <div className="flex flex-col gap-6">
                    {/* Informações Gerais */}
                    <div className="space-y-3 text-base">
                        <p>
                            <strong className="font-bold text-gray-800">Endereço: </strong>
                            <span className="font-medium">
                                {pedido.endereco ? `${pedido.endereco.apelido} - ${pedido.endereco.rua}, ${pedido.endereco.numero} - ${pedido.endereco.cidade}/${pedido.endereco.uf}` : "Endereço não disponível."}
                            </span>
                        </p>
                        <p>
                            <strong className="font-bold text-gray-800">Cartão: </strong>
                            <span className="font-medium">
                                {pedido.cartao ? `${pedido.cartao.apelido} - ${pedido.cartao.titular}` : "Cartão não utilizado/disponível."}
                            </span>
                        </p>
                    </div>

                    {/* Produtos */}
                    <div className="space-y-3">
                        <h4 className="text-xl font-bold text-gray-800">Produtos</h4>

                        <div className="flex flex-col gap-4 overflow-y-auto p-2 max-h-[510px] xs:w-auto w-[240px] max-xs:mx-auto">
                            {pedido.itens.map(item => (
                                <ItemCard
                                    item={item}
                                    pageName="AdminDetalhes"
                                    statusPedido={pedido.status}
                                />
                            ))}
                        </div>
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
