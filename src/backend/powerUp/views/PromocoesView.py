# views.py
from rest_framework import viewsets
from powerUp.models import Produto
from powerUp.serializers import ProdutoSerializer

class PromocoesViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProdutoSerializer

    def get_queryset(self):
        return Produto.objects.filter(porcentagem_desconto__gt=0)
