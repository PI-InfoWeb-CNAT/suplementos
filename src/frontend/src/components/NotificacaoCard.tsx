import { Package, RefreshCw, MessageSquare, Tag, ShieldAlert } from 'lucide-react';

import { Notificacao } from "@/types/notificacao";
import { formatarData } from '@/lib/utils';

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
            icon: <MessageSquare size={20} />,
        },
    };

    const style = CategoriaConfig[notificacao.categoria] || CategoriaConfig['mensagem_personalizada'];

    return (
        <div className="flex items-center gap-4 p-5 border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="shrink-0 h-10 w-10 flex items-center justify-center bg-dark-grey text-green rounded-full">
                {style.icon}
            </div>
            
            <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                    <h4 className={`text-sm font-semibold ${!notificacao.lida ? 'text-black' : 'text-gray-700'}`}>
                        {notificacao.titulo}
                    </h4>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                        {formatarData(notificacao.data_envio)}
                    </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                    {notificacao.texto}
                </p>
            </div>

            {!notificacao.lida && (
                <div className="shrink-0 mt-1">
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>
                </div>
            )}
        </div>
    )
}

export default NotificacaoCard;