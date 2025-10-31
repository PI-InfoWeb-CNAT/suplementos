import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatarPreco(valor: number | string | null | undefined): string {
    let numero: number;

    if (valor === null || valor === undefined) {
        return "0,00";
    }

    if (typeof valor === 'string') {
        const valorNumerico = parseFloat(valor.replace(',', '.'));
        
        if (isNaN(valorNumerico)) {
            return "0,00"; 
        }
        numero = valorNumerico;
    } else {
        numero = valor;
    }

    if (isNaN(numero)) {
        return "0,00";
    }

    return numero.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

export function formatarData(dateString: string): string {
    return new Date(dateString).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}