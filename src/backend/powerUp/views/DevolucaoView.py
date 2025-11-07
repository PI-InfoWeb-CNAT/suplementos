from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from powerUp.models import SolicitacaoDevolucao
from rest_framework.decorators import action 
from rest_framework.response import Response

from powerUp.serializers.DevolucaoSerializer import SolicitacaoDevolucaoSerializer

class DevolucaoViewSet(viewsets.ModelViewSet):
    http_method_names = ['get', 'post', 'head', 'options']

    serializer_class = SolicitacaoDevolucaoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return SolicitacaoDevolucao.objects.filter(user=user).order_by('-data_solicitacao')
    
    @action(detail=True, methods=['post'])
    def cancelar(self, request, pk=None):
        solicitacao = self.get_object()
        
        if solicitacao.status != '1':
            return Response(
                {"erro": "Esta solicitação não pode mais ser cancelada."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        solicitacao.status = '5' 
        solicitacao.save()
        
        serializer = self.get_serializer(solicitacao)
        return Response(serializer.data, status=status.HTTP_200_OK)