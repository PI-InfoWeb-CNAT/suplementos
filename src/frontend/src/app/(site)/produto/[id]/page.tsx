import { Metadata } from "next";
import ProductClient from "./ProductClient";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params;

  return {
    title: `PowerUP - Produto ${id}`,
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
    return <ProductClient id={params.id}/>
}