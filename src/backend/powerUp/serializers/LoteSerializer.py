from rest_framework import serializers
from powerUp.models import Lote

class LoteSerializer(serializers.ModelSerializer):
    produto_nome = serializers.CharField(source='produto.nome', read_only=True)

    class Meta:
        model = Lote
        fields = ['id', 'produto', 'produto_nome', 'quantidade', 'validade', 'data_entrada']
        read_only_fields = ['data_entrada'] 