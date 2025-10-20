from rest_framework import serializers
from powerUp.models import Produto, Favorito, Cliente  

class ProdutoSerializer(serializers.ModelSerializer):
    preco_calculado = serializers.SerializerMethodField()
    is_favorited = serializers.SerializerMethodField()
    imagem = serializers.SerializerMethodField() 

    class Meta:
        model = Produto
        fields = [
            'id', 
            'nome', 
            'preco', 
            'descricao', 
            'imagem',
            'porcentagem_desconto', 
            'categoria',
            'preco_calculado', 
            'is_favorited',
        ]

    def get_preco_calculado(self, obj):
        preco = obj.preco_calculado()
        return f'{preco:.2f}'.replace('.', ',')

    def get_is_favorited(self, obj):
        request = self.context.get("request")
        user = getattr(request, "user", None)

        if not user or not user.is_authenticated:
            return False

        try:
            cliente = Cliente.objects.get(user=user) 
        except Cliente.DoesNotExist:
            return False

        return Favorito.objects.filter(cliente=cliente, produto=obj).exists()
    
    def get_imagem(self, obj):
        request = self.context.get("request")
        if obj.imagem and hasattr(obj.imagem, "url"):
            return request.build_absolute_uri(obj.imagem.url)
        return None