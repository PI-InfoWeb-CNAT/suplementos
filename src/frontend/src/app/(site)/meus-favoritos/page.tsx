import { Metadata } from "next";
import FavoritosClient from "./FavoritosClient";

export const metadata: Metadata = {
  title: "PowerUP - Meus Favoritos", 
};

export default function FavoritosPage() {
  return <FavoritosClient />
}