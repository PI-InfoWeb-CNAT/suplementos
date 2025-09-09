from rest_framework import viewsets
from powerUp.models import Endereco
from powerUp.serializers.EnderecoSerializer import EnderecoSerializer
from rest_framework.permissions import IsAuthenticated

class EnderecoViewSet(viewsets.ModelViewSet):
    queryset = Endereco.objects.all()
    serializer_class = EnderecoSerializer
    permissions = [IsAuthenticated]