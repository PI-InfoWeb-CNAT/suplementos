from django.contrib import admin
from .models import *

class ProdutoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'preco', 'porcentagem_desconto', 'categoria')
    empty_value_display = 'Vazio'

class ClienteAdmin(admin.ModelAdmin):
    list_display = ('user', 'perfil', 'nome', 'cpf', 'telefone_celular')
    empty_value_display = 'Vazio'

class FavoritoAdmin(admin.ModelAdmin):
    list_display = ('cliente', 'produto')
    empty_value_display = 'Vazio'
    
class EnderecoAdmin(admin.ModelAdmin):
    list_display = ('cliente', 'rua', 'numero', 'cidade', 'uf')
    empty_value_display = 'Vazio'
    
class CartaoAdmin(admin.ModelAdmin):
    list_display = ('cliente', 'titular', 'apelido', 'tipo')
    empty_value_display = 'Vazio'

class CarrinhoAdmin(admin.ModelAdmin):
    list_display = ('user', 'criado_em')
    empty_value_display = 'Anônimo'

class CarrinhoItemAdmin(admin.ModelAdmin):
    list_display = ('produto', 'quantidade', 'carrinho', 'preco')
    empty_value_display = 'Vazio'

class PedidoAdmin(admin.ModelAdmin):
    list_display = ('user', 'status', 'dt_hora', 'total')
    empty_value_display = 'Vazio'

class PedidoItemAdmin(admin.ModelAdmin):
    list_display = ('produto', 'quantidade', 'pedido', 'preco', 'imagem')
    empty_value_display = 'Vazio'
    
class SolicitacaoDevolucaoAdmin(admin.ModelAdmin):
    list_display = ('user', 'status', 'total', 'data_solicitacao', 'motivo')
    empty_value_display = 'Vazio'

class ItemDevolvidoAdmin(admin.ModelAdmin):
    list_display = ('pedido_item', 'quantidade', 'solicitacao')
    empty_value_display = 'Vazio'
    
class LoteAdmin(admin.ModelAdmin):
    list_display = ('produto', 'quantidade', 'validade', 'data_entrada')
    empty_value_display = 'Vazio'
    
class NotificacaoAdmin(admin.ModelAdmin):
    list_display = ('cliente', 'categoria', 'titulo', 'data_envio', 'lida')
    empty_value_display = 'Vazio'
    
class AvaliacaoProdutoAdmin(admin.ModelAdmin):
    list_display = ('produto', 'nota', 'cliente', 'data_avaliacao')
    empty_value_display = 'Vazio'
    

admin.site.register(Produto, ProdutoAdmin)
admin.site.register(Cliente, ClienteAdmin)
admin.site.register(Favorito, FavoritoAdmin)
admin.site.register(Endereco, EnderecoAdmin)
admin.site.register(Cartao, CartaoAdmin)
admin.site.register(Carrinho, CarrinhoAdmin)
admin.site.register(CarrinhoItem, CarrinhoItemAdmin)
admin.site.register(Pedido, PedidoAdmin)
admin.site.register(PedidoItem, PedidoItemAdmin)
admin.site.register(SolicitacaoDevolucao, SolicitacaoDevolucaoAdmin)
admin.site.register(ItemDevolvido, ItemDevolvidoAdmin)
admin.site.register(Lote, LoteAdmin)
admin.site.register(AvaliacaoProduto, AvaliacaoProdutoAdmin)