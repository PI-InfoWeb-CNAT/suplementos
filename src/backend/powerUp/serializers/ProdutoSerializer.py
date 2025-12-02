from rest_framework import serializers
from django.db.models import Avg, Count, Q
from powerUp.models import Produto, Favorito, Cliente, AvaliacaoProduto  

class ProdutoSerializer(serializers.ModelSerializer):
    preco_calculado = serializers.SerializerMethodField()
    is_favorited = serializers.SerializerMethodField()
    imagem = serializers.SerializerMethodField() 
    estoque = serializers.IntegerField(read_only=True)
    media_avaliacoes = serializers.SerializerMethodField()
    total_avaliacoes = serializers.SerializerMethodField()
    minha_avaliacao = serializers.SerializerMethodField()
    distribuicao_avaliacoes = serializers.SerializerMethodField()

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
            'estoque',
            'media_avaliacoes', 
            'total_avaliacoes', 
            'minha_avaliacao',
            'distribuicao_avaliacoes',
        ]

    def get_preco_calculado(self, obj):
        return round(obj.preco_calculado(), 2)
       

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
    
    def get_media_avaliacoes(self, obj):
        media = obj.avaliacoes.aggregate(media=Avg('nota'))['media']
        
        if media is None:
            return 0
        
        return round(media, 1)

    def get_total_avaliacoes(self, obj):
        return obj.avaliacoes.count()
    
    def get_minha_avaliacao(self, obj):
        user = self.context['request'].user
        if user.is_anonymous:
            return None
            
        try:
            avaliacao = AvaliacaoProduto.objects.filter(
                produto=obj, 
                cliente__user=user
            ).first()
            
            return avaliacao.nota if avaliacao else None
        except Exception:
            return None
        
    def get_distribuicao_avaliacoes(self, obj):
        dados = obj.avaliacoes.aggregate(
            cinco=Count('id', filter=Q(nota=5)),
            quatro=Count('id', filter=Q(nota=4)),
            tres=Count('id', filter=Q(nota=3)),
            dois=Count('id', filter=Q(nota=2)),
            um=Count('id', filter=Q(nota=1))
        )

        return {
            "5": dados['cinco'],
            "4": dados['quatro'],
            "3": dados['tres'],
            "2": dados['dois'],
            "1": dados['um']
        }