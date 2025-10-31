import { Metadata } from "next";
import MeusPedidosClient from "./MeusPedidosClient";

export const metadata: Metadata = {
    title: "PowerUP - Meus Pedidos", 
};

export default function MeusPedidosPage() {
    return <MeusPedidosClient />
}