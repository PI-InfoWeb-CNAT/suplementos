import Layout from "@/components/layout/Layout";
import { ProdutosProvider } from "@/context/ProductContext";

export default function SiteLayout({ children }: { children: React.ReactNode; }) {
  return (
        <ProdutosProvider>
            <Layout>
                {children}
            </Layout>
        </ProdutosProvider>
  );
}
