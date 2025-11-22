import { Package, RefreshCw, Mail, Tag, ShieldAlert } from 'lucide-react';

import { Notificacao } from "@/types/notificacao";
import { formatarData } from '@/lib/utils';
import Icon from './Icon';

const NotificacaoCard = ({notificacao} : {notificacao: Notificacao}) => {
    const CategoriaConfig: Record<string, { icon: React.ReactNode; }> = {
        'status_pedido': {
            icon: <Package size={20} />,
        },
        'status_devolucao': {
            icon: <RefreshCw size={20} />,
        },
        'promocao': {
            icon: <Tag size={20} />,
        },
        'seguranca': {
            icon: <ShieldAlert size={20} />,
        },
        'mensagem_personalizada': {
            icon: <Mail size={20} />,
        },
    };

    const style = CategoriaConfig[notificacao.categoria] || CategoriaConfig['mensagem_personalizada'];

    return (
        <div className="flex items-center gap-4 p-5 bg-white rounded-lg card-shadow ">
            <Icon icon={style.icon} />
            
            <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                    <h4 className={`font-semibold text-dark-grey`}>
                        {notificacao.titulo}
                    </h4>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                        {formatarData(notificacao.data_envio)}
                    </span>
                </div>
                <p 
                    className="text-sm font-medium text-dark-grey leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: notificacao.texto }}
                />
            </div>
        </div>
    )
}

export default NotificacaoCard;