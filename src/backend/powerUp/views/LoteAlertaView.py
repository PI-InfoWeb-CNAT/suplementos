from rest_framework.views import APIView
from rest_framework.response import Response
from powerUp.permissions import IsPerfilAdmin
from rest_framework import status
from django.utils import timezone
from datetime import timedelta

from powerUp.models import Lote
from powerUp.serializers.LoteAlertaSerializer import LoteAlertaSerializer 

class LoteAlertaView(APIView):
    permission_classes = [IsPerfilAdmin] 

    def get(self, request):
        hoje = timezone.now().date()
        daqui_30_dias = hoje + timedelta(days=30)

        lotes_vencidos = Lote.objects.select_related('produto').filter(
            validade__lt=hoje,
            quantidade__gt=0 
        ).order_by('validade')

        lotes_proximos = Lote.objects.select_related('produto').filter(
            validade__gte=hoje,
            validade__lte=daqui_30_dias,
            quantidade__gt=0
        ).order_by('validade')

        vencidos_data = LoteAlertaSerializer(lotes_vencidos, many=True).data
        proximos_data = LoteAlertaSerializer(lotes_proximos, many=True).data

        return Response({
            "resumo": {
                "total_vencidos": lotes_vencidos.count(),
                "total_proximos": lotes_proximos.count()
            },
            "vencidos": vencidos_data,
            "proximos_vencimento": proximos_data
        }, status=status.HTTP_200_OK)