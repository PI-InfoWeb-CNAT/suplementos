'use client'
import { X } from "lucide-react"

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import { Button } from "../ui/button"

export default function EditEnderecoModal({}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="submit">
                    Editar
                </Button>
            </DialogTrigger>

            <DialogContent className="w-180 h-80 flex flex-col justify-center items-center" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle className="font-semibold text-2xl mb-5">Editar endereço </DialogTitle>
                    <VisuallyHidden>
                        <DialogDescription>Para obter ajuda, acesse o e-mail abaixo</DialogDescription>
                    </VisuallyHidden>
                </DialogHeader>
                <div className="flex flex-col items-center gap-5 px-10 text-center tb:text-xl text-lg font-bold">
                    <p>Para entrar em contato conosco, envie uma mensagem para o e-mail abaixo:</p>
                    <p className="w-max border-b border-dark-green">powerup.suporte@gmail.com</p>
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