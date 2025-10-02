from rest_framework import viewsets
from powerUp.models import Cartao
from powerUp.serializers.CartaoSerializer import CartaoSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

class CartaoViewSet(viewsets.ModelViewSet):
    serializer_class = CartaoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Cartao.objects.filter(cliente__user=user)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)