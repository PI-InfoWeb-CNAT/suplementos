from rest_framework import viewsets
from powerUp.models import Cartao
from powerUp.serializers.CartaoSerializer import CartaoSerializer
from rest_framework.permissions import IsAuthenticated

class CartaoViewSet(viewsets.ModelViewSet):
    serializer_class = CartaoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Cartao.objects.filter(cliente__user=user)