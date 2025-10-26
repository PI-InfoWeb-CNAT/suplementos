import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatarPreco = (numero: number | null | undefined): string => {
    if (numero === null || numero === undefined || isNaN(numero)) {
        return "0,00"; 
    }
    
    return numero.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};
