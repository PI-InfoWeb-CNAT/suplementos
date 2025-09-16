from rest_framework import viewsets
from powerUp.models import Endereco
from powerUp.serializers.EnderecoSerializer import EnderecoSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

class EnderecoViewSet(viewsets.ModelViewSet):
    serializer_class = EnderecoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Endereco.objects.filter(cliente__user=user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"detail": "Endereço excluído com sucesso."}, status=status.HTTP_204_NO_CONTENT)