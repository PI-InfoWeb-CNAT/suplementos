from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from powerUp.models import Lote
from powerUp.serializers.LoteSerializer import LoteSerializer
from powerUp.permissions import IsPerfilAdmin # Usando sua permissão customizada

class LoteViewSet(viewsets.ModelViewSet):
    queryset = Lote.objects.all().order_by('validade') # Ordena por validade padrão
    serializer_class = LoteSerializer
    permission_classes = [IsPerfilAdmin] # Apenas admin pode mexer no estoque
    
    # Configurações de filtro
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['produto'] # Permite filtrar: /lotes/?produto=ID
    ordering_fields = ['validade', 'quantidade', 'data_entrada'] # Permite ordenar na URL