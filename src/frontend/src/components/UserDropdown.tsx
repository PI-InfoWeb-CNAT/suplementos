"use client";

import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, } from "@/components/ui/dropdown-menu";
import ExcluirContaModal from "./modals/ExcluirContaModal";
import Link from "next/link";

export default function UserDropdown({ user }: { user?: { nome: string } }) {
    const { logout } = useAuth();
    const [openExcluir, setOpenExcluir] = useState(false);

    const getFirstName = (fullName: string ) => fullName.split(" ")[0];

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-1 cursor-pointer select-none group hover:text-dark-green transition-color-slow">
                        <p className="text-lg">
                            Olá, <strong>{user ? getFirstName(user.nome) : ''}</strong>
                        </p>
                        <IoIosArrowDown className="text-[14px] tb:text-xl transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    sideOffset={4}
                    className="min-w-[8rem] bg-popover text-popover-foreground rounded-md border shadow-md p-1"
                >
                    <DropdownMenuItem asChild>
                        <Link href="/perfil">Perfil</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => logout()}>Sair</DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            requestAnimationFrame(() => setOpenExcluir(true));
                        }}
                    >
                        Excluir Conta
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <ExcluirContaModal open={openExcluir} onOpenChange={setOpenExcluir} />
        </>
    );
}
