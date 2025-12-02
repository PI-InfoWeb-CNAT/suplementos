'use client'
import { useState } from "react"
import Link from 'next/link';

import { X } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import { Button } from "../../ui/button"
import { PedidoProps } from "@/types/pedido";
import ItemCard from "@/components/ItemCard";

export default function DetalhesPedidoModal({ pedido }: { pedido: PedidoProps }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="submit" className="py-0 max-md:py-5 !text-sm">
                    Ver detalhes
                </Button>
            </DialogTrigger>

            <DialogContent className="!w-200 !max-w-[90dvw] !min-h-138 !max-h-[90dvh] overflow-y-auto flex flex-col" aria-describedby={undefined}>
                <DialogHeader>
                    <VisuallyHidden>
                        <DialogTitle>Cancelar pedido</DialogTitle>
                        <DialogDescription>Confirme abaixo o seu desejo de cancelar o pedido</DialogDescription>
                    </VisuallyHidden>
                </DialogHeader>

                <div className="flex flex-col gap-10 px-5">
                    <h4 className="sm:text-2xl text-xl font-semibold">Detalhes do pedido #{pedido.id}</h4>
                    <div className="space-y-3 sm:text-lg">
                        <p>
                            <strong className="mr-2">Endereço:</strong>
                            {pedido.endereco ? `${pedido.endereco.apelido} - ${pedido.endereco.rua}, ${pedido.endereco.numero}` : "Endereço excluído pelo usuário."}
                        </p>
                        <p>
                            <strong className="mr-2">Cartão:</strong>
                            {pedido.cartao ? `${pedido.cartao.apelido} -  **** ${pedido.cartao.numero.slice(-4)}` : "Cartão excluído pelo usuário."}
                        </p>
                    </div>
                    <div className="space-y-3">
                        <div className="flex max-sm:flex-col sm:justify-between">
                            <h5 className="text-xl font-semibold mb-2">Itens do pedido:</h5>
                            {pedido.status === '4' && (
                                <>
                                    {pedido.devolucao ? (
                                        <Link href={`/minhas-devolucoes`} passHref>
                                            <Button
                                                variant="submit" 
                                                size="sm"
                                                className="py-0 max-md:py-5 !text-sm max-sm:w-max max-sm:my-2"
                                            >
                                                Ver solicitação de devolução
                                            </Button>
                                        </Link>
                                    ) : (
                                        <Link href={`/meus-pedidos/${pedido.id}/devolucao`} passHref>
                                            <Button
                                                variant="submit"
                                                size="sm"
                                                className="py-0 max-md:py-5 !text-sm max-sm:w-max max-sm:my-2"
                                            >
                                                Solicitar devolução de itens
                                            </Button>
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-6 p-2 xs:w-auto w-[240px] max-xs:mx-auto">
                            {pedido.itens.map(item => (
                                <ItemCard
                                    key={item.produto.id}
                                    item={item}
                                    pageName="Meus Pedidos"
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
    )
}