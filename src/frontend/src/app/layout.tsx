import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";

import Layout from "@/components/layout/Layout";
import { MenuProvider } from "@/context/MenuContext";
import { ProdutosProvider } from "@/context/ProductContext";

const baiJamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
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
          <ProdutosProvider>
            <Layout>
              {children}
            </Layout>
          </ProdutosProvider>
        </MenuProvider>
      </body>
    </html>
  );
}