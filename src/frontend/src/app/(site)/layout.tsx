import Layout from "@/components/layout/Layout";
import { MenuProvider } from "@/context/MenuContext";
import { ProdutosProvider } from "@/context/ProductContext";

export default function SiteLayout({ children }: { children: React.ReactNode; }) {
  return (
    <MenuProvider>
        <ProdutosProvider>
            <Layout>
                {children}
            </Layout>
        </ProdutosProvider>
    </MenuProvider>
  );
}
