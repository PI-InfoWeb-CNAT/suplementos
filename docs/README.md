# Documento de visão

## Comércio Eletrônico

### Histórico da Revisão 
|  Data  | Versão | Descrição | Autor |
|:-------|:-------|:----------|:------|
| 03/03/2024 | **1.00** | Versão Inicial  | David Paiva, Diego Luiz, Lucas Brito e Pedro Edi |
| 13/05/2025 | **2.00** | Versão Refinada  | David Paiva, Diego Luiz, Lucas Brito, Maria Vitória, Pedro Edi e Vinícius Barbosa |

## 1. Objetivo do Projeto 
Este projeto tem objetivo de desenvolver um site que implemente as funcionalidades de uma loja de suplementos on-line.
 
## 2. Descrição do problema 
| | | 
|:- |:- |
| **_O problema_**    | O lojista que atua no comércio convencional, na área de suplementação, deseja resolver o problema da falta de controle de validade do estoque em sua loja física  |
| **_afetando_**      | o lojista e os clientes                  |
| **_cujo impacto é_**| o descarte de produtos por falta de controle de validade e consequente queda nos lucros                                    |
| **_uma boa solução seria_** | a criação de um site de suplementos da loja física para obter o controle da validade do estoque |

## 3. Descrição dos usuários
| Nome | Descrição | Responsabilidades |
|:- |:- |:- |
| Cliente  | Usuário cadastrado no site | Visualizar os produtos; pesquisar produtos; comprar produtos; adicionar produtos ao carrinho; avaliar produtos adquiridos; cancelar pedido; solicitar devolução do produto. |
| Visitante   | Usuário não cadastrado no site | Visualizar produtos; pesquisar produtos.  |
| Moderador | Administrador do site | Adicionar e remover produtos; pesquisar produtos; adicionar produtos ao carrinho; gerenciar os pedidos.

## 4. Descrição do ambiente dos usuários 
O comércio eletrônico tem dois tipos de usuários. O tipo administrador representa o gestor da loja e seus colaboradores e o usuário, seja ele anônimo ou já cadastrado. 

O administrador acessará o sistema a partir da sua loja física e/ou em casa, ambos os locais por meio de um computador com mouse e teclado disponíveis, além de ter internet via Wi-Fi disponível. Sua função é configurar os produtos e gerenciar os pedidos, registrando a informação de situação de envio dos pedidos. Poderá acessar o sistema 24 horas por dia, durante os 7 dias da semana. ALém disso, o tempo levado para a realização dessas tarefas deve ser menor do que 2 segundos.

O usuário irá acessar o site utilizando um computador ou celular, em qualquer ambiente com disponibilidade de internet via Wi-Fi ou padrão de rede celular. Realizará a visualização dos produtos vendidos na loja e realizará a compra, caso deseje. As tarefas executadas pelos clientes, como uma compra, devem ser possíveis 24 horas por dia, durante os 7 dias da semana.

Não será necessário que o site interaja com nenhum outro aplicativo para funcionar. O ideal seria o usuário utilizar o site sem movimentação, pra que a qualidade do sinal não oscile. Porém, se o usuário estiver em movimento, será possível ele acessar o sistema com Wi-Fi se disponível, ou com um padrão de rede celular, como 4G.

## 5. Principais necessidades dos usuários
Considerando o ponto de vista do lojista, administrador do site, sua principal necessidade é controlar a validade do estoque de sua loja. Portanto, tem a necessidade de um site para a realização desse controle, além de que, com o site, consegue alcançar mais pessoas e, consequentemente, faturar mais. O site terá uma parte "promoções" destinada a esse controle de validade, para que esse problema seja solucionado. Além disso, para o administrador conseguir gerenciar os lotes e produtos, haverá uma área acessível somente para o administrador, para que ele consiga gerenciar produtos, lotes, notificações, clientes, e, dessa forma, conseguir ter total controle do site e do estoque dos seus produtos.

Considerando o pronto de vista do cliente, ele deseja ter acesso a um site com interface amigável que permita obter informações sobre os produtos comercializados e, caso identifique que estes atendam às suas necessidades, ele possa montar sua relação de compra confirmando a aquisição. Após essa etapa ele desejará visualizar o processo de entrega dos produtos adquiridos. O site irá entregar isso com um design simples, efetivo e responsivo, para atender às necessidades dos clientes.

## 6. Alternativas concorrentes
Entre as alternativas concorrentes, existem as principais lojas de suplementos presentes no mercado atual: Growth, Max Titanium, Integralmédica, etc. Esses sites têm basicamente o mesmo modelo, mudando o design e algumas poucas coisas.

Um ponto positivo desses sites é que eles deixam os produtos mais vendidos, consequentemente os mais importantes, em destaque para que o cliente ache-o com mais facilidade.
Além disso, outro ponto positivo que vi presente no site da Growth e na Integralmédica é que nos cards dos produtos eles colocam pequenas informações sobre o produto, fazendo com que o cliente tenha uma visão geral e boa do produto, estimulando-o a comprar.

