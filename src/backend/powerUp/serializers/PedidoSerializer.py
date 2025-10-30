from rest_framework import serializers
from powerUp.models import Pedido, PedidoItem
from powerUp.serializers.ProdutoSerializer import ProdutoSerializer
from powerUp.serializers.EnderecoSerializer import EnderecoSerializer
from powerUp.serializers.CartaoSerializer import CartaoSerializer


class PedidoItemSerializer(serializers.ModelSerializer):
    produto = ProdutoSerializer(read_only=True)
    total = serializers.SerializerMethodField()

    class Meta:
        model = PedidoItem
        fields = ['id', 'produto', 'quantidade', 'preco', 'imagem', 'total']

    def get_total(self, obj):
        return round(obj.quantidade * float(obj.preco), 2)


class PedidoSerializer(serializers.ModelSerializer):
    itens = PedidoItemSerializer(many=True, read_only=True)
    endereco = EnderecoSerializer(read_only=True)
    cartao = CartaoSerializer(read_only=True)

    class Meta:
        model = Pedido
        fields = ['id', 'user', 'endereco', 'cartao', 'total', 'status', 'dt_hora', 'itens']
        read_only_fields = ['user', 'total', 'status', 'dt_hora', 'itens']
