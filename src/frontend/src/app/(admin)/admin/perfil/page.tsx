import { Metadata } from "next";
import PerfilClient from "../../../(site)/perfil/PerfilClient";

export const metadata: Metadata = {
    title: "PowerUP - Perfil Admin",
};

export default function AdminPerfilPage() {
    return <PerfilClient />
}
