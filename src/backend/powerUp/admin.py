from django.contrib import admin
from .models.Produto import Produto
from .models.Cliente import Cliente

class ProdutoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'preco', 'porcentagem_desconto', 'categoria')
    empty_value_display = 'Vazio'

class ClienteAdmin(admin.ModelAdmin):
    list_display = ('user', 'perfil', 'nome', 'cpf', 'telefone_celular')
    empty_value_display = 'Vazio'

admin.site.register(Produto, ProdutoAdmin)
admin.site.register(Cliente, ClienteAdmin)