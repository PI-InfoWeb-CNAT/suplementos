import Layout from "@/components/layout/Layout";
import { EnderecoProvider } from "@/context/EnderecoContext";
import { ProdutosProvider } from "@/context/ProductContext";

export default function SiteLayout({ children }: { children: React.ReactNode; }) {
  return (
        <ProdutosProvider>
          <EnderecoProvider>
            <Layout>
              {children}
            </Layout>
          </EnderecoProvider>
        </ProdutosProvider>
  );
}
