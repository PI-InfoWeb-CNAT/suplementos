import { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: "PowerUP - Login", 
};

export default function Login() {
  return <LoginClient />
}