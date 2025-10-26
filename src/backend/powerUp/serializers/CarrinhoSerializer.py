from rest_framework import serializers
from powerUp.models import Carrinho, CarrinhoItem
from powerUp.serializers.ProdutoSerializer import ProdutoSerializer
from decimal import Decimal

class CarrinhoItemSerializer(serializers.ModelSerializer):
    subtotal = serializers.SerializerMethodField()
    produto_nome = serializers.CharField(source='produto.nome', read_only=True)
    produto_imagem = serializers.ImageField(source='produto.imagem', read_only=True)
    produto = ProdutoSerializer(read_only=True)

    class Meta:
        model = CarrinhoItem
        fields = ['id', 'produto', 'produto_nome', 'produto_imagem', 'quantidade', 'preco', 'subtotal']

    def get_subtotal(self, obj):
        return round(obj.produto.preco_calculado() * obj.quantidade, 2)


class CarrinhoSerializer(serializers.ModelSerializer):
    itens = CarrinhoItemSerializer(many=True, read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = Carrinho
        fields = ['id', 'session_key', 'user', 'criado_em', 'itens', 'total']

    def get_total(self, obj):
        total = Decimal('0.00')
        for item in obj.itens.all():
            preco_final = Decimal(str(item.produto.preco_calculado()))
            total += Decimal(item.quantidade) * preco_final

        return round(float(total), 2)