import Layout from "@/components/layout/Layout";
import { CartaoProvider } from "@/contexts/CartaoContext";
import { EnderecoProvider } from "@/contexts/EnderecoContext";
import { ProdutosProvider } from "@/contexts/ProductContext";

export default function SiteLayout({ children }: { children: React.ReactNode; }) {
  return (
        <ProdutosProvider>
          <EnderecoProvider>
            <CartaoProvider>
              <Layout>
                {children}
              </Layout>
            </CartaoProvider>
          </EnderecoProvider>
        </ProdutosProvider>
  );
}
