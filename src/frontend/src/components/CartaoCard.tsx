import { CartaoCardProps } from "@/types/cartao"

const CartaoCard = ({ cartao }: CartaoCardProps) => {
    return (
        <div>
            <p>{cartao.apelido} - {cartao.bandeira}</p>
        </div>
    )
}

export default CartaoCard;