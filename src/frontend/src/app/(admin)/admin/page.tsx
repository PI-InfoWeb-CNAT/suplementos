import { Metadata } from 'next';
import AdminClient from './AdminClient';

export const metadata: Metadata = {
    title: "PowerUP - Página do Administrador", 
};

export default function Home() {
    return <AdminClient />
}
