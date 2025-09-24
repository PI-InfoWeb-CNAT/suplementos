import { EnderecoCardProps } from "@/types/endereco";
import EditEnderecoModal from "./modals/endereco/EditEnderecoModal";
import ExcluirEnderecoModal from "./modals/endereco/ExcluirEnderecoModal";

const EnderecoCard = ({ endereco }: EnderecoCardProps) => {
    return (
        <div className="space-y-5 card-shadow w-full h-[335px] rounded-xl p-5 overflow-x-auto whitespace-nowrap">
            <h3 className="h3">{endereco.apelido}</h3>
            <div className="space-y-2 text-dark-grey">
                <p className="font-bold">Destinatário: <span className="font-medium">{endereco.destinatario}</span></p>
                <p className="font-bold">Rua: <span className="font-medium">{endereco.rua}, {endereco.numero}</span></p>
                <p className="font-bold">Bairro: <span className="font-medium">{endereco.bairro}</span></p>
                <p className="font-bold">Cidade: <span className="font-medium">{endereco.cidade}, {endereco.uf}</span></p>
                <p className="font-bold">CEP: <span className="font-medium">{endereco.cep}</span></p>
                <p className="font-bold">Complemento: <span className="font-medium">{endereco.complemento !== "" ? endereco.complemento : "Vazio"}</span></p>
            </div>
            <div className="flex gap-5">
                <EditEnderecoModal endereco={endereco} />
                <ExcluirEnderecoModal endereco={endereco} />
            </div>
        </div>
    );
}

export default EnderecoCard;