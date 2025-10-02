import Image from "next/image"

import amex from "../../public/cartoes/amex.png"
import elo from "../../public/cartoes/elo.png"
import hipercard from "../../public/cartoes/hipercard.png"
import mastercard from "../../public/cartoes/mastercard.png"
import visa from "../../public/cartoes/visa.png"
import defaultCard from "../../public/cartoes/default.png"

import { Button } from "./ui/button"
import EditCartaoModal from "./modals/cartao/EditCartaoModal"
import { CartaoCardProps } from "@/types/cartao"
import ExcluirCartaoModal from "./modals/cartao/ExcluirCartaoModal"

const CartaoCard = ({ cartao }: CartaoCardProps) => {
    let bandeiraImg;

    switch (cartao.bandeira) {
        case "amex":
            bandeiraImg = amex;
            break;
        case "elo":
            bandeiraImg = elo;
            break;
        case "hipercard":
            bandeiraImg = hipercard;
            break;
        case "mastercard":
            bandeiraImg = mastercard;
            break;
        case "visa":
            bandeiraImg = visa;
            break;
        default:
            bandeiraImg = defaultCard;
    }

    function maskNumber(numero: string): string {
        const visivel = numero.slice(-4); 
        const mascarado = "*".repeat(4); 
        return mascarado + " " + visivel;
    }

    return (
        <div className="w-full 2xl:min-h-[450px]">
            <div>
                <Image src={bandeiraImg} alt={cartao.bandeira} priority className="object-cover rounded-2xl" />
            </div>
            <div className="h-[250px] space-y-5 card-shadow rounded-b-2xl -mt-3 px-5 pt-5 pb-3 text-dark-grey">
                <h3 className="font-semibold text-xl mb-3 mt-1 line-clamp-1">{cartao.apelido}</h3>
                <div className="space-y-2">
                    <p className="font-bold line-clamp-1">Nome do titular: <span className="font-medium">{cartao.titular}</span></p>
                    <p className="font-bold">Número: <span className="font-medium">{maskNumber(cartao.numero)}</span></p>
                    <p className="font-bold">Bandeira: <span className="font-medium">{cartao.bandeira.replace(/^\w/, c => c.toUpperCase())}</span></p>
                    <p className="font-bold">Tipo: <span className="font-medium">{cartao.tipo == "debito" ? "Débito" : "Crédito"}</span></p>
                </div>
                <div className="flex gap-5">
                    <EditCartaoModal cartao={cartao} />
                    <ExcluirCartaoModal cartao={cartao} />
                </div>
            </div>
        </div>
    )
}

export default CartaoCard;