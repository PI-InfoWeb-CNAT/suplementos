import { Metadata } from 'next';
import CadastroClient from './CadastroClient';

export const metadata: Metadata = {
  title: "PowerUP - Cadastro", 
};

export default function Cadastro() {
  return <CadastroClient />
}