from rest_framework import serializers
from powerUp.models import Lote

class LoteAlertaSerializer(serializers.ModelSerializer):
    produto_nome = serializers.CharField(source='produto.nome', read_only=True)

    class Meta:
        model = Lote
        fields = ['id', 'produto_nome', 'validade', 'quantidade']

    def get_produto_imagem(self, obj):
        try:
            if obj.produto.imagem:
                return obj.produto.imagem.url
        except:
            return None
        return None