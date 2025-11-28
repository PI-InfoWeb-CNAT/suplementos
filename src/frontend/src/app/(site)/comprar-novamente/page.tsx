import { Metadata } from "next";
import ComprarNovamenteClient from "./ComprarNovamenteClient";

export const metadata: Metadata = {
    title: "PowerUP - Comprar Novamente", 
};

export default function ComprarNovamentePage() {
    return <ComprarNovamenteClient />
}