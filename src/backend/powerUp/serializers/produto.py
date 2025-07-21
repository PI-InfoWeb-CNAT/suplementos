from rest_framework import serializers
from powerUp.models import Produto

class ProdutoSerializer(serializers.ModelSerializer):
    preco_calculado = serializers.SerializerMethodField()

    class Meta:
        model = Produto
        fields = ['id', 'nome', 'preco', 'descricao', 'imagem', 'porcentagem_desconto', 'categoria', 'preco_calculado']

    def get_preco_calculado(self, obj):
        return obj.preco_calculado()
