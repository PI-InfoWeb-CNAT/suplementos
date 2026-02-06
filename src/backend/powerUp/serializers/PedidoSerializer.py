from rest_framework import serializers
from powerUp.models import Pedido, PedidoItem
from powerUp.serializers.ProdutoSerializer import ProdutoSerializer
from powerUp.serializers.EnderecoSerializer import EnderecoSerializer
from powerUp.serializers.CartaoSerializer import CartaoSerializer
from powerUp.serializers.DevolucaoSerializer import SolicitacaoDevolucaoSerializer


class PedidoItemSerializer(serializers.ModelSerializer):
    produto = ProdutoSerializer(read_only=True)
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = PedidoItem
        fields = ['id', 'produto', 'quantidade', 'preco', 'imagem', 'subtotal']

    def get_subtotal(self, obj):
        return round(obj.quantidade * float(obj.preco), 2)


class PedidoSerializer(serializers.ModelSerializer):
    itens = PedidoItemSerializer(many=True, read_only=True)
    endereco = EnderecoSerializer(read_only=True)
    cartao = CartaoSerializer(read_only=True)
    user_nome = serializers.SerializerMethodField()
    devolucao = serializers.SerializerMethodField()

    class Meta:
        model = Pedido
        fields = ['id', 'user', 'user_nome', 'endereco', 'cartao', 'total', 'status', 'dt_hora', 'itens', 'devolucao']
        read_only_fields = ['user', 'total', 'status', 'dt_hora', 'itens']
        
    def get_devolucao(self, obj):
        solicitacao = obj.devolucoes.first()
        if solicitacao:
            return SolicitacaoDevolucaoSerializer(solicitacao).data
        
        return None

    def get_user_nome(self, obj):
        if obj.user and hasattr(obj.user, 'cliente'):
            return obj.user.cliente.nome
        return obj.user.username if obj.user else "Usuário Removido"
