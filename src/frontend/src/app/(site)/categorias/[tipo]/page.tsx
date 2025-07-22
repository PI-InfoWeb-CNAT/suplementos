import { Metadata } from "next";
import CategoriaClient from "./CategoriaClient";

export async function generateMetadata({ params }: { params: { tipo: string } }): Promise<Metadata> {
  const { tipo } = params;

  return {
    title: `PowerUP - ${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`,
  };
}

const Categoria = ({ params }: { params: { tipo: string } }) => {
  return <CategoriaClient tipo={params.tipo}/>
}

export default Categoria;