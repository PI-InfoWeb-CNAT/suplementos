'use client'
import { X } from "lucide-react"

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

import { BsQuestionCircleFill } from "react-icons/bs"

export default function AjudaModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='flex items-center gap-3 mb-lg:text-lg text-base font-semibold pl-3 text-dark-grey hover:text-dark-green transition-color-slow cursor-pointer'>
          <BsQuestionCircleFill size={24} />
          Ajuda
        </div>
      </DialogTrigger>

      <DialogContent className="w-180 h-80 flex flex-col justify-center items-center">
        <DialogHeader>
            <VisuallyHidden>
                <DialogTitle>Ajuda</DialogTitle>
            </VisuallyHidden>
        </DialogHeader>
        <div className="flex flex-col items-center gap-5 px-10 text-center tb:text-xl text-lg font-bold">
          <p>Para entrar em contato conosco, envie uma mensagem para o e-mail abaixo:</p>
          <p className="w-max border-b border-[#117C00]">powerup.suporte@gmail.com</p>
        </div>
        <DialogClose asChild>
            <button className="absolute right-4 top-4 border-none text-dark-grey hover:text-black transition-colors cursor-pointer focus:outline-none">
                <X className="w-7 h-auto" /> 
            </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
