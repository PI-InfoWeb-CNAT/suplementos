from rest_framework import serializers
from powerUp.models import Endereco

class EnderecoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Endereco
        fields = '__all__'
        
    def create(self, validated_data):
        validated_data['cliente'] = self.context['request'].user
        print("Dados recebidos (cliente preenchido):", validated_data)

        return validated_data  