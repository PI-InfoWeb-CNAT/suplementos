import { Metadata } from "next";
import PromocoesClient from './PromocoesClient';

export const metadata: Metadata = {
  title: "PowerUP - Promoções", 
};

export default function Promocoes() {
  return <PromocoesClient />
}