'use client'
import { X } from "lucide-react"

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import { Button } from "../ui/button"

export default function RedefinirSenhaModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="close" size="close">
                    Redefinir senha
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:min-w-160 h-110 flex flex-col justify-center items-center gap-15" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle className="font-semibold text-2xl">Redefinição da Senha</DialogTitle>
                    <VisuallyHidden>
                        <DialogDescription>Preencha os campos abaixo e redefina sua senha</DialogDescription>
                    </VisuallyHidden>
                </DialogHeader>
                <form className="flex flex-col gap-6 sm:w-4/5 w-full">
                    <label htmlFor="senha_atual" className="flex items-center space-x-2 sm:text-lg">
                        <strong className="sm:w-30">Senha atual:</strong>
                        <input type="text" id="senha_atual" className="input pl-2 py-0.5 rounded-sm flex-1" />
                    </label>
                    <label htmlFor="nova_senha" className="flex items-center space-x-2 sm:text-lg">
                        <strong className="sm:w-30">Nova senha:</strong>
                        <input type="text" id="nova_senha" className="input pl-2 py-0.5 rounded-sm flex-1" />
                    </label>
                    <label htmlFor="confirmacao_nova_senha" className="flex items-center space-x-2 sm:text-lg">
                        <strong className="sm:w-50">Confirmação da senha:</strong>
                        <input type="text" id="confirmacao_nova_senha" className="input pl-2 py-0.5 rounded-sm flex-1" />
                    </label>
                    <div className="flex gap-8 mt-5">
                        <Button variant="submit" size="submit" type="submit">
                            Redefinir
                        </Button>
                        <DialogClose asChild>
                            <Button variant="close" size="close" type="button">
                                Cancelar
                            </Button>
                        </DialogClose>
                    </div>
                </form>
                <DialogClose asChild>
                    <button className="absolute p-0.5 right-4 top-4 border-none rounded-sm text-black hover:bg-gray-200 transition-color-slow cursor-pointer focus:outline-none">
                        <X className="w-7 h-auto" />
                    </button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}
