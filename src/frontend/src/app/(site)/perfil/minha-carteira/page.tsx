import { Metadata } from "next";
import CarteiraClient from "./CarteiraClient"

export const metadata: Metadata = {
  title: "PowerUP - Minha Carteira", 
};

export default function CarteiraPage() {
  return <CarteiraClient />
}