import { Metadata } from "next";
import PedidoClient from "./PedidoClient";

export const metadata: Metadata = {
    title: "PowerUP - Finalizar Pedido", 
};

export default function CarrinhoPage() {
    return <PedidoClient />
}