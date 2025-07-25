from rest_framework import viewsets
from powerUp.models import Produto
from powerUp.serializers.ProdutoSerializer import ProdutoSerializer

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
