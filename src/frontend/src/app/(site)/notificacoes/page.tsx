import { Metadata } from "next";
import NotificacoesClient from "./NotificacoesClient";

export const metadata: Metadata = {
    title: "PowerUP - Notificações", 
};

export default function DevolucoesPage() {
    return <NotificacoesClient />
}