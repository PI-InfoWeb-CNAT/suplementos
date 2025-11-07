import { Metadata } from "next";
import DevolucoesClient from "./DevolucoesClient";

export const metadata: Metadata = {
    title: "PowerUP - Minhas Devoluções", 
};

export default function DevolucoesPage() {
    return <DevolucoesClient />
}