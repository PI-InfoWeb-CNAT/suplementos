from django.db import models
from django.contrib.auth.models import User

from .Produto import Produto
from .Cliente import Cliente
from .Favorito import Favorito
from .Endereco import Endereco
from .Cartao import Cartao
from .Carrinho import Carrinho, CarrinhoItem
from .Pedido import Pedido, PedidoItem
from .Devolucao import SolicitacaoDevolucao, ItemDevolvido
from .Lote import Lote
from .Notificacao import Notificacao
from .AvaliacaoProduto import AvaliacaoProduto