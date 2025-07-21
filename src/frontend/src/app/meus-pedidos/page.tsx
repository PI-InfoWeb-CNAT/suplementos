import { Metadata } from "next";
import { FaBottleWater, FaShirt } from "react-icons/fa6";
import { GiKnifeFork } from "react-icons/gi";
import { BsFillLightningChargeFill } from "react-icons/bs";
import Category from "@/components/Category";

export const metadata: Metadata = {
  title: "PowerUP - Meus Pedidos", 
};

export default function MeusPedidos() {
  return (
    <main>
      <h1 className="h2 mb-8">Meus Pedidos</h1>
      <section className="space-y-8">
        <h2 className="h2">Categorias</h2>
        <div className="flex justify-between items-center flex-wrap gap-y-5">
          <Category href="acessorios" icon={<FaBottleWater className="text-light-green text-3xl md:text-4xl" />} name="Acessórios" isEven />
          <Category href="alimentos" icon={<GiKnifeFork className="text-black text-3xl md:text-4xl" />} name="Alimentos" isEven={false} />
          <Category href="roupas" icon={<FaShirt className="text-light-green text-3xl md:text-4xl" />} name="Roupas" isEven />
          <Category href="suplementos" icon={<BsFillLightningChargeFill className="text-black text-3xl md:text-4xl" />} name="Suplementos" isEven={false} />
        </div>
      </section>
    </main>
  );
}