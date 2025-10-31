
// import { formatarPreco } from "@/lib/utils";
// import { PedidoProps } from "@/types/pedido";

// const PedidoCard = ({ pedido }: { pedido: PedidoProps; }) => {
//     return (
//         <div className="relative card-shadow flex flex-col xs:flex-row rounded-3xl">
//             <div className="2xl:w-60 xl:w-50 md:w-60 sm:w-50 xs:w-40 w-full">
//                 <img src={pedido} alt={`Imagem do produto ${item.produto.nome}`} className="w-full h-full rounded-3xl object-cover object-center" />
//             </div>
//             <div className="pl-6 pr-10 py-4 flex flex-col flex-1 justify-between gap-4">
//                 <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
//                     <h3 className="sm:text-2xl text-xl font-medium">{item.produto.nome}</h3>
//                     {item.produto.porcentagem_desconto > 0 && (
//                         <div className="tb:text-base text-sm bg-dark-grey text-light-green px-2 py-1 tb:rounded-md rounded-sm">
//                             {item.produto.porcentagem_desconto}% OFF
//                         </div>
//                     )}
//                 </div>
//                 <div className="sm:space-y-4 space-y-2">
//                     <p className="font-bold sm:text-lg">Preço: <span className="font-medium">{item.produto.preco_calculado}</span></p>

//                     {pageName === "carrinho" ? (
//                         <div className="font-bold sm:text-lg flex items-center gap-3">
//                             <span>Quantidade:</span>
//                             <div className="flex items-center gap-2">
//                                 <button 
//                                     onClick={() => handleUpdateQuantidade(item.quantidade - 1)}
//                                     disabled={isLoading}
//                                     className="p-1 bg-gray-200 rounded-full disabled:opacity-50 cursor-pointer"
//                                 >
//                                     <Minus size={16} />
//                                 </button>
//                                 <span className="font-medium w-8 text-center">{item.quantidade}</span>
//                                 <button 
//                                     onClick={() => handleUpdateQuantidade(item.quantidade + 1)}
//                                     disabled={isLoading}
//                                     className="p-1 bg-gray-200 rounded-full disabled:opacity-50 cursor-pointer"
//                                 >
//                                     <Plus size={16} />
//                                 </button>
//                             </div>
//                         </div>
//                     ) : (
//                         <p className="font-bold sm:text-lg">Quantidade: <span className="font-medium">{item.quantidade}</span></p>
//                     )}
                    
//                     <p className="font-bold sm:text-[22px] text-lg">Subtotal: <span className="font-medium">R$ {formatarPreco(item.subtotal)}</span></p>
//                 </div>
//             </div>
//             <X 
//                 size={30} 
//                 onClick={handleRemoveItem}
//                 className="absolute top-4 right-4 bg-dark-grey text-green rounded-full p-1 cursor-pointer hover:bg-[#2E2E2E] transition-colors"
//             />
//         </div>
//     )
// }

// export default PedidoCard;