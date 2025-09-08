import { Metadata } from "next";
import EnderecosClient from "./EnderecosClient"

export const metadata: Metadata = {
  title: "PowerUP - Meus Endereços", 
};

export default function EnderecosPage() {
  return <EnderecosClient />
}