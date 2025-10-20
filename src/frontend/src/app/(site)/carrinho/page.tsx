import { Metadata } from "next";
import CarrinhoClient from "./CarrinhoClient";

export const metadata: Metadata = {
  title: "PowerUP - Meu Carrinho", 
};

export default function CarrinhoPage() {
  return <CarrinhoClient />
}