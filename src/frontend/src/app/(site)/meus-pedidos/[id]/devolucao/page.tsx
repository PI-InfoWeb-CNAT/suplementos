import { Metadata } from "next";
import DevolucaoClient from "./DevolucaoClient";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `PowerUP - Devolução do Pedido ${id}`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 
  return <DevolucaoClient id={id} />;
}