from rest_framework import viewsets
from powerUp.models import Endereco
from powerUp.serializers.EnderecoSerializer import EnderecoSerializer
from rest_framework.permissions import IsAuthenticated

class EnderecoViewSet(viewsets.ModelViewSet):
    serializer_class = EnderecoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Endereco.objects.filter(cliente__user=user)