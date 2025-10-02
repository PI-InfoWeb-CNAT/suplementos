from rest_framework import serializers
from powerUp.models import Cartao, Cliente

class CartaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cartao
        fields = ["id", "apelido", "titular", "numero", "bandeira", "tipo"]
        read_only_fields = ["cliente"]
        
    def create(self, validated_data):
        request = self.context.get("request")
        user = request.user
        
        numero = validated_data.get("numero")
        
        try:
            cliente = Cliente.objects.get(user=user)
        except Cliente.DoesNotExist:
            raise serializers.ValidationError({"validacao": ["Cliente não encontrado para este usuário."]})
        
        if Cartao.objects.filter(cliente=cliente, numero=numero).exists():
            raise serializers.ValidationError({"validacao": ["Você já possui esse cartão."]})
        
        cartao = Cartao.objects.create(cliente=cliente, **validated_data)
        
        return cartao
    
    def update(self, instance, validated_data):
        bandeira = validated_data.get("bandeira", instance.bandeira)
        validated_data["bandeira"] = bandeira.lower()

        return super().update(instance, validated_data)