from django.contrib import admin
from .models.Produto import Produto

class ProdutoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'preco', 'porcentagem_desconto', 'categoria')
    empty_value_display = 'Vazio'

admin.site.register(Produto, ProdutoAdmin)