from rest_framework import serializers
from powerUp.models import Cartao, Cliente

class CartaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cartao
        fields = ["id", "apelido", "titular", "numero", "bandeira", "tipo"]
        read_only_fields = ["cliente"]

    def create(self, validated_data):
        request = self.context.get("request")

    def update(self, instance, validated_data):
        # Atualiza apenas os campos permitidos
        instance.apelido = validated_data.get('apelido', instance.apelido)
        instance.titular = validated_data.get('titular', instance.titular)
        instance.numero = validated_data.get('numero', instance.numero)
        instance.bandeira = validated_data.get('bandeira', instance.bandeira)
        instance.tipo = validated_data.get('tipo', instance.tipo)
        instance.save()
        return instance
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