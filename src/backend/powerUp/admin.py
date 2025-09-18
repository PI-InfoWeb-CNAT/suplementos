from django.contrib import admin
from .models.Produto import Produto
from .models.Cliente import Cliente
from .models.Favorito import Favorito
from .models.Endereco import Endereco
from .models.Cartao import Cartao

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
    

admin.site.register(Produto, ProdutoAdmin)
admin.site.register(Cliente, ClienteAdmin)
admin.site.register(Favorito, FavoritoAdmin)
admin.site.register(Endereco, EnderecoAdmin)
admin.site.register(Cartao, CartaoAdmin)