## 7.	Visão geral do produto
Esse projeto consiste em um site voltado para vendas de produtos que pretende funcionar de forma rápida e eficiente para ser utilizado nos navegadores (browsers), disponibilizando um ambiente acessível a diversos tipos de usuários e possuindo um design confortável e responsivo. Para tal, o site irá disponibilizar diferentes mecanismos de busca permitindo que o usuário encontre de forma eficiente o que ele precisa, sem precisar de nenhum tipo de manual.

O sistema deve ter métodos de validação e verificações de erros. Além disso, o sistema deve ser capaz de sustentar pelo menos 100 acessos simultâneos.

## 8.	Requisitos funcionais
| Código | Nome | Descrição |
|:---  |:--- |:--- |
| F01	| Criar conta | Permite que um visitante se cadastre e crie sua conta para poder comprar produtos.
| F02	| Efetuar login	| Permite que um cliente entre na sua conta.
| F03	| Gerenciar conta	| Habilita o cliente a consultar e editar seus dados de perfil.
| F04	| Adicionar e remover produtos	| O administrador tem à sua disponibilidade a função de adicionar e remover produtos.
| F05	| Consultar pedidos realizados e não enviados.	| O administrador pode acessar os dados de vendas de produtos do site que foram realizados pelos clientes e que ainda não foram remetidos.
| F06	| Pesquisar produto	| Permite que o cliente coloque o nome de algum produto específico e, ao enviar, apareça os produtos correspondentes à sua pesquisa.
| F07	| Visualizar produtos	| O usuário visualiza os produtos disponíveis filtrando de acordo com suas necessidades e também de acordo com o produto.
| F08	| Adicionar ou remover produtos ao carrinho	| O usuário pode escolher mais de um produto para realizar a compra e inserir no carrinho.
| F09	| Realizar a compra | Os clientes podem confirmar a compra dos produtos adicionados em seu carrinho, gerando assim um pedido.
| F10	| Realizar o cancelamento de pedido solicitado	| Os clientes podem solicitar o cancelamento de um pedido realizado desde que ainda não tenha sido enviado.
| F11	| Verificar o histórico das compras realizadas	| Os clientes podem verificar seu histórico de compra na loja, por meio de uma aba "Meus pedidos".
| F12	| Verificar o status do pedido	| Os clientes podem acompanhar o status dos pedidos após realizados.
| F13	| Avaliar o Produto	| Os clientes podem avaliar os produtos adquiridos atribuindo uma nota.
| F14	| Devolver o produto	| Permite que o cliente solicite a devolução do produto, causada por erro no envio ou algo semelhante. 
| F15 | Gerenciar método de pagamento | Permite que o cliente adicione, edite ou exclua um cartão para usar como método de pagamento.
| F16 | Gerenciar pedidos | O administrador deve poder visualizar e excluir os clientes do site.
| F17 | Gerenciar produtos | O administrador deve poder gerenciar (criar, editar, atualizar e excluir) os produtos do site.
| F18 | Gerenciar lotes | O administrador deve poder gerenciar (criar, editar, atualizar e excluir) os lotes do site.
| F19 | Gerenciar notificações | O administrador deve poder gerenciar (criar, editar, atualizar e excluir) as notificações do site.
| F20 | Gerenciar pedidos | O administrador deve poder visualizar, editar e excluir os pedidos do site.
| F21 | Gerenciar devoluções | O administrador deve poder visualizar, editar e excluir as devoluções do site.
| F22 | Visualizar lotes vencidos | O administrador deve poder visualizar os lotes vencidos, para que ele dê baixa no sistema e atualize a sua loja física.
| F23 | Visualizar lotes perto de vencer | O administrador deve poder visualizar os lotes com data de vencimento próxima, para que ele tenha noção disso e fique alertado.
| F24 | Promoção automática | O sistema deve, a partir de uma lógica de programação, automaticamente colocar em promoção os produtos cujo lote está próximo de vencer. A taxa de promoção deve ser discutida entre cliente e desenvolvedor.

## 9.	Requisitos não-funcionais
| Código | Nome | Descrição | Categoria | Classificação |
|:---  |:--- |:--- |:--- |:--- |
| NF01	| Tecnologias utilizadas no desenvolvimento 	| O site deverá ser feito utilizando HTML, CSS e JS, junto com React no front-end. No back-end deverá ser utilizado Python com Django e o banco de dados será o PostgreSQL. | Desempenho	| Obrigatório
| NF02	| Design responsivo	| O site apresentará responsividade, deixando-o mais confortável para o usuário. | Usabilidade	| Obrigatório
| NF03	| Acesso somente com internet	| É necessário um acesso contínuo à Internet para poder acessar os dados do site e suas funcionalidades, como comprar produtos.	| Disponibilidade	| Obrigatório
| NF04	| Criptografia de Dados	| Senhas do usuário devem ser gravadas de forma criptografada no banco de dados.	| Segurança	| Obrigatório
| NF05	| Facilidade de Uso	| O sistema deve apresentar uma interface amigável, para que o cliente consiga utilizá-lo facilmente e consiga efetuar suas funcionalidades sem precisar de nenhum tipo de manual.	| Usabilidade	| Obrigatório
