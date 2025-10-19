from rest_framework import serializers
from powerUp.models import Carrinho, CarrinhoItem

class CarrinhoItemSerializer(serializers.ModelSerializer):
    total = serializers.SerializerMethodField()
    produto_nome = serializers.CharField(source='produto.nome', read_only=True)
    produto_imagem = serializers.ImageField(source='produto.imagem', read_only=True)

    class Meta:
        model = CarrinhoItem
        fields = ['id', 'produto', 'produto_nome', 'produto_imagem', 'quantidade', 'preco', 'total']

    def get_total(self, obj):
        return obj.quantidade * obj.preco


class CarrinhoSerializer(serializers.ModelSerializer):
    itens = CarrinhoItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = Carrinho
        fields = ['id', 'session_key', 'user', 'criado_em', 'itens', 'total']

    def get_total(self, obj):
        return sum(item.quantidade * item.preco for item in obj.itens.all())