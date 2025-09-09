from rest_framework import viewsets, status 
from rest_framework.decorators import action 
from rest_framework.response import Response 
from django.contrib.auth.models import User 
from powerUp.models import Cliente 
from powerUp.serializers.ClienteSerializer import ClienteSerializer 
from rest_framework.permissions import IsAuthenticated

class ClienteViewSet(viewsets.ModelViewSet): 
    queryset = Cliente.objects.all() 
    serializer_class = ClienteSerializer 
    
    @action(detail=False, methods=['delete'], url_path='excluir-conta', permission_classes=[IsAuthenticated]) 
    def excluir_conta(self, request): 
        try: 
            user = request.user 
            cliente = Cliente.objects.get(user=user) 
            cliente.delete() 
            user.delete() 
            return Response({"detail": "Conta excluída com sucesso."}, status=status.HTTP_200_OK) 
        
        except Cliente.DoesNotExist: 
            return Response({"detail": "Cliente não encontrado."}, status=status.HTTP_404_NOT_FOUND)