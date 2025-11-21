import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { MenuProvider } from "@/contexts/MenuContext";
import { CarrinhoProvider } from "@/contexts/CarrinhoContext";
import { NotificacaoProvider } from "@/contexts/NotificacaoContext";

const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PowerUP",
  description: "E-commerce de uma loja de suplementos",
  keywords: ["ecommerce", "suplementos", "loja"],
  openGraph: {
    title: "E-commerce de uma loja de suplementos",
    description: "Veja os melhores produtos do mercado",
    siteName: "PowerUP",
    type: "website",
  },
};

export default function RootLayout({ children }: 
  Readonly<{children: React.ReactNode;}>
) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicons/favicon-light.ico" media="(prefers-color-scheme: dark)"/>
        <link rel="icon" href="/favicons/favicon-dark.ico" media="(prefers-color-scheme: light)"/>
      </head>
      <body className={`${baiJamjuree.className} antialiased`}>
        <MenuProvider>
          <AuthProvider>
            <CarrinhoProvider>
              <NotificacaoProvider>
                {children}  
              </NotificacaoProvider>
            </CarrinhoProvider>
            <Toaster />
          </AuthProvider>
        </MenuProvider>
      </body>
    </html>
  );
}