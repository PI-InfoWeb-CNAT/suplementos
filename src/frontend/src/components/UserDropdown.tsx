"use client";

import { IoIosArrowDown } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { HiMiniUser } from "react-icons/hi2";

import { useAuth } from "@/context/AuthContext";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Icon from "@/components/Icon";

export default function UserDropdown({ user }: { user?: { nome: string } }) {
    const { logout } = useAuth();
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-1 cursor-pointer select-none group hover:text-dark-green transition-color-slow">
                <p className="text-lg">
                    Olá, <strong>{user?.nome}</strong>
                </p>
                <IoIosArrowDown className="text-[14px] tb:text-xl transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent sideOffset={4} className="min-w-[8rem] bg-popover text-popover-foreground rounded-md border shadow-md p-1">
            <DropdownMenuItem asChild>
                <a href="/perfil">Perfil</a>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => logout()}>Sair</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  );
}
