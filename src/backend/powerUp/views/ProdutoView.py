from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
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