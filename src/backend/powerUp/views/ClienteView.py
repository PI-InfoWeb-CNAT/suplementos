from rest_framework import viewsets
from powerUp.models import Cliente
from powerUp.serializers.ClienteSerializer import ClienteSerializer

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
