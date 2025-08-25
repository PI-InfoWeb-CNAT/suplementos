// ExcluirContaModal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { X } from "lucide-react";
import { RiAlertFill } from "react-icons/ri";
import { Button } from "../ui/button";

export default function ExcluirContaModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void; }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-180 h-80 flex flex-col justify-center items-center" aria-describedby={undefined}>
                <DialogHeader>
                    <VisuallyHidden>
                        <DialogTitle>Ajuda</DialogTitle>
                    </VisuallyHidden>
                </DialogHeader>
                <div className="flex flex-col items-center gap-5 px-10 text-center tb:text-xl text-lg font-semibold">
                    <div>
                        <p>Deseja realmente excluir a conta?</p>
                        <strong>Essa é uma ação permanente.</strong>
                    </div>
                    <RiAlertFill size={60} />
                    <div className="flex gap-8">
                        <Button variant="close" size="close" onClick={() => onOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button variant="submit" size="submit">
                            Excluir
                        </Button>
                    </div>
                </div>
                <button onClick={() => onOpenChange(false)} className="absolute p-0.5 right-4 top-4 border-none rounded-sm text-black hover:bg-gray-200 transition-color-slow cursor-pointer focus:outline-none">
                    <X className="w-7 h-auto" />
                </button>
            </DialogContent>
        </Dialog>
    );
}