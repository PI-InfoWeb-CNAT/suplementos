from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from powerUp.models import Notificacao
from powerUp.serializers.NotificacaoSerializer import NotificacaoSerializer

class NotificacaoViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = NotificacaoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notificacao.objects.filter(
            cliente__user=self.request.user
        ).order_by('-data_envio')

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        
        self.get_queryset().filter(lida=False).update(lida=True)

        return response
    
    @action(detail=False, methods=['get'])
    def nao_lidas_count(self, request):
        count = self.get_queryset().filter(lida=False).count()
        return Response({'count': count}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['delete'])
    def limpar_notificacoes(self, request):
        self.get_queryset().delete()
        
        return Response(status=status.HTTP_204_NO_CONTENT)