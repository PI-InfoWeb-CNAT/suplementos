from django.db.models import Sum
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from powerUp.models import Produto
from powerUp.serializers.ProdutoSerializer import ProdutoSerializer

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def comprar_novamente(self, request):
        user = request.user

        produtos_ja_comprados = Produto.objects.filter(
            pedidos__pedido__user=user
        ).distinct()

        serializer = self.get_serializer(produtos_ja_comprados, many=True)
        
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def mais_vendidos(self, request):
        prod_mais_vendidos = Produto.objects.annotate(
            total_vendas=Sum('pedidos__quantidade')
        ).order_by('-total_vendas')

        top_produtos = prod_mais_vendidos[:15]

        serializer = self.get_serializer(top_produtos, many=True)
        return Response(serializer.data)