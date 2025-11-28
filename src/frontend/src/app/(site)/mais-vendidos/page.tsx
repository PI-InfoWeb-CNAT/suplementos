import { Metadata } from "next";
import MaisVendidosClient from "./MaisVendidosClient";

export const metadata: Metadata = {
    title: "PowerUP - Mais Vendidos", 
};

export default function MaisVendidosPage() {
    return <MaisVendidosClient />
}