import { Metadata } from "next";
import CategoriaClient from "./CategoriaClient";

export async function generateMetadata({ params }: { params: Promise<{ tipo: string }> }): Promise<Metadata> {
  const { tipo } = await params;

  return {
    title: `PowerUP - ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`,
  };
}

export default async function CategoriaPage({ params }: { params: Promise<{ tipo: string }> }) {
  const { tipo } = await params; 
  return <CategoriaClient tipo={tipo} />;
}