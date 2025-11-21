from rest_framework import serializers
from powerUp.models import Notificacao

class NotificacaoSerializer(serializers.ModelSerializer):
    categoria_display = serializers.CharField(source='get_categoria_display', read_only=True)

    class Meta:
        model = Notificacao
        fields = [
            'id', 
            'categoria', 
            'categoria_display', 
            'titulo', 
            'texto', 
            'lida', 
            'data_envio'
        ]